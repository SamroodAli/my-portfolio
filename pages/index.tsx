import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { gql } from "@apollo/client";
import client from "../lib/github-apollo";

const GET_PROJECTS = gql`
  query {
    viewer {
      login
    }
  }
`;

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Codezilla appointments home page" />
        <link rel="icon" href="/favicon.ico" />
        <title>Samrood Ali</title>
      </Head>

      <main className="bg-red-400 h-screen">My portfolio</main>
    </>
  );
};

export default Home;
