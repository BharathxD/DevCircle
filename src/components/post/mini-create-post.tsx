"use client";

import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FiLink2 } from "react-icons/fi";
import { IoMdImage } from "react-icons/io";

import { generateCbUrl } from "@/lib/utils";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import UserAvatar from "../ui/user-avatar";

const MiniCreatePost: React.FC = () => {
  const router = useRouter();
  const { data } = useSession();

  const pathname = usePathname();

  const handleCreatePostClick = () => {
    if (!data?.user) router.push(generateCbUrl(pathname));
    router.push(`${pathname}/submit`);
  };

  return (
    <li className="list-none overflow-hidden rounded-md border-2 border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
      <div className="flex h-full justify-between gap-2.5 p-2.5 md:gap-4 md:p-4">
        <div className="relative">
          <UserAvatar
            user={{
              username: data?.user.username || null,
              image: data?.user.image || null,
            }}
          />
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-100 outline outline-2 outline-zinc-800" />
        </div>
        <Input
          onClick={handleCreatePostClick}
          placeholder="Create post"
          readOnly
        />
        <Button
          onClick={() => router.push(`${pathname}/submit`)}
          variant="skeleton"
          className="text-zinc-600 hover:bg-zinc-800 hover:text-zinc-100"
        >
          <IoMdImage className="h-5 w-5 md:h-6 md:w-6" />
        </Button>
        <Button
          onClick={() => router.push(pathname + "/")}
          variant="skeleton"
          className="text-zinc-600 hover:bg-zinc-800 hover:text-zinc-100"
        >
          <FiLink2 className="h-5 w-5 md:h-6 md:w-6" />
        </Button>
      </div>
    </li>
  );
};

export default MiniCreatePost;
