import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { gql } from "@apollo/client";
import client from "../lib/github-apollo";

const GET_PROJECTS = gql`
  query {
    viewer {
      repositories(
        first: 50
        privacy: PUBLIC
        orderBy: { field: PUSHED_AT, direction: DESC }
      ) {
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

const Projects: NextPage = ({ projects }: any) => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Codezilla appointments home page" />
        <link rel="icon" href="/favicon.ico" />
        <title>Projects</title>
      </Head>

      <main>
        <h1>My portfolio</h1>
        <p>Projects fetched from github</p>
        {projects.map(({ node: project }: any) => (
          <a
            key={project.id}
            href={`https://github.com/SamroodAli/${project.name}`}
          >
            <div>{project.name}</div>
          </a>
        ))}
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

export default Projects;
