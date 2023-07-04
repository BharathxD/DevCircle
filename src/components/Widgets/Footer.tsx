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
    <Card className="border-2 border-zinc-800">
      <CardHeader className="flex flex-row items-center gap-1 pb-2 pt-4 text-sm">
        {siteConfig.name}
        <p className="inline-flex items-center gap-1 text-sm">
          {siteConfig.copyrights}
          <Copyright className="h-4 w-4" />
        </p>
      </CardHeader>
      <CardContent className="pb-2">
        <CardDescription className="text-sm">
          {siteConfig.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex flex-row gap-2 pb-4 text-sm">
        <Link href="/privacy">Privacy & Policy</Link>
        <Link href="/terms">Terms</Link>
      </CardFooter>
    </Card>
  );
};

export default Footer;
