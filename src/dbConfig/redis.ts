import { Redis } from "@upstash/redis";



const redis = new Redis({
  url: process.env.UP_REDIS_KV_REST_API_URL,
  token: process.env.UP_REDIS_KV_REST_API_TOKEN,
})

export default redis;