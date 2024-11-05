import { Router } from "vue-router";
import { RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("@/pages/Home.vue"),
  },
];

export const initMiddleware = (router: Router) => {
  router.afterEach(() => {
    window.scrollTo(0, 0)
  })
}
