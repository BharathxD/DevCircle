import getSubscribedForums from "@/actions/getSubscribedForums";

import DashboardContentShell from "@/components/ui/dashboard-content-shell";
import SubscribedCommunities from "@/components/widgets/subscribed-communities";

const SubscribedCommunitesPage = async () => {
  const joinedCommunities = await getSubscribedForums();
  return (
    <DashboardContentShell>
      <SubscribedCommunities forums={joinedCommunities} />
    </DashboardContentShell>
  );
};

export default SubscribedCommunitesPage;
