<template>
<div id="bgc">
  <div class="container">
    <h2>导航发布页</h2>
    <div class="link-card">
      <a href="https://yyzs.cloudns.org/" target="_blank">ACGN资源博客</a>
    </div>
    <div class="link-card">
      <a href="https://acg.cloudns.org/" target="_blank">ACGN资源导航</a>
    </div>
    <div class="link-card">
      <a href="https://t.me/yiyun223" target="_blank">友链、合作</a>
    </div>
    <div class="link-card">
      <a href="https://t.me/+01c2MccJ4og4ZjBl" target="_blank">TG防失联群</a>
    </div>
     <div class="link-card">
      <a target="_blank" href="https://imgurls.us.kg/rd.html">来张渋图</a>
     </div>
  </div>
</div>  
</template>

<style scoped>
  html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden; /* 防止滚动条出现 */
  }

  #bgc {
    background-image: url('../../public/bg.jpg'); 
    background-size: cover; 
    background-position: center; 
    background-repeat: no-repeat;
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    padding: 0;
    margin: 0;
  }

        h2{color: gray;}

        .container {
            margin: 0 auto;
            margin-top: 100px;
            width: 90%; 
            max-width: 420px; 
            border-radius: 15px;
            background-color: rgb(244, 238, 238,0.7);
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); 
            padding: 20px;
            text-align: center;
        }
        @media (max-width:767px){
            .container{
                width: 80%;
            }
        }

        a {
            display: block;
            margin-bottom: 15px;
            padding: 15px;
            font-weight: bold;
            background-color:rgba(255, 255, 255, 0.7);
            color: black;
            border-radius: 25px;
            text-decoration: none;
            transition: background-color 0.3s ease; 
            transition: transform 0.3s;
        }


        .link-card:hover{
            transform: translateY(-3px);
        }
</style>