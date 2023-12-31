"use server";

import database from "@/lib/database";

import { getAuthSession } from "./getCurrentUser";

/**
 * Retrieves the names of the forums that the current user is subscribed to.
 *
 * @returns {Promise<string[] | null>} - An array of forum names, or null if the user is not found or an error occurs.
 */
const getSubscribedForums = async (): Promise<string[] | null> => {
  try {
    const session = await getAuthSession();
    if (!session?.user) return null;

    const subscriptions = await database.subscription.findMany({
      where: { userId: session.user.id },
      include: { forum: true },
    });

    const subscribedForumNames = subscriptions.map(
      (subscription) => subscription.forum.name
    );

    return subscribedForumNames;
  } catch (error) {
    return null;
  }
};

export default getSubscribedForums;
