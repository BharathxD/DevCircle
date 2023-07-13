import Link from "next/link";
import { notFound } from "next/navigation";
import { getAuthSession } from "@/actions/getCurrentUser";
import { getForum } from "@/actions/getForum";
import { IoIosArrowBack } from "react-icons/io";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/Button";
import EditForumForm from "@/components/forms/EditForumForm";

interface EditForumPageArgs {
  params: {
    forumName: string;
  };
}

const EditForumPage = async ({ params }: EditForumPageArgs) => {
  const { forumName } = params;
  const session = await getAuthSession();
  const forum = await getForum(forumName);
  const isAuthor = session?.user.id === forum?.creatorId;
  if (!isAuthor || !session?.user || !forum) return notFound();
  return (
    <section className="mt-2 w-full overflow-hidden rounded-xl border-2 border-zinc-800 bg-zinc-50 px-4 pt-4 dark:bg-zinc-900">
      <div className="mb-4 flex flex-row items-center gap-4">
        <Link
          className={cn(buttonVariants({ variant: "skeleton" }), "w-max")}
          href={`/d/${forumName}`}
        >
          <IoIosArrowBack className="dark:text-zinc-50" />
          <p className="ml-2 dark:text-zinc-50">Back</p>
        </Link>
        <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
          <h3 className="ml-2 mt-2 text-lg leading-6 text-zinc-900 dark:text-zinc-300">
            Edit this forum
          </h3>
          <p className="ml-2 mt-1 truncate text-zinc-500">d/{forumName}</p>
        </div>
      </div>
      <EditForumForm forum={forum} />
    </section>
  );
};

export default EditForumPage;
