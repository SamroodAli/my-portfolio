import { PrismaClient } from "@prisma/client";
import { prisma } from "../lib/prisma";

export type Context = {
  prisma: PrismaClient;
};

export async function createContext(): Promise<Context> {
  //create Context has req and res
  return {
    prisma,
  };
}
