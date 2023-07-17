"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { LogOut, PlusCircle, Settings, StretchHorizontal } from "lucide-react";
import { signOut } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu";
import UserAvatar from "../ui/UserAvatar";

interface UserNavProps {
  user: {
    name?: string | null;
    username?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

const UserNav: React.FC<UserNavProps> = ({ user }) => {
  const router = useRouter();

  const handleSignOut = async (event: Event) => {
    event.preventDefault();
    await signOut({
      callbackUrl: `${window.location.origin}/signin`,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex h-full items-center justify-center border-2 border-y-0 border-zinc-800 p-4 transition-colors hover:bg-yellow-300 dark:hover:bg-zinc-800">
          <UserAvatar
            user={{
              name: user.username || user.name || "",
              image: user.image || null,
            }}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="mt-0.5 rounded-sm rounded-tr-none border-2 border-zinc-800 bg-zinc-50 dark:bg-zinc-900"
        align="end"
      >
        <div className="flex items-center justify-start gap-2 p-2 pt-3">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-bold">{user.username}</p>
            {user.email && (
              <p className="w-[200px] truncate text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("/")}>
          <StretchHorizontal className="mr-2 h-4 w-4" />
          Feed
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/d/new")}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Community
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/settings")}>
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer transition-colors hover:bg-red-500 hover:text-red-50"
          onSelect={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNav;
