// const webpack = require('webpack');
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  outputDir: '../wechat/web/ai/public/articlesync',
  publicPath: process.env.BASE_URL,
  productionSourceMap: false,
  devServer: {
    // open: true,
    // development server port 8000
    port: 8080,
    proxy: {
      '/api.php': {
        target: 'https://ai.yun36.com/', // 开发
        pathRewrite: { '^/api.php': '/api.php' },
        ws: false,
        changeOrigin: true
      },
      '/editor': {
        target: 'http://localhost:9999', // iframe嵌套页面
        // pathRewrite: { '^/editor': '' },
        ws: false,
        changeOrigin: true
      },
      '/assets': {
        target: 'http://localhost:9999', // iframe嵌套页面
        // pathRewrite: { '^/editor': '' },
        ws: false,
        changeOrigin: true
      }
    }
  },
  chainWebpack: (config) => {
    // 修改文件引入自定义路径
    config.resolve.alias
      .set('@', resolve('src'))
      // .set('style', resolve('src/assets/style'))
  }
  // configureWebpack: {
  //   plugins: []
  // }
};
