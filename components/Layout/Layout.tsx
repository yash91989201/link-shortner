// custom components
import Header from "./Header"

interface Props {
    children: JSX.Element
}

export default function Layout({ children }: Props) {

    return <>
        <Header />
        {children}
    </>

}