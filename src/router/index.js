import { createRouter, createWebHistory } from 'vue-router';

// 导入组件
import HomePage from '../components/HomePage.vue';
import NotFound from '../components/NotFound.vue';
import App from '../App.vue'; // 导入 App.vue

const routes = [
  {
    path: '/',
    component: App, // 使用 App.vue 作为根组件
    name: 'DefaultHome',
  },
  {
    path: '/home',
    name: 'home',
    component: HomePage, // 独立的 HomePage 组件
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: NotFound, // 独立的 NotFound 组件
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
