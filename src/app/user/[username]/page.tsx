import { notFound } from "next/navigation";
import { getUserWithSocialLinksAndPosts } from "@/actions/getCurrentUser";

import UserPosts from "@/components/Profile/UserPosts";
import UserProfile from "@/components/Profile/UserProfile";

interface SearchParamsArgs {
  searchParams: {
    username: string;
  };
}

const UserProfilePage = async ({ searchParams }: SearchParamsArgs) => {
  const { username } = searchParams;
  const user = await getUserWithSocialLinksAndPosts(username);
  if (!user) return notFound();
  return (
    <section
      className={
        "no-scrollbar container relative h-[91vh] w-min overflow-hidden overflow-y-scroll py-4 md:col-span-3 md:px-4"
      }
    >
      <div className="h-full w-full overflow-hidden rounded-xl border-2 border-zinc-800 p-0">
        <UserProfile user={user} />
        <div className="h-[2px] w-full bg-zinc-800" />
        <UserPosts posts={user.post} />
      </div>
    </section>
  );
};

export default UserProfilePage;
