import { Suspense } from "react";
import getCurrentUser from "@/actions/getCurrentUser";

import GeneralFeed from "@/components/Post/GeneralFeed";
import DashboardContentShell from "@/components/UI/DashboarContentShell";
import FeedSkeleton from "@/components/UI/FeedSkeleton";

interface HomeProps {
  searchParams: { tag: string };
}

const HomePage = async ({ searchParams }: HomeProps) => {
  const currentUser = await getCurrentUser();
  const { tag } = searchParams;
  return (
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
};

export default HomePage;
