import { BsPeople } from "react-icons/bs"

import { Button } from "@/components/UI/Button"

const JoinedCommunities = () => {
  return (
    <div className="rounded-md border-2 border-zinc-800 ">
      <div className="border-b-2 border-b-zinc-800 bg-zinc-800 px-5 py-4 text-zinc-50">
        <div className="flex items-center gap-1.5 text-xl font-bold">
          <BsPeople size={25} />
          <p className="ml-2">Joined Communities</p>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between border-b-2 border-zinc-800 p-2 px-3 py-4 last:border-b-0">
          <h2>React</h2>
          <Button>Hop in</Button>
        </div>
      </div>
    </div>
  )
}

export default JoinedCommunities
