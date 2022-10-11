import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import type { Session } from "next-auth"
import '../styles/globals.css'

interface Props extends AppProps {
  pageProps: {
    session: Session
  }
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: Props) {
  return <SessionProvider session={session}>
    <Component {...pageProps} />
  </SessionProvider>
}

export default MyApp