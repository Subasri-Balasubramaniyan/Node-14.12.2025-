const redis = require("../config/redis");

async function setCache(key, value, ttl = 60) {
  await redis.set(key, JSON.stringify(value), "EX", ttl);
}

async function getCache(key) {
  const data = await redis.get(key);
  return data ? JSON.parse(data) : null;  /* if key is invalid or expired returns null */
}

module.exports = { setCache, getCache };
