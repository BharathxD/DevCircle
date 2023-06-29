import database from "@/lib/database"
import redis from "@/lib/redis"

/**
 * Fetches the top five forums with the highest number of subscribers from the database.
 *
 * @returns {Promise<{ forumName: string; memberCount: number }[] | null>} A promise that resolves to an array of objects representing the top 5 forums.
 * Each object contains the `forumName` (string) and `memberCount` (number) properties.
 * The array is sorted in descending order based on the number of subscribers/members.
 *
 * @throws {Error} An error if there is any issue retrieving the top communities.
 */
const fetchTopCommunities = async (): Promise<
  { forumName: string; memberCount: number }[] | null
> => {
  try {
    const cachedTopCommunities = await redis.hgetall("leaderboard:forums")

    if (!cachedTopCommunities) {
      const forums = await database.forum.findMany({
        include: { subscribers: true },
      })

      const updatedForums = forums.map((forum) => ({
        forumName: forum.name,
        memberCount: forum.subscribers.length,
      }))

      const sortedForums = updatedForums.sort(
        (a, b) => b.memberCount - a.memberCount
      )
      return sortedForums.slice(0, 5)
    }

    const topCommunities = Object.values(cachedTopCommunities) as {
      forumName: string
      memberCount: number
    }[]
    const sortedCommunities = topCommunities.sort((a, b) => a.memberCount - b.memberCount);
    return sortedCommunities;
  } catch (error) {
    throw new Error("An error occurred while retrieving the top communities.")
  }
}

export default fetchTopCommunities
