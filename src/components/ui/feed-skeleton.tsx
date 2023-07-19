import { useMemo } from "react";

import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config/site";

const FeedSkeleton = () => {
  return (
    <div className="h-60 w-full animate-pulse overflow-hidden rounded-xl border-2 border-zinc-300 dark:border-muted">
      <div className="flex h-48 flex-row pt-2">
        <div className="flex h-full w-24 flex-col items-center justify-start gap-2 pl-4 pt-4">
          <div className="aspect-square h-12 w-12 rounded-xl bg-muted"></div>
          <div className="h-4 w-8 rounded-lg bg-muted"></div>
          <div className="aspect-square h-12 w-12 rounded-xl bg-muted"></div>
        </div>
        <div className="flex h-full w-full flex-col gap-2 p-4 pb-0 pl-0">
          <div className="flex w-full flex-row items-center justify-start gap-2">
            <div className="h-4 w-20 rounded-lg bg-muted"></div>
            <div className="h-4 w-24 rounded-lg bg-muted"></div>
          </div>
          <div className="h-8 w-[80%] rounded-lg bg-muted md:w-[40%]"></div>
          <div className="relative z-10 h-40 w-full overflow-hidden rounded-t-xl border-x-2 border-t-2 border-muted text-sm">
            <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-zinc-50 to-transparent dark:from-zinc-900"></div>
          </div>
        </div>
      </div>
      <div className="flex h-12 w-full flex-row justify-between border-t-2 border-muted">
        <div className="h-full w-40 bg-muted"></div>
        <div className="h-full w-14 bg-muted"></div>
      </div>
    </div>
  );
};

const FeedSkeletons = () => {
  const skeletonsCount = INFINITE_SCROLL_PAGINATION_RESULTS;
  const renderSkeletons = useMemo(() => {
    return Array.from({ length: skeletonsCount }, (_, index) => (
      <FeedSkeleton key={index} />
    ));
  }, [skeletonsCount]);
  return (
    <div className="flex h-[120vh] w-full flex-col gap-4">
      {renderSkeletons}
    </div>
  );
};

export default FeedSkeletons;
