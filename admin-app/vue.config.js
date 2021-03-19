module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '^/api': {
        target: process.env.VUE_APP_ADMIN_DATA_SERVICE || 'http://localhost:8020',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api':'/'
        }
      }
    }
  }
}
