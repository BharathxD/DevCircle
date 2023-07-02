"use client";

import Link from "next/link";
import siteConfig from "@/config";
import { motion } from "framer-motion";
import { TbSmartHome } from "react-icons/tb";

const CreateCommunity = () => {
  return (
    <motion.div
      className="order-first h-fit overflow-hidden rounded-md border-2 bg-zinc-950 md:order-last"
      initial="hidden"
      animate="show"
      variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
    >
      <div className="border-b-2 border-zinc-800 bg-neutral-800 px-5 py-4 text-zinc-50 dark:bg-zinc-900">
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
    </motion.div>
  );
};

export default CreateCommunity;
