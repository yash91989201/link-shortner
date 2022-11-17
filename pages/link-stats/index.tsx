import { GetServerSideProps } from "next";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { useQuery } from "@tanstack/react-query";
// custom components
import LinkCard from "components/MyLinks/LinkCard";
// utils
import { getLinks } from "utils/link";
import withAuth from "utils/withAuth";
import { ShortLink, User } from "@prisma/client";

interface Props {
  user: User;
  links: GetLinkResult<ShortLink[]>;
}

export default function Index({ user, links }: Props): JSX.Element {
  const { data: queryResult } = useQuery<GetLinkResult<ShortLink[]>>(
    ["get-links"],
    (): Promise<GetLinkResult<ShortLink[]>> => getLinks({ userId: user.id }),
    {
      initialData: links,
    }
  );

  return (
    <div className="p-3">
      <Head>
        <title>Link Stats | Link Shortner</title>
        <meta
          name="description"
          content="Shorten your links and share them all over the world"
        />
      </Head>
      <div className="flex flex-col max-w-6xl mx-auto">
        <h2 className="my-3 text-lg font-bold md:my-6 md:text-2xl">
          Link Stats
        </h2>
        {queryResult.data?.length == 0 && (
          <div className="flex flex-col items-center p-8 my-6 space-y-3 border border-indigo-100 rounded md:p-16">
            <div className="relative w-48 lg:w-72 aspect-square">
              <Image
                src="/assets/empty_list.svg"
                alt="No links"
                layout="fill"
              />
            </div>
            <p className="text-lg font-bold text-indigo-100 md:text-3xl">
              No links created
            </p>
          </div>
        )}
        {
          <div className="grid grid-cols-1 gap-4 my-6 sm:grid-cols-2 md:grid-cols-3">
            {!!queryResult.data &&
              queryResult.data.map((link) => (
                <Link key={link.id} href={`/link-stats/${link.id}`}>
                  <a className="flex">
                    <LinkCard key={link.id} link={link} />
                  </a>
                </Link>
              ))}
          </div>
        }
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = withAuth({
  async gssp(_, user) {
    const links = await getLinks({ userId: user?.id as string });
    return {
      props: {
        user,
        links,
      },
    };
  },
});
