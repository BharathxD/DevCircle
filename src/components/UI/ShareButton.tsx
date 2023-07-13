"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useClipboard, useMediaQuery } from "@mantine/hooks";
import { Copy } from "lucide-react";
import { FiShare2 } from "react-icons/fi";

import siteConfig from "@/config/site";
import { cn, generateShareUrl } from "@/lib/utils";
import { toast } from "@/hooks/useToast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";

import { Button } from "./Button";
import { DialogHeader } from "./Dialog";

interface ShareButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  title: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({
  className,
  title,
  ...props
}) => {
  const isDesktopScreen = useMediaQuery("(min-width: 640px)");
  const clipboard = useClipboard({ timeout: 500 });
  const [onMount, setOnMount] = useState<boolean>(false);
  const pathName = usePathname();

  const data = {
    title: `Check out my new post on DevCircle: \n${title}`,
    url: siteConfig.url + pathName,
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
            {generateShareUrl(data).map((social, index) => (
              <Link
                key={index}
                href={social.url}
                className="rounded-full border-2 border-zinc-800 p-2 hover:bg-zinc-700"
                referrerPolicy="no-referrer"
                target="_blank"
              >
                <social.icon className="h-8 w-8 text-zinc-50" />
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
