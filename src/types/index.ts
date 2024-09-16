export interface Post {
  id: 1;
  title: string;
  previewSnippet: string;
  image: string;
  body: string;
  publishedAt: string | Date;
}

export type FetchStrategy =
  | "from-cache" // strict caching, do not refresh in the background, always use cache while not expired
  | "from-cache-refresh-bg" // use cache ALWAYS refresh in bg
  | "stale-refresh-bg" // use cache, ONLY if expired refresh in the bg
  | "force"; // do not use the cache, always fetch from the API
