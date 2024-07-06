import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue';
import Login from '../views/LoginView.vue';
import Upload from '../views/UploadView.vue';
import Pfps from '../views/PfpsView.vue';
import Wallpapers from '../views/WallpapersView.vue';
import Settings from '../views/SettingsView.vue';
import MyScape from '../views/MyScape.vue';
import ActivateAccount from '../views/ActivateAccountView.vue';
const routes = [
  { path: '/', component: Home },
  { path: '/pfps', component: Pfps },
  { path: '/wallpapers', component: Wallpapers },
  { path: '/upload', component: Upload },
  { path: '/login', component: Login },
  { path: '/settings', component: Settings },
  { path: '/myscape/:userid', component: MyScape },
  { path: '/uploads/:imgId', component: Home },

  { path: '/myscape', component: MyScape },
  { path: '/account/activate', component: ActivateAccount, props: route => ({ activationToken: route.query.activationToken }) }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
