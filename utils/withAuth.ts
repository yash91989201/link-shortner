import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { getSession } from "next-auth/react";
import type { User } from "@prisma/client";
import prisma from "db/prisma-client";

interface Props {
  gssp: (
    context: GetServerSidePropsContext,
    user: User | null
  ) => Promise<GetServerSidePropsResult<any>>;
}

export default function withAuth({ gssp }: Props) {
  return async (context: GetServerSidePropsContext) => {
    const session = await getSession(context);
    const user = await prisma.user.findFirst({
      where: {
        email: {
          equals: session?.user?.email,
        },
      },
    });

    if (session == null) {
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
        props: {},
      };
    }

    return await gssp(context, user);
  };
}
