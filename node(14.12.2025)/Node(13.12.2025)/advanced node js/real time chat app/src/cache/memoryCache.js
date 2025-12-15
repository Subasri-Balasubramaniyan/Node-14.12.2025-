const cache = new Map();

function set(key, value, ttl = 5000) {
  cache.set(key, value);
  setTimeout(() => cache.delete(key), ttl);
}

function get(key) {
  return cache.get(key);
}

module.exports = { set, get };
