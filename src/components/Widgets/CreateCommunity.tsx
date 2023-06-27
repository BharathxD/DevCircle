import Link from "next/link"
import siteConfig from "@/config"
import { TbSmartHome } from "react-icons/tb"

const CreateCommunity = () => {
  return (
    <div className="order-first h-fit overflow-hidden rounded-md border-2 border-zinc-800 md:order-last ">
      <div className="border-b-2 border-zinc-800 bg-zinc-800 px-5 py-4 text-zinc-50 dark:bg-zinc-800 ">
        <div className="flex items-center gap-1.5 text-xl font-bold">
          <TbSmartHome size={25} />
          <p className="ml-2">Home</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-5 text-sm leading-6">
        <p className="font-medium text-zinc-800 dark:text-zinc-50">
          Your personal {siteConfig.name} homepage. Come here to check in with
          your favorite communities.
        </p>
        <Link
          href="/d/create"
          className="w-full rounded-lg border-2 border-zinc-800 p-3 text-center font-bold text-zinc-700 transition-colors hover:rounded-md hover:bg-zinc-800 hover:text-zinc-50 dark:text-zinc-50"
          passHref
        >
          Create Community
        </Link>
      </div>
    </div>
  )
}

export default CreateCommunity
