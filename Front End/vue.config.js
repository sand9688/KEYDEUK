const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave : false,
  pluginOptions:{
    vuetify:{
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    },
  },
  devServer:{
    proxy:{
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        pathRewite:{
          '^/api':''
        }
      },
      '/func':{
        target: 'http://localhost:5000',
        changeOrigin: true,
        pathRewite:{
          '^/func':''
        }
      }
    }
  },
  outputDir:'../backend-ev/public',
  publicPath : process.env.NODE_ENV === 'production'? '/electron-vue/':'/' 
})
