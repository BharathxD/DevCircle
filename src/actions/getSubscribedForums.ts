"use server"

import database from "@/lib/database";
import getCurrentUser from "./getCurrentUser";

/**
 * Retrieves the names of the forums that the current user is subscribed to.
 * @returns An array of forum names, or null if the user is not found or an error occurs.
 */
const getSubscribedForums = async (): Promise<string[] | null> => {
  try {
    const user = await getCurrentUser();
    if (!user) return null;

    const subscriptions = await database.subscription.findMany({
      where: { userId: user.id },
      include: { forum: true },
    });

    const subscribedForumNames = subscriptions.map(
      (subscription) => subscription.forum.name
    );

    return subscribedForumNames;
  } catch (error) {
    return null;
  }
}

export default getSubscribedForums;
