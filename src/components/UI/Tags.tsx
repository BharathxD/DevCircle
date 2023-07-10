"use client";

import { Badge } from "./Badge";

interface TagProps {
  tags?: { name: string }[] | null;
}

const Tags: React.FC<TagProps> = ({ tags }) => {
  if (!tags || tags.length === 0) return null;
  return (
    <div className="flex flex-row gap-1">
      {tags.map((tag, index) => (
        <a key={index} href={`?tag=${tag.name}`}>
          <Badge variant="secondary">{tag.name}</Badge>
        </a>
      ))}
    </div>
  );
};

export default Tags;
