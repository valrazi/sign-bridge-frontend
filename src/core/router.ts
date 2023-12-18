import { createWebHistory, createRouter } from "vue-router";
import { initRouteGuard, routes } from "@/routes";

const router = createRouter({
  history: createWebHistory(),
  linkExactActiveClass: "active",
  routes,
});

initRouteGuard(router);

export default router;
