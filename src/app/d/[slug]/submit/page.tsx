import Link from "next/link"
import { notFound } from "next/navigation"
import { IoIosArrowBack } from "react-icons/io"

import database from "@/lib/database"
import { cn } from "@/lib/utils"
import Editor from "@/components/Post/Editor"
import { Button, buttonVariants } from "@/components/UI/Button"

interface PageProps {
  params: {
    slug: string
  }
}

const SubmitPage = async ({ params }: PageProps) => {
  const { slug: forumName } = params
  const forum = await database.forum.findFirst({
    where: {
      name: forumName,
    },
  })
  if (!forum) return notFound()
  return (
    <div className="flex flex-col items-start gap-4 pt-2">
      <div className="flex flex-row items-center gap-4">
        <Link
          className={cn(buttonVariants({ variant: "skeleton" }), "w-max")}
          href={`/d/${forumName}`}
        >
          <IoIosArrowBack className="dark:text-zinc-50" />
          <p className="ml-2 dark:text-zinc-50">Back</p>
        </Link>
        <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
          <h3 className="ml-2 mt-2 text-lg leading-6 text-zinc-900 dark:text-zinc-300">
            Create Post
          </h3>
          <p className="text-md ml-2 mt-1 truncate text-zinc-500">
            in d/{forumName}
          </p>
        </div>
      </div>

      <Editor forumId={forum.id} />
    </div>
  )
}

export default SubmitPage
