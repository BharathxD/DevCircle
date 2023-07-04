import getSubscribedForums from "@/actions/getSubscribedForums";

import DashboardContentShell from "@/components/UI/DashboarContentShell";
import SubscribedCommunities from "@/components/Widgets/SubscribedCommunities";

const SubscribedCommunitesPage = async () => {
  const joinedCommunities = await getSubscribedForums();
  return (
    <DashboardContentShell>
      <SubscribedCommunities forums={joinedCommunities} />
    </DashboardContentShell>
  );
};

export default SubscribedCommunitesPage;
