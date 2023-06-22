import { User } from "@prisma/client";
import { AvatarProps } from "@radix-ui/react-avatar";
import { Avatar, AvatarFallback } from "./Avatar";
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "image" | "name">;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user, ...props }) => (
  <Avatar {...props}>
    {user.image ? (
      <div className="relative aspect-square h-full w-full">
        <Image
          fill
          src={user.image}
          alt={`${user.name}'s profile picture`}
          className="border-2 border-zinc-800 rounded-full selection:bg-transparent"
          referrerPolicy="no-referrer"
        />
      </div>
    ) : (
      <AvatarFallback>
        <span className="sr-only">{user?.name}</span>
        <FaUserCircle size={40} />
      </AvatarFallback>
    )}
  </Avatar>
);

export default UserAvatar;
