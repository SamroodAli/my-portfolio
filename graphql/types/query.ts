import { extendType } from "nexus";
import { Project } from "./project";
import { prisma } from "../../lib/prisma";

export const RootQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("projects", {
      type: Project,
      description: "List of projects fetched from github",
      resolve: async () => {
        return await prisma.project.findMany({});
      },
    });
  },
});
