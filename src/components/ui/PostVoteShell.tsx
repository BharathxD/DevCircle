import { Loader2 } from "lucide-react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/Button";

const PostVoteShell = () => {
  return (
    <div className="flex h-full w-auto flex-row items-center gap-4 md:w-11 md:flex-col md:gap-0">
      <div
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "h-11 w-full animate-pulse rounded-xl border-2 border-zinc-800 px-2 text-zinc-800 dark:text-zinc-700"
        )}
      >
        <AiOutlineArrowUp className={"h-5 w-5"} />
      </div>
      <div className="py-3 text-center text-sm font-medium">
        <Loader2
          className="animate-spin text-zinc-800 dark:text-zinc-300"
          size={13}
        />
      </div>
      <div
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "h-11 w-full animate-pulse rounded-xl border-2 border-zinc-800 px-2 text-zinc-800 dark:text-zinc-700"
        )}
      >
        <AiOutlineArrowDown className={"h-5 w-5"} />
      </div>
    </div>
  );
};

export default PostVoteShell;
