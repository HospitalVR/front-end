const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // 关闭eslint语法检查
  configureWebpack: {
    module: {
        rules: [
            {
                test: /\.ya?ml$/,
                use: ['js-yaml-loader' ]
            }
        ]
    }
  },
})
