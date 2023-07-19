import { Suspense } from "react";

import DashboardContentShell from "@/components/ui/dashboard-content-shell";
import FeedSkeletons from "@/components/ui/feed-skeleton";
import GeneralFeed from "@/components/post/general-feed";

interface HomeProps {
  searchParams: { tag: string };
}

const HomePage = async ({ searchParams }: HomeProps) => {
  const { tag } = searchParams;
  return (
    <DashboardContentShell>
      <Suspense fallback={<FeedSkeletons />}>
        <GeneralFeed tag={tag} filters={searchParams} />
      </Suspense>
    </DashboardContentShell>
  );
};

export default HomePage;
