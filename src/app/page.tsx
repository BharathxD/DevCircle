import { notFound } from "next/navigation";
import getCurrentUser from "@/actions/getCurrentUser";
import fetchPosts from "@/actions/getPosts";
import getSubscribedForums from "@/actions/getSubscribedForums";

import type { ExtendedPost } from "@/types/database";
import HomepageLayout from "@/components/Layout/HomepageLayout";
import PostFeed from "@/components/Post/PostFeed";
import { Input } from "@/components/UI/Input";
import CommunityLeaderboard from "@/components/Widgets/CommunityLeaderboard";
import CreateCommunity from "@/components/Widgets/CreateCommunity";
import SubscribedCommunities from "@/components/Widgets/SubscribedCommunities";

interface HomeProps {
  searchParams: {
    tag: string;
  };
}

const Home = async ({ searchParams }: HomeProps) => {
  const { tag } = searchParams;
  const posts: ExtendedPost[] | null = await fetchPosts(tag);
  const currentUser = await getCurrentUser();
  const subscribedCommunities = await getSubscribedForums();
  if (!posts) return notFound();
  return (
    <HomepageLayout>
      <section className="hidden py-4 md:flex md:flex-col md:gap-5">
        <Input />
        <SubscribedCommunities forums={subscribedCommunities} />
      </section>
      <section className="no-scrollbar relative w-full overflow-hidden overflow-y-scroll py-4 md:col-span-2 md:border-x-2 md:border-zinc-800 md:px-4 ">
        <PostFeed
          initialPosts={posts}
          userId={currentUser?.id}
          filters={searchParams}
        />
      </section>
      <section className="hidden py-4 md:flex md:flex-col md:gap-5">
        <CreateCommunity />
        <CommunityLeaderboard />
      </section>
    </HomepageLayout>
  );
};

export default Home;
