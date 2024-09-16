import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";
import type { Post } from "@/types";
import { useCachedFetch } from "@/composables/useCachedFetch";

export const usePostStore = defineStore("PostStore", () => {
  // listing of all posts
  const posts = ref<Post[]>();
  // a single post
  const post = ref<Post>();

  // handle post list
  const { loading: loadingList, doFetch } = useCachedFetch({
    data: posts,
    fetchStrategy: "stale-refresh-bg",
  });
  const fetchPostList = () =>
    doFetch("/api/posts?fields=id,title,previewSnippet");

  // handle single posts
  const { doFetch: doFetchSingle, loading: loadingSingle } = useCachedFetch({
    data: post,
    fetchStrategy: "stale-refresh-bg",
  });

  const fetchPostSingle = (options?: { id: number }) => {
    post.value = undefined;
    const { id } = { ...options };
    if (!id) throw new Error("id is required");

    // If the post was in the PostIndex store we can use it
    if (!post.value) {
      post.value = posts.value?.find((post) => post.id === id);
    }

    return doFetchSingle(`/api/posts/${id}`);
  };

  return {
    // list of posts
    loadingList,
    posts,
    fetchPostList,

    // single post
    fetchPostSingle,
    loadingSingle,
    post,
  };
});

// @ts-ignore
if (import.meta.hot) {
  // @ts-ignore
  import.meta.hot.accept(acceptHMRUpdate(usePostStore, import.meta.hot));
}
