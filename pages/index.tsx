import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = ({ projects }: any) => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Codezilla appointments home page" />
        <link rel="icon" href="/favicon.ico" />
        <title>Samrood Ali</title>
      </Head>

      <main className="bg-red-400">
        <h1>Samrood Ali</h1>
      </main>
    </>
  );
};

export default Home;
