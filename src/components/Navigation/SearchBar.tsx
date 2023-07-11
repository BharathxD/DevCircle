"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import axios, { type AxiosResponse } from "axios";
import { debounce } from "lodash";
import { Search, Users } from "lucide-react";
import { useQuery } from "react-query";

import type { SearchResults } from "@/types/database";
import { Dialog, DialogContent, DialogTrigger } from "@/components/UI/Dialog";

const SearchBar: React.FC = () => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState<string>("");
  const {
    data: queryResults,
    refetch,
    isFetched,
  } = useQuery({
    queryFn: async () => {
      if (searchInput.length === 0) return [];
      const response: AxiosResponse<SearchResults[]> = await axios.get(
        `/api/posts/search/?query=${searchInput}`
      );
      return response.data;
    },
    queryKey: ["search-query"],
    enabled: false,
  });
  const request = debounce(() => refetch());
  const debounceRequest = useCallback(() => request(), [request]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative flex items-center justify-center gap-2 border-l-2 border-zinc-800 px-5 hover:cursor-pointer">
          <Search />
        </div>
      </DialogTrigger>
      <DialogContent
        className="top-[7.5%] w-[90%] rounded-md border-2 border-zinc-800 md:top-[25%]"
        showClose={false}
      >
        <div className="flex h-full w-full flex-col items-center gap-2 pl-2">
          <input
            className="h-[90%] w-full bg-transparent text-lg outline-none"
            value={searchInput}
            autoFocus
            onChange={async (event) => {
              setSearchInput(event.target.value);
              await debounceRequest();
            }}
            placeholder="Search for a community"
          />
          {searchInput.length > 0 && (
            <div className="absolute inset-x-0 top-[110%] h-fit w-full rounded-md border-2 border-zinc-800 bg-zinc-50/75 shadow backdrop-blur-sm dark:bg-zinc-950/75">
              {isFetched && !queryResults && (
                <p className="inline-flex h-fit w-full items-center justify-center gap-2 p-5 text-lg">
                  No results found.
                </p>
              )}
              {(queryResults?.length ?? 0) > 0 && (
                <ul className="list-none">
                  {queryResults?.map((post) => (
                    <li
                      className="inline-flex h-fit w-full items-center gap-2 p-5 text-lg hover:bg-zinc-800 hover:text-zinc-50"
                      onClick={() => {
                        router.push(`/d/${post.forumName}/${post.id}`);
                        router.refresh();
                      }}
                      key={post.id}
                    >
                      <Users className="mr-2 h-4 w-4" />
                      <a href={`/d/${post.forumName}/${post.id}`}>
                        {post.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchBar;
