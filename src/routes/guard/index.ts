import { Router } from "vue-router";
import { pageScrollingGuard } from "./pageScrolling";

export const initRouteGuard = (router: Router) => {
  router.beforeEach(pageScrollingGuard);
};
