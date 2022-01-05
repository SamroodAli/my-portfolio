import { GraphQLClient, gql } from "graphql-request";
import { prisma } from "../lib/prisma";

async function main() {
  await prisma.project.deleteMany({});

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
    await prisma.project.create({
      data: {
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
}

main().catch(console.error);
