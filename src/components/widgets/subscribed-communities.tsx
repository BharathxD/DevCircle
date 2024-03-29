"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BsArrowUpRightSquare, BsPeople } from "react-icons/bs";

import { capitalizeString } from "@/lib/utils";

interface SubscribedCommunitiesProps {
  forums: string[] | null;
}

const SubscribedCommunities: React.FC<SubscribedCommunitiesProps> = ({
  forums,
}) => {
  if (!forums || forums.length === 0)
    return (
      <div className="flex size-full items-center justify-center">
        <h1>
          Discover and join vibrant communities and forums! Click{" "}
          <Link href="/leaderboard" className="border-b-2 border-zinc-300">
            here
          </Link>{" "}
          to explore.
        </h1>
      </div>
    );
  return (
    <motion.div
      className="overflow-hidden rounded-md border-2 border-zinc-800 bg-zinc-50 dark:bg-zinc-950"
      initial="hidden"
      animate="show"
      variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
    >
      <div className="border-b-2 border-b-zinc-800 bg-zinc-900 px-5 py-4 text-zinc-50">
        <div className="flex items-center gap-1.5 text-xl font-bold">
          <BsPeople size={25} />
          <p className="ml-2">Joined Communities</p>
        </div>
      </div>
      <div>
        {forums.map((forumName: string, index: number) => (
          <Link
            className="flex w-full items-center justify-between border-b-2 border-zinc-800 p-2 px-3 py-4 last:border-b-0 hover:bg-zinc-300 hover:text-zinc-800 hover:dark:bg-zinc-900 hover:dark:text-zinc-300"
            href={`/d/${forumName}`}
            key={index}
          >
            <h2>{capitalizeString(forumName)}</h2>
            <span>
              <BsArrowUpRightSquare size={25} />
            </span>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default SubscribedCommunities;
