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

import { BlurImage } from "../ui/blur-image";
import { Button } from "../ui/button";

interface UserProfileProps {
  user: UserWithSocialLinks;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const session = useSession();
  const isEditable = session.data?.user.id === user?.id;
  const profileWidth = "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8";

  const avatarImage = user?.image ? (
    <div className="relative aspect-square size-full">
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
          {icon}
          <p>{label}</p>
        </Button>
      </Link>
    ) : (
      <Button
        size="sm"
        className="flex flex-row items-center gap-1 disabled:border-zinc-700 disabled:bg-zinc-600 disabled:text-zinc-300"
        disabled={true}
        key={platform}
      >
        {icon} {label}
      </Button>
    );

  return (
    <div className="md:pb-4">
      <div>
        <div
          className={cn(
            "h-28 w-full rounded-none border-b-2 border-zinc-800 md:h-40 md:border-2 md:border-x-0 md:border-t-0",
            getGradient(user.username ?? user.name ?? undefined)
          )}
        />
        <div
          className={`${profileWidth} -mt-12 flex items-center justify-between space-x-5 border-b-2 border-zinc-800 pb-4 md:-mt-16`}
        >
          <div className="group relative size-24 overflow-hidden rounded-full sm:size-32">
            {avatarImage}
          </div>
          <div className="flex min-w-0 flex-1 items-center justify-end space-x-6 pb-1 md:mt-4">
            <div className="flex min-w-0 flex-1 items-center space-x-2">
              <h1 className="mt-16 truncate text-2xl font-semibold text-zinc-800 dark:text-zinc-50">
                {user?.username}
              </h1>
            </div>
          </div>
          {isEditable && (
            <Link href="/settings" className="mt-14 md:mt-20">
              <Edit />
            </Link>
          )}
        </div>
      </div>
      {user.bio && (
        <>
          <div className={cn(profileWidth, "mt-4")}>
            <div className="rounded-md border-2 border-zinc-800 bg-zinc-50 p-2 leading-6 backdrop-blur-sm dark:bg-zinc-900">
              <p>{user.bio}</p>
            </div>
          </div>
          <div className="mt-4 h-[2px] bg-zinc-800" />
        </>
      )}
      <div
        className={`${profileWidth} my-2 flex flex-row items-center justify-evenly gap-4 md:my-4 md:mb-0 md:justify-start`}
      >
        {socialButtons.map(renderSocialButton)}
      </div>
    </div>
  );
};

export default UserProfile;
