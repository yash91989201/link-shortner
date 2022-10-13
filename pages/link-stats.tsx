import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { Session } from 'next-auth'
import withAuth from 'utils/withAuth'

interface Props {
    session: Session
}

export default function LinkStats({ session }: Props): JSX.Element {

    return <div>
        <Head>
            <title>Link Stats &minus; Link Shortner</title>
            <meta name="description" content="Shorten your links and share them all over the world" />
        </Head>
    </div>

}

export const getServerSideProps: GetServerSideProps = withAuth({

    gssp: (context) => {
        return {
            props: {}
        }
    }

})