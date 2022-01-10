import { objectType } from "nexus";
import { Project } from "./project";

export const Category = objectType({
  name: "Category",
  definition: (t) => {
    t.id("id");
    t.string("name");
    t.string("description");
    t.string("createdAt");
    t.string("updatedAt");
    t.nonNull.list.nonNull.field("products", {
      type: Project,
      resolve: async ({ id }, args, { prisma }) => {
        return await prisma.category.findUnique({
          where: {
            id,
          },
          include: {
            Project: true,
          },
        });
      },
    });
  },
});
