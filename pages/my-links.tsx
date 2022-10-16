import Head from 'next/head'
import { useForm } from 'react-hook-form'
import { GetServerSideProps } from 'next'
import { useMutation, useQuery } from '@tanstack/react-query'
import { query_client } from './_app'
import { getLinks, createLink } from "utils/link"
import type { User, ShortLink } from '@prisma/client'
import toast from "react-hot-toast"
import withAuth from 'utils/withAuth'
// import icons
import { HiOutlinePlusSm } from 'react-icons/hi'
import { SubmitHandler } from 'react-hook-form/dist/types'
import LinkCard from 'components/MyLinks/LinkCard'

interface Props {
    user: User,
    links: GetLinkResult<ShortLink[]>
}

interface FormProps {
    url: string
    slug: string
}


export default function MyLinks({ user, links }: Props): JSX.Element {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormProps>()
    const { data: queryResult } = useQuery<GetLinkResult<ShortLink[]>>(
        ['get-links'],
        (): Promise<GetLinkResult<ShortLink[]>> => getLinks({ userId: user.id }), {
        initialData: links
    })
    const { mutate: createLinkMutation } = useMutation({
        mutationKey: ['create-link'],
        mutationFn: (variables: CreateLinkVars) => createLink(variables),
    })

    const createLinkHandler: SubmitHandler<FormProps> = async (formData) => {
        try {
            const id = toast.loading('Creating new short link')
            createLinkMutation({ userId: user.id, url: formData.url, slug: formData.slug }, {
                onSuccess(data) {
                    const { success, message } = data
                    if (success) {
                        toast.success(message as string, {
                            id,
                            duration: 3600
                        })
                        query_client.refetchQueries(['get-links'])
                        reset()
                        return
                    }
                    toast.error(message as string, {
                        id,
                        duration: 3600
                    })
                }
            })
        } catch (error: unknown) {
            if (error instanceof Error)
                toast.error(error.message, {
                    duration: 3600
                })
        }

    }

    return <div className='p-3'>
        <Head>
            <title>My Links | Link Shortner</title>
            <meta name='description' content='Shorten your links and share them all over the world' />
        </Head>
        <div className='max-w-6xl mx-auto flex flex-col'>
            <h2 className='my-3 md:my-6 font-bold text-lg md:text-2xl'>My Links</h2>
            <form
                className='my-3'
                onSubmit={handleSubmit(createLinkHandler)}
            >
                <div className='flex flex-col sm:flex-row space-x-0 space-y-3 sm:space-x-3 sm:space-y-0'>
                    <div className=' flex-1 flex flex-col xs:flex-row space-x-0 space-y-3 xs:space-x-3 xs:space-y-0 '>
                        <input
                            {...register('url', { required: true })}
                            className='p-2  border-gray-300 border-2 flex-1   
                                rounded focus:outline-none focus:border-indigo-500 text-sm md:text-base'
                            placeholder='Paste your link here' />
                        <input
                            {...register('slug', { required: true })}
                            className='p-2 border-gray-300 border-2 flex-1   
                                rounded focus:outline-none focus:border-indigo-500 text-sm md:text-base'
                            placeholder='Provide a short name' />
                    </div>
                    <button
                        type='submit'
                        className='px-3 py-1.5 flex justify-evenly items-center self-center sm:self-auto
                        bg-indigo-500 text-white font-medium rounded text-sm md:text-base'>
                        <HiOutlinePlusSm />
                        <span>New Link</span>
                    </button>
                </div>
                <div className='text-red-500 font-medium'>
                    {
                        errors.url && errors.url.type == "required" && <p>Url is required!</p>
                    }
                    {
                        errors.slug && errors.slug.type == "required" && <p>Short name is required!</p>
                    }
                </div>
            </form>
            {
                queryResult.data?.length == 0 &&
                <div className='my-6 p-12 md:p-24 border-gray-200 border-2 text-center rounded'>
                    <p className='text-lg md:text-2xl font-bold text-gray-200'>No links created</p>
                </div>
            }
            {

                <div className='my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                    {
                        !!queryResult.data && queryResult.data.map((link) => <LinkCard key={link.id} link={link} />)

                    }
                </div>
            }
        </div>
    </div>

}



export const getServerSideProps: GetServerSideProps = withAuth({
    async gssp(_, user) {
        const links = await getLinks({ userId: user?.id as string })
        return {
            props: {
                user,
                links
            }
        }
    }
})