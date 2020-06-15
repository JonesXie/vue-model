const path = require("path");
const CompressionWebpackPlugin = require("compression-webpack-plugin"); // gzip压缩
const productionGzipExtensions = ["js", "css"]; // 需要gzip压缩的文件，图片不要压缩，体积会比原来还大
function resolve(dir) {
  return path.join(__dirname, ".", dir);
}
module.exports = {
  lintOnSave: true, //保存时使用eslint
  productionSourceMap: false, //生产环境取消sourcemap
  devServer: {
    open: true, // 是否自动打开浏览器页面
    host: "0.0.0.0", // 指定使用一个 host 0.0.0.0，默认是 localhost
    port: 8080, // 端口地址
    disableHostCheck: true,
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
        prependData: `@import "~@/utils/public.scss";`,
      },
    },
  },
  chainWebpack: (config) => {
    // 加载svg图
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
        symbolId: "icon-[name]",
      });
  },
  configureWebpack: () => {
    // gzip压缩
    if (process.env.NODE_ENV === "production") {
      return {
        plugins: [
          new CompressionWebpackPlugin({
            // filename: '[path].gz[query]',
            algorithm: "gzip",
            test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
            threshold: 10240, //对超过10k的数据进行压缩
            minRatio: 0.6, // 压缩比例，值为0 ~ 1
          }),
        ],
      };
    }
  },
};
