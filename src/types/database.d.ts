import type { Post, User, Vote, Comment, Forum } from "@prisma/client";

export type ExtendedPost = Post & {
  forum: Forum;
  votes: Vote[];
  author: User;
  comments: Comment[];
};

export type ExtendedForum = Forum & {
  posts: ExtendedPost[];
  author?: User;
  comments?: Comment[];
  votes?: Vote[];
};

