import redis from "@/lib/redis";

const deletePostCache = async (postId: string) => await redis.del(`post:${postId}`);

export default deletePostCache;
