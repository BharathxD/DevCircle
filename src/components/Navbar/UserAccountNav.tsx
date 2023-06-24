"use client";

import { User } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "../UI/DropdownMenu";
import { FC } from "react";
import UserAvatar from "../UI/UserAvatar";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LogOut, PlusCircle, Settings, StretchHorizontal } from "lucide-react";

interface UserAccountNavProps {
  user: Pick<User, "image" | "name" | "email">;
}

const UserAccountNav: FC<UserAccountNavProps> = ({ user }) => {
  const router = useRouter();
  const handleSignOut = (event: Event) => {
    event.preventDefault();
    signOut({
      callbackUrl: `${window.location.origin}/signin`,
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center justify-center border-2  border-y-0 border-zinc-800 hover:bg-yellow-300 dark:hover:bg-zinc-800 transition-colors h-full p-4">
          <UserAvatar user={user} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="rounded-sm rounded-tr-none bg-zinc-50 dark:bg-zinc-900 border-2 border-zinc-800 mt-0.5"
        align="end"
      >
        <div className="flex items-center justify-start gap-2 p-2 pt-3">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-bold text-md">{user.name}</p>}
            {user.email && (
              <p className="w-[200px] font-medium truncate text-sm text-zinc-700 dark:text-zinc-300">
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
        <DropdownMenuItem onClick={() => router.push("/c/create")}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Community
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/settings")}>
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer hover:text-red-50 hover:bg-red-500 transition-colors"
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

export default UserAccountNav;
