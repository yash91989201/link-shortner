import Head from "next/head"

interface Props {
    children: JSX.Element
}

export default function Layout({ children }: Props) {

    return <main className="w-full h-screen">
        <Head>
            <title>My Links</title>
            <meta name="description" content="Shorten your links and share them all over the world" />
        </Head>
        this is the sidebar
        {children}
    </main>


}