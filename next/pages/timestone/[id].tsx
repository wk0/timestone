import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Box } from "@mui/material";

import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
};

export default function TimestoneItem() {
  const router = useRouter();
  const { query } = useRouter();
  const { data, error } = useSWR(
    () => query.id && `/api/item/${query.id}`,
    fetcher
  );

  if (error) return <div>{error.message}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <Head>
        <title>Timestone</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>
          <h1>Timestone</h1>
          <button type="button" onClick={() => router.push("/")}>
            Home
          </button>
          <Box>Timestone Page</Box>
        </div>
      </main>
    </div>
  );
}
