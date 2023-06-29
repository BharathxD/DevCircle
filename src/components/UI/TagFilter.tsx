"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/UI/Command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/UI/Popover"

const TagFilter = ({ initialTags }: { initialTags: string[] }) => {
  const [open, setOpen] = useState(false)
  const [selectedTag, setValue] = useState("")
  const router = useRouter()
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          aria-expanded={open}
          className="flex w-[200px] items-center justify-between rounded-md border-2 border-zinc-800 px-4 py-2 font-semibold hover:bg-zinc-800 hover:text-zinc-300"
        >
          {selectedTag
            ? initialTags.find((tag) => tag === selectedTag)
            : "Choose a tag..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] border-2 border-zinc-800 p-0">
        <Command>
          <CommandInput placeholder="Search tags" />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup className="p-0">
            {initialTags.map((tag) => (
              <CommandItem
                className="rounded-none hover:cursor-pointer hover:bg-zinc-800 hover:text-zinc-300"
                key={tag}
                onSelect={(currentTag) => {
                  setValue(currentTag === selectedTag ? "" : tag)
                  router.push(
                    currentTag === selectedTag ? "" : `/?tag=${currentTag}`
                  )
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedTag === tag ? "opacity-100" : "opacity-0"
                  )}
                />
                {tag}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default TagFilter
