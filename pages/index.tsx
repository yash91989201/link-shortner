import Head from 'next/head'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'

export default function Home(): JSX.Element {

  return <div>
    <Head>
      <title>Home | Link Shortner</title>
      <meta name="description" content="Shorten your links and share them all over the world" />
    </Head>
    <div>ello</div>
  </div>

}

export async function getServerSideProps(context: GetServerSidePropsContext) {

  const session = await getSession(context)

  if (session !== null) {
    return {
      redirect: {
        permanent: false,
        destination: "/my-links",
      },
      props: {},
    };
  }
  return {
    props: {}
  }

}