import Vue from "vue";
import SvgIcon from "@/components/public/SvgIcon"; // svg组件

// register globally
Vue.component("svg-icon", SvgIcon);

const requireAll = (requireContext) => requireContext.keys().map(requireContext);
const req = require.context("./svg", false, /\.svg$/);
// require.context中参数:文件目录，是否包含子目录，正则表达式
requireAll(req);
