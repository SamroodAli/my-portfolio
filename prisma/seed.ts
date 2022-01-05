import { GraphQLClient, gql } from "graphql-request";

async function main() {
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
          edges {
            node {
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
    }
  `;

  const data = await graphQLClient.request(query);
  console.log(JSON.stringify(data, undefined, 2));
}

main().catch((error) => console.error(error));
