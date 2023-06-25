import { notFound } from "next/navigation";

import { ExtendedPost } from "@/types/database";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";

import fetchPosts from "@/actions/getPosts";
import getCurrentUser from "@/actions/getCurrentUser";

import PostFeed from "@/components/Post/PostFeed";
import SearchBar from "@/components/UI/SearchBar";
import HomepageLayout from "@/components/Layout/HomepageLayout";
import CreateCommunity from "@/components/Widgets/CreateCommunity";
import JoinedCommunities from "@/components/Widgets/JoinedCommunities";
import CommunityLeaderboard from "@/components/Widgets/CommunityLeaderboard";

const Home = async () => {
  const currentUser = await getCurrentUser();
  const posts: ExtendedPost[] | null = await fetchPosts(
    INFINITE_SCROLLING_PAGINATION_RESULTS
  );
  if (!posts) return notFound();
  return (
    <HomepageLayout>
      {/* Left */}
      <section className="py-4 hidden md:flex md:flex-col md:gap-5">
        <SearchBar />
        <JoinedCommunities />
      </section>
      {/* Middle */}
      <section className="py-4 px-0 md:p-4 h-[91vh] w-full md:border-x-2 md:border-zinc-800 md:col-span-2 overflow-hidden overflow-y-scroll no-scrollbar">
        <PostFeed initialPosts={posts} userId={currentUser?.id} />
      </section>
      {/* Right */}
      <section className="py-4 hidden md:flex md:flex-col md:gap-5">
        <CreateCommunity />
        <CommunityLeaderboard />
      </section>
    </HomepageLayout>
  );
};

export default Home;
