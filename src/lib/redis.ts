import { env } from "@/env.mjs";
import { Redis } from "@upstash/redis";

/**
 * Redis client instance.
 * @type {Redis}
 */
const redis: Redis = new Redis({
  url: env.REDIS_URL,
  token: env.REDIS_SECRET,
});

export default redis;
