import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
  }),
  actions: {
    async login(email, password, router) {
      try {
        const response = await api.post('/login', { email, password });
        this.token = response.data.token;
        localStorage.setItem('token', this.token);
        router.push('/');
      } catch (error) {
        if (error.response && error.response.data.error === 'Invalid email or password') {
          throw new Error('invalidEmailOrPassword');
        }
        console.error('Login failed:', error);
        throw error;
      }
    },
    async register(email, password, router) {
      try {
        await api.post('/register', { email, password });
        router.push('/login');
      } catch (error) {
        console.error('Registration failed:', error);
        throw error;
      }
    },
    logout(router) {
      this.token = '';
      localStorage.removeItem('token');
      router.push('/login');
    },
  },
});
