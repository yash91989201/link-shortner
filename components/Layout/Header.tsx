import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSession, signOut } from "next-auth/react"
import SigninBtn from "./SigninBtn"
import { useRouter } from "next/router"
// import icons
import { HiMenuAlt4 } from "react-icons/hi"
import { TbLogout } from "react-icons/tb"

export default function Header() {

    const router = useRouter()
    const user = useSession()
    const [menu, setMenu] = useState(false)
    const setActiveStyling = (matchPath: string) => {
        return router.route.startsWith(matchPath) ? "text-indigo-600" : ""
    }

    return <header className='relative z-50  p-3 bg-gray-50 shadow-md'>
        <div className="max-w-6xl mx-auto flex justify-between items-center">
            <Link href="/">
                <a className="flex items-center space-x-3">
                    <div className="relative w-8 md:w-10 aspect-square">
                        <Image src="/assets/logo.svg" alt="website logo" layout="fill" />
                    </div>
                    <h2 className='text-lg md:text-2xl font-semibold text-indigo-500'>Link Shortner</h2>
                </a>
            </Link>
            <div className='hidden sm:flex items-center space-x-3'>
                {
                    user.status === "authenticated" &&
                    <>
                        <Link href="/my-links">
                            <a className={`text-sm font-semibold ${setActiveStyling("/my-links")}`}>My Links</a>
                        </Link>
                        <Link href="/link-stats">
                            <a className={`text-sm font-semibold ${setActiveStyling("/link-stats")}`}>Link Stats</a>
                        </Link>
                    </>
                }
                <SigninBtn />
            </div>
            <div
                className="p-2 border-indigo-500 border sm:hidden  text-indigo-500 rounded-md"
                onClick={() => setMenu(!menu)}
            >
                <HiMenuAlt4 />
            </div>
        </div>
        <div className={`
            menu
            ${menu ? "scale-y-100 " : "scale-y-0 "}
        `}>
            <Link href="/my-links">
                <a className="menu-item" onClick={() => setMenu(false)}>My Links</a>
            </Link>
            <Link href="/link-stats">
                <a className="menu-item" onClick={() => setMenu(false)}>Link Stats</a>
            </Link>
            <Link href="/account">
                <a className="menu-item" onClick={() => setMenu(false)}>Account</a>
            </Link>
            <button
                className='menu-item flex justify-between items-center bg-gray-100 text-gray-900'
                onClick={() => signOut()}>
                <p>Signout</p>
                <TbLogout className='mx-3' />
            </button>
        </div>
    </header >

}
