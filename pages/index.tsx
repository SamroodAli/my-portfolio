import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = ({ projects }: any) => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Samrood Ali - Portfolio" />
        <link rel="icon" href="/favicon.ico" />
        <title>Samrood Ali</title>
      </Head>

      <main>
        <h1>Samrood Ali</h1>
        <p>A passionate Software engineer Full Stack web developer</p>
        <div>
          <h2>Categories</h2>
          <div>
            <h3>Frontend</h3>
          </div>
          <div>
            <h3>Backend</h3>
          </div>
          <div>
            <h3>Server</h3>
          </div>
          <div>
            <h3>Tools</h3>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
