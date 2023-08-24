<script setup>
import { ref, onMounted, reactive, computed, watch, provide } from "vue";
import * as echarts from "echarts";
import { login } from "./api/modules/login";

provide("echarts", echarts); // 全局注入echarts
const zoom = ref(null);
window.addEventListener("optimizedResize", function () {
  let app = document.getElementById("app");
  let scale = document.documentElement.clientWidth / 1920;
  app.style.cssText = "zoom:" + scale + "";
});

const scale = () => {
  let app = document.getElementById("app");
  zoom.value = document.documentElement.clientWidth / 1920;
  app.style.cssText = "zoom:" + zoom.value + "";

  // 防抖
  (function () {
    let throttle = function (type, name, obj) {
      obj = obj || window;
      let running = false;
      let func = function () {
        if (running) {
          return;
        }
        running = true;
        requestAnimationFrame(function () {
          obj.dispatchEvent(new CustomEvent(name));
          running = false;
        });
      };
      obj.addEventListener(type, func);
    };

    throttle("resize", "optimizedResize");
  })();
};
const getTokenSuccess = ref(false);
// 模拟登录
const initLogin = function () {
  console.log(1)
  let token = sessionStorage.getItem("token");
  console.log(2,token)
  if(token) return getTokenSuccess.value = true;;
  login().then((res) => {
    sessionStorage.setItem("token", res.data.password);
    getTokenSuccess.value = true;
  });
};
initLogin()
onMounted(() => {
  // scale();

  // 融合通讯登录人信息
  localStorage.setItem(
    "sipConfig",
    JSON.stringify({
      gh: "6002",
      fj: "6002",
      status: "1",
    })
  );
});
</script>

<template>
  <router-view v-if="getTokenSuccess"></router-view>
</template>

<style>
@import "./styles/index.css";
.el-loading-parent--relative {
  width: 100% !important;
  height: 100% !important;
}
.el-loading-mask {
  position: fixed;
  z-index: 999999;
}
.el-select-dropdown__empty {
  background-color: #213547 !important;
}
.el-popper.is-light {
  background-color: #213547 !important;
}
.el-popper {
  border: 0px !important;
}
.el-popper__arrow ::before {
  background-color: #213547 !important;
  border: 0px !important;
}
.el-popper.is-light .el-popper__arrow::before {
  border: 1px solid var(--el-border-color-light);
  background: #213547 !important ;
  right: 0;
}
</style>
