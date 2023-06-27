import type { Comment, Forum, Post, Tag, User, Vote } from "@prisma/client"

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
