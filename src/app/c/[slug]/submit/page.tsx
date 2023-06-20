import Editor from "@/components/Post/Editor";
import { Button, buttonVariants } from "@/components/UI/Button";
import cn from "@/libs/classNames";
import database from "@/libs/database";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";

interface PageProps {
  params: {
    slug: string;
  };
}

const SubmitPage = async ({ params }: PageProps) => {
  const { slug: forumName } = params;
  const forum = await database.forum.findFirst({
    where: {
      name: forumName,
    },
  });
  if (!forum) return notFound();
  return (
    <div className="flex flex-col items-start gap-6">
      {/* heading */}
      <Link
        className={cn(buttonVariants({ variant: "skeleton" }), "w-max")}
        href={`/c/${forumName}`}
      >
        <IoIosArrowBack />
        <p className="ml-2">Back</p>
      </Link>
      <div>
        <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
          <h3 className="ml-2 mt-2 text-lg leading-6 text-gray-900">
            Create Post
          </h3>
          <p className="ml-2 mt-1 truncate text-md text-gray-500">
            in c/{forumName}
          </p>
        </div>
      </div>

      {/* form */}
      <Editor forumId={forum.id} />

      <div className="w-full flex justify-end">
        <Button
          type="submit"
          className="w-full text-lg font-bold bg-zinc-800 hover:bg-zinc-50 text-zinc-50 hover:text-zinc-800"
          form="subreddit-post-form"
        >
          POST
        </Button>
      </div>
    </div>
  );
};

export default SubmitPage;
