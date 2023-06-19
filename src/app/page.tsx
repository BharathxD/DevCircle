import { buttonVariants } from "@/components/UI/Button";
import siteConfig from "@/config";
import Link from "next/link";
import { TbSmartHome } from "react-icons/tb";

export default function Home() {
  return (
    <div>
      <h1 className="font-bold text-3xl md:text-4xl py-4 pt-6">Your feed</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
        {/* Feed */}
        {/* Community Info */}
        <div className="overflow-hidden h-fit rounded-md border-2  border-zinc-800 order-first md:order-last">
          <div className="bg-green-100 px-5 py-4 border-b-2  border-b-zinc-700">
            <div className="font-bold text-xl flex items-center gap-1.5">
              <TbSmartHome size={25} />
              <p>Home</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 p-5 text-sm leading-6">
            <p className="text-zinc-950 font-medium">
              Your personal {siteConfig.siteName} homepage. Come here to check
              in with your favorite communities.
            </p>
            <Link
              className="w-full p-3 font-medium text-md text-zinc-800 hover:text-zinc-50 border-2  border-zinc-800 hover:bg-zinc-800 rounded-lg hover:rounded-md transition-colors text-center"
              href="/c/create"
            >
              Create Community
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
