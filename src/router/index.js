import { createWebHistory, createRouter } from "vue-router";

const routes = [
  { path: "/", component: () => import("../views/index.vue") },
  { path: "/:id", component: () => import("../views/[id].vue") },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
