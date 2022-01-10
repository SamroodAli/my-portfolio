import { Category } from "@prisma/client";
import type { NextPage } from "next";
import Head from "next/head";
import { getEnabledCategories } from "trace_events";
import { prisma } from "../lib/prisma";

const Home: NextPage<{ categories: Category[] }> = ({ categories }) => {
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
  const categories = await prisma.category.findMany({});

  return {
    props: {
      categories,
    },
  };
};

export default Home;
