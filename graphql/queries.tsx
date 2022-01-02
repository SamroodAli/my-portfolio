import { gql } from "@apollo/client";

export const GET_PROJECT = gql`
  query fetchRepository($name: String!) {
    viewer {
      id
      repository(name: $name) {
        id
        name
        description
        url
      }
    }
  }
`;

export const GET_PROJECTS = gql`
  query fetchProjectNames {
    viewer {
      id
      repositories(
        first: 50
        privacy: PUBLIC
        ownerAffiliations: OWNER
        orderBy: { field: PUSHED_AT, direction: DESC }
      ) {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  }
`;
