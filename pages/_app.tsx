import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { SessionProvider } from "next-auth/react"
import type { Session } from "next-auth"
import '../styles/globals.css'
// custom component
import Layout from 'components/Layout/Layout'

interface Props extends AppProps {
  pageProps: {
    session: Session
  }
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: Props) {

  const router = useRouter()

  if (router.route === "/signin")
    return <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>

  return <SessionProvider session={session}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </SessionProvider>

}

export default MyApp