"use server";

import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

import type { UserWithSocialLinks } from "@/types/database";
import database from "@/lib/database";

/**
 * Retrieves the current user with social media links from the database based on the session's email.
 * @returns A promise that resolves to either a UserWithSocialLinks object or null.
 */
const getUserWithSocialLinks =
  async (): Promise<UserWithSocialLinks | null> => {
    try {
      const session = await getServerSession();
      if (!session?.user?.email) return null;
      const currentUserWithSocialLinks = await database.user.findUnique({
        where: { email: session.user.email },
        include: { socialMedia: true },
      });
      return currentUserWithSocialLinks ?? null;
    } catch (error: unknown) {
      return null;
    }
  };

export default getUserWithSocialLinks;
