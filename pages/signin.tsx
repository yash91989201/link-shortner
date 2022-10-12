import Head from "next/head"
import type { Provider, } from "next-auth/providers"
import { getProviders, signIn } from "next-auth/react"
// import icons
import { FcGoogle } from "react-icons/fc"

interface Props {
    providers: Provider
}

export default function SignIn({ providers }: Props) {

    return <div className='w-full h-screen flex justify-center items-center'>
        <Head>
            <title>Signin &minus; Link Shortner</title>
            <meta name="description" content="Shorten your links and share them all over the world" />
        </Head>
        {Object.values(providers).map((provider) => (
            <div key={provider.name} >
                <button
                    className='p-3 flex items-center rounded-full border-gray-600 border  space-x-3'
                    onClick={() => signIn(provider.id)}
                >
                    <FcGoogle className='text-2xl' />
                    <span> Sign in with {provider.name}</span>
                </button>
            </div>
        ))}
    </div>

}

export async function getServerSideProps() {

    const providers = await getProviders()

    return {
        props: { providers },
    }

}