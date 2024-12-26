import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // 导入路由实例

createApp(App).use(router).mount('#app'); // 使用路由