const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
<<<<<<< HEAD
  lintOnSave: false,
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
=======
  lintOnSave: false
>>>>>>> c85a8b8 (init project)
})
