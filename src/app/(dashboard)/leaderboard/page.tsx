import getTopCommunities from "@/actions/getTopCommunities";

import DashboardContentShell from "@/components/ui/dashboard-content-shell";
import CommunityLeaderboard from "@/components/widgets/community-leaderboard";

const LeaderboardPage = async () => {
  const topCommunities = await getTopCommunities();
  return (
    <DashboardContentShell>
      <CommunityLeaderboard topCommunities={topCommunities} />
    </DashboardContentShell>
  );
};

export default LeaderboardPage;
