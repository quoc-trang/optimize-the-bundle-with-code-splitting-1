const cache = new Map<any, CacheRecord>();

interface CacheRecord {
  expiresAt: number;
  data: any;
}

export function checkExistsButExpired(key: any) {
  const cacheRecord = cache.get(key);
  if (!cacheRecord) return false;
  return cacheRecord.expiresAt < Date.now();
}

export function getCache(options: {
  key: any;
  checkExpired?: boolean;
  deleteExpired?: boolean;
}) {
  const { key, checkExpired, deleteExpired } = {
    checkExpired: true,
    deleteExpired: true,
    ...options,
  };
  const cacheRecord = cache.get(key);

  // handle if not in cache
  if (!cacheRecord) return null;

  // handle if expired
  if (cacheRecord.expiresAt < Date.now() && checkExpired) {
    if (deleteExpired) cache.delete(key);
    return null;
  }

  // handle cache hit
  return cacheRecord.data;
}

export function setCache(options?: {
  key: any;
  value: any;
  expiresIn?: number;
}) {
  const { key, value, expiresIn } = {
    // default options
    expiresIn: 10 * 1000, //  10 seconds
    ...options,
  };

  cache.set(key, {
    expiresAt: Date.now() + expiresIn,
    data: value,
  });
}
