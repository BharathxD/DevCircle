import type { Tag, VoteType } from "@prisma/client"
import type { OutputData } from "@editorjs/editorjs"

export type CachedPost = {
  id: string
  title: string
  authorUsername: string
  authorImage: string
  content: string
  tags: Tag[]
  currentVote: VoteType | null
  createdAt: Date
}
