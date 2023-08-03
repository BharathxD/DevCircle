import Image from "next/image";
import { useRouter } from "next/navigation";
import type { User } from "@prisma/client";
import type { AvatarProps } from "@radix-ui/react-avatar";
import { FaUserCircle } from "react-icons/fa";

import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback } from "./avatar";

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "image" | "username">;
  redirect?: boolean;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  user,
  className,
  redirect = true,
  ...props
}) => {
  const router = useRouter();
  const redirectHandler = () => {
    if (!redirect) return;
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-non-null-assertion
    router.push(`/u/${user!.username}`);
  };
  return (
    <Avatar {...props} className={cn(className)}>
      {user.image && user.username ? (
        <div
          className="relative aspect-square h-full w-full"
          onClick={redirectHandler}
        >
          <Image
            fill
            src={user.image}
            alt={`${user.username ?? "User"}'s profile picture`}
            className="rounded-full border-2 border-zinc-800 selection:bg-transparent"
            sizes="100%"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user?.username}</span>
          <FaUserCircle size={40} />
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;
