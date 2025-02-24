import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
import { useAuthStore } from 'src/stores/auth-store';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.token) {
    next('/login');
  } else {
    next();
  }
});

export default router;
