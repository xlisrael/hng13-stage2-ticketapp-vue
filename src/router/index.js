import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from '../utils/auth'

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: () => import('../pages/Landing.vue')
  },
  {
    path: '/auth/:mode',
    name: 'Auth',
    component: () => import('../pages/Auth.vue')
  },
  {
    path: '/auth',
    redirect: '/auth/login'
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../pages/Dashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/tickets',
    name: 'Tickets',
    component: () => import('../pages/Tickets.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../pages/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next('/auth/login')
  } else if (to.name === 'Auth' && isAuthenticated()) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router