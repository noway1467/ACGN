<template>
  <div id="right-container">
    <section v-for="(sectionData, sectionId) in siteConfig" :key="sectionId" :id="sectionId">
      <h3>{{ sectionData.title }}</h3>
      <div class="filter-buttons">
        <button v-for="category in sectionData.categories" :key="category" class="filter-btn"
          :class="{ active: category === '全部' }" :data-category="category === '全部' ? 'all' : category">
          {{ category }}
        </button>
      </div>

      <div class="grid-container">
        <a v-for="site in sectionData.sites" :key="site.name" class="grid-item" :data-category="site.category"
          :href="site.url" target="_blank" :title="site.description">
          <div class="content">
            <div v-if="site.icon" class="icons" >
              <img :alt="site.name" :src="site.icon"  loading="lazy"/>
            </div>
            <div v-else class="square-bg" :style="{ backgroundColor: site.squareColor || generateRandomColor() }">
              {{ site.name.charAt(0) }}
            </div>
            <div class="text-content">{{ site.name }}</div>
          </div>
        </a>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref} from 'vue';
import siteConfig from '../siteConfig.js';

const allLinks = ref([]);
const filterButtons = ref([]);
const gridItems = ref([]);

function generateRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const a = 0.5; // 透明度
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

onMounted(() => {
  allLinks.value = document.querySelectorAll('a.grid-item');
  filterButtons.value = document.querySelectorAll('.filter-btn');
  gridItems.value = document.querySelectorAll('.grid-item[title]');
  const sections = document.querySelectorAll('section');

  function filterItems(category, section) {
  const gridItems = section.querySelectorAll('.grid-item');
  gridItems.forEach(item => {
    const itemCategories = item.getAttribute('data-category').split(','); // 将逗号分割为数组
    if (category === 'all' || itemCategories.includes(category)) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
}


  sections.forEach(section => {
    const buttons = section.querySelectorAll('.filter-btn');
    buttons.forEach(button => {
      button.addEventListener('click', function () {
        const category = this.getAttribute('data-category');
        buttons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        filterItems(category, section);
      });
    });
    filterItems('all', section);
  });

  handleEventsBasedOnWidth();
  window.addEventListener('resize', handleEventsBasedOnWidth);
});

// 处理移动端与桌面端的事件绑定
function handleEventsBasedOnWidth() {
  const isMobile = window.innerWidth <= 768;

  gridItems.value.forEach((item) => {
    let btn = item.querySelector('.tooltip-btn');
    if (!btn) {
      btn = document.createElement('img');
      btn.className = 'tooltip-btn';
      btn.src = '/gray-down.png'; // 替换为实际图标路径
      item.appendChild(btn);
    }

    // 确保移除现有的事件监听器
    btn.replaceWith(btn.cloneNode(true)); // 移除所有绑定的监听器
    btn = item.querySelector('.tooltip-btn');

    if (isMobile) {
      // 移动端：只使用按钮点击事件
      btn.addEventListener('click', handleButtonClick);
    } else {
      // 桌面端：添加鼠标事件和按钮点击事件
      item.addEventListener('mouseenter', handleMouseEnter);
      item.addEventListener('mouseleave', handleMouseLeave);
      btn.addEventListener('click', handleButtonClick);
    }
  });
}


// 鼠标移入事件处理
function handleMouseEnter(e) {
  const item = e.currentTarget;
  let tooltip = item.querySelector('.tooltip');

  if (tooltip && tooltip.dataset.fromButton === 'true') {
    return;
  }

  const titleText = item.getAttribute('title');
  if (!titleText) return;

  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = titleText;
    item.appendChild(tooltip);
  }

  tooltip.style.display = 'block';
}

// 鼠标移出事件处理
function handleMouseLeave(e) {
  const item = e.currentTarget;
  const tooltip = item.querySelector('.tooltip');
  if (tooltip && tooltip.dataset.fromButton !== 'true') {
    tooltip.style.display = 'none';
  }
}

// 按钮点击事件处理
function handleButtonClick(e) {
  e.preventDefault();
  e.stopPropagation();

  const item = e.currentTarget.closest('.grid-item');
  const titleText = item?.getAttribute('title'); // 确保 item 存在
  if (!titleText) return;

  let tooltip = item.querySelector('.tooltip');
  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = titleText;
    tooltip.style.display = 'none'; 
    item.appendChild(tooltip);
  }


  // 切换 tooltip 的显示状态
  const isTooltipVisible = tooltip.style.display === 'block';
  tooltip.style.display = isTooltipVisible ? 'none' : 'block';
  tooltip.dataset.fromButton = isTooltipVisible ? 'false' : 'true';

  document.querySelectorAll('.tooltip').forEach((t) => {
  if (t !== tooltip && t.parentElement.contains(tooltip)) {
    t.style.display = 'none';
    t.dataset.fromButton = 'false';
  }
});
// 监听全局点击事件，用于隐藏所有 Tooltip
document.addEventListener('click', (event) => {
  // 如果点击的不是 Tooltip 或 Tooltip 按钮，则隐藏所有 Tooltip
  if (!event.target.closest('.tooltip') && !event.target.closest('.tooltip-btn')) {
    document.querySelectorAll('.tooltip').forEach((tooltip) => {
      tooltip.style.display = 'none';
      tooltip.dataset.fromButton = 'false';
    });
  }
});

}


</script>

<style scoped>
body{padding: 15px;}
#right-container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 12px;
  margin-top: 120px;
  border-radius: 5px;
  overflow-y: auto;
  top: 0;
  bottom: 0;
  background-color: white;
}
h3 {
        font-family: sans-serif;
        position: relative;
        padding-left: 15px;
        color: #ff30a2; 
        font-weight: 600;
        border-left: 6px solid #ff30a2;
        line-height: 1.5;
        margin-bottom: 10px;
    }
    
    h3::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        border-left: 5px solid #ff30a2; 
    }

section {
  border-radius: 5px;
  background-color: #ffffff;
  padding: 10px;
  border: 1px solid transparent;
  box-shadow: 0 0 0 1px rgba(204, 204, 204, 0.5);
  margin-bottom: 20px;
}

@media screen and (max-width: 767px) {
  #right-container {
    margin-top: 40px;
    margin-left: -15px;
    padding: 15px;
    width: 82%;
    max-width: 1250px;
  }
  body{  overflow: hidden;}
  section {
    margin-top: -5px;
    padding-top: 1px;
    border: none;
    box-shadow: none;
    border: 0;
    outline: none;
    margin-bottom: 10px;
  }

  .grid-item {
    width: 95%;
    margin: 0 auto;
  }
}


/* page.css 中 标签筛选按钮  */
.filter-buttons {
  margin-bottom: 15px;
}

@media screen and (max-width: 768px) {
  .filter-btn {
    font-size: 12px;
    margin-bottom: 5px;
  }
}

/* 筛选标签按钮 */
.filter-btn {
  font-size: 13px;
  padding: 5px 10px;
  margin-right: 10px;
  cursor: pointer;
  background-color: #f0f0f0;
  border: none;
  border-radius: 5px;
}

.filter-btn.active {
  background-color: rgb(99, 44, 253);
  color: white;
}

/* end */


.grid-container {
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 20px;
  justify-content: center;
}

hr {
  display: none;
}

.grid-item {
  position: relative;
  padding-right: 30px;
  margin-bottom: 10px;
  display: flex;
  padding: 12px;
  text-align: center;
  color: black;
  font-weight: bold;
  text-decoration: none;
  display: block;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s, background-color 0.3s;
}


:deep(.tooltip) {
  display: none;
  background-color: rgba(34, 34, 34, 0.85);
  color: #fff;
  font-size: 13px;
  font-weight: normal;
  border: 1px solid #555;
  position: absolute;
  padding: 10px;
  border-radius: 8px;
  z-index: 9999;
  width: 95%;
  max-width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  margin-top: 20px;
  left: 50%;
  transform: translateX(-50%);
}

:deep(.tooltip::before) {
  content: "";
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 7px;
  border-style: solid;
  border-color: transparent transparent rgba(34, 34, 34, 0.6) rgba(34, 34, 34, 0.6);
}

:deep(.tooltip::after) {
  content: "";
  position: absolute;
  top: -11px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 11px;
  border-style: solid;
  border-color: transparent transparent transparent;
}

:deep(.tooltip-btn) {
  display: none;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  width: 35px;
  height: 32px;
  line-height: 25px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  font-size: 12px;
  text-align: center;
  opacity: 0.6;
  transition: background-color 0.3s ease;
}

:deep(.tooltip-btn::before) {
  content: "";

  font-size: 20px;
}

@media (max-width: 768px) {
  :deep(.tooltip-btn) {
    display: block;
  }

  :deep(.tooltip) {
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

:deep(.show-tooltip) {
  display: block;
}


.content {
  display: flex;
  align-items: center;
  justify-content: left;
}

.square-bg {
  width: 30px;
  height: 30px;
  color: white;
  background-color: rgba(195, 187, 196, 0.8);
  border-radius: 10px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.text-content {
  color: rgb(128, 128, 144);
  max-width: calc(100% - 40px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.grid-item:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  background-color: #f1f1f1;
}

.grid-item:hover .tooltip {
  display: block;
}

/* 网站图标 */
.icons{
        width: 32px;
        height: 32px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-right: 10px;
    }
    .icons img{
        border-radius: 50%; 
        height:30px;
    }
    .icons-other{
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-right: 10px;
    }
    .icons-other img{
        border-radius: 50%; 
        height:35px;
    }
        #bottom-bar {
          bottom: 0;
          left: 0;
          width: 100%;
          height: 30px;
          padding: 5px;
          line-height: 30px;
          background-color: rgb(240, 242, 245);
          text-align: center;
          color: black;
          overflow-y: auto;
        }
    
        #bottom-bar span {
          color: inherit;
        }
        :deep(.dark-mode .filter-btn.active) {
    background-color: #000;
    color: #fff; 
    border: 1px solid #333; 
}
.dark-mode {
    background-color: black !important; 
    color: gray !important;  
}

:deep(.dark-mode img) {
    filter: brightness(0.8); 
}
:deep(.dark-mode h3) {
    filter: brightness(0.7); 
}
:deep(.dark-mode .tooltip) {
    filter: brightness(0.8); 
}
:deep(.dark-mode .square-bg) {
    color: gray!important; 
}

</style>
