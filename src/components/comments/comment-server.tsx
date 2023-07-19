import type { User } from "@prisma/client";

import type { ExtendedComment } from "@/types/database";

import CommentsSection from "./comments-section";

interface CommentsSectionProps {
  postId: string;
  getData: () => Promise<ExtendedComment[] | null>;
  userId?: User["id"];
  isAdmin?: boolean;
}

const CommentServer = async ({
  postId,
  getData,
  userId,
  isAdmin,
}: CommentsSectionProps) => {
  const comments = await getData();
  return (
    <CommentsSection
      postId={postId}
      userId={userId}
      comments={comments}
      isAdmin={isAdmin}
    />
  );
};

export default CommentServer;
