"use server"

import database from "@/lib/database";

import getCurrentUser from "./getCurrentUser";

/**
 * Retrieves the names of the forums that the current user is subscribed to.
 * @returns An array of forum names, or null if the user is not found or an error occurs.
 */
const getSubscribedForums = async () => {
  try {
    // Get the current user
    const user = await getCurrentUser();
    if (!user) return null;

    // Retrieve the subscriptions of the user, including the associated forums
    const subscriptions = await database.subscription.findMany({
      where: { userId: user.id },
      include: { forum: true },
    });

    // Extract the names of the forums from the subscriptions
    const communities = subscriptions.map(
      (subscription) => subscription.forum.name
    );

    return communities;
  } catch (error: unknown) {
    return null;
  }
};

export default getSubscribedForums;
