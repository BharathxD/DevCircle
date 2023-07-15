import { env } from "@/env.mjs";
import { clsx, type ClassValue } from "clsx";
import queryString from "query-string";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const capitalizeString = (value: string) =>
  value.charAt(0).toUpperCase().concat(value.substring(1, value.length));

export const generateCbUrl = (pathname: string) =>
  queryString.stringifyUrl({
    url: "/signin",
    query: { callbackUrl: pathname },
  });

export const absoluteUrl = (path: string) =>
  `${env.NEXT_PUBLIC_APP_URL}${path}`;

export const extractString = (str: string) => {
  if (str.length <= 75) return str;
  return str.slice(0, 75) + "...";
};

export const generateShareUrl = ({
  title,
  url,
}: {
  title: string;
  url: string;
}) => {
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

export const pageview = (GA_MEASUREMENT_ID: string, url: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

export const getLocalStorage = <T>(key: string, defaultValue: T): T => {
  const stickyValue = localStorage.getItem(key);
  const parsedValue = stickyValue !== null && stickyValue !== 'undefined' ? JSON.parse(stickyValue) : defaultValue;
  return parsedValue as T;
};

export const setLocalStorage = (key: string, value: unknown) => localStorage.setItem(key, JSON.stringify(value));