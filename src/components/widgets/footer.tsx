"use client";

import Link from "next/link";
import { Copyright } from "lucide-react";

import siteConfig from "@/config/site";

import { Card, CardFooter, CardHeader } from "../ui/card";

const Footer: React.FC = () => {
  return (
    <Card className="w-full rounded-none border-0 border-t-2 border-zinc-800 bg-zinc-50 backdrop-blur-sm dark:bg-zinc-950/50">
      <CardHeader className="flex flex-row items-center gap-1 pb-2 pt-4 text-sm font-bold">
        {siteConfig.name}
        <p className="inline-flex items-center gap-1 text-sm">
          {siteConfig.copyrights}
          <Copyright className="size-3 font-bold" />
        </p>
      </CardHeader>
      <CardFooter className="flex flex-row gap-2 pb-4 text-sm">
        <Link
          href="/privacy-policy"
          className="hover:underline hover:underline-offset-2"
        >
          Privacy & Policy
        </Link>
        <Link
          href="/terms"
          className="hover:underline hover:underline-offset-2"
        >
          Terms
        </Link>
      </CardFooter>
    </Card>
  );
};

export default Footer;
