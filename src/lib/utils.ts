import { env } from "@/env.mjs";
import { clsx, type ClassValue } from "clsx";
import queryString from "query-string";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

/**
 * Concatenates multiple class values into a single string for Tailwind CSS.
 * @param inputs - Class values to be merged.
 * @returns Merged class string.
 */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));

/**
 * Capitalizes the first letter of a string.
 * @param value - The string to capitalize.
 * @returns Capitalized string.
 */
export const capitalizeString = (value: string): string =>
  value.charAt(0).toUpperCase() + value.substring(1);

/**
 * Generates a callback URL for signing in.
 * @param pathname - The current pathname.
 * @returns Callback URL string.
 */
export const generateCbUrl = (pathname: string): string =>
  queryString.stringifyUrl({
    url: "/signin",
    query: { callbackUrl: pathname },
  });

/**
 * Generates an absolute URL by combining the app URL and the specified path.
 * @param path - The path to be appended to the app URL.
 * @returns Absolute URL string.
 */
export const absoluteUrl = (path: string): string => env.NEXT_PUBLIC_APP_URL + path;

/**
 * Extracts a substring from a string and appends ellipsis if the string is longer than 75 characters.
 * @param str - The input string.
 * @returns Extracted string with ellipsis if necessary.
 */
export const extractString = (str: string): string => {
  if (str.length <= 75) return str;
  return str.slice(0, 75) + "...";
};

/**
 * Generates share URLs for various social media platforms.
 * @param title - The title of the shared content.
 * @param url - The URL of the shared content.
 * @returns Array of share URLs with corresponding icons.
 */
export const generateShareUrl = ({
  title,
  url,
}: {
  title: string;
  url: string;
}): { url: string; icon: React.ComponentType }[] => {
  const twitter = queryString.stringifyUrl({
    url: "https://twitter.com/intent/tweet",
    query: { url, text: title },
  });
  const linkedIn = queryString.stringifyUrl({
    url: "https://www.linkedin.com/sharing/share-offsite",
    query: { url },
  });
  const facebook = queryString.stringifyUrl({
    url: "https://www.facebook.com/dialog/share",
    query: { href: url, display: "popup", app_id: env.NEXT_PUBLIC_FB_APP_ID },
  });
  return [
    { url: twitter, icon: FaTwitter },
    { url: linkedIn, icon: FaLinkedin },
    { url: facebook, icon: FaFacebook },
  ];
};

/**
 * Sends a pageview event to Google Analytics.
 * @param GA_MEASUREMENT_ID - The Google Analytics measurement ID.
 * @param url - The URL of the page.
 */
export const pageview = (GA_MEASUREMENT_ID: string, url: string): void => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

/**
 * Retrieves a value from local storage with a specified key.
 * @param key - The key for the value in local storage.
 * @param defaultValue - The default value to be returned if the key does not exist in local storage.
 * @returns The retrieved value from local storage or the default value if not found.
 */
export const getLocalStorage = <T>(
  key: string,
  defaultValue: T
): T => {
  const stickyValue = localStorage.getItem(key);
  const parsedValue = stickyValue !== null && stickyValue !== 'undefined' ? JSON.parse(stickyValue) : defaultValue;
  return parsedValue as T;
};

/**
 * Sets a value in local storage with a specified key.
 * @param key - The key for the value in local storage.
 * @param value - The value to be stored in local storage.
 */
export const setLocalStorage = (key: string, value: unknown): void => {
  localStorage.setItem(key, JSON.stringify(value));
};
