<template>
  <div class="container">
    <div class="anime-character">ヽ(ﾟ〇ﾟ)ノ</div>
    <h1>404</h1>
    <p>哎呀！看来你迷路了。这个页面可能被异世界的魔王抓走了。</p>
    <p>不如我们一起回到首页，继续你的ACG冒险吧！</p>
    <a href="/index.html" class="button">返回首页</a>
    <a
      href="https://acgnv3.pages.dev/"
      class="button"
      @click.prevent="copyAndRedirect"
      id="backupLink"
    >
      备用网址
    </a>
    <div id="copyMessage" ref="copyMessage">网址已复制到剪贴板！</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const copyMessage = ref(null);

const copyAndRedirect = async (event) => {
  const backupUrl = event.target.href;
  try {
    await navigator.clipboard.writeText(backupUrl);
    copyMessage.value.style.display = 'block';
    setTimeout(() => {
      copyMessage.value.style.display = 'none';
      window.location.href = backupUrl;
    }, 1000);
  } catch (err) {
    console.error('无法复制文本: ', err);
    window.location.href = backupUrl;
  }
};
</script>

<style scoped>
  html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden; 
  }

.container {
  margin: 0 auto;
  margin-top: 100px;
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
}
h1 {
  color: #4caf50;
  font-size: 3rem;
  margin-bottom: 1rem;
}
p {
  color: #666;
  margin-bottom: 1.5rem;
}
.anime-character {
  font-size: 5rem;
  margin-bottom: 1rem;
}
.button {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  transition: background-color 0.3s;
  display: inline-block;
  margin: 0 10px;
  cursor: pointer;
}
.button:hover {
  background-color: #45a049;
}
#copyMessage {
  display: none;
  color: #4caf50;
  margin-top: 10px;
}
</style>