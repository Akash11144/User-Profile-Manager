const cache = new Map<string, { data: unknown; exp: number }>();
export function getCache<T>(k: string): T | null {
  const v = cache.get(k);
  return v && v.exp > Date.now() ? (v.data as T) : null;
}
export function setCache(k: string, data: unknown, ttlMs = 60_000) {
  cache.set(k, { data, exp: Date.now() + ttlMs });
}
