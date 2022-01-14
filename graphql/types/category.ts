import { objectType } from "nexus";
import { Project } from "./project";

export const Category = objectType({
  name: "Category",
  definition: (t) => {
    t.nonNull.id("id");
    t.nonNull.string("name");
    t.nonNull.string("description");
    t.nonNull.string("createdAt");
    t.nonNull.string("updatedAt");
    t.nonNull.list.nonNull.field("products", {
      type: Project,
      resolve: async ({ id }, _, { prisma }) => {
        return await prisma.category
          .findUnique({
            where: {
              id,
            },
          })
          .projects();
      },
    });
  },
});
