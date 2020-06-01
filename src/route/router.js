import vue from "vue";
import VueRouter from "vue-router";

vue.use(VueRouter);
// 解决vue-router 在push/repalce中添加的Promise
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};
const RouterMap = [
  //首页
  {
    path: "/",
    redirect: "/index",
    // alias: "/index",
  },
  {
    path: "/index",
    component: () => import("@/views/index/TheIndex.vue"),
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
