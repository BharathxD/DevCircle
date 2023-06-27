import type { Comment, Forum, Post, User, Vote, Tag } from "@prisma/client"

export type ExtendedPost = Post & {
  forum: Forum
  votes: Vote[]
  author: User
  comments: Comment[]
  tags: Tag[]
}

export type ExtendedForum = Forum & {
  posts: ExtendedPost[]
  author?: User
  comments?: Comment[]
  votes?: Vote[]
}
