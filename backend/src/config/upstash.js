import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

// Use env variables
dotenv.config();

/*
  Notes upstash
  - Docs: https://upstash.com/docs/redis/sdks/ratelimit-ts/gettingstarted

  const ratelimit = new Ratelimit({...})
  - Creates a new instance of a rate limiter.
  - This object will be used to control how many requests a client can make in a given time.

  redis: Redis.fromEnv()
  - This configures the rate limiter to use Redis as its storage backend.
  - Redis.fromEnv() presumably initializes a Redis client by reading connection details (like host, port, password) from environment variables.

  limiter: Ratelimit.slidingWindow(5, "20 s")
  - This sets the rate limiting strategy and limits.
  - slidingWindow(5, "20 s") means: Allow up to 5 requests in any sliding 20-second window.
  - Sliding window means the limit is checked continuously over the last 20 seconds, not in fixed intervals.
*/

// Create a ratelimiter that allows 10 request per 20sec
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, "60 s"),
});

export default ratelimit;