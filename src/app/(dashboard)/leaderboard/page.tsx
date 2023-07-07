import getTopCommunities from "@/actions/getTopCommunities";

import DashboardContentShell from "@/components/UI/DashboarContentShell";
import CommunityLeaderboard from "@/components/Widgets/CommunityLeaderboard";

const LeaderboardPage = async () => {
  const topCommunities = await getTopCommunities();
  return (
    <DashboardContentShell>
      <CommunityLeaderboard topCommunities={topCommunities} />
    </DashboardContentShell>
  );
};

export default LeaderboardPage;