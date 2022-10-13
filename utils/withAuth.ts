import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

interface Props {
  gssp: (context: GetServerSidePropsContext) => { props: object };
}

export default function withAuth({ gssp }: Props) {
  return async (context: GetServerSidePropsContext) => {
    const session = await getSession(context);

    if (session == null) {
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
        props: {},
      };
    }

    return await gssp(context);
  };
}
