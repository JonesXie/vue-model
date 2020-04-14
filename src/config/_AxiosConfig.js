import axios from "axios";
import router from "@/config/RouterConfig"; //引入路由配置
import store from "@/store/store.js"; //引入vuex配置
import qs from "qs";

// 此配置不含**请求缓存**，若要用到请求缓存使用另外的**AxiosConfig.js**文件

// 创建一个axios的实例
const service = axios.create({
  baseURL: process.env.VUE_APP_Axios_URL, //请求地址
  // baseURL: process.env.BASE_API, //默认请求地址
  // withCredentials: true, //表示跨域请求时是否需要使用凭证，默认为false
  timeout: process.env.NODE_ENV === "development" ? 0 : 10000 // 请求时长
});

// 请求拦截
service.interceptors.request.use(
  config => {
    // do something
    return config;
  },
  () => {}
);

// 响应拦截
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.result == 1) {
      // return response;
      return Promise.resolve(res);
    } else if (res.result == -1) {
      router.push("/");
      //请求中断
      const CancelToken = axios.CancelToken;
      store.state.source.cancel && store.state.source.cancel();
      store.commit("SET_SOURCE", CancelToken.source());
      return new Promise(() => {}); //中断操作链
    } else {
      console.log(res.message || "网络错误！请稍后重试");
      return Promise.reject(res);
    }
  },
  error => {
    if (axios.isCancel(error)) {
      // 取消请求的情况下，终端Promise调用链
      return new Promise(() => {});
    } else {
      console.log("网络错误！请稍后重试");
      return Promise.reject(error);
    }
  }
);

// 封装请求
export const post = (url, data, config = {}) => {
  let defaultConfig = { isJson: true };
  Object.assign(defaultConfig, config);
  return axios({
    method: "POST",
    url: url,
    data: defaultConfig.isJson ? data : qs.stringify(data), // 通过isJson来确定传参格式是json还是formData，默认是json
    ...defaultConfig
  });
};
export const get = (url, data, config = {}) => {
  let defaultConfig = {};
  Object.assign(defaultConfig, config);
  return axios({
    method: "GET",
    url: url,
    params: data,
    ...defaultConfig
  });
};

// 默认导出导出
export default service;
