import Head from 'next/head'
import { useForm } from 'react-hook-form'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useMutation, useQuery } from '@tanstack/react-query'
import { query_client } from './_app'
import { getLinks, createLink } from "utils/link"
import type { User, ShortLink } from '@prisma/client'
import toast from "react-hot-toast"
import withAuth from 'utils/withAuth'
// import icons
import { HiOutlinePlusSm } from 'react-icons/hi'
import { SubmitHandler } from 'react-hook-form/dist/types'

interface Props {
    user: User,
    links: ShortLink[]
}

interface FormProps {
    url: string
    slug: string
}


export default function MyLinks({ user, links }: Props): JSX.Element {

    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormProps>()
    const queryResult = useQuery(
        ['links'],
        async(variables)<GetLinkResult, GetLinkVars> => getLinks({ userId: variables.userId }),
        {
            initialData: links
        })
    const mutate = useMutation({
        mutationKey: ['create-link'],
        mutationFn: (variables: CreateLinkVars) => createLink(variables)
    })

    // const router = useRouter()

    const createLinkHandler: SubmitHandler<FormProps> = async (formData) => {

        try {
            const fetchResult = await fetch("/api/link/create-link", {
                method: 'POST',
                body: JSON.stringify({ userId: user.id, url: formData.url, slug: formData.slug }),
                headers: {
                    'content-type': 'application/json'
                }
            })
            const res = await fetchResult.json()
            if (res.success) {
                query_client.refetchQueries(['links'])
            }
            // throw new Error("ello")
        } catch (error: unknown) {
            if (error instanceof Error)
                toast.error(error.message, {
                    duration: 3600
                })
        }

    }

    return <div className='p-3'>
        <Head>
            <title>My Links &vert; Link Shortner</title>
            <meta name='description' content='Shorten your links and share them all over the world' />
        </Head>
        <div className='max-w-6xl mx-auto flex flex-col'>
            <h2 className='my-6 font-bold text-3xl'>My Links</h2>
            <form
                className='my-3 flex flex-col space-y-3'
                onSubmit={handleSubmit(createLinkHandler)}
            >
                <div className='flex space-x-3'>
                    <input
                        {...register('url')}
                        className='px-2 border-gray-300 border-2 flex-1   
                    rounded-md focus:outline-none focus:border-indigo-500'
                        placeholder='Paste your link here'

                    />
                    <input
                        {...register('slug')}
                        className='px-2 border-gray-300 border-2 flex-1   
                    rounded-md focus:outline-none focus:border-indigo-500'
                        placeholder='Provide a short name'

                    />
                    <button
                        type='submit'
                        className='p-2 flex justify-evenly items-center
                     bg-indigo-500 text-white font-medium rounded-md'
                    >
                        <HiOutlinePlusSm />
                        <span>New Link</span>
                    </button>
                </div>
            </form>
            <div className='my-6 border-red-500 border'>
                {
                    !!queryResult.data && queryResult.data.map((link) => <div key={link.id}>
                        <p>{link.slug}</p>
                    </div>)
                }
            </div>
        </div>
    </div>

}



export const getServerSideProps: GetServerSideProps = withAuth({
    async gssp(_, user) {
        const links = await getLinks(user?.id as string)
        return {
            props: {
                user,
                links
            }
        }
    }
})