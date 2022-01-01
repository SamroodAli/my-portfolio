import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { gql } from "@apollo/client";
import client from "../lib/github-apollo";

const About: NextPage = ({ projects }: any) => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Codezilla appointments home page" />
        <link rel="icon" href="/favicon.ico" />
        <title>Samrood Ali</title>
      </Head>

      <main className="bg-red-400">
        <h1>Hello, I am Samrood Ali</h1>
      </main>
    </>
  );
};

export default About;
