import type { MetadataRoute } from "next";
import getSitemapData from "@/actions/getSiteMapData";

import siteConfig from "@/config/site";

/**
 * Generates the sitemap for the website.
 * @returns {Promise<MetadataRoute.Sitemap>} The sitemap data.
 */
export default async function generateSitemap(): Promise<MetadataRoute.Sitemap> {
  const { posts, forums, users } = await getSitemapData();

  const additionalRoutes = ["", "/home", "/leaderboard"].map((route) => ({
    url: siteConfig.url + route,
    lastModified: new Date().toISOString(),
  }));

  return [...additionalRoutes, ...posts, ...forums, ...users];
}
