import ratelimit from "../config/upstash.js";

/*
  Notes
  - In Express.js, next() is not... a native JavaScript method.
  - It is a function provided by Express as part of its middleware system.

  my-limit-key
  - The rate limiter uses this key to track requests separately per user/client.
    Usually, this key can be something unique like:
      A user ID
      An IP address
      An API token
      Any string that uniquely identifies the requester
*/

const ratelLimiter = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit("my-limit-key");

    if (!success) {
      return res.status(429).json({message: "Too many request please try again later!"})
    }

    next()
  } catch (error) {
    console.log("Rate limit error", error);
    next(error)
  }
}

export default ratelLimiter;