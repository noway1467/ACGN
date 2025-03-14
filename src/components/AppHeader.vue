<template>
  <header id="header">
    <a href="/index.html">
      <h1 id="hd">ACGN导航</h1>
    </a>
    <div id="header-content">
      <form id="search-form" @submit.prevent="performSearch">
        <div class="search-container">
          <select id="search-engine" v-model="selectedEngine" >
            <option value="https://soupian.pro/search?key=%s">搜片</option>
            <option value="https://www.gying.net/s/1---1/%s">搜电影</option>
            <option value="https://www.colamanga.com/search?type=1&searchString=%s">搜漫画</option>
            <option value="https://mikanime.tv/Home/Search?searchstr=%s">搜动画</option>
            <option value="https://zh.annas-archive.org/search?q=%s">搜图书</option>
            <option value="https://www.yxzhi.com/?post_type=post&s=%s">搜软件</option>
            <option value="https://www.maoliyun.com/search?k=%s&s=0&t=-1">搜网盘</option>
            <option value="https://hanime1.me/search?%s">搜哩番</option>
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
          <img src="/tg.ico" alt="发布页">
        </a>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref} from 'vue';

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
  display: grid;
  grid-template-columns: minmax(120px, auto) minmax(0, 1fr) minmax(60px, auto);
  align-items: center;
  width: 100%;
  max-width: 100vw;
  height: 80px;
  background-color: #fff;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
  position: absolute;
  z-index: 1000;
  top: 0;
  left: 0;
  padding: 0 1.5rem;  /* 减少左右内边距 */
  gap: 1rem;          /* 缩小元素间距 */
  overflow-x: hidden;
  box-sizing: border-box; /* 包含padding在宽度内 */
}

:deep(h1) {
  font-size: 36px;
  margin: 0 1.5rem;
  padding: 0.25rem 0;
  margin-bottom: 5px;
  font-family: 'Comic Sans MS', cursive;
  background: linear-gradient(135deg, #FFB6C1 0%, #FF69B4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 4px rgba(255, 105, 180, 0.2);
  position: relative;

}

:deep(#header-content) {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  max-width: 1280px;
  padding: 0 15px;
}

:deep(#search-form) {
  display: flex;
  align-items: center;
  width: 100%;

}

:deep(.search-container) {
  display: flex;
  align-items: center;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #ddd;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  flex-grow: 1;
  margin-top: 3px;
  height: 40px;
}

:deep(.search-container:hover) {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

:deep(#search-engine) {
  border: none;
  outline: none;
  background-color: #f8f9fa;
  padding: 0 16px;
  border-radius: 8px 0 0 8px;
  flex: 0 1 160px;
  height: 100%;
  font-size: 14px;
  cursor: pointer;
  appearance: none;
}

:deep(#search-input) {
  flex-grow: 1;
  width: 40px;
  height: 40px;
  border: none;
  outline: none;
  padding: 0 10px;
  font-size: 14px;
}

:deep(button) {
  background: linear-gradient(145deg, #ffffff, #f0f0f0);
  border: none;
  cursor: pointer;
  padding: 0 24px;
  height: 100%;
  font-size: 16px;
  color: #FF69B4;
  border-radius: 0 8px 8px 0;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  min-width: 80px;
}

:deep(button:hover) {
  background: #e0e0e0;
  color: #333;
}

.additional-component {
  margin-left: 10px;
}

:deep(#tg) {
  width: 38px;
  height: 38px;
  font-size: 18px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 70px;
  margin-top: 5px;
}

#tg a img {
      vertical-align: middle;
      width: 33px;
      height:33px;
  }
/* 移动端 */ 
  @media (max-width: 768px) {
  :deep(h1) {
    margin-left: 1px;
    margin-bottom: 1px;
    line-height: 38px;
    font-size: 23px;
    max-width: 85vw;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  #header {
    height: 60px;
    background-color: rgb(251, 251, 250);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    overflow-x: hidden;
  }
  :deep(#search-form) {
    margin-left: -25px;
  }

  :deep(#header-content) {
    display: flex;
    width: 180px;
    gap: 1px; 
    align-items: center;
    line-height: 40px;
    height: 90%;
  }

  :deep(#search-input) {
    padding: 2px;
    width: 80px;
    font-size: 12px;
  }

  :deep(.search-container) {
    margin: 0 5px 0 0;
    height: 32px;
    border-radius: 6px;
  }

  :deep(#search-engine) {
    font-size: 12px;
    max-width: 50%;
  }
  
  button {
    display: none;
    height: 32px;
    font-size: 12px;
  }

  :deep(input)::placeholder {
    opacity: 0;
  }

  :deep(#tg) {
    margin: 0 10px 0 10px;
  }
  #tg a img {
      vertical-align: middle;
      width: 30px;
      height:30px;
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
  background: linear-gradient(145deg, #404040, #2d2d2d) !important;
  color: #FFB6C1 !important;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3) !important;
  &:hover {
    box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.5) !important;
  }
}
.dark-mode h1 {
    filter: brightness(0.5); 
}
.dark-mode #tg {
    filter: brightness(0.5); 
}
</style>