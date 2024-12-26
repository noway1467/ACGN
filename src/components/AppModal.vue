<template>
  <div id="searchModal" class="modal" v-show="isModalOpen" @click.self="closeModal">
    <div class="modal-content">
      <span class="close" @click="closeModal">×</span>
      <h2>搜索导航内的网站</h2>
      <div class="searchContainer">
        <input
          type="text"
          id="searchInput"
          placeholder="搜索导航"
          v-model="searchTerm"
          @keyup.enter="performSearch"
        />
        <button id="searchButton" @click="performSearch">🔍</button>
      </div>
      <div id="searchResults">
        <div
          v-for="(item, index) in searchResults"
          :key="index"
          class="grid-item"
          @click="goToLink(item.element)"
        >
          <div class="content">
            <div :class="item.iconClass">
              <template v-if="item.iconClass === 'icons'">
                <img :src="item.iconSrc" alt="icon" />
              </template>
              <template v-else>
                {{ item.text.charAt(0) }}
              </template>
            </div>
            <div class="text-content">{{ item.text }}</div>
          </div>
        </div>
        <p v-if="searchResults.length === 0 && searchTerm">{{ noResultsMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, onMounted, watch } from 'vue';

// 从 App.vue 注入 isModalOpen
const isModalOpen = inject('isModalOpen');

const allLinks = ref([]);
const searchTerm = ref('');
const searchResults = ref([]);
const noResultsMessage = ref('没有找到匹配的结果。');

// 关闭模态框
const closeModal = () => {
  isModalOpen.value = false;
  searchTerm.value = '';
  searchResults.value = [];
};

// 搜索功能
const performSearch = () => {
  const st = searchTerm.value.toLowerCase().trim();
  searchResults.value = [];

  if (st === '') {
    noResultsMessage.value = '请输入搜索关键词。';
    return;
  }

  let hasResults = false;
  const uniqueResults = new Set(); // 用于存储唯一的链接

  allLinks.value.forEach((link) => {
    const textContent = link.querySelector('.text-content');
    const text = textContent ? textContent.textContent.toLowerCase() : '';
    const title = link.getAttribute('title') ? link.getAttribute('title').toLowerCase() : '';

    // 检查是否包含搜索关键词
    if (text.includes(st) || title.includes(st)) {
      const iconElement = link.querySelector('.icons img');
      const iconSrc = iconElement ? iconElement.getAttribute('src') : null;

      // 创建结果对象
      const result = {
        text: textContent.textContent,
        element: link,
        iconClass: iconSrc ? 'icons' : 'square-bg',
        iconSrc: iconSrc,
      };

      // 检查是否已经存在相同的链接
      const resultKey = `${result.text}-${result.iconSrc}`; // 使用 text 和 iconSrc 作为唯一标识
      if (!uniqueResults.has(resultKey)) {
        searchResults.value.push(result);
        uniqueResults.add(resultKey);
        hasResults = true;
      }
    }
  });

  // 如果没有结果，显示提示信息
  if (!hasResults) {
    noResultsMessage.value = '没有找到匹配的结果。';
  }
};



// 点击搜索结果跳转到对应链接
const goToLink = (element) => {
  window.open(element.href,'_blank')
  closeModal();
};

// 页面加载时初始化链接
onMounted(() => {
  allLinks.value = document.querySelectorAll('a.grid-item');
});

// 监听 isModalOpen 变化，如果模态框关闭，则清空搜索结果和输入框
watch(isModalOpen, (newVal) => {
  if (!newVal) {
    searchTerm.value = '';
    searchResults.value = [];
  }
});
</script>


<style scoped>
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  padding: 20px;
  border: 1px solid #888;
  width: 90%;
  max-width: 600px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  margin-bottom: 20px;
  color: #333;
}

.searchContainer {
  position: relative;
  margin-bottom: 25px;
  display: inline-block;
}

#searchInput {
  padding: 10px 40px 10px 15px;
  width: 300px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 25px;
}

#searchButton {
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: #4caf50;
}

#searchResults {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.grid-item {
  text-decoration: none;
  color: inherit;
  cursor: pointer; /* 添加鼠标指针样式 */
}

.grid-item .content {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* 网站图标 */
.icons {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 10px;
}

.icons img {
  border-radius: 50%;
  height: 30px;
}

.text-content {
  color: rgb(128, 128, 144);
  max-width: calc(100% - 40px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.square-bg {
  width: 30px;
  height: 30px;
  color: white;
  background-color: rgba(195, 187, 196, 0.5);
  border-radius: 10px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 关闭按钮样式 */
.close {
  float: right;
  position: relative;
  font-size: 28px; 
  font-weight: bold;
  cursor: pointer;
  color: black;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

/* 夜间模式支持 */
:deep(.dark-mode #searchInput) {
  background-color: #333;
  color: #fff;
  border-color: #555;
}

:deep(.dark-mode #searchButton) {
  color: #fff;
}
:deep(.dark-mode .modal-content){
  background-color: #292929;
}
/* 移动端样式 */
@media (max-width: 768px) {
  .modal {
    align-items: flex-start;
    top: 10;
    padding-top: 100px; 
  }

  .modal-content {
    margin-top: 20px;
    padding: 5px;
    width: 95%;
  }
  #searchInput{width: 80%;}
  .grid-item {
    width: 45%; /* 每个搜索结果项的宽度调整为屏幕宽度的 45% */
    margin-bottom: 10px; /* 增加底部间距 */
  }
  .text-content {
    font-size: 14px; /* 缩小字体大小 */
  }
  #searchResults {
    gap: 5px; /* 缩小搜索结果项之间的间距 */
  }

}
</style>