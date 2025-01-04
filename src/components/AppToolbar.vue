<template>
  <div id="Toolbar">
      <img id="openSearchModal" src="/Search.png" alt='search' @click="openModal">
      <img id="darkModeButton" src="/dark.png" alt='dark'>
      <img  id="scrollTopButton" src="/top.png" alt='top'>
  </div>
  <AppModal />
</template>

<script setup>
import { ref, inject,onMounted } from 'vue';
// 从父组件获取 `openModal` 方法
  const openModal = inject('openModal');
  const rightContainer = ref(null);
  let isDarkMode = ref(false);
  
onMounted(()=>{
  rightContainer.value = document.getElementById('right-container');
  const scrollTopButton = document.getElementById('scrollTopButton');
  scrollTopButton.addEventListener('click', () => {
     rightContainer.value.scrollTop = 0;
   });
  const darkModeButton = document.getElementById('darkModeButton');
  const header = document.getElementById('header');
  const leftContainer = document.getElementById('left-container');
  const modalcontent = document.querySelector('.modal-content');
  const sections = document.querySelectorAll('section'); 
  const filterbtn = document.querySelectorAll('.filter-btn'); 
  const textcontent = document.querySelectorAll('.text-content');
  const allLinks = document.querySelectorAll('a.grid-item');
 
  darkModeButton.addEventListener('click', () => {
       isDarkMode.value = !isDarkMode.value;

      // 切换夜间模式 CSS 类
      document.body.classList.toggle('dark-mode', isDarkMode.value);
      header.classList.toggle('dark-mode', isDarkMode.value);
      leftContainer.classList.toggle('dark-mode', isDarkMode.value);
    if(rightContainer.value){
        rightContainer.value.classList.toggle('dark-mode', isDarkMode.value);
    }
      
      modalcontent.classList.toggle('dark-mode', isDarkMode.value);

      // 遍历 sections 添加/移除夜间模式
      sections.forEach(section => section.classList.toggle('dark-mode', isDarkMode.value));
      filterbtn.forEach(btn => btn.classList.toggle('dark-mode', isDarkMode.value));

      // 遍历 text-content 添加/移除夜间模式
      textcontent.forEach(txt => txt.classList.toggle('dark-mode', isDarkMode.value));
      allLinks.forEach(link => link.classList.toggle('dark-mode', isDarkMode.value));
  });
})
</script>

<style scoped>

#Toolbar{
    display: flex; 
    flex-direction: column; 
    justify-content: center; 
    align-items: center; 
    position: fixed;
    bottom: 15px;
    right: 15px;
    width: 50px; 
    height: auto;
    color: red;
    text-align: center;
    z-index: 9999;
    outline: none; 
}

#Toolbar img{
    margin-left: 10px; 
    cursor: pointer;
    background-color: rgb(67, 56,202);
    padding: 5px;
    border-radius: 50%;
    border: none;
    width: 30px;  
    height: 30px;
    z-index: 9999;
    margin-bottom: 5px; /* 在每个图片下方添加一些间距 */
}
.dark-mode {
    background-color: black !important; 
    color: gray !important;  
}
.dark-mode #Toolbar img {
    filter: brightness(0.5); 
}
@media(max-width:768px) {
    #Toolbar{
        right: 5px;
    }
    #Toolbar img{        
        width: 28px;  
        height: 28px;}
}
</style>