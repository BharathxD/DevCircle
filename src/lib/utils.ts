import { env } from "@/env.mjs";
import { clsx, type ClassValue } from "clsx";
import queryString from "query-string";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const capitalizeString = (value: string) =>
  value.charAt(0).toUpperCase().concat(value.substring(1, value.length));

export const generateCbUrl = (pathname: string) =>
  queryString.stringifyUrl({
    url: "/signin",
    query: { callbackUrl: pathname },
  });

export const absoluteUrl = (path: string) => `${env.NEXT_PUBLIC_APP_URL}${path}`;

export const extractString = (str: string) => {
  if (str.length <= 75) return str;
  return str.slice(0, 75) + "...";
};
