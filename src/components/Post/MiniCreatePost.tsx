"use client";

import { User } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";
import UserAvatar from "../UI/UserAvatar";
import { Input } from "../UI/Input";
import { Button } from "../UI/Button";
import { FiLink2 } from "react-icons/fi";
import { IoMdImage } from "react-icons/io";

interface MiniCreatePostPRops {
  currentUser: User | null;
}

const MiniCreatePost: FC<MiniCreatePostPRops> = ({ currentUser }) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <li className="overflow-hidden rounded-md list-none border-2  border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
      <div className="h-full p-2.5 md:p-4 flex justify-between gap-2.5 md:gap-4">
        <div className="relative">
          <UserAvatar
            user={{
              name: currentUser?.name || null,
              image: currentUser?.image || null,
            }}
          />
          <span className="absolute bottom-0 right-0 rounded-full w-3 h-3 bg-green-100 outline outline-2 outline-zinc-800" />
        </div>
        <Input
          onClick={() => {
            if (!currentUser) return router.push("/signin/?unauthorized=1");
            return router.push(pathname + "/submit");
          }}
          placeholder={"Create post"}
          readOnly
        />
        <Button
          onClick={() => router.push(pathname + "/submit")}
          variant="skeleton"
          className="hover:bg-zinc-800 hover:text-zinc-100 text-zinc-600"
        >
          <IoMdImage className="h-5 w-5 md:h-6 md:w-6" />
        </Button>
        <Button
          onClick={() => router.push(pathname + "/")}
          variant="skeleton"
          className="hover:bg-zinc-800 hover:text-zinc-100 text-zinc-600"
        >
          <FiLink2 className="h-5 w-5 md:h-6 md:w-6" />
        </Button>
      </div>
    </li>
  );
};

export default MiniCreatePost;
