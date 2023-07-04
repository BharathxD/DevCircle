import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const capitalizeString = (value: string) => value.charAt(0).toUpperCase().concat(value.substring(1, value.length));