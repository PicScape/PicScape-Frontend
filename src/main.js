import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; 
import { createVuetify } from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

const app = createApp(App);

app.use(router);

const vuetify = createVuetify();
app.use(vuetify);

app.mount('#app');
