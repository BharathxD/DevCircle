import { Fragment } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Edit2 } from "lucide-react";
import { BiChevronUpCircle } from "react-icons/bi";

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

const ForumInfoModal: React.FC<ForumInfoModalProps> = ({
  authorName,
  description,
  forumName,
  forumCreationDate,
  isSubscribed,
  forumId,
  isCreator,
  memberCount,
  isLoggedIn,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="absolute right-4 top-[12vh] inline-flex items-center gap-2 rounded-xl border-2 border-zinc-800 bg-zinc-50 p-2 backdrop-blur-md dark:bg-zinc-950 md:hidden">
          <p>About</p>
          <BiChevronUpCircle className="h-5 w-5" />
        </button>
      </DialogTrigger>
      <DialogContent className="h-max w-[90%] gap-0 overflow-hidden overflow-y-scroll rounded-xl border-2 border-zinc-800 p-0">
        <div className="bg-green-100 px-6 py-4 dark:bg-zinc-900">
          <p className="py-3 text-xl font-bold">About d/{forumName}</p>
        </div>
        <div className="h-[2px] w-full bg-zinc-800" />
        <dl className="bg-zinc-50 leading-6 dark:bg-zinc-950">
          <div className="flex items-center justify-between gap-x-4 px-6 py-4">
            <dd className="text-zinc-700 dark:text-zinc-50">
              <p>{description}</p>
            </dd>
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

          {isCreator ? (
            <Fragment>
              <div className="h-[2px] w-full bg-zinc-800" />
              <div className="flex items-center justify-between gap-x-4 px-6 py-4">
                <p className="text-zinc-500">Edit this community</p>
                <Link href={`/d/${forumName}/edit`}>
                  <Edit2 className="h-4 w-4 hover:text-zinc-500" />
                </Link>
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

export default ForumInfoModal;
