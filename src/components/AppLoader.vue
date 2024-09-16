<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: "sm" | "md";
  }>(),
  {
    size: "md",
  },
);
</script>
<template>
  <div class="loader" :data-size="size"></div>
</template>

<style scoped>
.loader[data-size="sm"] {
  width: 25px;
  padding: 5px;
}
.loader {
  display: inline-block;
  width: 50px;
  padding: 8px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #25b09b;
  --_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
  mask: var(--_m);
  -webkit-mask-composite: source-out;
  mask-composite: subtract;
  animation: l3 1s infinite linear;
}
@keyframes l3 {
  to {
    transform: rotate(1turn);
  }
}
</style>
