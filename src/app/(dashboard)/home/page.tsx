import { Suspense } from "react";
import getCurrentUser from "@/actions/getCurrentUser";

import GeneralFeed from "@/components/Post/GeneralFeed";
import DashboardContentShell from "@/components/UI/DashboarContentShell";
import FeedSkeleton from "@/components/UI/FeedSkeleton";

interface HomeProps {
  searchParams: { tag: string };
}

const HomePage = async ({ searchParams }: HomeProps) => {
  const { tag } = searchParams;
  // TODO: User zustand for user auth state management
  const currentUser = await getCurrentUser();
  return (
    // <LeftSection forums={subscribedCommunities} />
    <DashboardContentShell>
      <Suspense fallback={<FeedSkeleton />}>
        <GeneralFeed
          tag={tag}
          userId={currentUser?.id}
          filters={searchParams}
        />
      </Suspense>
    </DashboardContentShell>
  );
  {
    /* <RightSection topCommunities={topCommunities} /> */
  }
};

export default HomePage;
