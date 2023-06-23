import getTopCommunities from "@/actions/getTopCommunities";
import { MdOutlineLeaderboard } from "react-icons/md";

const CommunityLeaderboard = async () => {
  const topCommunities = await getTopCommunities();
  return (
    <div className="overflow-hidden h-fit rounded-md border-2 border-zinc-800 order-first md:order-last">
      <div className="bg-zinc-800 px-5 py-4 border-b-2 text-zinc-50 border-b-zinc-800">
        <div className="font-bold text-xl flex items-center gap-1.5">
          <MdOutlineLeaderboard size={25} />
          <p className="ml-2">Top Communities</p>
        </div>
      </div>
      <div className="flex flex-col">
        {topCommunities.map((community, index) => (
          <div
            key={index}
            className="flex flex-row items-center justify-between font-medium border-b-2 last:border-b-0 border-zinc-800 w-full"
          >
            <div className="px-5 py-3 font-bold text-lg">
              c/{community.forumName}
            </div>
            <div className="flex flex-row gap-2">
              <span className="text-md px-5 py-3 border-zinc-800 p-auto min-w-[175px] text-center">
                <div className="border-2 text-zinc-800 dark:text-zinc-50 border-zinc-800 p-1 rounded-md">
                  {community.memberCount}{" "}
                  {community.memberCount === 1 ? "Member" : "Members"}
                </div>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityLeaderboard;
