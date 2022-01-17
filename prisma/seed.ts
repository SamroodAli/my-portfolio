import { GraphQLClient, gql } from "graphql-request";
import { prisma } from "../lib/prisma";

async function main() {
  await prisma.project.deleteMany({});
  await prisma.category.deleteMany({});

  const categories = [
    { name: "Front-end", description: "All my front-end projects" },
    { name: "Back-end", description: "All my back-end projects" },
    { name: "FullStack", description: "All my full-stack projects" },
    { name: "DevOps", description: "All my devops projects" },
    { name: "Tools", description: "All the tools or libraries I have built" },
    { name: "Games", description: "All the games I have built" },
  ];

  categories.forEach(
    async (category) =>
      await prisma.category.upsert({
        where: { name: category.name },
        update: {},
        create: { name: category.name, description: category.description },
      })
  );

  const endpoint = "https://api.github.com/graphql";

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  });

  const query = gql`
    query fetchProjectNames {
      viewer {
        id
        repositories(
          first: 100
          privacy: PUBLIC
          ownerAffiliations: OWNER
          orderBy: { field: PUSHED_AT, direction: DESC }
        ) {
          nodes {
            id
            name
            description
            url
            createdAt
            updatedAt
            languages(first: 20) {
              nodes {
                name
              }
            }
          }
        }
      }
    }
  `;

  const data = await graphQLClient.request(query);
  data.viewer.repositories.nodes.forEach(async (node: any) => {
    await prisma.project.upsert({
      where: { name: node.name },
      update: {
        description: node.description || "",
        url: node.url,
        updatedAt: node.updatedAt,
      },
      create: {
        id: node.id,
        name: node.name,
        description: node.description || "",
        url: node.url,
        createdAt: node.createdAt,
        updatedAt: node.updatedAt,
        languages: node.languages.nodes.map((language: any) => language.name),
      },
    });
  });

  const pythons = await prisma.project.findMany({
    where: { name: { contains: "python" } },
  });
  console.log(pythons);

  await prisma.project.updateMany({
    where: { name: { contains: "python" } },
    data: {
      show: false,
    },
  });
}

main().catch(console.error);
