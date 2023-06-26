import { FiSearch } from "react-icons/fi"

const SearchBar = () => {
  return (
    <div className="min-h-10 flex w-full items-center justify-between rounded-md border-2 border-zinc-800 p-2 text-zinc-600">
      <div></div>
      <FiSearch size={25} />
    </div>
  )
}

export default SearchBar
