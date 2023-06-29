"use server"

import type { Post, Vote } from "@prisma/client"

import database from "@/lib/database"

const getPost = async (
  postId: string
): Promise<(Post & { votes: Vote[] }) | null> => {
  try {
    const post = await database.post.findUnique({
      where: {
        id: postId,
      },
      include: { votes: true },
    })
    return post
  } catch (error: unknown) {
    return null
  }
}

export default getPost
