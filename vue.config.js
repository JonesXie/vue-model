module.exports = {
  lintOnSave: false, //保存时使用eslint
  devServer: {
    open: true, // 是否自动打开浏览器页面
    host: '0.0.0.0', // 指定使用一个 host 0.0.0.0，默认是 localhost
    port: 8080, // 端口地址
    // https: true //开启本地HTTPS
    // proxy: {
    //   '/api': { //代理api
    //     target: "http://192.168.124.148:8805", //服务器api地址
    //   }
    // }
  },
  css: {//预处理sass
    loaderOptions: {
      scss: {
        prependData: `@import "~@/public/public.scss";`
      },
    }
  }
}