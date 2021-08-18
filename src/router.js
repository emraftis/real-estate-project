import { createRouter, createWebHistory } from "vue-router";

import store from "./store/index.js";
import HomePage from "./pages/HomePage.vue";
import NewProject from "./pages/NewProject.vue";
import ProjectList from "./pages/ProjectList.vue";
import ShowProject from "./pages/ShowProject.vue";
import UserAuth from "./pages/UserAuth.vue";
import FAQ from "./pages/FAQ.vue";
import NotFound from "./pages/NotFound.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: HomePage }, //HomePage.vue
    { path: "/projects", component: ProjectList, meta: { requiresAuth: true } }, //ProjectList.vue
    {
      path: "/projects/:id",
      component: ShowProject,
      props: true,
      meta: { requiresAuth: true },
    }, //ShowProject.vue
    { path: "/faq", component: FAQ },
    { path: "/new", component: NewProject, meta: { requiresAuth: true } }, //NewProject.vue
    { path: "/auth", component: UserAuth, meta: { requiresUnauth: true } }, //UserAuth.vue
    { path: "/:notFound(.*)", component: NotFound }, //NotFound.vue
  ],
});

// route guards if not authenticated
router.beforeEach(function(to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next("/auth");
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next("/projects");
  } else {
    next();
  }
});

export default router;
