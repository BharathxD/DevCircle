"use client";

import Image from "next/image";

interface NotFoundPageProps {
  context?: string;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({
  context = "Blimey! You've found a page that doesn't exist.",
}) => {
  return (
    <div className="fixed inset-0 flex size-full flex-col items-center justify-center bg-zinc-50 text-center dark:bg-zinc-900">
      <Image
        src="/images/web-design.svg"
        alt="Not found"
        height={400}
        data-nimg={1}
        width={400}
        decoding="async"
      />
      <p className="text-lg text-zinc-800 dark:text-zinc-50">{context}</p>
      <a
        className="border-b-2 border-zinc-500 py-1 hover:border-zinc-300"
        href="/home"
      >
        Head back home
      </a>
    </div>
  );
};

export default NotFoundPage;
