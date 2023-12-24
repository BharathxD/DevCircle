"use client";

import { useCallback, useMemo, useState, type ChangeEvent } from "react";
import axios, { type AxiosResponse } from "axios";
import { Search } from "lucide-react";

import { type SearchResults } from "@/types/database";
import useDebounce from "@/hooks/use-debonce";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

import SearchItem from "./serach-item";

const SearchBar = () => {
  const [query, setQuery] = useState<string>("");
  const [data, setData] = useState<SearchResults[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  /**
   * There are two reasons why I'm using this approach:
   * First, I wanted to try out the useDebounce hook.
   * Second, I could have used useQuery from react-query, but the reason is react-query and `@tanstack-query` are different.
   * When I initially started developing this application, I was using react-query, but I had to switch to `@tanstack-query`.
   * That would be a huge overhead for now, as I need to migrate all the queries to `@tanstack-query`.
   */
  const fetchResults = useCallback(async () => {
    try {
      const response: AxiosResponse<SearchResults[]> = await axios.get(
        "/api/posts/search",
        { params: { query } }
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching search results", error);
    } finally {
      setIsFetching(false);
    }
  }, [query]);

  const debouncedRequest = useDebounce(fetchResults);

  const content = useMemo(() => {
    return isFetching ? (
      <Skeleton className="w-full rounded-none p-8" />
    ) : data.length === 0 ? (
      <p className="inline-flex h-fit w-full items-center justify-center gap-2 p-5 text-lg">
        No results found.
      </p>
    ) : (
      <ul className="list-none">
        {data.map((post) => (
          <SearchItem key={post.postId} post={post} />
        ))}
      </ul>
    );
  }, [isFetching, data]);

  const handleInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setData([]);
      setIsFetching(true);
      setQuery(event.target.value);
      debouncedRequest();
    },
    [setData, setIsFetching, setQuery, debouncedRequest]
  );

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
            value={query}
            autoFocus
            onChange={handleInputChange}
            placeholder="Search posts"
          />
          {query.length > 0 && (
            <div className="absolute inset-x-0 top-[110%] h-fit max-h-[60vh] w-full overflow-hidden overflow-y-scroll rounded-md border-2 border-zinc-800 bg-zinc-50/75 shadow backdrop-blur-sm dark:bg-zinc-950/75">
              {content}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchBar;
