"use client";

import React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import useAnalytics from "@/hooks/useCookies";

import { Button } from "../ui/Button";

const CookieBanner = () => {
  const { consent, setConsent } = useAnalytics();
  return (
    <div className="fixed bottom-0 right-0 z-10 m-2.5 flex w-auto items-center justify-center backdrop-blur-sm md:w-full">
      <div
        className={cn(
          "flex flex-col items-center gap-4 rounded-lg border border-zinc-700 bg-zinc-950 p-3 shadow md:flex-row md:px-4",
          consent !== null ? "hidden" : "flex"
        )}
      >
        <div className="text-center">
          <Link href="/privacy-policy">
            <p>
              We use <span className="font-bold text-zinc-400">cookies</span> on
              our site for Google Analytics
            </p>
          </Link>
        </div>
        <div className="hidden h-[30px] w-[1px] rotate-180 bg-zinc-700 md:block"></div>
        <div className="flex gap-2">
          <Button onClick={() => setConsent(false)}>Decline</Button>
          <Button onClick={() => setConsent(true)}>Allow Cookies</Button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
