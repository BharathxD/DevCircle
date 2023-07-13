import { Suspense } from "react";

import DashboardContentShell from "@/components/ui/DashboarContentShell";
import FeedSkeleton from "@/components/ui/FeedSkeleton";
import GeneralFeed from "@/components/post/GeneralFeed";

interface HomeProps {
  searchParams: { tag: string };
}

const HomePage = async ({ searchParams }: HomeProps) => {
  const { tag } = searchParams;
  return (
    <DashboardContentShell>
      <Suspense fallback={<FeedSkeleton />}>
        <GeneralFeed tag={tag} filters={searchParams} />
      </Suspense>
    </DashboardContentShell>
  );
};

export default HomePage;
