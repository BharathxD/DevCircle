import "server-only";

import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient;
}

/**
 * This function returns a PrismaClient instance, either by creating a new one or returning a cached
 * one based on the current environment.
 * @returns The function `getPrismaClient` returns an instance of `PrismaClient`. If the `NODE_ENV`
 * environment variable is set to "production", a new instance of `PrismaClient` is returned.
 * Otherwise, if `global.cachedPrisma` is not defined, a new instance of `e` is created and
 * stored in `global.cachedPrisma`. finally returns that instance.
 */
const getPrismaClient = () => {
  if (process.env.NODE_ENV === "production") return new PrismaClient();
  if (!global.cachedPrisma) global.cachedPrisma = new PrismaClient();
  return global.cachedPrisma;
};

/**
 * This TypeScript function exports a Prisma client instance that is cached in development mode and
 * created anew in production mode.
 * @returns The `db` object is being returned, which is an instance of the `PrismaClient` class. This
 * object is used to interact with the database and perform CRUD operations.
 */
const database = getPrismaClient();

export default database;
