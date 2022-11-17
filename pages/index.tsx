import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

export default function Home(): JSX.Element {
  return (
    <div>
      <Head>
        <title>Home | Link Shortner</title>
        <meta
          name="description"
          content="Shorten your links and share them all over the world"
        />
      </Head>
      <main
        className="
                        max-w-6xl mx-auto my-24 flex flex-col items-center 
                        md:flex-row md:justify-evenly space-y-8 md:space-y-0
                  "
      >
        <div className="p-4 md:p-0 flex flex-col justify-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-semibold text-indigo-500">
            Link Shortner
          </h1>
          <p className="max-w-sm text-sm md:text-lg">
            Shorten and beautify your link and share them everywhere.
          </p>
          <Link href="/signin">
            <a className="py-2 px-6 bg-indigo-500 rounded-full text-white self-start">
              Get Started
            </a>
          </Link>
        </div>
        <div className="relative w-60 md:w-72 aspect-square">
          <Image
            src="/assets/landing_img.svg"
            alt="landing image"
            layout="fill"
          />
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

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
    props: {},
  };
}
