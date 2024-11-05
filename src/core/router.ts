import { createWebHistory, createRouter } from "vue-router";
import { initMiddleware, routes } from "@/routes";

const router = createRouter({
  history: createWebHistory(),
  linkExactActiveClass: "active",
  routes,
});

initMiddleware(router);

export default router;
