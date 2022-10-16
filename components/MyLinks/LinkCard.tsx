import Link from "next/link"
import { ShortLink } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import ReactTimeAgo from "react-timeago"
// import icons
import { HiShare } from "react-icons/hi"
import { ImStatsDots } from "react-icons/im"
import { MdDelete } from "react-icons/md"

import { deleteLink } from "utils/link"
import { query_client } from "pages/_app"

interface Props {
    link: ShortLink
}

export default function LinkCard({ link }: Props): JSX.Element {


    const shortLink = `${process.env.NEXT_PUBLIC_DOMAIN}/r/${link.slug}`
    const { mutate: deleteLinkMutation } = useMutation({
        mutationKey: ['create-link'],
        mutationFn: (variables: DeleteLinkVars) => deleteLink(variables),

    })

    const deleteLinkHandler = (linkId: string) => {
        const id = toast.loading("Deleting link")
        deleteLinkMutation({ id: linkId }, {
            onSuccess(data) {
                const { success, message } = data
                if (success) {
                    query_client.refetchQueries(['get-links'])
                    toast.success(message, {
                        id
                    })
                    return
                }
                toast.error(message, {
                    id
                })
            },
        })
    }
    const copyToClipboard = (text: string) => {
        window.navigator.clipboard.writeText(text)
        toast.success("Copied to clipboard")
    }
    return <div className='w-full p-3 flex flex-col bg-gray-50 shadow-md hover:shadow-lg  rounded'>
        <div className="flex flex-col">
            <div className="my-1 flex justify-end ">
                <button className='text-sm p-1.5 flex items-center  bg-yellow-400 text-white rounded-full space-x-2'
                    onClick={() => copyToClipboard(shortLink)}>
                    <HiShare />
                </button>
                <Link href={`/link-stats/${link.slug}`}>
                    <a className='text-sm mx-3 p-1.5 flex items-center  bg-green-500 text-white rounded-full space-x-2' >
                        <ImStatsDots />
                    </a>
                </Link>
                <button
                    className='text-sm p-1.5 flex items-center bg-red-500 text-white rounded-full space-x-2'
                    onClick={() => deleteLinkHandler(link.id)}
                >
                    <MdDelete />
                </button>
            </div>
            <div className="my-2 flex flex-col space-y-1">
                <h2 className="text-lg md:text-xl font-semibold">{link.url}</h2>
                <span className="text-gray-400 text-xs md:text-sm">
                    Created <ReactTimeAgo date={link.created_at} minPeriod={3600} />
                </span>
            </div>
        </div>
        <Link href={`/r/${link.slug}`} >
            <a target="_blank" className='my-3 text-xl md:text-2xl text-indigo-500 hover:underline'>{shortLink}</a>
        </Link>
    </div>
}