import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import client from "../../lib/github-apollo";
import { queries } from "../../graphql";
import Link from "next/link";

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
        <p>
          {project.description ||
            `Description not available at the moment. 
            Samrood has been alerted.
            Thank you for visiting and your contribution `}
        </p>
        <div>
          <a href={project.url} target="_blank" rel="noreferrer">
            Visit project on github
          </a>
        </div>
        <div>
          <a
            href={project.url.replace("github.com", "github1s.com")}
            target="_blank"
            rel="noreferrer"
          >
            See codebase in vscode for web
          </a>
        </div>
        <div>
          <p>Clone project</p>
          <code>{project.url}</code>
        </div>
        <iframe
          id="theFrame"
          src={project.url.replace("github.com", "github1s.com")}
          style={{ width: "100%", height: "100vh" }}
          frameBorder="0"
        ></iframe>
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
