import { notFound } from "next/navigation";
import getCurrentUser, {
  getUserWithSocialLinks,
} from "@/actions/getCurrentUser";

import UserProfile from "@/components/Profile/UserProfile";
import DashboardContentShell from "@/components/UI/DashboarContentShell";

const UserProfilePage = async () => {
  const currentUser = await getCurrentUser();
  const user = await getUserWithSocialLinks();
  if (!user) return notFound();
  return (
    <DashboardContentShell className="p-0 md:px-0">
      <UserProfile user={user} isEditable={currentUser?.id === user.id} />
    </DashboardContentShell>
  );
};

export default UserProfilePage;
