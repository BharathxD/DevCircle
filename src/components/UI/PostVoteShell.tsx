import { Loader2 } from "lucide-react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/UI/Button";

const PostVoteShell = () => {
  return (
    <div className="flex items-center justify-center gap-4 py-2 pr-5 sm:w-20 sm:flex-col sm:gap-0 sm:pb-0">
      <div
        className={cn(
          buttonVariants(),
          "h-9 w-full px-2 text-zinc-800 dark:text-zinc-700"
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
          buttonVariants(),
          "h-9 w-full px-2 text-zinc-800 dark:text-zinc-700"
        )}
      >
        <AiOutlineArrowDown className={"h-5 w-5"} />
      </div>
    </div>
  );
};

export default PostVoteShell;
