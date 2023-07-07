"use client";

import React from "react";
import Link from "next/link";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Edit } from "lucide-react";
import { useSession } from "next-auth/react";
import { FaFacebook, FaGithub, FaLinkedin, FaUserCircle } from "react-icons/fa";

import type { UserWithSocialLinks } from "@/types/database";
import { getGradient } from "@/lib/gradients";
import { cn } from "@/lib/utils";

import { BlurImage } from "../UI/BlurImage";
import { Button } from "../UI/Button";

interface UserProfileProps {
  user: UserWithSocialLinks;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const session = useSession();
  const isEditable = session.data?.user.id === user?.id;
  const profileWidth = "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8";

  const avatarImage = user?.image ? (
    <div className="relative aspect-square h-full w-full">
      <BlurImage
        width={300}
        height={300}
        src={user.image}
        alt={`${user.username ?? "User"}'s profile picture`}
        referrerPolicy="no-referrer"
      />
    </div>
  ) : (
    <AvatarFallback>
      <span className="sr-only">{user?.username}</span>
      <FaUserCircle size={40} />
    </AvatarFallback>
  );

  const socialButtons = [
    {
      platform: "facebook",
      icon: <FaFacebook />,
      label: "Facebook",
      url: user?.socialMedia?.facebook,
    },
    {
      platform: "github",
      icon: <FaGithub />,
      label: "Github",
      url: user?.socialMedia?.github,
    },
    {
      platform: "linkedin",
      icon: <FaLinkedin />,
      label: "LinkedIn",
      url: user?.socialMedia?.linkedIn,
    },
  ];

  const renderSocialButton = ({
    platform,
    icon,
    label,
    url,
  }: (typeof socialButtons)[number]) =>
    url ? (
      <Link href={url} key={platform}>
        <Button size="sm" className="flex flex-row items-center gap-1">
          {icon} {label}
        </Button>
      </Link>
    ) : (
      <Button
        size="sm"
        className="flex flex-row items-center gap-1 disabled:bg-zinc-700 disabled:text-zinc-300"
        disabled={true}
        key={platform}
      >
        {icon} {label}
      </Button>
    );

  return (
    <div className="py-4 md:pt-0 dark:md:bg-gradient-to-b dark:md:from-zinc-700 dark:md:to-zinc-950/20">
      <div>
        <div
          className={`h-28 w-full rounded-lg border-2 border-zinc-800 md:h-40 md:rounded-none md:border-x-0 md:border-t-0
          ${getGradient(user?.username ?? user?.name ?? undefined)}`}
        />
        <div
          className={`${profileWidth} -mt-12 flex items-center justify-between space-x-5 md:-mt-16`}
        >
          <div className="group relative h-24 w-24 overflow-hidden rounded-full sm:h-32 sm:w-32">
            {avatarImage}
          </div>
          <div className="flex min-w-0 flex-1 items-center justify-end space-x-6 pb-1">
            <div className="flex min-w-0 flex-1 items-center space-x-2">
              <h1 className="mt-16 truncate text-2xl font-semibold text-zinc-800 dark:text-zinc-50">
                {user?.username}
              </h1>
            </div>
            <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
              {/* Additional user information */}
            </div>
          </div>
          {isEditable && (
            <Link href="/settings" className="mt-14 md:mt-16">
              <Edit />
            </Link>
          )}
        </div>
      </div>
      <div className={cn(profileWidth, "mt-4")}>
        <div className="rounded-md border-2 border-zinc-700/50 bg-zinc-100 p-2 leading-6 backdrop-blur-sm dark:bg-zinc-950/50">
          <p>{user.bio}</p>
        </div>
      </div>
      <div
        className={`${profileWidth} mt-4 flex flex-row items-center justify-start gap-4 px-4 py-2`}
      >
        {socialButtons.map(renderSocialButton)}
      </div>
    </div>
  );
};

export default UserProfile;
