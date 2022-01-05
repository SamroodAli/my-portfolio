import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import client from "../../lib/apollo-client";
import { queries } from "../../graphql";
import { langaugeJoiner, languageColors } from "../../lib";
import { languages, Project } from "@prisma/client";
import { useRef, useState } from "react";

const Project: NextPage<{ project: Project }> = ({ project }) => {
  const [open, setOpen] = useState(true);
  console.log(open);
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

      <div>
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

        <div className="mx-auto ">
          <iframe
            id="theFrame"
            src={project.url.replace("github.com", "github1s.com")}
            className=" mx-auto"
            frameBorder="0"
            style={{
              width: open ? "100%" : "90%",
              height: "100vh",
              position: open ? "absolute" : "relative",
              top: open ? "0" : undefined,
              bottom: open ? "0" : undefined,
              left: open ? "0" : undefined,
              right: open ? "0" : undefined,
            }}
          />
          <div className="absolute bottom-12 right-12 ">
            <button
              className="p-4 bg-blue-900 text-white rounded-full  hover:animate-none"
              onClick={(prev) =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
            >
              Scroll up
            </button>
            <button
              className="p-4 bg-blue-900 text-white rounded-full  hover:animate-none"
              onClick={() => setOpen((prev) => !prev)}
            >
              {open ? "Exit" : "Fullscreen"}
            </button>
          </div>
        </div>
      </div>
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
