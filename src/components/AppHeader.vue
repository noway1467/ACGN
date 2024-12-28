<template>
  <header id="header">
    <a href="/index.html">
      <h1 id="hd">ACGN导航</h1>
    </a>
    <div id="header-content">
      <form id="search-form" @submit.prevent="performSearch">
        <div class="search-container">
          <select id="search-engine" v-model="selectedEngine">
            <option value="https://soupian.pro/search?key=%s">搜片</option>
            <option value="https://cn.baozimh.com/search?q=%s">搜漫画</option>
            <option value="https://mikanime.tv/Home/Search?searchstr=%s">搜动画</option>
            <option value="https://www.gying.net/s/1---1/%s">搜电影</option>
            <option value="https://zh.annas-archive.org/search?q=%s">搜图书</option>
            <option value="https://tools.liumingye.cn/music/#/search/M/song/%s">搜音乐</option>
            <option value="https://www.yxzhi.com/?post_type=post&s=%s">搜软件</option>
            <option value="https://www.maoliyun.com/search?k=%s&s=0&t=-1">搜网盘</option>
            <option value="https://hanime1.me/search?query=%s&type=&genre=&sort=&year=&month=">搜哩番</option>
            <option value="https://nhentai.net/search/?q=%s">搜本子</option>
            <option value="https://limbopro.com/btsearch.html#gsc.tab=0&gsc.sort=&gsc.ref=more%3Amissav&gsc.q=%s">
              搜番号</option>
          </select>
          <input type="search" id="search-input" v-model="searchInput" placeholder="部分网站需要魔法或登录...">
          <button type="submit">🔍</button>
        </div>
      </form>
      <div id="tg">
        <a href="/home.html" title="发布页">
          <img src="/tg.ico" alt="tg群">
        </a>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';

const selectedEngine = ref('https://soupian.pro/search?key=%s');
const searchInput = ref('');

const performSearch = () => {
    let searchUrl = selectedEngine.value.replace('%s', encodeURIComponent(searchInput.value));

    if (selectedEngine.value.includes('maoliyun.com')) {
        searchUrl = selectedEngine.value.replace('%s', encodeURIComponent(searchInput.value));
    } else if (selectedEngine.value.includes('hanime1.me')) {
        const searchParams = new URLSearchParams();
        searchParams.set('query', searchInput.value);
        searchUrl = selectedEngine.value.replace('%s', searchParams.toString());
    }
    window.open(searchUrl, '_blank');
};
</script>


<style scoped>
a{  text-decoration: none;}

header{
  display:flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
  background-color: #fff;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
  color: #fff;
  text-align: center;
  position: absolute;
  z-index: 1000;
  top: 0;
  left: 0;
  font-weight: bold;
  line-height: 80px;
}

:deep(h1) {
  font-size: 26px;
  margin-top: 10px;
  margin-left: 40px;
  font-family: 'Comic Sans MS', cursive;
  color: #ff69b4;
  background: linear-gradient(to right, #ffc0cb, #ff69b4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  white-space: nowrap;
  display: inline-block;
}


:deep(#header-content) {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 15px;
}

:deep(#search-form) {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
}

:deep(.search-container) {
  display: flex;
  align-items: center;
  border-radius: 25px;
  overflow: hidden;
  border: 1px solid #ddd;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  flex-grow: 1;
}

:deep(.search-container:hover) {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

:deep(#search-engine) {
  border: none;
  outline: none;
  background-color: #fff;
  padding: 8px 12px;
  border-radius: 30px 0 0 30px;
  flex-shrink: 0;
  width: auto;
  font-size: 14px;
  cursor: pointer;
}

:deep(#search-input) {
  flex-grow: 1;
  height: 40px;
  border: none;
  outline: none;
  padding: 0 12px;
  font-size: 14px;
}

:deep(button) {
  background: #f5f5f5;
  border: none;
  cursor: pointer;
  padding: 0 16px;
  height: 40px;
  font-size: 18px;
  color: #666;
  transition: all 0.2s ease;
}

:deep(button:hover) {
  background: #e0e0e0;
  color: #333;
}

.additional-component {
  margin-left: 10px;
}

:deep(#tg) {
  width: 35px;
  height: 35px;
  font-size: 18px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 20px;
}

#tg a img {
      vertical-align: middle;
      width: 28px;
      height: 28px;
  }
/* 移动端 */ 
  @media (max-width: 768px) {
  :deep(h1) {
    margin-left:10px;
    white-space: nowrap;
    line-height: 42px;
    font-size: 20px;
    display: inline-block;
  }

  :deep(header) {
    width: 100%;
    background-color: rgb(251, 251, 250);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  :deep(#header-content) {
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 40px;
    max-width: 90%;
    width: 80%;
    margin: 0 auto;
    height: 90%;
  }

  :deep(#search-input) {
    font-size: 12px;
    width: 100%;
  }

  :deep(.search-container) {
    margin: 0 0 0 13px;
    max-width: 200px;
    height: 33px;
  }

  :deep(#search-engine) {
    font-size: 12px;
    max-width: 45%;
  }
  
  button {
    padding: 0 8px;
    height: 32px;
    font-size: 12px;
    width: 32px;
  }

  :deep(input)::placeholder {
    opacity: 0;
  }

  :deep(#tg) {
    margin: -5px -5px 0 5px;
  }

}
.dark-mode #header{
    background-color: black !important; 
    color: gray !important;  
}
.dark-mode {
    background-color: black !important; 
    color: gray !important;  
}
.dark-mode .search-container {
    background-color: gray  !important;
    border:none; 
}
.dark-mode #search-engine {
    background-color: gray  !important;
}
.dark-mode #search-input {
    background-color: gray  !important;
}

.dark-mode button {
    background-color: gray !important;
    color: white !important;
}
.dark-mode h1 {
    filter: brightness(0.5); 
}
.dark-mode #tg {
    filter: brightness(0.5); 
}
</style>