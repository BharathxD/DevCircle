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
        <div className="flex items-center justify-center border border-y-0 border-zinc-800 hover:bg-zinc-800 transition-colors h-full p-4">
          <UserAvatar user={user} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="rounded-sm rounded-tr-none bg-zinc-50 border-zinc-800 mt-0.5"
        align="end"
      >
        <div className="flex items-center justify-start gap-2 p-2 pt-3">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium text-md">{user.name}</p>}
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
          <Link href="/c/create">Create Community</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer hover:text-red-50 hover:bg-red-500 transition-colors"
          onSelect={handleSignOut}
        >
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
