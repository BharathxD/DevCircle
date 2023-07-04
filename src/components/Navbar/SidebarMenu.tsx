import Link from "next/link";
import { Crown, PlusSquare, UserCircle2, Users2 } from "lucide-react";

import Footer from "../Widgets/Footer";

const SidebarMenu = () => {
  return (
    <section className="flex h-full flex-col items-center justify-between border-r-2 border-zinc-800 py-4 pr-4">
      <div className="flex h-full w-full list-none flex-col rounded-md">
        <div className="overflow-hidden rounded-md border-2 border-zinc-800">
          <Link
            href="/leaderbord"
            className="flex w-full flex-row items-center gap-4 border-b-2 border-b-zinc-800 bg-zinc-50 p-4 hover:bg-zinc-800 hover:text-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900"
          >
            <Crown />
            <p>Leaderboards</p>
          </Link>
          <Link
            href="/d/create"
            className="flex w-full flex-row items-center gap-4 border-b-2 border-b-zinc-800 bg-zinc-50 p-4 hover:bg-zinc-800 hover:text-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900"
          >
            <PlusSquare />
            <p>Create Community</p>
          </Link>
          <Link
            href="/subscriptions"
            className="flex w-full flex-row items-center gap-4 border-b-2 border-b-zinc-800 bg-zinc-50 p-4 hover:bg-zinc-800 hover:text-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900"
          >
            <Users2 />
            <p>Subscribed Communities</p>
          </Link>
          <Link
            href="/subscriptions"
            className="flex w-full flex-row items-center gap-4 bg-zinc-50 p-4 hover:bg-zinc-800 hover:text-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900"
          >
            <UserCircle2 />
            <p>Profile</p>
          </Link>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default SidebarMenu;
