import { notFound } from "next/navigation";
import { getUserWithSocialLinksAndPosts } from "@/actions/getCurrentUser";

import UserPosts from "@/components/profile/user-posts";
import UserProfile from "@/components/profile/user-profile";

interface ProfilePageArgs {
  params: {
    username: string;
  };
}

const UserProfilePage = async ({ params }: ProfilePageArgs) => {
  const { username } = params;
  const decodedUsername = decodeURIComponent(username);
  const user = await getUserWithSocialLinksAndPosts(decodedUsername);
  if (!user) return notFound();
  return (
    <section className="no-scrollbar container relative h-[91vh] w-fit overflow-hidden overflow-y-scroll py-4 md:col-span-3 md:px-4">
      <div className="size-full overflow-hidden rounded-xl border-2 border-zinc-800 p-0">
        <UserProfile user={user} />
        <div className="h-[2px] w-full bg-zinc-800" />
        <UserPosts posts={user.post} />
      </div>
    </section>
  );
};

export default UserProfilePage;
