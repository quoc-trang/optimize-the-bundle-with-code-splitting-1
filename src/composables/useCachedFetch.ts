/**
 * We created this composable to handle the bonus requirements
 * Feel free to use it, or ignore it
 * Or if you want to handle the bonus requirements in a different way
 * You can create your own implementation for caching fetch reqeusts
 */
import { getCache, setCache, checkExistsButExpired } from "@/helpers";
import type { FetchStrategy } from "@/types";

import { ref, type Ref, computed } from "vue";

export function useCachedFetch<T>(options: {
  fetchStrategy?: FetchStrategy;
  expiresIn?: number;
  data: Ref<T | undefined>;
}) {
  const { data, fetchStrategy, expiresIn } = {
    fetchStrategy: "force" as FetchStrategy,
    expiresIn: 1000 * 10, // 10 seconds
    ...options,
  };

  const loadingInForeground = ref(false);
  const loadingInBg = ref(false);
  const loading = computed(
    () => loadingInForeground.value || loadingInBg.value,
  );

  const error = ref<Error>();

  async function doFetch(url: string) {
    const isStale = checkExistsButExpired(url);
    const maybeStaleCachedResponse = getCache({
      key: url,
      checkExpired: false,
      deleteExpired: false,
    });

    // FetchStrategy: 'stale-refresh-bg'
    // use cache
    // refresh in the bg ONLY if expired
    // this use case must come first because calling getCache below will delete the expired cache
    if (fetchStrategy === "stale-refresh-bg") {
      // if it is stale and we have a cached response
      // use the cached response and refresh in the background
      if (isStale && maybeStaleCachedResponse) {
        data.value = maybeStaleCachedResponse;
        loadingInBg.value = true;
        return fetchData(url);

        // if it's NOT stale and we have a cached response
        // just use it
      } else if (!isStale && maybeStaleCachedResponse) {
        data.value = maybeStaleCachedResponse;

        // if we don't have a cached response at all
        // fetch it
      } else {
        loadingInForeground.value = true;
        return fetchData(url);
      }
    }

    // all other strategies
    const cachedResponse = getCache({ key: url });

    // FetchStrategy: 'from-cache'
    // Only get from the cache if exists and not expired
    // DO NOT refresh in the background
    if (fetchStrategy === "from-cache") {
      if (cachedResponse) {
        data.value = cachedResponse;
        return;
      } else {
        loadingInForeground.value = true;
        return fetchData(url);
      }
    }

    // FetchStrategy: 'force'
    // DO NOT get from the cache
    // Refresh the data in the foreground
    if (fetchStrategy === "force") {
      loadingInForeground.value = true;
      data.value = undefined;
      return fetchData(url);
    }

    // FetchStrategy: 'from-cache-refresh-bg'
    // Use the cache
    // Refresh in the background ALWAYS (even if not expired)
    if (fetchStrategy === "from-cache-refresh-bg") {
      loadingInBg.value = true;
      data.value = cachedResponse;
      return fetchData(url);
    }
  }

  async function fetchData(url: string) {
    try {
      const res = await fetch(url);
      data.value = await res.json();
      setCache({ key: url, value: data.value, expiresIn });
    } catch (err) {
      if (err instanceof Error) {
        error.value = err;
      } else {
        throw err;
      }
    } finally {
      loadingInForeground.value = false;
      loadingInBg.value = false;
    }
  }

  return {
    loading,
    loadingInBg,
    doFetch,
  };
}
