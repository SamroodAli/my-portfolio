import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const githubClient = new ApolloClient({
  link: new HttpLink({
    // github url
    uri: "https://api.github.com/graphql",
    headers: {
      authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  }),
  cache: new InMemoryCache(),
});

export default githubClient;
