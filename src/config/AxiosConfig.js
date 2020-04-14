import axios from "axios";
import router from "@/config/RouterConfig"; //引入路由配置
import store from "@/store/store.js"; //引入vuex配置
import qs from "qs";
import AxiosCache from "./AxiosCache";

// 此配置含有**请求缓存**，若要不用请求缓存，可以设置**cache为false**或者使用**_AxiosConfig.js**文件

// 修改axios部分默认值
let changeDefault = {
  baseURL: process.env.VUE_APP_Axios_URL, //请求地址, process.env.BASE_API默认地址
  timeout: process.env.NODE_ENV === "development" ? 0 : 10000 // 请求时长;
  // withCredentials: true, //表示跨域请求时是否需要使用凭证，默认为false
};
Object.assign(axios.defaults, changeDefault);

new AxiosCache(axios, {
  // 请求拦截器
  requestInterceptorFn: config => {
    // do somethings
    return Promise.resolve(config); // 需要用Promise将config返回
  },
  // 响应拦截器
  responseInterceptorFn: response => {
    // 自定义响应拦截器，可统一返回的数据格式也可拦截错误
    const res = response.data;
    // 根据后台提供的状态进行管理
    if (res.result === 1) {
      // 请求成功处理
      return Promise.resolve(response);
    } else if (res.result === 0) {
      //没有权限/未登录
      router.replace("/");
      const CancelToken = axios.CancelToken;
      store.state.source.cancel && store.state.source.cancel(); //中断请求
      store.commit("SET_SOURCE", CancelToken.source());
      return new Promise(() => {}); //中断操作链
    } else {
      //不符合预期的返回状态
      return Promise.reject(res);
    }
  }
});

// 封装请求
export const post = (url, data, config = {}) => {
  let defaultConfig = { isJson: true, cache: false }; //默认不缓存请求
  Object.assign(defaultConfig, config);
  return axios({
    method: "POST",
    url: url,
    data: defaultConfig.isJson ? data : qs.stringify(data), // 通过isJson来确定传参格式是json还是formData，默认是json
    ...defaultConfig
  });
};
export const get = (url, data, config = {}) => {
  let defaultConfig = { cache: false }; //默认不缓存请求
  Object.assign(defaultConfig, config);
  return axios({
    method: "GET",
    url: url,
    params: data,
    ...defaultConfig
  });
};

// 默认导出
export default axios;
