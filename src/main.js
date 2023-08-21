import { createApp } from "vue";
import App from "./App.vue";
import Cookie from "js-cookie";
import router from "./router"; // 路由
import store from "./store"; // 状态机
import ElementPlus from "element-plus";
import "element-plus/dist/index.css"; // element 样式
import locale from "element-plus/lib/locale/lang/zh-cn"; // element 中文
import CScrollbar from "c-scrollbar"; // 滚动条
import ViewBox from "@/components/common/view-box.vue";
import DialogCom from "@/components/common/dialog.vue";
import PhoneCall from "@/components/common/phoneCall.vue";

// import Count from '@/components/common/count.vue';
import "animate.css"; //css动画
import drag from "v-drag";
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
// import 'default-passive-events';

import mitter from "@/utils/mitt.js";
import deepmerge from "deepmerge"; //深度合并

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`;
  const token = Cookie.get("GH_TOKEN");
  if (!token && to.path !== "/login") {
    // next('/login');
    next();
  } else {
    next();
  }
});

const APP_INFO = createApp(App);
APP_INFO.component("ViewBox", ViewBox)
  .component("DialogCom", DialogCom)
  .component("PhoneCall", PhoneCall)
  // .component('Count', Count)
  .use(CScrollbar)
  .use(store)
  .use(router)
  .use(drag)
  .use(Vue3SeamlessScroll)
  .use(ElementPlus, {
    locale,
    size: "default",
  })
  .mount("#app");

APP_INFO.provide("$mitt", mitter); //mitt注入 用于长线使用
APP_INFO.provide("$deepmerge", deepmerge); //深度合并数组对象
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  APP_INFO.component(key, component);
}

APP_INFO.directive("unit", (el, binding) => {
  const type = binding.value;
  switch (type) {
    case "qian":
      el.innerText = (el.innerText / 1000).toFixed(2) + " 千";
      break;
    case "wan":
      el.innerText = (el.innerText / 10000).toFixed(2) + " 万";
      break;
    case "wan":
      el.innerText = (el.innerText / 100000000).toFixed(2) + " 亿";
      break;
    default:
      console.log("啥也不干");
  }
});
