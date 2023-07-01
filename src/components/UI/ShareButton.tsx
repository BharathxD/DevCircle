"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import siteConfig from "@/config";
import { FiShare2 } from "react-icons/fi";

import { cn } from "@/lib/utils";
import { toast } from "@/hooks/useToast";

interface ShareButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  url?: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({
  url,
  className,
  ...props
}) => {
  const [onMount, setOnMount] = useState<boolean>(false);
  const pathName = usePathname();
  const handleShareButtonClick = async () => {
    await navigator.clipboard.writeText(url ?? `${siteConfig.url}${pathName}`);
    toast({
      title: "Link copied to clipboard",
      description: "You can share this link with anyone.",
    });
  };
  useEffect(() => {
    setOnMount(true);
  }, []);
  if (!onMount) return;
  return (
    <button
      className={cn(
        "flex h-full w-fit items-center gap-2 border-2 border-zinc-800 px-6 font-medium hover:bg-yellow-300 dark:hover:bg-zinc-800",
        className
      )}
      onClick={handleShareButtonClick}
      {...props}
    >
      <FiShare2 size={20} />
    </button>
  );
};

export default ShareButton;
