import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from "../views/LoginPage.vue"
import HomePage from "../views/HomePage.vue"



const routes = [
  { path: '/', component: HomePage },
  { path: '/login', component: LoginPage },
  //in case the user navigates to the path that does not exist...
  {
    path: "/:catchAll(.*)",
    component: () => import('../views/NotFound.vue')
    },
]


const router = createRouter({
    history: createWebHistory(),
    routes
  })

export default router;