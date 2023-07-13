import type { MetadataRoute } from "next";

import siteConfig from "@/config/site";

/**
 * Generates the robots.txt data for the website.
 * @returns {MetadataRoute.Robots} The robots.txt data.
 */
export default function generateRobotsTxt(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
