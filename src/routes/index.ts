import { Router } from "vue-router";
import { RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
  {
    path: "/admin/login",
    name: "admin-login",
    component: () => import("@/pages/AdminLogin.vue"),
  },
  {
    path: '/admin/home',
    component: () => import('@/layout/Admin.vue'),
    redirect: () => {
      return {name: 'admin-home'}
    },
    children: [
      {
        path: '/admin/home',
        name: 'admin-home',
        component: () => import('@/pages/AdminHome.vue'),
        meta: {
          isAdmin: true
        }
      },
      {
        path: '/admin/blog-list',
        name: 'admin-blog',
        component: () => import('@/pages/AdminBlogList.vue'),
        meta: {
          isAdmin: true
        }
      },
      {
        path: '/admin/blog-add',
        name: 'admin-blog-add',
        component: () => import('@/pages/AdminBlogAdd.vue'),
        meta: {
          isAdmin: true
        }
      },
      {
        path: '/admin/blog-edit',
        name: 'admin-blog-edit',
        component: () => import('@/pages/AdminBlogEdit.vue'),
        meta: {
          isAdmin: true
        }
      },
      {
        path: '/admin/calendar-list',
        name: 'admin-calendar',
        component: () => import('@/pages/AdminCalendarList.vue'),
        meta: {
          isAdmin: true
        }
      }
    ]
  },
  {
    path: '/',
    component: () => import('@/layout/User.vue'),
    redirect: () => {
      return {name: 'home'}
    },
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/pages/Home.vue"),
      },
      {
        path: "/video-learning",
        name: "video-learning",
        component: () => import("@/pages/VideoLearning.vue"),
        meta: {
          needAuth: true
        }
      },
      {
        path: "/kamus-bis",
        name: "kamus-bis",
        component: () => import("@/pages/Kamus.vue"),
      },
      {
        path: "/blog",
        name: "blog",
        component: () => import("@/pages/Blog.vue"),
      },
      {
        path: "/blog-detail",
        name: "blog-detail",
        component: () => import("@/pages/BlogDetail.vue"),
      },
      {
        path: "/job-seeking",
        name: "job-seeking",
        component: () => import("@/pages/JobSeeking.vue"),
      },
      {
        path: "/shop",
        name: "shop",
        component: () => import("@/pages/Shop.vue"),
      },
      {
        path: "/profile",
        name: "profile",
        component: () => import("@/pages/EditProfile.vue"),
        meta: {
          needAuth: true
        }
      },
    ]
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/pages/Register.vue"),
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: () => import("@/pages/ForgotPassword.vue"),
  },
];

export const initMiddleware = (router: Router) => {
  
  router.afterEach(() => {
    window.scrollTo(0, 0)
  })
  router.beforeEach((to, _, next) => {
    const authStore = useAuthStore()
    const userStore = useUserStore()
    if(to.meta.needAuth) {
      if(authStore.token) {
        next()
      }else {
        userStore.showUnauthorized()
        // next({name:'login'})
      }
      return
    }else {
      next()
    }
  })

  router.beforeEach((to, _, next) => {
    const authStore = useAuthStore()
    if(to.meta.isAdmin) {
      if(authStore.token && authStore.user && authStore.user.roleId == 1) {
        next()
      }else {
        next({name:'admin-login'})
      }
      return
    }else {
      next()
    }
  })
}
