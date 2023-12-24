"use client";

import { useCallback, useState } from "react";
import axios, { type AxiosResponse } from "axios";
import debounce from "lodash/debounce";
import { Layers, Search } from "lucide-react";
import { useQuery } from "react-query";

import { type SearchResults } from "@/types/database";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

const SearchBar: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const {
    data: queryResults,
    refetch,
    isFetching,
    isFetched,
  } = useQuery<SearchResults[]>({
    queryFn: async () => {
      if (searchInput.length === 0) return [];
      const response: AxiosResponse<SearchResults[]> = await axios.get(
        `/api/posts/search/?query=${searchInput}`
      );
      return response.data;
    },
    queryKey: ["search-query"],
    enabled: searchInput.length > 0,
  });
  const request = debounce(() => refetch());
  const debounceRequest = useCallback(() => request(), [request]);
  return (
    <Dialog>
      <DialogTrigger asChild aria-label="Search">
        <button className="relative flex items-center justify-center gap-2 border-l-2 border-zinc-800 px-5 hover:cursor-pointer">
          <Search />
        </button>
      </DialogTrigger>
      <DialogContent
        className="top-[7.5%] w-[90%] rounded-md border-2 border-zinc-800 md:top-[25%]"
        showClose={false}
      >
        <div className="flex h-full w-full flex-col items-center gap-2 pl-2">
          <input
            type="text"
            className="h-[90%] w-full bg-transparent text-lg outline-none"
            value={searchInput}
            autoFocus
            onChange={async (event) => {
              setSearchInput(event.target.value);
              await debounceRequest();
            }}
            placeholder="Search posts"
          />
          {searchInput.length > 0 && (
            <div className="absolute inset-x-0 top-[110%] h-fit max-h-[60vh] w-full overflow-hidden overflow-y-scroll rounded-md border-2 border-zinc-800 bg-zinc-50/75 shadow backdrop-blur-sm dark:bg-zinc-950/75">
              {isFetching && <Skeleton className="w-full rounded-none p-8" />}
              {isFetched &&
                !isFetching &&
                (queryResults?.length ?? 0) === 0 && (
                  <p className="inline-flex h-fit w-full items-center justify-center gap-2 p-5 text-lg">
                    No results found.
                  </p>
                )}
              {(queryResults?.length ?? 0) > 0 && (
                <ul className="list-none">
                  {queryResults?.map((post) => (
                    <li key={post.postId}>
                      <a
                        className="inline-flex h-fit w-full items-center gap-2 p-5 text-lg hover:bg-zinc-800 hover:text-zinc-50"
                        href={`/d/${post.forumName}/post/${post.postId}`}
                      >
                        <Layers className="mr-2 h-8 w-8" />
                        <p>{post.postTitle}</p>
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
