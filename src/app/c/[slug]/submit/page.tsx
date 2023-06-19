import { Button } from "@/components/UI/Button";
import database from "@/libs/database";

interface PageProps {
  params: {
    slug: string;
  };
}

const SubmitPage = async ({ params }: PageProps) => {
  const { slug: forumName } = params;
  const subreddit = await database.forum.findFirst({
    where: {
      name: forumName,
    },
  });
  return (
    <div className="flex flex-col items-start gap-6">
      {/* heading */}
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
      {/* <Editor forumId={forum.id} /> */}

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
