import { ApolloServer } from "apollo-server-micro";
import { schema } from "../../graphql/schema";
import { createContext } from "../../graphql/context";
import Cors from "micro-cors";
import { IncomingMessage, ServerResponse } from "http";

const cors = Cors();
const apolloServer = new ApolloServer({
  schema,
  context: createContext,
});

const startServer = apolloServer.start();

const handler = async function handler(
  req: IncomingMessage,
  res: ServerResponse
) {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
};

export const config = {
  api: {
    bodyParser: false,
  },
};
export default cors(handler);
