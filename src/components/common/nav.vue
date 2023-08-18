<script setup>
import fscreen from "@/utils/fullscreen.js";
import { reactive, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import tabzrurl from "@/assets/header/head_tab1_active.png";
import zrzh from "@/assets/header/head_tab1.png";

import aqsc from "@/assets/header/head_tab2.png";
import aqscActive from "@/assets/header/head_tab2_active.png";

import zhdd from "@/assets/header/head_tab3.png";
import zhddActive from "@/assets/header/head_tab3_active.png";
import jcfx from "@/assets/header/head_tab4.png";
import jcfxActive from "@/assets/header/head_tab4_active.png";

const pageHeader = ref();
// 全屏
const toggleFullscreen = function () {
  if (fscreen.fullscreenElement === null) {
    fscreen.requestFullscreen(document.getElementsByTagName("body")[0]);
  } else {
    fscreen.exitFullscreen();
  }
};
const ROUTE_INFO = useRoute(),
  ROUTER_INFO = useRouter();
const data = reactive({
  navList: [
    {
      name: "指挥调度",
      path: "",
      value: 3,
      taburl: zhdd,
      activeurl: zhddActive,
    },
    {
      name: "自然灾害",
      path: "/natural",
      value: 1,
      taburl: zrzh,
      activeurl: tabzrurl,
    },
    {
      name: "安全生产",
      path: "/safePage",
      value: 2,
      taburl: aqsc,
      activeurl: aqscActive,
    },
    {
      name: "决策分析",
      path: "/decisionAnalysis",
      value: 4,
      taburl: jcfx,
      activeurl: jcfxActive,
    },
  ],
  checkValue: 99,
  pageRoute: "",
  index: {
    path: "/",
  },
});

onMounted(() => {
  data.pageRoute = ROUTE_INFO.path;
  data.navList.forEach((item) => {
    if (item.path === ROUTE_INFO.path) {
      data.checkValue = item.value;
    }
  });
});

const navCheckHandle = (row) => {
  if (row.name == "指挥调度") {
    window.location.href = "http://222.212.82.225:20128/map/index/zhdd";
  }
  if (data.pageRoute !== row.path) {
    ROUTER_INFO.push(row.path);
    data.pageRoute = row.path;
  }
  data.checkValue = row.value;
};

const gohome = () => {
  window.location.href = "http://222.212.82.225:20128/home";
};
const gosjfx = () => {
  window.location.href =
    "http://222.212.82.225:20128/map/analysis/page/danger/sjfx";
};
</script>

<template>
  <div>
    <header ref="pageHeader">
      <div class="left_content">
        <ul class="tabs">
          <li @click="navCheckHandle(it)" v-for="(it, ix) in data.navList.slice(0, 2)" :key="ix">
            <img :src="[it.value === data.checkValue ? it.activeurl : it.taburl]">
          </li>
        </ul>
      </div>
      <div class="center_word" @click="navCheckHandle(data.index)">
        <img class="logo" src="@/assets/header/logo.png" alt="">
        <span class="center_title">榆林市应急指挥平台</span>
      </div>
      <div class="right_content">
        <ul class="tabs">
          <li @click="navCheckHandle(it)" v-for="(it, ix) in data.navList.slice(-2)" :key="ix">
            <img :src="[it.value === data.checkValue ? it.activeurl : it.taburl]" alt="">
          </li>
        </ul>
      </div>
      <div class="aside-link" @click="gosjfx()"></div>
      <div class="home" @click="gohome()"></div>
    </header>

    <!-- <div class="back-color"></div> -->
  </div>
</template>

<style lang="less" scoped>
@header_height: 84px;

header {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: @header_height;
  box-sizing: border-box;
  background: url(@/assets/header/bg.png) no-repeat;
  background-size: 100% 100%;
  z-index: 5;

  .home {
    position: absolute;
    width: 30px;
    height: 30px;
    right: 22px;
    top: 13px;
    cursor: pointer;
  }

  .aside-link {
    position: absolute;
    width: 30px;
    height: 30px;
    right: 58px;
    top: 13px;
    cursor: pointer;
  }

  .center_word {
    font-weight: 600;
    font-size: 48px;
    color: #ccc;
    line-height: @header_height;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 500px;
    height: 84px;
    text-align: center;
    cursor: pointer;

    .logo {
      width: 40px;
      height: 40px;
      margin-right: 24px;
    }

    .center_title {
      font-size: 40px;
      font-family: PangMenZhengDao-Regular, PangMenZhengDao;
      font-weight: 400;
      color: #d5ebff;
      line-height: @header_height;
      text-shadow: 0px 3px 8px #6db9ff;
    }
  }

  .left_content {
    .tabs {
      position: absolute;
      display: flex;
      left: 297px;
      top: 14px;

      li {
        width: 160px;
        height: 56px;
        cursor: pointer;
        margin-right: 24px;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .right_content {
    .tabs {
      display: flex;
      position: absolute;
      display: flex;
      right: 297px;
      top: 14px;

      li {
        width: 160px;
        height: 56px;
        cursor: pointer;
        margin-left: 24px;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}

.back-color {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 69px;
  background: linear-gradient(
    145deg,
    rgba(1, 23, 65, 0.9) 0%,
    rgba(17, 48, 106, 0.9) 50%,
    rgba(1, 23, 65, 0.9) 100%
  );
  background-size: 100% 100%;
  z-index: 3;
}
</style>