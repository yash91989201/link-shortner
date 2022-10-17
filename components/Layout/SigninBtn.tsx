import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSession, signIn, signOut } from "next-auth/react"
// import icons
import { TbLogout } from "react-icons/tb"
// custom components
import Spinner from "components/shared/Spinner"

export default function SigninBtn() {
    const { data: session, status } = useSession()
    const [menuState, setMenuState] = useState(false)

    if (status === "loading")
        return < Spinner />

    if (status === "authenticated") {
        return <div className="flex justify-center">
            <div>
                <div className="dropdown relative">
                    <button
                        className='dropdown-btn'
                        type="button"
                        onClick={() => setMenuState(!menuState)}
                    >
                        <div className='relative w-8 h-8 rounded-full overflow-hidden'>
                            <Image src={session.user?.image!} alt={session.user?.name!} layout="fill" />
                        </div>

                    </button>
                    <ul
                        className={`
                        w-40  absolute  z-50 right-0
                        ${menuState ? "" : "hidden"}
                        m-0 mt-6 p-2
                        flex flex-col bg-white
                        text-base text-left space-y-2
                        list-none rounded-md shadow-lg
                        `}
                    >
                        <li>
                            <Link href="/account">
                                <a className="dropdown-item">Account</a>
                            </Link>
                        </li>
                        <li>
                            <button
                                className='dropdown-item flex justify-between items-center'
                                onClick={() => signOut()}>
                                <p>Signout</p>
                                <TbLogout />
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    }

    return <button
        className='p-3 py-1 rounded-md  border-gray-500 border'
        onClick={() => signIn()}>
        Sign in
    </button>

}
