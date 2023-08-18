<script setup>
import fscreen from "@/utils/fullscreen.js";
import { ref } from "vue";

const pageHeader = ref();
// 全屏
const toggleFullscreen = function () {
  if (fscreen.fullscreenElement === null) {
    fscreen.requestFullscreen(document.getElementsByTagName("body")[0]);
  } else {
    fscreen.exitFullscreen();
  }
};

const nowTab = ref(1);
const changeTab = function (tab) {
  nowTab.value = tab;
};
</script>

<template>
  <header ref="pageHeader">
    <div class="left_content">
      <ul class="tabs">
        <li @click="changeTab(1)">
          <img src="@/assets/header/zrzh_active.png" v-if="nowTab === 1" alt="">
          <img src="@/assets/header/zrzh.png" v-else alt="">
        </li>
        <li @click="changeTab(2)">
          <img src="@/assets/header/aqsc_active.png" v-if="nowTab === 2" alt="">
          <img src="@/assets/header/aqsc.png" v-else alt="">
        </li>
      </ul>
    </div>
    <!-- <div class="center_word">这是中间的文字</div> -->
    <div class="right_content">
      <!-- <div class="fullscreen_box" @click="toggleFullscreen">
        <el-icon size="48" color="gray">
          <FullScreen />
        </el-icon>
      </div> -->
      <ul class="tabs">
        <li @click="changeTab(3)">
          <img src="@/assets/header/zhdd_active.png" v-if="nowTab === 3" alt="">
          <img src="@/assets/header/zhdd.png" v-else alt="">
        </li>
        <li @click="changeTab(4)">
          <img src="@/assets/header/jcfx_active.png" v-if="nowTab === 4" alt="">
          <img src="@/assets/header/jcfx.png" v-else alt="">
        </li>
      </ul>
    </div>
  </header>
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
  z-index: 100;
  .center_word {
    font-weight: 600;
    font-size: 48px;
    color: #ccc;
    line-height: @header_height;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
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
</style>