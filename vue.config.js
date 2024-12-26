// vue.config.js
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'ACGN导航',
    },
    home: {
      entry: 'src/pages/home.js',
      template: 'public/home.html',
      filename: 'home.html',
      title: '导航发布页',
    },
    404: {
      entry: 'src/pages/404.js',
      template: 'public/404.html',
      filename: '404.html',
      title: '404 Not Found',
    },
  },
  transpileDependencies: true,
  chainWebpack: config => {
    config.module
      .rule('ico')
      .test(/\.ico$/)
      .use('file-loader')
        .loader('file-loader')
        .options({
            name: '../../public/item_icons/[name].[ext]'
            })
      .end();
     config.module
       .rule('svg')
       .test(/\.svg$/)
       .use('file-loader')
         .loader('file-loader')
         .options({
            name: '../../public/item_icons/[name].[ext]'
             })
       .end();

 }
})