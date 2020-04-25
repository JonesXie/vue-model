import vue from "vue";
import VueRouter from "vue-router";

vue.use(VueRouter);

const RouterMap = [
  //首页
  {
    path: "/",
    component: () => import("@/views/index/TheIndex.vue"),
    alias: "/index",
  },
  {
    path: "/login",
    component: () => import("@/views/login/TheLogin.vue"),
  },
  {
    path: "*",
    //pc
    component: () => import("@/components/404/PC404.vue"),
    //mobile
    // component: () => import('@/components/404/Mobile404.vue'),
  },
];

export default new VueRouter({
  mode: "history",
  scrollBehavior: () => ({
    y: 0,
  }), //滚动到顶部
  routes: RouterMap,
});
