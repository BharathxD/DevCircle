import Image from "next/image";
import Link from "next/link";
import type { User } from "@prisma/client";
import type { AvatarProps } from "@radix-ui/react-avatar";
import { FaUserCircle } from "react-icons/fa";

import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback } from "./Avatar";

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "image" | "username">;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  user,
  className,
  ...props
}) => (
  <Avatar {...props} className={cn(className)}>
    {user.image && user.username ? (
      <Link
        className="relative aspect-square h-full w-full"
        href={`/u/${user.username}`}
      >
        <Image
          fill
          src={user.image}
          alt={`${user.username ?? "User"}'s profile picture`}
          className="rounded-full border-2 border-zinc-800 selection:bg-transparent"
          sizes="100%"
          referrerPolicy="no-referrer"
        />
      </Link>
    ) : (
      <AvatarFallback>
        <span className="sr-only">{user?.username}</span>
        <FaUserCircle size={40} />
      </AvatarFallback>
    )}
  </Avatar>
);

export default UserAvatar;
