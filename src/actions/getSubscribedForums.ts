"use server";

import database from "@/lib/database";

import getCurrentUser from "./getCurrentUser";

/**
 * The function retrieves the names of communities that a user has subscribed to from a database.
 * @returns The function `getJoinedCommunities` is returning an array of community names that the current user has subscribed to.
 * If there is an error, it returns `null`.
 */
const getSubscribedForums = async () => {
  try {
    const user = await getCurrentUser();
    if (!user) return null;
    const subscriptions = await database.subscription.findMany({
      where: { userId: user.id },
      include: { forum: true },
    });
    const communities = subscriptions.map(
      (subscription) => subscription.forum.name
    );
    return communities;
  } catch (error: unknown) {
    return null;
  }
};
export default getSubscribedForums;
