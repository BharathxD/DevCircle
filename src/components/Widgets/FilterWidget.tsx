"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import queryString from "query-string"
import { FiFilter } from "react-icons/fi"

import Tags from "../Post/Tags"

const FilterWidget: React.FC = () => {
  const [value, setValue] = useState<string[]>([])
  const router = useRouter()
  useEffect(() => {
    const tagQuery = queryString.stringify(
      { tags: value },
      { arrayFormat: "comma" }
    )
    router.push(`/?${tagQuery}`)
  }, [router, value])
  return (
    <div className="overflow-hidden rounded-md border-2 border-zinc-800">
      <div className="border-b-2 border-b-zinc-800 bg-zinc-800 px-5 py-4 text-zinc-50">
        <div className="flex items-center gap-1.5 text-xl font-bold">
          <FiFilter />
          <p className="ml-2">Apply Filters</p>
        </div>
      </div>
      <div>
        <div className="flex w-full items-center justify-evenly  border-b-2 border-zinc-800 p-2 px-3 py-4 last:border-b-0"></div>
        {value && value.length > 0 && (
          <div className="grid h-auto w-full grid-cols-3 gap-2 border-b-2 border-zinc-800 p-2 px-3 py-4 last:border-b-0">
            {value.map((tag, index) => (
              <div
                className="flex flex-row items-center justify-between gap-1 rounded-md border-2 border-zinc-800 bg-zinc-800 px-4 py-1.5 text-zinc-50 hover:cursor-pointer hover:border-red-500 hover:bg-red-500 dark:text-zinc-300"
                key={index}
                onClick={() =>
                  setValue((prevTags) =>
                    prevTags.filter((prevTag) => prevTag !== tag)
                  )
                }
              >
                <p>{tag}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default FilterWidget
