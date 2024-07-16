const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.module
      .rule('pdf')
      .test(/\.(pdf)(\?.*)?$/)
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 8192, // Limit for base64 encoding in bytes
        name: 'assets/pdf/[name].[hash:8].[ext]' // Output directory for PDF files
      });
  }
})
