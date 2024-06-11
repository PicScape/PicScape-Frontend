import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue';
import Login from '../views/LoginView.vue';
import Upload from '../views/UploadView.vue';


const routes = [
  { path: '/', component: Home },
  { path: '/upload', component: Upload },
  { path: '/login', component: Login }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
