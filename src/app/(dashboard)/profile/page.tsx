import { notFound } from "next/navigation";
import { getUserWithSocialLinksAndPosts } from "@/actions/getCurrentUser";

import UserPosts from "@/components/Profile/UserPosts";
import UserProfile from "@/components/Profile/UserProfile";
import DashboardContentShell from "@/components/UI/DashboarContentShell";

const UserProfilePage = async () => {
  const user = await getUserWithSocialLinksAndPosts();
  if (!user) return notFound();
  return (
    <DashboardContentShell className="md:py-4">
      <div className="h-full overflow-hidden rounded-xl border-2 border-zinc-800">
        <UserProfile user={user} />
        <div className="h-[2px] w-full bg-zinc-800" />
        <UserPosts posts={user.post} />
      </div>
    </DashboardContentShell>
  );
};

export default UserProfilePage;
