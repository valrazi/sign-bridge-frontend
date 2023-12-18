import { NavigationGuard } from "vue-router";

export const pageScrollingGuard: NavigationGuard = (_, __, next) => {
  next();
  window.scrollTo(0, 0);
};
