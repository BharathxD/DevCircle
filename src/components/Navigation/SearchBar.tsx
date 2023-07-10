"use client";

import { useRef, useState } from "react";
import { Search } from "lucide-react";

import useOnClickOutside from "@/hooks/useOnClickOutside";

const SearchBar: React.FC = () => {
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const searchRef = useRef(null);
  const toggleSearch = () => setIsSearching((prev) => !prev);
  useOnClickOutside(searchRef, () => setIsSearching(false));
  return (
    <div
      className="flex items-center justify-center gap-2 border-l-2 border-zinc-800 px-5 hover:cursor-pointer"
      onClick={toggleSearch}
      ref={searchRef}
    >
      <Search />
      {isSearching && (
        <input
          className="ml-2 h-full w-[200px] appearance-none bg-transparent outline-none"
          autoFocus
        />
      )}
    </div>
  );
};

export default SearchBar;
