import router from "@/route/router.js"; //引入路由配置
import store from "@/store/store.js"; //引入vuex配置
import axios from "axios";
router.beforeEach((to, from, next) => {
  //请求中断
  const CancelToken = axios.CancelToken;
  store.state.source.cancel && store.state.source.cancel();
  store.commit("SET_SOURCE", CancelToken.source());
  // next(false) //路由中断
  next();
});

export default router;
