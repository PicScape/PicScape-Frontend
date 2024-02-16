
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import UploadView from '../views/UploadView.vue';
import LoginView from '../views/AccountView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/upload', component: UploadView },
  { path: '/login', component: LoginView }

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
