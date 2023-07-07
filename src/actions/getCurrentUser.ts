"use server"

import { getServerSession } from "next-auth";
import type { Session } from "next-auth";
import { authOptions } from "@/lib/auth";
import database from "@/lib/database";
import type { User } from "@prisma/client";

/**
 * Retrieves a server session using authentication options.
 * @returns A promise that resolves to either a Session object or null.
 */
const getSession = async (): Promise<Session | null> => {
  try {
    const session = await getServerSession(authOptions);
    return session ?? null;
  } catch (error: unknown) {
    return null;
  }
}

/**
 * Retrieves the current user from the database based on the session's email.
 * @returns A promise that resolves to either a User object or null.
 */
const getCurrentUser = async (): Promise<User | null> => {
  try {
    const session = await getSession();
    if (!session?.user?.email) return null;
    const currentUser = await database.user.findUnique({
      where: { email: session.user.email },
    });
    return currentUser ?? null;
  } catch (error: unknown) {
    return null;
  }
}

export default getCurrentUser;
