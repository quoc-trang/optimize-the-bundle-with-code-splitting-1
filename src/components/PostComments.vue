<script setup lang="ts">
import { ref } from "vue";
const loading = ref(false);
const comments = ref<
  {
    body: string;
    name: string;
  }[]
>([]);

async function loadComments() {
  loading.value = true;

  await new Promise((resolve) => setTimeout(resolve, Math.random() * 5000));
  comments.value = [
    {
      name: "John Doe",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      name: "Jane Doe",
      body: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      name: "Alice Doe",
      body: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
  ];
  loading.value = false;
}

loadComments();
</script>
<template>
  <div class="py-4">
    <h2 class="my-4 text-2xl font-bold">Comments</h2>
    <div v-if="loading" class="text-gray-400">Loading...</div>
    <ul class="space-y-4">
      <li
        v-for="comment in comments"
        :key="comment.id"
        class="p-4 rounded-lg shadow-md bg-base-100"
      >
        <strong class="block text-lg font-semibold text-primary">{{
          comment.name
        }}</strong>
        <p class="mt-2 text-base-content">{{ comment.body }}</p>
      </li>
    </ul>
  </div>
</template>
