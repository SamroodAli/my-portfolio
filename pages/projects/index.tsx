import type { NextPage } from "next";
import Head from "next/head";
import client from "../../lib/github-apollo";
import Link from "next/link";
import { queries } from "../../graphql";

const Projects: NextPage = ({ projects }: any) => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Samrood Ali projects" />
        <link rel="icon" href="/favicon.ico" />
        <title>Projects</title>
      </Head>

      <main>
        <h1>My portfolio</h1>
        <p>Projects fetched from github</p>
        {projects.map(({ node: project }: any) => (
          <Link
            key={project.id}
            href={{
              pathname: `/projects/[name]`,
              query: {
                name: project.name,
              },
            }}
            passHref
          >
            <a>
              <div>{project.name}</div>
            </a>
          </Link>
        ))}
      </main>
    </>
  );
};

export async function getStaticProps() {
  const { data } = await client.query({
    query: queries.GET_PROJECTS,
  });

  return {
    props: {
      projects: data.viewer.repositories.edges,
    },
  };
}

export default Projects;
