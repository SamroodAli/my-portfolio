import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { gql } from "@apollo/client";
import client from "../lib/github-apollo";

const GET_PROJECTS = gql`
  query {
    viewer {
      repositories(first: 50, orderBy: { field: PUSHED_AT, direction: DESC }) {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  }
`;

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

export async function getServerSideProps() {
  const { data } = await client.query({
    query: GET_PROJECTS,
  });

  return {
    props: {
      projects: data.viewer.repositories.edges,
    },
  };
}

export default Home;
