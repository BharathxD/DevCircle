"use client";

import Link from "next/link";
import siteConfig from "@/config";
import { Copyright } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../UI/Card";

const Footer: React.FC = () => {
  return (
    <Card className="w-full border-2 border-zinc-800">
      <CardHeader className="flex flex-row items-center gap-1 pb-2 pt-4 text-sm font-bold">
        {siteConfig.name}
        <p className="inline-flex items-center gap-1 text-sm">
          {siteConfig.copyrights}
          <Copyright className="h-3 w-3 font-bold" />
        </p>
      </CardHeader>
      <CardFooter className="flex flex-row gap-2 pb-4 text-sm">
        <Link href="/privacy">Privacy & Policy</Link>
        <Link href="/terms">Terms</Link>
      </CardFooter>
    </Card>
  );
};

export default Footer;
