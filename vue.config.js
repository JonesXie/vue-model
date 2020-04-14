const path = require("path");

function resolve(dir) {
  return path.join(__dirname, ".", dir);
}
module.exports = {
  lintOnSave: false, //保存时使用eslint
  productionSourceMap: false, //生产环境取消sourcemap
  devServer: {
    open: true, // 是否自动打开浏览器页面
    host: "0.0.0.0", // 指定使用一个 host 0.0.0.0，默认是 localhost
    port: 8080 // 端口地址
    // https: true //开启本地HTTPS
    // proxy: {
    //   '/api': { //代理api
    //     target: "http://192.168.124.148:8805", //服务器api地址
    //   }
    // }
  },
  css: {
    //预处理sass
    loaderOptions: {
      scss: {
        prependData: `@import "~@/utils/public.scss";`
      }
    }
  },
  chainWebpack: config => {
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear(); // 重要:清除已有的所有svg loader。
    // 添加要替换的 loader
    svgRule
      .rule("svg-sprite-loader")
      .test(/\.svg$/)
      .include.add(resolve("src/icons")) //处理svg目录
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      });
  }
};
