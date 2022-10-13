import Head from 'next/head'
import { GetServerSidePropsContext } from 'next'
import { Session, User } from 'next-auth'
import { getSession, useSession } from 'next-auth/react'

interface Props {
  session: Session
}

export default function Home({ session }: Props): JSX.Element {

  return <div>
    <Head>
      <title>Home &minus; Link Shortner</title>
      <meta name="description" content="Shorten your links and share them all over the world" />
    </Head>
    <div>ello</div>
  </div>

}