import React, { memo } from "react";
import { Layers } from "lucide-react";

import { type SearchResults } from "@/types/database";

interface Props {
  post: SearchResults;
}

const SearchItem = ({ post }: Props) => {
  const { postId, postTitle, forumName } = post;
  return (
    <li key={postId}>
      <a
        className="inline-flex h-fit w-full items-center gap-2 p-5 text-lg hover:bg-zinc-800 hover:text-zinc-50"
        href={`/d/${forumName}/post/${postId}`}
      >
        <Layers className="mr-2 size-8" />
        <p>{postTitle}</p>
      </a>
    </li>
  );
};

SearchItem.displayName = "SearchItem";

export default memo(SearchItem);
