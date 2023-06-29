"use client"

import { FiFilter } from "react-icons/fi"

import TagFilter from "../UI/TagFilter"

interface FilterWidgetProps {
  tags: string[] | null
}

const FilterWidget: React.FC<FilterWidgetProps> = ({ tags }) => {
  return (
    <div className="overflow-hidden rounded-md border-2 border-zinc-800">
      <div className="border-b-2 border-b-zinc-800 bg-zinc-800 px-5 py-4 text-zinc-50">
        <div className="flex items-center gap-1.5 text-xl font-bold">
          <FiFilter />
          <p className="ml-2">Apply Filters</p>
        </div>
      </div>
      <div>
        <div className="flex w-full items-center justify-evenly gap-4 border-b-2 border-zinc-800 p-2 px-3 py-4 last:border-b-0">
          <h2 className="font-semibold">Tags</h2>
          {tags && <TagFilter initialTags={tags} />}
        </div>
      </div>
    </div>
  )
}

export default FilterWidget
