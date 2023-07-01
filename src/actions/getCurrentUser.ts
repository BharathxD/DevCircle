import type { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import type { Session } from "next-auth";

import { authOptions } from "@/lib/auth";
import database from "@/lib/database";

/**
 * Retrieves a server session using authentication options.
 * @returns {Promise<Session | null>} A promise that resolves to either a Session object or null.
 */
const getSession = (): Promise<Session | null> => getServerSession(authOptions);

/**
 * Retrieves the current user from the database based on the session's email
 * @returns {Promise<User | null>} A promise that resolves to either a User object or null.
 */
const getCurrentUser = async (): Promise<User | null> => {
  try {
    const session: Session | null = await getSession();
    if (!session?.user?.email) return null;

    // Retrieve the current user from the database based on the email in the session
    const currentUser = await database.user.findUnique({
      where: { email: session.user.email },
    });

    if (!currentUser) return null;
    return currentUser;
  } catch (error: unknown) {
    return null;
  }
};

export default getCurrentUser;
