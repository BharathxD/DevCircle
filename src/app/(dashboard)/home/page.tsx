import { Suspense } from "react";

import GeneralFeed from "@/components/Post/GeneralFeed";
import DashboardContentShell from "@/components/UI/DashboarContentShell";
import FeedSkeleton from "@/components/UI/FeedSkeleton";

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
