import Head from 'next/head'
import { GetServerSidePropsContext } from 'next'
import { User } from 'next-auth'
import { getSession, useSession } from 'next-auth/react'

interface Props {
  user: User
}

export default function Home({ user }: Props): JSX.Element {

  return <div>
    <Head>
      <title>Home &minus; Link Shortner</title>
      <meta name="description" content="Shorten your links and share them all over the world" />
    </Head>
    <div>ello</div>
  </div>

}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession()
  console.log("session");
  console.log(session);
  if (session == null) {
    return {
      redirect: {
        permanent: false,
        destination: "/landing"
      }
    }
  }

  return {
    props: {
      user: session?.user
    }
  }

}

