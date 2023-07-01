import CommunityLeaderboard from "../Widgets/CommunityLeaderboard";
import CreateCommunity from "../Widgets/CreateCommunity";

interface RightSection {
  topCommunities: { forumName: string; memberCount: number }[] | null;
}

const RightSection: React.FC<RightSection> = ({ topCommunities }) => (
  <section className="hidden py-4 md:flex md:flex-col md:gap-5">
    <CreateCommunity />
    <CommunityLeaderboard topCommunities={topCommunities} />
  </section>
);

export default RightSection;
