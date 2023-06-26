import { TbSmartHome } from "react-icons/tb";
import siteConfig from "@/config";
import Link from "next/link";

const CreateCommunity = () => {
  return (
    <div className="overflow-hidden h-fit rounded-md border-2 border-zinc-800 order-first md:order-last ">
      <div className="bg-zinc-800 dark:bg-zinc-800 text-zinc-50 px-5 py-4 border-b-2 border-b-zinc-80 ">
        <div className="font-bold text-xl flex items-center gap-1.5">
          <TbSmartHome size={25} />
          <p className="ml-2">Home</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-5 text-sm leading-6">
        <p className="text-zinc-800 dark:text-zinc-50 font-medium">
          Your personal {siteConfig.name} homepage. Come here to check in
          with your favorite communities.
        </p>
        <Link
          href="/d/create"
          className="w-full p-3 font-bold text-md text-zinc-700 dark:text-zinc-50 hover:text-zinc-50 border-2 border-zinc-800 hover:bg-zinc-800 rounded-lg hover:rounded-md transition-colors text-center"
          passHref
        >
          Create Community
        </Link>
      </div>
    </div>
  );
};

export default CreateCommunity;
