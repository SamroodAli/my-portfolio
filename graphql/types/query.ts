import { extendType, nonNull, stringArg } from "nexus";
import { Project } from "./project";

export const RootQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("projects", {
      type: Project,
      description: "List of projects fetched from github",
      resolve: async (_, __, { prisma }) => {
        return prisma.project.findMany({});
      },
    });

    t.field("project", {
      type: Project,
      description: "One of Samrood's project fetched from github",
      args: {
        name: nonNull(stringArg({ description: "The name of the project" })),
      },
      resolve: async (_, { name }, { prisma }) => {
        return await prisma.project.findUnique({
          where: {
            name,
          },
        });
      },
    });
  },
});
