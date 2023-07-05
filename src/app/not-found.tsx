import Image from "next/image";
import { useRouter } from "next/navigation";

const NotFoundPage = () => {
  const router = useRouter();
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h1 className="text-4xl font-extrabold text-zinc-50">A Big 404</h1>
      <Image
        src="/images/timed-out-error.svg"
        alt="Not found"
        height={400}
        data-nimg={1}
        width={400}
        decoding="async"
      />
      <p className="text-lg text-zinc-50">
        Blimey! You&apos;ve found a page that doesn&apos;t exist.
      </p>
      <button
        className="border-b-2 border-zinc-500 py-1 hover:border-zinc-300"
        onClick={() => router.back()}
      >
        Head Back
      </button>
    </div>
  );
};

export default NotFoundPage;
