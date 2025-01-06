<template>
  <div id="left-container">
    <ul id="menu">
        <li @click="scrollToSection('anime')">动漫</li>
        <li @click="scrollToSection('down')">下载</li>
        <li @click="scrollToSection('comic')">漫画</li>
        <li @click="scrollToSection('movie')">影视</li>
        <li @click="scrollToSection('novel')">小说</li>
        <li @click="scrollToSection('game')">游戏</li>
        <li @click="scrollToSection('music')">音乐</li>	
        <li @click="scrollToSection('pic')">美图</li>  
        <li @click="scrollToSection('trace')">找出处</li>
        <li @click="scrollToSection('ndbt')">网盘BT</li>
        <li @click="scrollToSection('wiki')">资料</li>
        <li @click="scrollToSection('ai')">A·I</li>
        <li @click="scrollToSection('pc')">P·C</li>
        <li @click="scrollToSection('apps')">APP</li>
    </ul>
   </div>
</template>

<script setup>
import { onMounted } from 'vue';
const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  const rightContainer = document.getElementById('right-container');
  const offset = 10;

  if (sectionId === 'anime') {
    rightContainer.scrollTop = 0; // 如果是 'anime' section，滚动到顶部
    return;
  } else if (section) {
    const sectionTop = section.offsetTop;
    rightContainer.scrollTop = sectionTop - (rightContainer.offsetTop + offset);
  }
};
onMounted(() => {
  const menuItems = document.querySelectorAll('#menu li');
  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      menuItems.forEach(otherItem => otherItem.removeAttribute('selected'));
      item.setAttribute('selected', '');
    });
  });
});
</script>
  
<style scoped>

    #left-container {
    margin-left: -10px;  
    background-color: rgb(240,242,245);
    position: fixed;
    left: 0;
    top: 70px;
    display: flex;
    justify-content: center; 
    width: 100%; 
    padding: 5px;
    height: 40px;
    }


    /* 菜单项横向排列 */
    #left-container ul {
    display: flex; 
    list-style: none; 
    padding: 10px;
    }


    #left-container li {
    padding: 0 15px;
    font-weight: 500;
    font-size: 16px;
    color: #333;
    cursor: pointer;
    line-height: 2;
    display: flex;
    align-items: center;
    transition: background-color 0.3s ease; 
    }


    #left-container li:hover {
    color: #007bff;
    }
    #menu li:hover,
    #menu li:active,
    #menu li[selected] {
    color: skyblue; 
    }

    /* 移动端适配 */
    @media screen and (max-width: 768px) {

      #left-container {
          left: 5px;
          top: 40px;
          width: 20%;
          padding: 5px ;
          height: 100%;
          position: relative; 
          background-color: #fff;
          z-index: 999;
      }

      #menu {
          width: 100%;
          display: flex;
          flex-direction: column;
          list-style: none;
      }

      #menu li {
          line-height: 1.8;
          margin-bottom: 9px;
          font-weight:normal;
          overflow: hidden; 
          white-space: nowrap;
          padding: 2px;
      }
    }
    .dark-mode {
    background-color: black !important; 
    color: gray !important;  
}
.dark-mode #left-container{
    background-color: black !important; 
    color: rgb(155, 139, 139) !important;  
}
.dark-mode #menu li {
    color:gray !important; 
}


</style>