import { notFound } from "next/navigation";
import type { User } from "@prisma/client";

import type { ExtendedPost } from "@/types/database";

import PostFeed from "../Post/PostFeed";

interface MainSectionProps {
  posts: ExtendedPost[] | null;
  filters: { tag: string };
  userId?: User["id"];
}

const MainSection: React.FC<MainSectionProps> = ({
  posts,
  userId,
  filters,
}) => {
  if (!posts) return notFound();
  return (
    <section className="no-scrollbar relative w-full overflow-hidden overflow-y-scroll py-4 md:col-span-2 md:border-x-2 md:border-zinc-800 md:px-4 ">
      <PostFeed initialPosts={posts} userId={userId} filters={filters} />
    </section>
  );
};

export default MainSection;
