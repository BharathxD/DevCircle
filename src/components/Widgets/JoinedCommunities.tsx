import { BsPeople } from "react-icons/bs";
import { Button } from "@/components/UI/Button";

const JoinedCommunities = () => {
  return (
    <div className="border-2 border-zinc-800 rounded-md ">
      <div className="bg-zinc-800 px-5 py-4 border-b-2 text-zinc-50 border-b-zinc-800">
        <div className="font-bold text-xl flex items-center gap-1.5">
          <BsPeople size={25} />
          <p className="ml-2">Joined Communities</p>
        </div>
      </div>
      <div>
        <div className="py-4 px-3 flex items-center justify-between border-b-2 border-zinc-800 p-2 last:border-b-0">
          <h2>React</h2>
          <Button>Hop in</Button>
        </div>
      </div>
    </div>
  );
};

export default JoinedCommunities;
