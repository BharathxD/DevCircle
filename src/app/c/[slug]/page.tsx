import getCurrentUser from "@/actions/getCurrentUser";
import MiniCreatePost from "@/components/Post/MiniCreatePost";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import database from "@/libs/database";
import { notFound } from "next/navigation";
import { Fragment } from "react";

interface ForumPageProps {
  params: {
    slug: string;
  };
}

const ForumPage = async ({ params }: ForumPageProps) => {
  const { slug } = params;
  const currentUser = await getCurrentUser();
  const forum = await database.forum.findFirst({
    where: {
      name: slug,
    },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
          comments: true,
          forum: true,
        },
        take: INFINITE_SCROLLING_PAGINATION_RESULTS,
      },
    },
  });
  if (!forum) return notFound();
  return (
    <Fragment>
      <h1 className="font-bold text-3xl md:text-4xl">c/{forum.name}</h1>
      <MiniCreatePost currentUser={currentUser} />
      {/* TODO: Show User Feed */}
    </Fragment>
  );
};

export default ForumPage;
