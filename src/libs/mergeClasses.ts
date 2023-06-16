import { twMerge } from "tailwind-merge";
import { ClassValue } from "class-variance-authority/dist/types";
import clsx from "clsx";

const mergeClasses = (...values: ClassValue[]) => twMerge(clsx(values));

export default mergeClasses;
