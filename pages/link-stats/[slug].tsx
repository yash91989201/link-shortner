import Head from "next/head"
import { useRouter } from "next/router"
import { GetServerSideProps } from "next"
import withAuth from "utils/withAuth"
import { getLinkStats } from "utils/link"
import { useQuery } from "@tanstack/react-query"
import { LinkStats, User } from "@prisma/client"
import { useState } from "react"



interface Props {
    user: User,
}

const fromDateString = (timeFrame: string): string => {
    const currentDay = new Date().getDay()
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    switch (timeFrame) {
        case 'today': {
            return new Date(new Date().setDate(currentDay - 1)).toISOString()
        }
        case 'month': {
            return new Date(new Date().setMonth(currentMonth - 1)).toISOString()
        }
        case 'year': {
            return new Date(new Date().setFullYear(currentYear - 1)).toISOString()
        }
        default: {
            return '1970-01-01T00:00:00.000Z'
        }
    }
}

export default function SingleLinkStats(): JSX.Element {
    console.log(fromDateString('month'))
    const [fromDate, setFromDate] = useState('')
    const fromDateSetter = (str: string) => {
        setFromDate(str)
    }
    const { slug } = useRouter().query
    const { data: queryResult, isLoading, isError } = useQuery(['get-link-stats'],
        (): Promise<GetLinkStatsResult<LinkStats[]>> => getLinkStats({
            slug: slug as string,
            fromDate: fromDate,
            toDate: new Date().toISOString()
        }),
    )
    if (isLoading)
        return <p>Loading ...</p>
    const linkStats = queryResult?.data
    console.log(linkStats);
    return <div className='p-3'>
        <Head>
            <title>My Links | Link Shortner</title>
            <meta name='description' content='Shorten your links and share them all over the world' />
        </Head>
        <div className='max-w-6xl mx-auto flex flex-col'>
            <h2 className='my-3 md:my-6 font-bold text-lg md:text-2xl'>Link Stats</h2>
            <div>
                <div className="flex">
                    <div className="p-2 px-6 bg-indigo-300 rounded text-white text-base font-semibold">
                        <p>24 hrs</p>
                        <p>6</p>
                    </div>
                    <select name="" id="" onChange={(e) => fromDateSetter(e.target.value)}>
                        <option value="today">Today</option>
                        <option value="month">Month</option>
                        <option value="year">Year</option>
                        <option value="">Total</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
}

export const getServerSideProps: GetServerSideProps = withAuth({
    async gssp(context, user) {

        return {
            props: {
                user,
            }
        }
    }
})