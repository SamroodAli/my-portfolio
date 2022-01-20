import { Category, Project } from "@prisma/client";
import { GetStaticProps, NextPage } from "next";
import { prisma } from "../../lib/prisma";
import Link from "next/link";

const Category: NextPage<{ category: Category; projects: Project[] }> = ({
  category,
  projects,
}) => {
  return (
    <div>
      <h1>{category.name}</h1>
      <p>{category.description}</p>
      <ul>
        {projects.map((project) => (
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
            <li key={project.id}>{project.name}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Category;

export async function getStaticPaths() {
  const categories = await prisma.category.findMany({});

  return {
    fallback: false,
    paths: categories.map((category: Category) => ({
      params: {
        name: category.name,
      },
    })),
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.name || typeof params?.name !== "string") {
    return {
      redirect: "/projects",
      props: {},
    };
  }

  const category = await prisma.category.findUnique({
    where: {
      name: params?.name,
    },
    select: {
      name: true,
      description: true,
      projects: {
        select: { name: true },
      },
    },
  });

  const projects = category?.projects;

  return {
    props: {
      category,
      projects,
    },
  };
};
