import { notFound } from "next/navigation";
import { getUserWithSocialLinksAndPosts } from "@/actions/getCurrentUser";

import UserProfile from "@/components/Profile/UserProfile";
import DashboardContentShell from "@/components/UI/DashboarContentShell";

const UserProfilePage = async () => {
  const user = await getUserWithSocialLinksAndPosts();
  if (!user) return notFound();
  return (
    <DashboardContentShell className="p-0 md:px-0">
      <UserProfile user={user} />
    </DashboardContentShell>
  );
};

export default UserProfilePage;
