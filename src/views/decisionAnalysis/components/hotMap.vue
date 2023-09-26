<script setup>
import { onMounted, onUnmounted, ref, inject, nextTick } from "vue";
import {
  mapDeafultOps,
  drawGeoJsonStyle,
  LabelStyle,
} from "@/components/map/map2d/config/map.config.js";
import { assetsUrl } from "@/components/map/map2d/hook/index";

const deepmerge = inject("$deepmerge");
// 初始化地图
let map = null,
  geoGroup = {},
  labelLayer = null,
  graphicLayer = null;
const initMap = function(){
  let myBase = deepmerge(mapDeafultOps, {});
  map = new mars2d.Map("hot_map_box", myBase);
  // labelLayer = new mars2d.layer.GraphicLayer({
  //   name: "文字渲染图层",
  //   id: "labelLayer",
  // });
  // graphicLayer = new mars2d.layer.GraphicLayer();
  // map.addLayer(graphicLayer);
}
onMounted(()=>{
  initMap()
})
</script>
<template>
  <div id="hot_map_box"></div>
</template>

<style lang="scss" scoped>
#hot_map_box{
  position: fixed;
  // width: 324px;
  // height: 230px;
  width: 80vw;
  height: 80vh;
  left: 0;
  top: 0;
}
</style>