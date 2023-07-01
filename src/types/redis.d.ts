import type { Tag, VoteType } from "@prisma/client";

export type CachedPost = {
  id: string;
  title: string;
  authorUsername: string;
  authorImage: string;
  authorId: string;
  content: string;
  tags: Tag[];
  currentVote: VoteType | null;
  createdAt: Date;
};
