import { Skeleton } from "./Skeleton";

const FeedSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-4">
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-40 w-full" />
    </div>
  );
};

export default FeedSkeleton;
