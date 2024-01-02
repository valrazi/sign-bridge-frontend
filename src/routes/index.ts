import { RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/layouts/Default.vue"),
    children: [
      {
        name: "home",
        path: "",
        component: () => import("@/pages/Home.vue"),
      },
    ],
  },
];

export * from "./guard";
