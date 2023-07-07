import { notFound } from "next/navigation";
import { getAuthSession } from "@/actions/getCurrentUser";
import { getForum } from "@/actions/getForum";

import EditForumForm from "@/components/Forms/EditForumForm";

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
      <EditForumForm forum={forum} />
    </section>
  );
};

export default EditForumPage;
