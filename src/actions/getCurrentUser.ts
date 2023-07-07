import { type User } from "@prisma/client";
import { getServerSession, type Session } from "next-auth";

import type {
  UserWithSocialLinks,
  UserWithSocialLinksAndPosts,
} from "@/types/database";
import { authOptions } from "@/lib/auth";
import database from "@/lib/database";

/**
 * Retrieves a server session using the provided authentication options.
 * @returns A promise that resolves to either a Session object or null.
 */
const getAuthSession = async (): Promise<Session | null> => {
  try {
    const session = await getServerSession(authOptions);
    return session ?? null;
  } catch (error) {
    console.error("Error while retrieving session:", error);
    return null;
  }
};

/**
 * Retrieves the currently authenticated user from the database based on the session's email.
 * @returns A promise that resolves to either a User object or null.
 */
const getCurrentUser = async (): Promise<User | null> => {
  try {
    const session = await getAuthSession();
    if (!session?.user?.email) return null;
    const currentUser = await database.user.findUnique({
      where: { email: session.user.email },
    });
    return currentUser ?? null;
  } catch (error) {
    console.error("Error while retrieving current user:", error);
    return null;
  }
};

/**
 * Retrieves the currently authenticated user with associated social media links from the database based on the session's email.
 * @returns A promise that resolves to either a UserWithSocialLinks object or null.
 */
const getUserWithSocialLinks =
  async (): Promise<UserWithSocialLinks | null> => {
    try {
      const session = await getAuthSession();
      if (!session?.user?.email) return null;
      const currentUserWithSocialLinks = await database.user.findUnique({
        where: { email: session.user.email },
        include: { socialMedia: true },
      });
      return currentUserWithSocialLinks ?? null;
    } catch (error) {
      console.error("Error while retrieving user with social links:", error);
      return null;
    }
  };

/**
 * Retrieves the currently authenticated user with associated social media links and posts from the database based on the session's email.
 * @returns A promise that resolves to either a UserWithSocialLinksAndPosts object or null.
 */
const getUserWithSocialLinksAndPosts =
  async (): Promise<UserWithSocialLinksAndPosts | null> => {
    try {
      const session = await getAuthSession();
      if (!session?.user?.email) return null;
      const currentUserWithSocialLinksAndPosts = await database.user.findUnique(
        {
          where: { email: session.user.email },
          include: { socialMedia: true, post: true },
        }
      );
      return currentUserWithSocialLinksAndPosts ?? null;
    } catch (error) {
      console.error(
        "Error while retrieving user with social links and posts:",
        error
      );
      return null;
    }
  };

export {
  getAuthSession,
  getCurrentUser,
  getUserWithSocialLinks,
  getUserWithSocialLinksAndPosts,
};
