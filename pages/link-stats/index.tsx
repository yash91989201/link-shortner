import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { Session } from 'next-auth'
import withAuth from 'utils/withAuth'

interface Props {
    session: Session
}

export default function Index({ session }: Props): JSX.Element {

    return <div>
        <Head>
            <title>Link Stats | Link Shortner</title>
            <meta name="description" content="See all of your link and their statistics" />
        </Head>
    </div>

}

export const getServerSideProps: GetServerSideProps = withAuth({

    async gssp(context) {
        return {
            props: {}
        }
    }

})