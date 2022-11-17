import Head from "next/head";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import withAuth from "utils/withAuth";
import { getLinkStats } from "utils/link";
import { useQuery } from "@tanstack/react-query";
import { LinkStats, User } from "@prisma/client";
import { useState } from "react";
interface Props {
  user: User;
}

export default function SingleLinkStats(): JSX.Element {
  const { slug } = useRouter().query;
  const { data: queryResult, isLoading } = useQuery(
    ["get-link-stats"],
    (): Promise<GetLinkStatsResult<LinkStats[]>> =>
      getLinkStats({
        slug: slug as string,
        fromDate: "1970-01-01T00:00:00.000Z",
        toDate: new Date().toISOString(),
      })
  );
  if (isLoading) return <p>Loading ...</p>;
  const linkStats = queryResult?.data;
  console.log(linkStats);
  return (
    <div className="p-3">
      <Head>
        <title>My Links | Link Shortner</title>
        <meta
          name="description"
          content="Shorten your links and share them all over the world"
        />
      </Head>
      <div className="flex flex-col max-w-6xl mx-auto">
        <h2 className="my-3 text-lg font-bold md:my-6 md:text-2xl">
          Link Stats
        </h2>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = withAuth({
  async gssp(context, user) {
    return {
      props: {
        user,
      },
    };
  },
});
