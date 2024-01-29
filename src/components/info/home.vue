<script setup>
import pageHeader from "@/components/common/nav.vue";
// 地图交互菜单组
import mapGeomtryGroup from "@/components/common/mapGeomtryGroup.vue";
import { ref, onMounted, reactive, inject, watch, onUnmounted } from "vue";
import videoConferencing from "./videoConferencing.vue";
import videoMonitoring from "./videoMonitoring.vue";
import phoneCall from "./phoneCall.vue";
import eventVerification from "../common/eventVerification.vue";
import eventSupplementaryRecording from "../common/eventSupplementaryRecording.vue";
import eventView from "../common/eventView.vue";
import map2d from "@/components/map/map2d/map.vue";
import { assetsUrl } from "@/components/map/map2d/hook/index";
import rainfallThreePopup from './rainfallThreePopup.vue'
import yjxx from "@/views/components/yjxx.vue";
import timeSelect from './timeSelect.vue'
import searchDialog from './searchDialog.vue'

import { useEventBus } from "@vueuse/core";

const bus = useEventBus("goDispatchPage");
const listener = function (e) {
  console.log(e);
  let id = e.id;
  window.location.href = window.zhddUrl + "?id=" + id;
};
bus.on(listener);
// import Mixin from "@/utils/drawMixin";

import { useRoute } from "vue-router";
const route = useRoute();
const nowPath = ref("");
const $mitt = inject("$mitt");

const data = reactive({
  searchList: [],
});

const trajectoryBus = useEventBus("trajectory");
const trajectoryBusListener = function (e) {
  $mitt.emit("trajectoryTimeSelect",e)
};
trajectoryBus.on(trajectoryBusListener);
const toggleGeomtryGroupClick = (val) => {
  if (val) {
    //展开
  } else {
    //收起
    data.searchList = [];
  }
};

onMounted(() => {
  initMap();
  nowPath.value = route.path;
  // 初始化自适应-在刚显示的时候就开始适配一次
  handleScreenAuto();
  // 绑定自适应函数-防止浏览器栏变化后不再适配(这里可做节流优化)
  window.onresize = () => handleScreenAuto();
});

onUnmounted(() => {
  bus.off(listener);
  trajectoryBus.off(trajectoryBusListener);
});

watch(route, (val) => {
  console.log("=====", val.path);
  nowPath.value = val.path;
  $mitt.emit("clearAll", {});
  initMap();
});

const initMap = function () {
  //导入区域边界的geo数据 进行绘制
  let mittData = {
    url: assetsUrl("/geoJson/yl.json"),
    // url: "http://1.85.55.225:8085/YouMapServer/rest/service/sxwwCGCS2000/VectorTileServer/styles/blue_yj-225.json",
    geoType: "maskGeo",
    mask: true,
    type: "mask",
    style: {
      outlineColor: "#fff",
      outlineWidth: 5, //宽度
    },
  };
  // $mitt.emit("drawGeoGraph", mittData);

  $mitt.emit("addMapGlLayer", {
    center: { lng: 109.784585, lat: 38.297187 },
    style:
      "http://1.85.55.225:8085/YouMapServer/rest/service/sxwwCGCS2000/VectorTileServer/styles/YXSL-225.json",
  });
  // //导入包含行政区划的geo数据 进行绘制
  let mittLineData = {
    url: assetsUrl("/geoJson/yjqx.json"),
    geoType: "line",
    mask: false,
    type: "line",
    style: {
      outlineColor: "rgba(0, 107, 206, 0.80)",
      fill: false, //是否覆盖
      outline: true,
      outlineWidth: 5, //宽度
    },
  };
  $mitt.emit("drawGeoGraph", mittLineData);
  //显示区域的行政区划名称
  setTimeout(() => {
    $mitt.emit("geoSetCenterTxt", {
      url: assetsUrl("/geoJson/yjqx.json"),
      style: { color: "#fff", font_size: 14 },
    });
  }, 500);
};

// 数据大屏自适应函数
const handleScreenAuto = () => {
  // const designDraftWidth = 1920; // 设计稿的宽度
  // const designDraftHeight = 1080; // 设计稿的高度

  // // 根据屏幕的变化适配的比例
  // const scale =
  //   document.documentElement.clientWidth /
  //     document.documentElement.clientHeight <
  //   designDraftWidth / designDraftHeight
  //     ? document.documentElement.clientWidth / designDraftWidth
  //     : document.documentElement.clientHeight / designDraftHeight;

  // document.querySelector(
  //   "#screen"
  // ).style.transform = `scale(${scale}) translate(-50%)`;
};
</script>

<template>
  <div class="home-container">
    <div class="screenBox" id="screen">
      <!-- 头部 -->
      <pageHeader style="position: relative;z-index: 100000;"></pageHeader>
      <div class="mapBox">
        <map2d></map2d>
      </div>
      <!-- 地图操作组件 -->
      <mapGeomtryGroup @toggleGeomtryGroupClick="toggleGeomtryGroupClick">
        <!-- <mapGeomtryGroup v-if="nowPath !== '/home'" @toggleGeomtryGroupClick="toggleGeomtryGroupClick"> -->
      </mapGeomtryGroup>
      <videoConferencing></videoConferencing>
      <videoMonitoring></videoMonitoring>
      <phoneCall></phoneCall>
      <eventVerification></eventVerification>
      <eventSupplementaryRecording></eventSupplementaryRecording>
      <eventView></eventView>
      <rainfallThreePopup></rainfallThreePopup>
      <yjxx></yjxx>
      <timeSelect></timeSelect>
      <searchDialog></searchDialog>
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped lang="less">
.mapBox {
  // width: 1920px;
  // height: 1080px;
  width: 100vw;
  height: 100vh;
}

.home-container {
  // min-height: 1080px;
  // min-width: 1920px;
  // width: 100%;
  // height: auto;
  // margin: 0 auto;
  // position: relative;
  // overflow: hidden;
  // color: #ffffff;
  height: 100%;
  width: 100%;
  color: #ffffff;
  background-color: #04143f;
  .screenBox {
    display: inline-block;
    // width: 1920px; //设计稿的宽度
    // height: 1080px; //设计稿的高度
    width: 100vw; //设计稿的宽度
    height: 100vh; //设计稿的高度
    transform-origin: 0 0;
    position: absolute;
    left: 0;
    overflow: hidden;
  }
}

.map {
  width: 100%;
  height: 100%;
  background: rgba(3, 18, 38, 0.7);
}

.webRtc {
  position: absolute;
  left: 0;
  top: 0;
  width: 300px;
  height: 200px;
}

.layoutAuto {
  position: fixed;
  top: 0;
  left: 0;
  width: 500px;
  height: 400px;
}
</style>
