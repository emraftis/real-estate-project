import { createRouter, createWebHistory } from "vue-router";

import NewProject from "./pages/NewProject.vue";
import ProjectList from "./pages/ProjectList.vue";
import ShowProject from "./pages/ShowProject.vue";
import ProjectEdit from "./pages/ProjectEdit.vue";
import UserAuth from "./pages/UserAuth.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/projects" }, //HomePage.vue
    { path: "/projects", component: ProjectList }, //ProjectList.vue
    { path: "/projects/:id", component: ShowProject, props: true }, //ShowProject.vue
    { path: "/projects/:id/edit", component: ProjectEdit }, //EditProject.vue
    { path: "/new", component: NewProject }, //NewProject.vue
    { path: "/auth", component: UserAuth }, //UserAuth.vue
    { path: "/:notFound(.*)", component: null }, //NotFound.vue
  ],
});

export default router;
