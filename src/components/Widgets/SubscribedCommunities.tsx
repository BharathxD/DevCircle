"use client"

import Link from "next/link"
import { BsArrowUpRightSquare, BsPeople } from "react-icons/bs"

interface SubscribedCommunitiesProps {
  forums: string[] | null
}

const SubscribedCommunities: React.FC<SubscribedCommunitiesProps> = ({
  forums,
}) => {
  if (!forums) return null
  return (
    <div className="overflow-hidden rounded-md border-2 border-zinc-800">
      <div className="border-b-2 border-b-zinc-800 bg-zinc-800 px-5 py-4 text-zinc-50">
        <div className="flex items-center gap-1.5 text-xl font-bold">
          <BsPeople size={25} />
          <p className="ml-2">Joined Communities</p>
        </div>
      </div>
      <div>
        {forums.map((forumName: string) => (
          <Link
            className="flex w-full items-center justify-between border-b-2 border-zinc-800 p-2 px-3 py-4 last:border-b-0 hover:bg-zinc-300 hover:text-zinc-300 hover:dark:bg-zinc-900"
            href={`/d/${forumName}`}
          >
            <h2>{forumName}</h2>
            <span>
              <BsArrowUpRightSquare size={25} />
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SubscribedCommunities
