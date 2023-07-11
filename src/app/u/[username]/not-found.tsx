"use client";

import Image from "next/image";

const NotFound = () => {
  return (
    <div className="flex h-[91vh] w-full flex-col items-center justify-center">
      <Image
        src="/images/timed-out-error.svg"
        alt="Not found"
        height={400}
        data-nimg={1}
        width={400}
        decoding="async"
      />
      <p className="text-lg text-zinc-800 dark:text-zinc-50">
        User with the given username doesn&apos;t exist.
      </p>
      <a
        className="border-b-2 border-zinc-500 py-1 hover:border-zinc-300"
        href="/home"
      >
        Head back home
      </a>
    </div>
  );
};

export default NotFound;
