import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import "../styles/globals.css";
// custom component
import Layout from "components/Layout/Layout";

interface Props extends AppProps {
  pageProps: {
    session: Session;
  };
}

export const query_client = new QueryClient();

function MyApp({ Component, pageProps: { session, ...pageProps } }: Props) {
  const router = useRouter();

  if (router.route === "/signin")
    return (
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    );

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={query_client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
