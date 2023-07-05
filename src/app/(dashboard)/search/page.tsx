"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Forum, Prisma } from "@prisma/client";
import axios from "axios";
import { motion } from "framer-motion";
import { debounce } from "lodash";
import { Search, Users } from "lucide-react";
import { useQuery } from "react-query";

import { capitalizeString } from "@/lib/utils";
import DashboardContentShell from "@/components/UI/DashboarContentShell";
import { Input } from "@/components/UI/Input";

const SearchPage = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const {
    data: queryResults,
    refetch,
    isFetched,
    isFetching,
  } = useQuery({
    queryFn: async () => {
      if (searchInput.length === 0) return [];
      const { data } = await axios.get(
        `/api/forum/search/?query=${searchInput}`
      );
      return data as (Forum & { _count: Prisma.ForumCountOutputType })[];
    },
    queryKey: ["community-search-query"],
    enabled: false,
  });
  const request = debounce(() => refetch());
  const debounceRequest = useCallback(() => request(), [request]);
  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return null;
  return (
    <DashboardContentShell>
      <motion.div
        className="order-first h-fit overflow-hidden rounded-md border-2 border-zinc-800 bg-zinc-50 dark:bg-zinc-950 md:order-last"
        initial="hidden"
        animate="show"
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
      >
        <div className="flex flex-row items-center justify-between border-b-2 border-b-zinc-800 bg-zinc-900 px-5 py-4 text-zinc-50 ">
          <div className="flex items-center gap-1.5 text-base font-bold">
            <Search size={25} />
            <p className="ml-2">Search Communities</p>
          </div>
        </div>
        <Input
          value={searchInput}
          onChange={async (event) => {
            setSearchInput(event.target.value);
            await debounceRequest();
          }}
          className="border-0 px-4 py-8 text-lg outline-0"
          placeholder="Enter a communitiy name..."
        />
      </motion.div>
      {searchInput.length > 0 && (
        <ul className="mt-4 grid max-h-[50vh] list-none grid-cols-1 overflow-hidden overflow-y-scroll rounded-md md:max-h-full md:grid-cols-3">
          {isFetched && queryResults?.length === 0 && (
            <p className="px-4 py-2">No results found</p>
          )}
          {isFetching && <p className="px-4 py-2">Searching...</p>}
          {(queryResults?.length ?? 0) > 0 && (
            <>
              {queryResults?.map((forum) => (
                <li
                  onClick={() => {
                    router.push(`/d/${forum.name}`);
                    router.refresh();
                  }}
                  className="flex cursor-pointer flex-col items-center gap-2  rounded-md border-2 border-zinc-800 bg-zinc-50 transition-colors hover:bg-zinc-800 dark:bg-zinc-950"
                  key={forum.id}
                  value={forum.name}
                >
                  <div className="flex w-full flex-row items-center justify-between border-b-2 border-b-zinc-800 px-5 py-4 text-zinc-800 dark:text-zinc-50">
                    <div className="flex items-center gap-1.5 text-xl font-bold">
                      <Users className="mr-2 h-4 w-4" />
                      <Link href={`/r/${forum.name}`} className="ml-2">
                        r/{forum.name}
                      </Link>
                    </div>
                  </div>
                  <div className="flex w-full flex-row items-center justify-between border-b-2 border-zinc-800 font-medium last:border-b-0">
                    <div className="px-5 py-3 text-lg font-bold">
                      d/{capitalizeString(forum.name)}
                    </div>
                    <div className="flex flex-row gap-2">
                      <span className="min-w-[175px] border-zinc-800 p-[auto] px-5 py-3 text-center">
                        <div className="rounded-md border-2 border-zinc-800 p-1 text-zinc-800 dark:text-zinc-50">
                          {forum._count.subscribers}{" "}
                          {forum._count.subscribers === 1
                            ? "Member"
                            : "Members"}
                        </div>
                      </span>
                    </div>
                  </div>
                  <div className="flex w-full flex-row items-center justify-between border-b-2 border-zinc-800 font-medium last:border-b-0">
                    <div className="px-5 py-3 text-lg font-bold">Posts</div>
                    <div className="flex flex-row gap-2">
                      <span className="min-w-[175px] border-zinc-800 p-[auto] px-5 py-3 text-center">
                        <div className="rounded-md border-2 border-zinc-800 p-1 text-zinc-800 dark:text-zinc-50">
                          {forum._count.posts}{" "}
                          {forum._count.posts === 1 ? "Post" : "Posts"}
                        </div>
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </>
          )}
        </ul>
      )}
    </DashboardContentShell>
  );
};

export default SearchPage;
