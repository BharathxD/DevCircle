import siteConfig from "@/config/site";
import database from "@/lib/database";

type ReturnType = {
  url: string;
  lastModified: string;
};

/**
 * Fetches the data needed for generating the sitemap.
 * @returns {Promise<{ posts: PostData[], forums: ForumData[], users: UserData[] }>} The fetched data.
 */
const getSitemapData = async (): Promise<{
  posts: ReturnType[];
  forums: ReturnType[];
  users: ReturnType[];
}> => {
  const postsData = await database.post.findMany({ include: { forum: true } });
  const forumData = await database.forum.findMany();
  const userData = (await database.$queryRaw`SELECT username FROM User`) as {
    username: string;
  }[];

  return {
    posts: postsData.map((post) => ({
      url: `${siteConfig.url}/d/${post.forum.name}/${post.id}`,
      lastModified: post.updatedAt.toISOString(),
    })),
    forums: forumData.map((forum) => ({
      url: `${siteConfig.url}/d/${forum.name}`,
      lastModified: forum.updatedAt.toISOString(),
    })),
    users: userData.map((user) => ({
      url: `${siteConfig.url}/u/${user.username}`,
      lastModified: new Date().toISOString(),
    })),
  };
};

export default getSitemapData;
