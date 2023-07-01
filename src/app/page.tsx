import getCurrentUser from "@/actions/getCurrentUser";
import fetchPosts from "@/actions/getPosts";
import getSubscribedForums from "@/actions/getSubscribedForums";
import getTopCommunities from "@/actions/getTopCommunities";

import type { ExtendedPost } from "@/types/database";
import LeftSection from "@/components/Home/LeftSection";
import MainSection from "@/components/Home/MainSection";
import RightSection from "@/components/Home/RightSection";
import HomepageLayout from "@/components/Layout/HomepageLayout";

interface HomeProps {
  searchParams: { tag: string };
}

const fetchData = async () => {
  const currentUser = await getCurrentUser();
  const topCommunities = await getTopCommunities();
  const subscribedCommunities = await getSubscribedForums();
  return { currentUser, topCommunities, subscribedCommunities };
};

const HomePage = async ({ searchParams }: HomeProps) => {
  const { tag } = searchParams;
  const posts: ExtendedPost[] | null = await fetchPosts(tag);
  const { currentUser, topCommunities, subscribedCommunities } =
    await fetchData();
  return (
    <HomepageLayout>
      <LeftSection forums={subscribedCommunities} />
      <MainSection
        posts={posts}
        userId={currentUser?.id}
        filters={searchParams}
      />
      <RightSection topCommunities={topCommunities} />
    </HomepageLayout>
  );
};

export default HomePage;
