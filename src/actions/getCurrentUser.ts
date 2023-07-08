"use server";

import type { User } from "@prisma/client";
import { getServerSession, type Session } from "next-auth";

import type {
  UserWithSocialLinks,
  UserWithSocialLinksAndPosts,
} from "@/types/database";
import { authOptions } from "@/lib/auth";
import database from "@/lib/database";

/**
 * Retrieves a server session using the provided authentication options.
 *
 * @returns {Promise<Session | null>} - A promise that resolves to either a Session object or null.
 * @throws {Error} - If an error occurs while retrieving the session.
 */
const getAuthSession = async (): Promise<Session | null> => {
  try {
    const session = await getServerSession(authOptions);
    return session ?? null;
  } catch (error) {
    throw new Error("Failed to retrieve the session.");
  }
};

/**
 * Retrieves the currently authenticated user from the database based on the session's email.
 *
 * @returns {Promise<User | null>} - A promise that resolves to either a User object or null.
 * @throws {Error} - If an error occurs while retrieving the user.
 */
const getCurrentUser = async (): Promise<User | null> => {
  try {
    const session = await getAuthSession();
    if (!session?.user?.email) {
      return null;
    }
    const currentUser = await database.user.findUnique({
      where: { email: session.user.email },
    });
    return currentUser ?? null;
  } catch (error) {
    throw new Error("Failed to retrieve the current user.");
  }
};

/**
 * Retrieves the currently authenticated user with associated social media links from the database based on the session's email.
 *
 * @returns {Promise<UserWithSocialLinks | null>} - A promise that resolves to either a UserWithSocialLinks object or null.
 * @throws {Error} - If an error occurs while retrieving the user with social media links.
 */
const getUserWithSocialLinks =
  async (): Promise<UserWithSocialLinks | null> => {
    try {
      const session = await getAuthSession();
      if (!session?.user?.email) {
        return null;
      }
      const currentUserWithSocialLinks = await database.user.findUnique({
        where: { email: session.user.email },
        include: { socialMedia: true },
      });
      return currentUserWithSocialLinks ?? null;
    } catch (error) {
      throw new Error("Failed to retrieve the user with social media links.");
    }
  };

/**
 * Retrieves the currently authenticated user with associated social media links and posts from the database based on the session's email or userId.
 *
 * @param {string} [username] - Optional user ID to retrieve user by ID instead of email.
 * @returns {Promise<UserWithSocialLinksAndPosts | null>} - A promise that resolves to either a UserWithSocialLinksAndPosts object or null.
 * @throws {Error} - If an error occurs while retrieving the user with social media links and posts.
 */
const getUserWithSocialLinksAndPosts = async (
  username?: string
): Promise<UserWithSocialLinksAndPosts | null> => {
  try {
    let whereClause: { username?: string; email?: string } = {};
    if (username) {
      whereClause = {
        username: username,
      };
    } else {
      const session = await getAuthSession();
      if (!session?.user?.email) {
        return null;
      }
      whereClause = { email: session.user.email };
    }
    const currentUserWithSocialLinksAndPosts = await database.user.findUnique({
      where: whereClause,
      include: { socialMedia: true, post: true },
    });
    return currentUserWithSocialLinksAndPosts ?? null;
  } catch (error) {
    throw new Error(
      "Failed to retrieve the user with social media links and posts."
    );
  }
};

export {
  getAuthSession,
  getCurrentUser,
  getUserWithSocialLinks,
  getUserWithSocialLinksAndPosts,
};
