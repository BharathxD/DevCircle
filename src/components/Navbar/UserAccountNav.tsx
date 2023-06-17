"use client";

import { User } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "../UI/DropdownMenu";
import { FC } from "react";
import UserAvatar from "../UI/UserAvatar";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useMutation } from "react-query";
import { MoonLoader } from "react-spinners";

interface UserAccountNavProps {
  user: Pick<User, "image" | "name" | "email">;
}

const UserAccountNav: FC<UserAccountNavProps> = ({ user }) => {
  const handleSignOut = (event: Event) => {
    event.preventDefault();
    signOut({
      callbackUrl: `${window.location.origin}/signin`,
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <div className="flex items-center justify-center border border-y-0 border-zinc-700 h-full p-2.5">
          <UserAvatar user={user} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className=" border-t-0 border-zinc-700 -mt-1"
        align="end"
      >
        <div className="flex items-center justify-start gap-2 p-2 pt-3">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-zinc-700">
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/">Feed</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onSelect={handleSignOut}>
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
