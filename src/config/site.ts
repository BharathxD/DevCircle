type SiteConfig = {
  name: string;
  description: string;
  url: string;
  copyrights: number;
  ogImage: string;
}

/**
 * The number of results to be fetched per page in infinite scroll pagination.
 * @type {number}
 */
export const INFINITE_SCROLL_PAGINATION_RESULTS = 4;

/**
 * Configuration object for the DevCircle website.
 * @type {SiteConfig}
 * @property {string} name - The name of the website
 * @property {string} description - A brief description of the website.
 * @property {string} url - The URL of the website.
 * @property {number} copyrights - The copyright year for the website content.
 * @property {string} ogImage - The URL of the OpenGraph image for social media sharing.
 */
const siteConfig: SiteConfig = {
  name: "DevCircle",
  description:
    "DevCircle is an open-source community platform built for developers. It serves as a space for mutual guidance, sharing tips and tricks, and staying updated on the latest developments in the world of developers. Join this vibrant community to connect with fellow developers, share knowledge, and explore the exciting world of coding.",
  url: "https://devcircle.live",
  copyrights: 2023,
  ogImage: "https://devcircle.live/image/og.jpg",
};

export default siteConfig;
