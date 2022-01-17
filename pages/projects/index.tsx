import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Project } from "@prisma/client";
import { prisma } from "../../lib/prisma";

const Projects: NextPage<{ projects: Project[] }> = ({ projects }) => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Samrood Ali projects" />
        <link rel="icon" href="/favicon.ico" />
        <title>Projects</title>
      </Head>

      <div>
        <div className="h-10vh">
          <h1>My portfolio</h1>
          <p>Projects fetched from github</p>
        </div>
        <div className="overflow-auto h-80vh grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {projects.map((project: Project) => {
            return (
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
                <a className=" font-mono text-lg">{project.name}</a>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export async function getStaticProps() {
  const projects = await prisma.project.findMany({});

  return {
    props: {
      projects,
    },
  };
}

export default Projects;
