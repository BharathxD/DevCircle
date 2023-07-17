import { Fragment } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Edit2, Info, PlusCircle } from "lucide-react";
import { BiChevronDownCircle } from "react-icons/bi";

import { cn } from "@/lib/utils";

import { Dialog, DialogContent, DialogTrigger } from "../ui/Dialog";
import SubscribeLeaveToggle from "./SubscribeLeaveToggle";

interface ForumInfoModalProps {
  forumId: string;
  forumName: string;
  forumCreationDate: Date;
  memberCount: number;
  description: string;
  isCreator: boolean;
  isSubscribed: boolean;
  authorName?: string | null;
  isLoggedIn?: boolean;
}

const CommunityInfoModal: React.FC<ForumInfoModalProps> = ({
  authorName,
  forumName,
  description,
  forumCreationDate,
  isSubscribed,
  forumId,
  isCreator,
  memberCount,
  isLoggedIn,
}) => {
  return (
    <Dialog aria-label="Community Information">
      <DialogTrigger asChild>
        <button
          className={cn(
            "absolute right-4 top-[11.5vh] inline-flex items-center gap-2 rounded-full border-2 border-zinc-800 backdrop-blur-md md:hidden",
            {
              "bg-gradient-to-br from-green-400 to-green-700 p-3 text-green-100":
                !isSubscribed,
              "bg-gradient-to-br from-zinc-700 to-zinc-900 p-3 text-zinc-100":
                isSubscribed,
            }
          )}
          aria-label="Show Community Information"
        >
          {isSubscribed ? (
            <Info className="h-5 w-5" />
          ) : (
            <PlusCircle className="h-5 w-5" />
          )}
        </button>
      </DialogTrigger>
      <DialogContent className="h-max w-[90%] gap-0 overflow-hidden overflow-y-scroll rounded-xl border-2 border-zinc-800 p-0">
        <div className="bg-green-100 px-6 py-4 dark:bg-zinc-900">
          <h2 className="py-3 text-xl font-bold">About d/{forumName}</h2>
        </div>
        <div className="h-[2px] w-full bg-zinc-800" />
        <dl className="bg-zinc-50 leading-6 dark:bg-zinc-950">
          <div>
            <div className="flex items-center justify-between gap-x-4 px-6 py-4">
              <p className="text-zinc-700 dark:text-zinc-50">{description}</p>
            </div>

            <div className="h-[2px] w-full bg-zinc-800" />

            <div className="flex items-center justify-between gap-x-4 px-6 py-4">
              <dt className="text-zinc-700 dark:text-zinc-100">Created</dt>
              <dd className="text-zinc-700 dark:text-zinc-50">
                <time dateTime={forumCreationDate.toDateString()}>
                  {format(forumCreationDate, "MMMM d, yyyy")}
                </time>
              </dd>
            </div>

            <div className="h-[2px] w-full bg-zinc-800" />

            <div className="flex justify-between gap-x-4 px-6 py-4">
              <dt className="text-zinc-700 dark:text-zinc-100">Admin</dt>
              <dd className="text-zinc-700 dark:text-zinc-50">
                <Link href={`/u/${authorName as string}`}>u/{authorName}</Link>
              </dd>
            </div>

            <div className="h-[2px] w-full bg-zinc-800" />

            <div className="flex justify-between gap-x-4 px-6 py-4">
              <dt className="text-zinc-700 dark:text-zinc-100">Members</dt>
              <dd className="text-zinc-700 dark:text-zinc-50">{memberCount}</dd>
            </div>
          </div>
          {isCreator ? (
            <Fragment>
              <div className="h-[2px] w-full bg-zinc-800" />
              <div className="flex items-center justify-between gap-x-4 px-6 py-4">
                <span className="text-zinc-500">Edit this community</span>
                <a
                  href={`/d/${forumName}/edit`}
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-zinc-700 bg-zinc-900 p-2 hover:text-zinc-500"
                >
                  <Edit2 className="h-4 w-4" />
                </a>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <div className="h-[2px] w-full bg-zinc-800" />
              <div className="flex h-fit w-full justify-between gap-x-4">
                <SubscribeLeaveToggle
                  isSubscribed={isSubscribed}
                  forum={{ id: forumId, name: forumName }}
                  isLoggedIn={isLoggedIn}
                />
              </div>
            </Fragment>
          )}
        </dl>
      </DialogContent>
    </Dialog>
  );
};

export default CommunityInfoModal;
