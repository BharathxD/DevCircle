import type { MetadataRoute } from "next";
import siteConfig from "@/config";

import database from "@/lib/database";

/**
 * Generates the sitemap for the website.
 * @returns {Promise<MetadataRoute.Sitemap>} The sitemap data.
 */
export default async function generateSitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch posts and forum data from the database
  const postsData = await database.post.findMany({ include: { forum: true } });
  const forumData = await database.forum.findMany();

  // Generate URLs and last modified dates for posts
  const posts = postsData.map((post) => ({
    url: `${siteConfig.url}/d/${post.forum.name}/${post.id}`,
    lastModified: post.updatedAt.toISOString(),
  }));

  // Generate URLs and last modified dates for forums
  const forums = forumData.map((forum) => ({
    url: `${siteConfig.url}/d/${forum.name}`,
    lastModified: forum.updatedAt.toISOString(),
  }));

  // Generate URLs and last modified dates for additional routes
  const additionalRoutes = ["", "/home", "/leaderboard"].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...additionalRoutes, ...posts, ...forums];
}
