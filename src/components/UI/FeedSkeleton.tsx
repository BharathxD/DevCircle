import { Skeleton } from "./Skeleton";

const FeedSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex h-[12.5rem] w-full animate-pulse flex-row gap-2 overflow-hidden rounded-md border-2 border-zinc-500/20 p-2 dark:border-zinc-700/50">
        <div className="flex flex-row gap-2">
          <div className="flex h-full flex-col gap-2">
            <Skeleton className="h-full w-16" />
            <Skeleton className="h-full w-16" />
          </div>
        </div>
        <div className="flex h-full w-full flex-col gap-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-full w-full" />
        </div>
      </div>
      <div className="flex h-[12.5rem] w-full animate-pulse flex-row gap-2 overflow-hidden rounded-md border-2 border-zinc-700/30 p-2 dark:border-zinc-700/50">
        <div className="flex flex-row gap-2">
          <div className="flex h-full flex-col gap-2">
            <Skeleton className="h-full w-16" />
            <Skeleton className="h-full w-16" />
          </div>
        </div>
        <div className="flex h-full w-full flex-col gap-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-full w-full" />
        </div>
      </div>
      <div className="flex h-[12.5rem] w-full animate-pulse flex-row gap-2 overflow-hidden rounded-md border-2 border-zinc-700/30 p-2 dark:border-zinc-700/50">
        <div className="flex flex-row gap-2">
          <div className="flex h-full flex-col gap-2">
            <Skeleton className="h-full w-16" />
            <Skeleton className="h-full w-16" />
          </div>
        </div>
        <div className="flex h-full w-full flex-col gap-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-full w-full" />
        </div>
      </div>
      <div className="flex h-[12.5rem] w-full animate-pulse flex-row gap-2 overflow-hidden rounded-md border-2 border-zinc-700/30 p-2 dark:border-zinc-700/50">
        <div className="flex flex-row gap-2">
          <div className="flex h-full flex-col gap-2">
            <Skeleton className="h-full w-16" />
            <Skeleton className="h-full w-16" />
          </div>
        </div>
        <div className="flex h-full w-full flex-col gap-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-full w-full" />
        </div>
      </div>
      <div className="flex h-[12.5rem] w-full animate-pulse flex-row gap-2 overflow-hidden rounded-md border-2 border-zinc-700/30 p-2 dark:border-zinc-700/50">
        <div className="flex flex-row gap-2">
          <div className="flex h-full flex-col gap-2">
            <Skeleton className="h-full w-16" />
            <Skeleton className="h-full w-16" />
          </div>
        </div>
        <div className="flex h-full w-full flex-col gap-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-full w-full" />
        </div>
      </div>
    </div>
  );
};

export default FeedSkeleton;
