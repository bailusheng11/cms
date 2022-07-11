const path = require('path');

module.exports = {
  // 1.配置方式一：CLI提供的属性
  outputDir: './build',
  // 修改打包文件中的路径为./
  // publicPath: './',
  devServer:{
    proxy: {
      '^/api': {
        target: 'http://152.136.185.210:5000',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  },
  // 2.配置方式二：和webpack属性完全一致，最后会进行合并
  configureWebpack: {
      resolve: {
          alias: {
              components: '@/components'
          }
      }
  },
  // configureWebpack: (config) => {
  //     config.resolve.alias = {
  //         '@': path.resolve(__dirname, 'src'),
  //         components: '@/components'
  //     }
  // },
  // 配置方式三
  // chainWebpack: (config) => {
  //   config.resolve.alias.set('@', path.resolve(__dirname, 'src')).set('components', '@/components')
  // }
}

// 报错就加个 --legacy-peer-deps
// npm install css-loader style-loader
// normalize.css
