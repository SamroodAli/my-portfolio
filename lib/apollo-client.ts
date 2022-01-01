import { ApolloClient, InMemoryCache } from "@apollo/client";

const githubClient = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
});

export default githubClient;
