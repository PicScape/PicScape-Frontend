import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue';
import Login from '../views/LoginView.vue';
import Upload from '../views/UploadView.vue';
import Settings from '../views/SettingsView.vue';


const routes = [
  { path: '/', component: Home },
  { path: '/upload', component: Upload },
  { path: '/login', component: Login },
  { path: '/settings', component: Settings },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
