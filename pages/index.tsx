import { Category } from "@prisma/client";
import type { NextPage } from "next";
import Head from "next/head";
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

      <main className="bg-white h-100">
        <h1>Samrood Ali</h1>
        <p>A passionate Software engineer Full Stack web developer</p>
        {categories.map((category) => (
          <div key={category.id}>
            <h2>{category.name}</h2>
            <p>{category.description}</p>
          </div>
        ))}
      </main>
    </>
  );
};

export const getStaticProps = async () => {
  const categories = await prisma.category.findMany({
    select: {
      createdAt: false,
      updatedAt: false,
      name: true,
      description: true,
    },
  });

  return {
    props: {
      categories,
    },
  };
};

export default Home;
