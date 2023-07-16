import { Loader2 } from "lucide-react";

const CommentButtonShell = () => {
  return (
    <button
      className="relative flex items-center justify-center rounded-xl border-2 border-zinc-800 p-3 hover:bg-pink-300 dark:hover:border-zinc-300 dark:hover:bg-zinc-900"
      aria-label="Comments"
    >
      <Loader2 size={20} className="animate-spin" />
    </button>
  );
};

export default CommentButtonShell;
