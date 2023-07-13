import getSubscribedForums from "@/actions/getSubscribedForums";

import DashboardContentShell from "@/components/ui/DashboarContentShell";
import SubscribedCommunities from "@/components/widgets/SubscribedCommunities";

const SubscribedCommunitesPage = async () => {
  const joinedCommunities = await getSubscribedForums();
  return (
    <DashboardContentShell>
      <SubscribedCommunities forums={joinedCommunities} />
    </DashboardContentShell>
  );
};

export default SubscribedCommunitesPage;
