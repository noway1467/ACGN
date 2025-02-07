<template>
  <AppModal />
  <AppHeader />
  <div id="main-container">
    <AppLeftMenu />
    <AppRightContainer />
  </div>

  <div id="notification" :class="{ 'notification': true, 'show': showNotification, 'hide': !showNotification }">
    <p>首次加载图标较慢，请耐心等待</p>
    <button id="close-btn" class="close-btn" @click="closeNotification">X</button>
  </div>
  <router-view></router-view>
  <AppToolbar />
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref, provide, onMounted } from 'vue';
import AppHeader from './components/AppHeader.vue';
import AppLeftMenu from './components/AppLeftMenu.vue';
import AppRightContainer from './components/AppRightContainer.vue';
import AppToolbar from './components/AppToolbar.vue';
import AppModal from './components/AppModal.vue';

const isRoot = ref(false);
const route = useRoute();

onMounted(() => {
  // 监听当前路由是否为根路径 "/"
  isRoot.value = route.path === '/';
});

const isModalOpen = ref(false);
const toggleDarkMode = () => {
  document.body.classList.toggle('dark-mode');
};

const showNotification = ref(false);
// 使用 provide 提供状态和函数
provide('isModalOpen', isModalOpen);
provide('toggleDarkMode', toggleDarkMode);

const openModal = () => {
  isModalOpen.value = true;
};
provide('openModal', openModal);

const closeNotification = () => {
  showNotification.value = false;
};

// 定义 localStorage key
const LAST_NOTIFICATION_TIME = 'lastNotificationTime';
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000; // 7 天的毫秒数

// 组件加载后执行
onMounted(() => {
  window.addEventListener('load', () => {

    const lastTime = localStorage.getItem(LAST_NOTIFICATION_TIME);
    const now = Date.now();

    // 检查是否需要显示通知
    if (!lastTime || (now - lastTime > SEVEN_DAYS_MS)) {
      setTimeout(() => {
        showNotification.value = true;
      }, 1000);
      setTimeout(() => {
        showNotification.value = false;
      }, 2500);
      localStorage.setItem(LAST_NOTIFICATION_TIME, now.toString());
    }
  });
});
</script>

<style>
:global(body) {
  overflow: hidden;
}

body {
  overflow: hidden;
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: rgb(255, 255, 255);
  color: #495057;
  min-height: 100vh;
  height: auto;
}

#main-container {
  display: flex;
  width: 100%;
  height: 100vh;
}

#tmp {
  position: absolute;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  border: 1px solid orange;
  top: 40%;
  right: 40%;
  z-index: 9000;
  background-color: white;
  width: 300px;
  height: 100px;
  text-align: center;
  color: palevioletred;
  padding: 10px;
  border-radius: 20px;
}

@media screen and (max-width: 768px) {
  #tmp {
    width: 250px;
    height: 100px;
    top: 30%;
    left: 50%;  
    transform: translateX(-50%);  
  }
}

/* 泡沫提示框 */
.notification {
  position: fixed;
  top: 7%;
  right: -300px;
  transform: translateX(100%);
  background-color: whitesmoke;
  color: black;
  padding: 10px;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: right 1s ease-out, opacity 2s ease-out;
  z-index: 9000;
  max-width: 80%;
  width: 300px;
  text-align: center;
}

.notification.show {
  right: 10px;
  transform: translateX(-10px);
  opacity: 1;
}

.notification.hide {
  right: -300px;
  opacity: 0;
}

#closebtn {
  position: absolute;
  top: 5px;
  right: 5px;
  border: none;
  color: black;
  font-size: 16px;
  cursor: pointer;
}

.close-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  background: transparent;
  border: none;
  color: black;
  font-size: 16px;
  cursor: pointer;
}

button {
  background: none;
  width: auto;
}

/* 夜间模式样式 */
.dark-mode {
  background-color: black !important;
  color: gray !important;
}

.dark-mode #main-container {
  background-color: #121212;
  /* 深色背景 */
  color: #e0e0e0;
  /* 浅色字体 */
}

.dark-mode hrml {
  background-color: black !important;
  color: gray !important;
}

:deep(.dark-mode ::-webkit-scrollbar-thumb) {
  filter: brightness(0.5);
}

:deep(.dark-mode ::-webkit-scrollbar-track) {
  filter: brightness(0.5);
}
</style>
