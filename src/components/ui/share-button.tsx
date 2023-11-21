"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useClipboard, useMediaQuery } from "@mantine/hooks";
import { Copy } from "lucide-react";
import { FiShare2 } from "react-icons/fi";

import siteConfig from "@/config/site";
import { cn, generateShareUrl } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "./button";
import { DialogHeader } from "./dialog";

interface ShareButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  title: string;
  url: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({
  className,
  title,
  url,
  ...props
}) => {
  const isDesktopScreen = useMediaQuery("(min-width: 640px)");
  const clipboard = useClipboard({ timeout: 500 });
  const [onMount, setOnMount] = useState<boolean>(false);
  const pathName = usePathname();

  const data = {
    title: `Check out my new post on DevCircle: \n${title}`,
    url: url,
  };

  const handleShare = async () => {
    if (navigator.share) await navigator.share(data);
  };

  const handleCopy = async () => {
    clipboard.copy(data.url);
    toast({
      title: "Link copied to clipboard",
      description: "You can share this link with anyone.",
    });
  };

  useEffect(() => setOnMount(true), []);

  if (!onMount) return null;

  if (!isDesktopScreen) {
    return (
      <button
        className={cn(
          "flex h-full w-fit items-center gap-2 bg-zinc-50 px-6 font-medium hover:bg-yellow-300 dark:bg-zinc-950 dark:hover:bg-zinc-900",
          className
        )}
        onClick={handleShare}
        {...props}
        aria-label="Share"
      >
        <FiShare2 size={20} />
      </button>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={cn(
            "flex h-full w-fit items-center gap-2 bg-zinc-50 px-6 font-medium hover:bg-yellow-300 dark:bg-zinc-950 dark:hover:bg-zinc-900",
            className
          )}
          {...props}
          aria-label="Share"
        >
          <FiShare2 size={20} />
        </button>
      </DialogTrigger>
      <DialogContent className="w-[90%] rounded-xl">
        <DialogHeader>
          <DialogTitle>Share this post on social media</DialogTitle>
        </DialogHeader>
        <DialogDescription className="flex flex-col items-center gap-4 overflow-hidden md:flex-row md:gap-2">
          <div className="inline-flex flex-row items-center gap-2">
            {generateShareUrl(data).map(({ url, icon: Icon }, index) => (
              <Link
                key={index}
                href={url}
                className="rounded-full border-2 border-zinc-800 p-2 text-zinc-800 transition-all hover:bg-zinc-800 hover:text-zinc-50 dark:text-zinc-50"
                referrerPolicy="no-referrer"
                target="_blank"
              >
                <Icon className="h-8 w-8" />
              </Link>
            ))}
          </div>
          <div className="inline-flex flex-row items-center gap-2">
            <div className="flex max-w-[200px] items-center truncate rounded-full border-2 border-zinc-800 p-2 text-lg">
              {`${siteConfig.url}${pathName}`}
            </div>
            <Button
              className="h-max rounded-full px-4"
              variant="outline"
              onClick={handleCopy}
            >
              <Copy />
            </Button>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default ShareButton;
