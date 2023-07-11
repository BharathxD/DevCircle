import type { Comment, Forum, Post, Tag, User, Vote } from "@prisma/client";

type ExtendedPost = Post & {
  forum: Forum;
  votes: Vote[];
  author: User;
  comments: Comment[];
  tags: Tag[];
};

type SearchResults = {
  id: string
  title: string
  createdAt: Date;
  forumName: string
}

type ExtendedForum = Forum & {
  posts: ExtendedPost[];
  author?: User;
  comments?: Comment[];
  votes?: Vote[];
  creator: User | null;
};

type ExtendedComment = Comment & {
  author: User;
  replies: (Comment & {
    author: User;
    votes: CommentVote[];
  })[];
  votes: CommentVote[];
};

type UserWithSocialLinks = User & { socialMedia: SocialMedia | null };
type UserWithSocialLinksAndPosts = User & {
  socialMedia: SocialMedia | null;
  post: (Post & { forum: Forum })[] | null;
};

export {
  ExtendedPost,
  SearchResults,
  ExtendedForum,
  ExtendedComment,
  UserWithSocialLinks,
  UserWithSocialLinksAndPosts,
};
