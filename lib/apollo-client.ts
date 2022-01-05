import { ApolloClient, InMemoryCache } from "@apollo/client";

const githubClient = new ApolloClient({
  uri: "http://localhost:3000/api/graphql",
  cache: new InMemoryCache(),
});

export default githubClient;
