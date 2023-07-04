import { Suspense } from "react";
import getCurrentUser from "@/actions/getCurrentUser";

import GeneralFeed from "@/components/Post/GeneralFeed";
import { Skeleton } from "@/components/UI/Skeleton";

interface HomeProps {
  searchParams: { tag: string };
}

const HomePage = async ({ searchParams }: HomeProps) => {
  const { tag } = searchParams;
  // TODO: User zustand for user auth state management
  const currentUser = await getCurrentUser();
  return (
    // <LeftSection forums={subscribedCommunities} />
    <section className="no-scrollbar relative w-full overflow-hidden overflow-y-scroll py-4 md:col-span-3 md:border-x-2 md:border-zinc-800 md:px-4">
      <Suspense fallback={<Skeleton className="h-10 w-full" />}>
        <GeneralFeed
          tag={tag}
          userId={currentUser?.id}
          filters={searchParams}
        />
      </Suspense>
    </section>
  );
  {
    /* <RightSection topCommunities={topCommunities} /> */
  }
};

export default HomePage;
