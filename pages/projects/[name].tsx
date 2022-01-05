import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import client from "../../lib/apollo-client";
import { queries } from "../../graphql";
import { langaugeJoiner, languageColors } from "../../lib";
import { languages, Project } from "@prisma/client";

const Project: NextPage<{ project: Project }> = ({ project }) => {
  console.log(project.languages);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta
          name="description"
          content={`Samrood Ali - Project - ${project.name}  `}
        />
        <link rel="icon" href="/favicon.ico" />
        <title>{project.name}</title>
      </Head>

      <main>
        <h1>My portfolio</h1>
        <p>Projects info </p>
        <p>{project.name}</p>
        <div>
          <p>Languages</p>

          {project.languages.map((language) => (
            <p
              style={{
                backgroundColor: languageColors[language]?.bg,
                color: languageColors[language]?.fg,
                display: "inline",
              }}
              key={language}
            >
              {language}
            </p>
          ))}
        </div>
        <p>
          {project.description ||
            `${project.name
              .split("-")
              .join(" ")} project built with ${langaugeJoiner([
              ...project.languages,
              ...project.technologies,
            ])}`}
        </p>
        <p>{`created on ${new Date(project.createdAt).toDateString()}`}</p>
        <p>{`last updated on ${new Date(project.updatedAt).toDateString()}`}</p>
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
          <code>{`$ git clone ${project.url}.git`}</code>
          <button
            className="px-3"
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(`git clone ${project.url}.git`);
            }}
          >
            Copy
          </button>
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
    paths: data.projects.map((project: Project) => ({
      params: {
        name: project.name,
      },
    })),
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data }: { data: Project } = await client.query({
    query: queries.GET_PROJECT,
    variables: {
      name: params?.name,
    },
  });
  return {
    props: {
      project: data.project,
    },
  };
};

export default Project;
