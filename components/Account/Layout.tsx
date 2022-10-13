interface Props {
    children: JSX.Element
}

export default function Layout({ children }: Props) {

    return <main className="w-full h-screen">
        this is the sidebar
        {children}
    </main>


}