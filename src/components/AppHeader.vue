<template>
  <header id="header">
    <a href="/index.html">
      <h1 id="hd">ACGN导航</h1>
    </a>
    <div id="header-content">
      <form id="search-form">
        <div class="search-container">
          <select id="search-engine">
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
          <input type="search" id="search-input" placeholder=" 部分网站需要魔法或登录...">
          <button style="background:none;" onclick="performSearch()">🔍</button>
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
import { onMounted } from 'vue';

  const performSearch = (event) => {
      if (event) {
          event.preventDefault();
      }

      const searchEngineSelect = document.getElementById("search-engine");
      const selectedEngine = searchEngineSelect.options[searchEngineSelect.selectedIndex].value;
      const searchInputValue = document.getElementById("search-input").value;
      const searchUrl = selectedEngine.replace('%s', encodeURIComponent(searchInputValue));
      window.open(searchUrl, '_blank');
  };

onMounted(()=>{
document.getElementById("search-form").addEventListener("submit", performSearch);
});
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
  font-size: 2vw;
  margin-top: 10px;
  margin-left: 40px;
  font-family: 'Comic Sans MS', cursive;
  color: #ff69b4;
  background: linear-gradient(to right, #ffc0cb, #ff69b4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}


:deep(#header-content) {
  display: flex;
  width: 100%;
  height: 100%;
  max-width: 600px;
  margin: 0 450px 0 200px;
  padding: 0 10px;
  line-height: 80px;
}

:deep(#search-form) {
  display: flex;
  align-items: center;
  width: 100%;
}

:deep(.search-container) {
  display: flex;
  align-items: center;
  border-radius: 25px;
  overflow: hidden;
  border: 1px solid #ddd;
  flex-grow: 1;
}

:deep(#search-engine) {
  border: none;
  outline: none;
  background-color: #fff;
  padding: 5px;
  border-radius: 10px 0 0 10px;
  flex-shrink: 0;
  width: auto;
}

:deep(#search-input) {
  flex-grow: 1;
  height: 27px;
  border: none;
  outline: none;
  padding: 8px;
}

:deep(button) {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  font-size: 16px;
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
  align-items: right;
  cursor: pointer;
  margin-left: 10px;
}
:deep(.dark-mode h1) {
    filter: brightness(0.7); 
}
#tg a img {
      vertical-align: middle;
      width: 28px;
      height: 28px;
  }

/* 移动端适配 */
@media (max-width: 768px) {
  :deep(h1) {
    margin: 5px;
    white-space: nowrap;
    line-height: 40px;
    font-size: 23px;
  }

  :deep(header) {
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
    max-width: 99%;
  }

  :deep(#search-engine) {
    max-width: 50%;
  }

  :deep(input)::placeholder {
    opacity: 0;
  }

  :deep(#tg) {
    margin-left: 5px;
    margin-top: -5px;
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
</style>