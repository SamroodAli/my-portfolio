import { enumType, objectType } from "nexus";

const languages = enumType({
  name: "languages",
  description:
    "The programming languages that were used in the project fetched from github",
  members: [
    "JavaScript",
    "Ruby",
    "Python",
    "HTML",
    "CSS",
    "SCSS",
    "Sass",
    "CoffeeScript",
    "TypeScript",
    "Shell",
    "Dockerfile",
  ],
});

const technologies = enumType({
  name: "technologies",
  description: "The technologies used in the project",
  members: [
    "React",
    "NextJs",
    "NodeJs",
    "Express",
    "GraphQL",
    "Library",
    "postgresql",
    "FullStack",
    "Serverless",
    "Mongodb",
    "Docker",
    "Kubernetes",
  ],
});

export const Project = objectType({
  name: "Project",
  description: "One of Samrood's project fetched from github",
  definition(t) {
    t.nonNull.id("id");
    t.nonNull.string("name");
    t.nonNull.string("description");
    t.nonNull.string("url");
    t.nonNull.string("createdAt");
    t.nonNull.string("updatedAt");
    t.nonNull.list.nonNull.field("languages", {
      type: languages,
    });
    t.nonNull.list.nonNull.field("technologies", {
      type: technologies,
    });
  },
});
