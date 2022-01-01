import { gql } from "@apollo/client";

export const GET_PROJECT = gql`
  query fetchRepository($name: String!) {
    viewer {
      repository(name: $name) {
        name
      }
    }
  }
`;

export const GET_PROJECTS = gql`
  query {
    viewer {
      repositories(
        first: 50
        privacy: PUBLIC
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
