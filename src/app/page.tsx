import { buttonVariants } from "@/components/UI/Button";
import siteConfig from "@/config";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";

export default function Home() {
  return (
    <div>
      <h1 className="font-bold text-3xl md:text-4xl">Your feed</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
        {/* Feed */}
        {/* Community Info */}
        <div className="overflow-hidden h-fit rounded-md border border-zinc-800 order-first md:order-last">
          <div className="bg-emerald-100 px-6 py-4 border-b border-b-zinc-700">
            <p className="font-semibold py-3 flex items-center gap-1.5">
              <AiFillHome size={20} />
              Home
            </p>
          </div>
          <div className="-my-3 divide-y divide-gray-100 px-6 py-4 text-small leading-6">
            <div className="flex justify-between gap-x-4 py-3">
              <p className="text-zinc-500">
                Your personal {siteConfig.siteName} homepage. Come here to check
                in with your favorite communities.
              </p>
            </div>
            <Link
              className={buttonVariants({
                variant: "body",
                className: "w-full my-5 outline-none rounded-lg",
              })}
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
