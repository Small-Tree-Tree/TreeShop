const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer:{
    // 代理跨域
    proxy: {
      // 前端发送请求中有 /api 的字段，代理服务会去找下面的服务器
      "/api": {
        // target:'http://39.98.123.211:8416'
        target: "http://gmall-h5-api.atguigu.cn",
        // pathRewrite: {"^/api" : ""}
      }
    }
  }
})
