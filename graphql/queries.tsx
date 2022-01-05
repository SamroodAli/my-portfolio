import { gql } from "@apollo/client";

export const GET_PROJECT_FROM_GITHUB = gql`
  query fetchRepository($name: String!) {
    viewer {
      id
      repository(name: $name) {
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
`;

export const GET_PROJECTS_FROM_GITHUB = gql`
  query fetchProjectNames {
    viewer {
      id
      repositories(
        first: 50
        privacy: PUBLIC
        ownerAffiliations: OWNER
        orderBy: { field: PUSHED_AT, direction: DESC }
      ) {
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
        }
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

export const GET_PROJECTS = gql`
  query fetchProjects($name: String!) {
    projects {
      id
      name
    }
  }
`;

export const GET_PROJECT = gql`
  query fetchProject($name: String!) {
    project(name: $name) {
      id
      repository(name: $name) {
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
`;
