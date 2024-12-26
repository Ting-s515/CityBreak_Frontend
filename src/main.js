import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { createPinia } from 'pinia';
const pinia=createPinia();
const app=createApp(App);
// 將路由註冊到應用
app.use(router);
app.use(pinia); // 註冊 Pinia
// 掛載到 DOM
app.mount('#app');
