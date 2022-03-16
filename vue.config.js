const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // lintOnSave:false
  devServer: {
    // proxy: "http://47.113.180.139:8080"
  }
})
