import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import client from "../../lib/github-apollo";
import { queries } from "../../graphql";
import Link from "next/link";

const languageColors = {
  TypeScript: { bg: "#2b7489", fg: "#ffffff" },
  JavaScript: { bg: "#f1e05a", fg: "#000" },
  HTML: { bg: "#e34c26", fg: "#ffffff" },
  CSS: { bg: "#563d7c", fg: "#ffffff" },
  Python: { bg: "#3572A5", fg: "#ffffff" },
  Shell: { bg: "#89e051", fg: "#000000" },
  Go: { bg: "#00ADD8", fg: "#ffffff" },
  Dockerfile: { bg: "#384d54", fg: "#ffffff" },
  Ruby: { bg: "#701516", fg: "#ffffff" },
};

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
        <div>
          <p>Languages</p>

          {project.languages.nodes.map((language: any) => (
            <p
              style={{
                backgroundColor: languageColors[language.name]?.bg,
                color: languageColors[language.name]?.fg,
                display: "inline",
              }}
              key={language.name}
            >
              {language.name}
            </p>
          ))}
        </div>
        <p>
          {project.description ||
            `Description not available at the moment. 
            Samrood has been alerted.
            Thank you for visiting and your contribution `}
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
        {/* <iframe
          id="theFrame"
          src={project.url.replace("github.com", "github1s.com")}
          style={{ width: "100%", height: "100vh" }}
          frameBorder="0"
        ></iframe> */}
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
