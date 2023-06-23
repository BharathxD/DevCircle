import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  return (
    <div className="flex items-center justify-between min-h-10 w-full text-zinc-600 border-2 border-zinc-800 p-2 rounded-md">
      <div></div>
      <FiSearch size={25} />
    </div>
  );
};

export default SearchBar;
