"use client";

import { motion } from "framer-motion";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { MdOutlineLeaderboard } from "react-icons/md";

import { capitalizeString } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/UI/Tooltip";

interface CommunityLeaderboardProps {
  topCommunities:
    | {
        forumName: string;
        memberCount: number;
      }[]
    | null;
}

const CommunityLeaderboard: React.FC<CommunityLeaderboardProps> = ({
  topCommunities,
}) => {
  if (!topCommunities) return null;
  return (
    <motion.div
      className="order-first h-fit overflow-hidden rounded-md border-2 border-zinc-800 bg-zinc-50 dark:bg-zinc-950 md:order-last"
      initial="hidden"
      animate="show"
      variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
    >
      <div className="flex flex-row items-center justify-between border-b-2 border-b-zinc-800 bg-zinc-900 px-5 py-4 text-zinc-50 ">
        <div className="flex items-center gap-1.5 text-xl font-bold">
          <MdOutlineLeaderboard size={25} />
          <p className="ml-2">Top Communities</p>
        </div>
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="flex items-center justify-center">
                <AiOutlineInfoCircle size={20} className="text-zinc-400" />
              </TooltipTrigger>
              <TooltipContent sideOffset={10}>
                <p>Leaderboard gets updated every 24h</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div className="flex flex-col">
        {topCommunities.map((community, index) => (
          <div
            key={index}
            className="flex w-full flex-row items-center justify-between border-b-2 border-zinc-800 font-medium last:border-b-0"
          >
            <div className="px-5 py-3 text-lg font-bold">
              d/{capitalizeString(community.forumName)}
            </div>
            <div className="flex flex-row gap-2">
              <span className="min-w-[175px] border-zinc-800 p-[auto] px-5 py-3 text-center">
                <div className="rounded-md border-2 border-zinc-800 p-1 text-zinc-800 dark:text-zinc-50">
                  {community.memberCount}{" "}
                  {community.memberCount === 1 ? "Member" : "Members"}
                </div>
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default CommunityLeaderboard;
