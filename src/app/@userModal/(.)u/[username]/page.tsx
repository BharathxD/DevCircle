import { notFound } from "next/navigation";
import { getUserWithSocialLinksAndPosts } from "@/actions/getCurrentUser";

import ModalClose from "@/components/ui/ModalClose";
import UserPosts from "@/components/profile/UserPosts";
import UserProfile from "@/components/profile/UserProfile";

interface UserInterceptorArgs {
  params: {
    username: string;
  };
}

const UserInterceptor = async ({ params }: UserInterceptorArgs) => {
  const { username } = params;
  const user = await getUserWithSocialLinksAndPosts(username);
  if (!user) return notFound();
  return (
    <div className="fixed inset-0 z-10 flex h-screen max-h-screen w-screen items-center justify-center overflow-hidden rounded-lg bg-zinc-800/20 backdrop-blur-md">
      <div className="relative overflow-hidden rounded-lg border-2 border-zinc-800 bg-zinc-950">
        <ModalClose />
        <UserProfile user={user} />
        <div className="h-[2px] w-full bg-zinc-800" />
        <UserPosts posts={user.post} />
      </div>
    </div>
  );
};

export default UserInterceptor;
