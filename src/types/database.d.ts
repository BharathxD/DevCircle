import type { Comment, Forum, Post, Tag, User, Vote } from "@prisma/client";

type ExtendedPost = Post & {
  forum: Forum;
  votes: Vote[];
  author: User;
  comments: Comment[];
  tags: Tag[];
};

type ExtendedForum = Forum & {
  posts: ExtendedPost[];
  author?: User;
  comments?: Comment[];
  votes?: Vote[];
  Creator: User | null;
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

export { ExtendedPost, ExtendedForum, ExtendedComment, UserWithSocialLinks };
