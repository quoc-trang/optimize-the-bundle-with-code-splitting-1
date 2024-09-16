<script setup lang="ts">
import { usePostStore } from "@/stores/PostStore";
import AppLoader from "@/components/AppLoader.vue";

const postStore = usePostStore();

postStore.fetchPostList();
</script>
<template>
  <h1>
    Posts
    <AppLoader v-if="postStore.loadingList" size="sm" />
  </h1>

  <ul class="posts">
    <li v-for="post in postStore.posts" :key="post.id">
      <div class="card">
        <div class="card-body">
          <h2 class="card-title">{{ post.title }}</h2>
          <p>
            {{ new Date(post.publishedAt).toLocaleDateString() }}
            {{ new Date(post.publishedAt).toLocaleTimeString() }}
          </p>
          <p>{{ post.previewSnippet }}...</p>
          <div class="justify-end card-actions">
            <RouterLink :to="`/${post.id}`" class="btn btn-primary"
              >Read Post</RouterLink
            >
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>
