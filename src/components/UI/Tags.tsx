"use client";

import Link from "next/link";

import { Badge } from "./Badge";

interface TagProps {
  tags?: { name: string }[] | null;
}

const Tags: React.FC<TagProps> = ({ tags }) => {
  if (!tags || tags.length === 0) return null;
  return (
    <div className="mb-2 flex flex-row gap-1">
      {tags.map((tag, index) => (
        <Link key={index} href={`?tag=${tag.name}`}>
          <Badge variant="secondary">{tag.name}</Badge>
        </Link>
      ))}
    </div>
  );
};

export default Tags;
