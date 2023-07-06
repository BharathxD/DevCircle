"use server";

import type { SocialMedia, User } from "@prisma/client";
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
 * @returns {Promise<User | UserWithSocialLinks | null>} A promise that resolves to either a User object, UserWithSocialLinks object, or null.
 */
const getCurrentUser = async (): Promise<User | null> => {
  try {
    const session: Session | null = await getSession();
    if (!session?.user?.email) return null;
    // Retrieve the current user from the database based on the email in the session
    const currentUser = await database.user.findUnique({
      where: { email: session.user.email },
    });
    return currentUser;
  } catch (error: unknown) {
    return null;
  }
};

export type UserWithSocialLinks = { socialMedia: SocialMedia | null } & User;

export const getUserWithSocialLinks =
  async (): Promise<UserWithSocialLinks | null> => {
    try {
      const session: Session | null = await getSession();
      if (!session?.user?.email) return null;
      const currentUserWithSocialLinks: UserWithSocialLinks | null =
        await database.user.findUnique({
          where: { email: session.user.email },
          include: {
            socialMedia: true,
          },
        });
      return currentUserWithSocialLinks;
    } catch (error: unknown) {
      return null;
    }
  };

export default getCurrentUser;
