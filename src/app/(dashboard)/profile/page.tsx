import { notFound } from "next/navigation";
import getUserWithSocialLinks from "@/actions/getUserWithSocialLinks";

import UserProfile from "@/components/Profile/UserProfile";
import DashboardContentShell from "@/components/UI/DashboarContentShell";

const UserProfilePage = async () => {
  const user = await getUserWithSocialLinks();
  if (!user) return notFound();
  return (
    <DashboardContentShell className="p-0 md:px-0">
      <UserProfile user={user} />
    </DashboardContentShell>
  );
};

export default UserProfilePage;
