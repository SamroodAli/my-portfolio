import type { NextPage } from "next";
import Head from "next/head";
import client from "../../lib/apollo-client";
import Link from "next/link";
import { queries } from "../../graphql";
import { Project } from "@prisma/client";
import SelectSearch from "react-select-search";
import { useState } from "react";

const Projects: NextPage<{ projects: Project[] }> = ({ projects }) => {
  const options = projects.map(({ name }) => ({ name, value: name }));
  const [search, setSearch] = useState("");

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
        <div>
          <SelectSearch
            options={options}
            onChange={console.log}
            placeholder="Select a project"
          />
        </div>
        <div className="overflow-auto h-80vh grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {projects.map((project: Project) => (
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
              <a className="text-white font-mono text-lg">{project.name}</a>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export async function getStaticProps() {
  const { data } = await client.query({
    query: queries.GET_PROJECTS,
  });

  return {
    props: {
      projects: data.projects,
    },
  };
}

export default Projects;
