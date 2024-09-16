import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/index.vue";
import PostShow from "../views/[id].vue";

const routes = [
  { path: "/", component: Home },
  { path: "/:id", component: PostShow },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
