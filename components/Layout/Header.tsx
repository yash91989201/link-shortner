import Link from "next/link"
import Image from "next/image"
import { useSession } from "next-auth/react"
import SigninBtn from "./SigninBtn"
import { useRouter } from "next/router"

export default function Header() {

    const router = useRouter()
    const user = useSession()
    const setActiveStyling = (matchPath: string) => {
        return router.asPath === matchPath ? "text-indigo-600 underline" : ""
    }


    return <header className='p-3   bg-gray-50 shadow-md'>
        <div className="max-w-6xl mx-auto flex justify-between items-center">
            <Link href="/">
                <a className="flex items-center space-x-3">
                    <div className="relative w-10 h-10">
                        <Image src="/assets/logo.svg" alt="website logo" layout="fill" />
                    </div>
                    <h2 className='text-2xl font-semibold text-indigo-600'>Link Shortner</h2>
                </a>
            </Link>
            <div className='flex items-center space-x-3'>
                {
                    user.status === "authenticated" &&
                    <>
                        <Link href="">
                            <a className={`text-sm font-semibold ${setActiveStyling("/my-links")}`}>My Links</a>
                        </Link>
                        <Link href="">
                            <a className={`text-sm font-semibold ${setActiveStyling("/link-stats")}`}>Link Stats</a>
                        </Link>
                    </>
                }
                <SigninBtn />
            </div>
        </div>
    </header >

}
