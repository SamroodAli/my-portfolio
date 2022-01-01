import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import client from "../../lib/github-apollo";
import { queries } from "../../graphql";

const Project: NextPage = ({ project }: any) => {
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
        <p>Projects info </p>
        <p>{project.name}</p>
      </main>
    </>
  );
};

export async function getStaticPaths() {
  const { data } = await client.query({
    query: queries.GET_PROJECTS,
  });

  return {
    fallback: false,
    paths: data.viewer.repositories.edges.map(({ node: project }: any) => ({
      params: {
        name: project.name,
      },
    })),
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await client.query({
    query: queries.GET_PROJECT,
    variables: {
      name: params?.name,
    },
  });

  return {
    props: {
      project: data.viewer.repository,
    },
  };
};

export default Project;
