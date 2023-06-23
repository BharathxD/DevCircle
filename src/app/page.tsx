import getTopCommunities from "@/actions/getTopCommunities";
import GeneralFeed from "@/components/Post/GeneralFeed";
import siteConfig from "@/config";
import Link from "next/link";
import { Fragment } from "react";
import { TbSmartHome } from "react-icons/tb";
import { BsPeople } from "react-icons/bs";
import { MdOutlineLeaderboard } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { CgCommunity } from "react-icons/cg";
import { Button } from "@/components/UI/Button";
import getCurrentUser from "@/actions/getCurrentUser";

export default async function Home() {
  const topCommunities = await getTopCommunities();
  const currentUser = await getCurrentUser();
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-y-4 md:gap-x-4">
        <div className="py-4 hidden md:block">
          <div className="">
            <div className="flex item-scenter justify-between min-h-10 w-full text-zinc-600 border-2 border-zinc-800 p-2 rounded-md">
              <div></div>
              <FiSearch size={25} />
            </div>
            <div className="py-4">
              <div className="border-2 border-zinc-800 rounded-md">
                <div className="bg-zinc-800 px-5 py-4 border-b-2 text-zinc-50 border-b-zinc-800">
                  <div className="font-bold text-xl flex items-center gap-1.5">
                    <BsPeople size={25} />
                    <p className="ml-2">Joined Communities</p>
                  </div>
                </div>
                <div>
                  <div className="py-4 px-3 flex items-center justify-between border-b-2 border-zinc-800 p-2 last:border-b-0">
                    <h2>React</h2>
                    <Button>Hop in</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-y-scroll h-[91vh] pt-4 pb-0 overflow-hidden w-full md:col-span-2 no-scrollbar">
          <div className="w-full rounded-md font-bold text-center text-4xl bg-zinc-50 dark:bg-zinc-950 border-2 border-zinc-800 px-6 py-3 mb-4">
            Your Feed
          </div>
          {/* @ts-expect-error server component */}
          <GeneralFeed userId={currentUser?.id} />
        </div>
        <div className="hidden flex-col gap-5 py-4 md:flex">
          <div className="overflow-hidden h-fit rounded-md border-2 border-zinc-800 order-first md:order-last">
            <div className="bg-zinc-800 dark:bg-zinc-800 text-zinc-50 px-5 py-4 border-b-2 border-b-zinc-800">
              <div className="font-bold text-xl flex items-center gap-1.5">
                <TbSmartHome size={25} />
                <p className="ml-2">Home</p>
              </div>
            </div>
            <div className="flex flex-col gap-4 p-5 text-sm leading-6">
              <p className="text-zinc-800 dark:text-zinc-50 font-medium">
                Your personal {siteConfig.siteName} homepage. Come here to check
                in with your favorite communities.
              </p>
              <Link
                className="w-full p-3 font-bold text-md  text-zinc-700 dark:text-zinc-50 hover:text-zinc-50 border-2 border-zinc-800 hover:bg-zinc-800 rounded-lg hover:rounded-md transition-colors text-center"
                href="/c/create"
              >
                Create Community
              </Link>
            </div>
          </div>
          <div className="overflow-hidden h-fit rounded-md border-2  border-zinc-800 order-first md:order-last">
            <div className="bg-zinc-800 px-5 py-4 border-b-2 text-zinc-50 border-b-zinc-800">
              <div className="font-bold text-xl flex items-center gap-1.5">
                <MdOutlineLeaderboard size={25} />
                <p className="ml-2">Top Communities</p>
              </div>
            </div>
            <div className="flex flex-col">
              {topCommunities.map((community, index) => {
                return (
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
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
