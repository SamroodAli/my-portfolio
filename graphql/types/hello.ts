import { extendType } from "nexus";

export const Hello = extendType({
  type: "Query",
  definition(t) {
    t.field("hello", {
      type: "String",
      resolve: () => "Hello world!",
    });
  },
});
