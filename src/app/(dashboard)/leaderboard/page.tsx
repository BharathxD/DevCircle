import getTopCommunities from "@/actions/getTopCommunities";

import DashboardContentShell from "@/components/ui/DashboarContentShell";
import CommunityLeaderboard from "@/components/widgets/CommunityLeaderboard";

const LeaderboardPage = async () => {
  const topCommunities = await getTopCommunities();
  return (
    <DashboardContentShell>
      <CommunityLeaderboard topCommunities={topCommunities} />
    </DashboardContentShell>
  );
};

export default LeaderboardPage;
