import { notFound } from "next/navigation";
import { getUserWithSocialLinksAndPosts } from "@/actions/getCurrentUser";

import DashboardContentShell from "@/components/ui/dashboard-content-shell";
import UserPosts from "@/components/profile/user-posts";
import UserProfile from "@/components/profile/user-profile";

const UserProfilePage = async () => {
  const user = await getUserWithSocialLinksAndPosts();
  if (!user) return notFound();
  return (
    <DashboardContentShell className="md:py-4">
      <div className="no-scrollbar h-full overflow-auto rounded-xl border-2 border-zinc-800">
        <UserProfile user={user} />
        <div className="h-[2px] w-full bg-zinc-800" />
        <UserPosts posts={user.post} />
      </div>
    </DashboardContentShell>
  );
};

export default UserProfilePage;
