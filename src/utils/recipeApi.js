const CACHE_PREFIX = "foodapp:v1:";
const CACHE_TTL = 24 * 60 * 60 * 1000;
const memoryCache = new Map();
const pendingRequests = new Map();

function readCache(key) {
  const memoryEntry = memoryCache.get(key);

  if (memoryEntry && Date.now() - memoryEntry.savedAt < CACHE_TTL) {
    return memoryEntry.data;
  }

  try {
    const storedEntry = JSON.parse(
      localStorage.getItem(`${CACHE_PREFIX}${key}`),
    );

    if (storedEntry && Date.now() - storedEntry.savedAt < CACHE_TTL) {
      memoryCache.set(key, storedEntry);
      return storedEntry.data;
    }

    localStorage.removeItem(`${CACHE_PREFIX}${key}`);
  } catch {
    localStorage.removeItem(`${CACHE_PREFIX}${key}`);
  }

  return null;
}

function writeCache(key, data) {
  const entry = { data, savedAt: Date.now() };
  memoryCache.set(key, entry);

  try {
    localStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(entry));
  } catch {
    // The in-memory cache still works when browser storage is unavailable.
  }
}

export function fetchJsonWithCache(url, cacheKey) {
  const cachedData = readCache(cacheKey);

  if (cachedData !== null) {
    return Promise.resolve(cachedData);
  }

  if (pendingRequests.has(cacheKey)) {
    return pendingRequests.get(cacheKey);
  }

  const request = fetch(url)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      writeCache(cacheKey, data);
      return data;
    })
    .finally(() => pendingRequests.delete(cacheKey));

  pendingRequests.set(cacheKey, request);
  return request;
}
