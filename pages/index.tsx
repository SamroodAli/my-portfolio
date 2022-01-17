import { Category } from "@prisma/client";
import type { NextPage } from "next";
import client from "../lib/apollo-client";

import Head from "next/head";
import { queries } from "../graphql";

const Home: NextPage<{ categories: Category[] }> = ({ categories }) => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Samrood Ali - Portfolio" />
        <link rel="icon" href="/favicon.ico" />
        <title>Samrood Ali</title>
      </Head>

      <main className="bg-white h-100">
        <h1>Samrood Ali</h1>
        <p>A passionate Software engineer Full Stack web developer</p>
        {categories.map((category) => (
          <div key={category.id}>
            <h2>{category.name}</h2>
          </div>
        ))}
      </main>
    </>
  );
};

export const getStaticProps = async () => {
  const { data } = await client.query<{ categories: Category[] }>({
    query: queries.GET_CATEGORIES_NAMES,
  });

  return {
    props: {
      categories: data.categories,
    },
  };
};

export default Home;
