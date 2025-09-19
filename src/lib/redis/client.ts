import { createClient, type RedisClientType } from "redis";

let redisClient: RedisClientType | null = null;

export async function getRedisClient() {
  if (!redisClient) {
    redisClient = createClient({
      url: process.env.REDIS_URL,
    });
    redisClient.on("error", (err: Error) =>
      console.error("Redis Client Error", err)
    );
    await redisClient.connect();
  }
  return redisClient;
}
