import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from "../views/LoginPage.vue"
import HomePage from "../views/HomePage.vue"
import DetailsPage from "../views/DetailsPage.vue"
import ProductPage from "../views/ProductPage.vue"
import ResetPage from "../views/ResetPage.vue"



const routes = [
  { path: '/', component: HomePage },
  { path: '/login', component: LoginPage },
  { path: '/register', component: LoginPage },
  { path: '/forget-password', component: LoginPage },
  { path: '/forget-password/confirm', component: LoginPage },
  { path: '/reset-password', component: LoginPage },
  { path: '/product', component: ProductPage},
  { path: '/product/:id', component: DetailsPage},
  //in case the user navigates to the path that does not exist...
  { path: "/:catchAll(.*)", component: () => import('../views/NotFound.vue')},
]


const router = createRouter({
    history: createWebHistory(),
    routes
  })

export default router;