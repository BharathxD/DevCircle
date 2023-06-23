import getTopCommunities from "@/actions/getTopCommunities";
import GeneralFeed from "@/components/Post/GeneralFeed";
import getCurrentUser from "@/actions/getCurrentUser";
import HomepageLayout from "@/components/Layout/HomepageLayout";
import SearchBar from "@/components/UI/SearchBar";
import JoinedCommunities from "@/components/Widgets/JoinedCommunities";
import CommunityLeaderboard from "@/components/Widgets/CommunityLeaderboard";
import CreateCommunity from "@/components/Widgets/CreateCommunity";

export default async function Home() {
  const topCommunities = await getTopCommunities();
  const currentUser = await getCurrentUser();
  return (
    <HomepageLayout>
      <div className="py-4 hidden md:block">
        <div className="flex flex-col gap-5">
          <SearchBar />
          <JoinedCommunities />
        </div>
      </div>
      <div className="overflow-y-scroll md:border-x-2 md:border-zinc-800 h-[91vh] p-4 overflow-hidden w-full md:col-span-2 no-scrollbar">
        {/* @ts-expect-error server component */}
        <GeneralFeed userId={currentUser?.id} />
      </div>
      <div className="py-4 hidden md:flex md:flex-col md:gap-5">
        <CreateCommunity />
        <CommunityLeaderboard topCommunities={topCommunities} />
      </div>
    </HomepageLayout>
  );
}
