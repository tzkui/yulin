<!-- 路径规划 -->
<template>
  <div class="mapRoute" :class="show?'showRoute':''">
    <h3>路径规划 <span class="closeSpan" @click="hidePlan"></span></h3>
    <div><el-button type="primary" plain @click="startClick">选择起点</el-button>{{startlatlng}}</div>
    <div class="mt10"><el-button type="primary" plain @click="endClick">选择终点</el-button>{{endlatlng}}</div>
    <div class="mt10">
      <el-button type="primary" @click="query">开始规划</el-button>
      <el-button @click="clearRoute">清除路线</el-button>
    </div>
  </div>
  <!-- <div class="routeBox" :class="show?'hideRoute':''" @click="routeBoxClick">路径</div> -->
</template>

<script setup>
import {
  ref,
  onMounted,
  onUnmounted,
  inject,
  defineExpose,
  defineProps,
} from "vue";
import { assetsUrl } from "../hook/index";
// let props = defineProps({
//     layer:{
//         type:Object,
//         default:{}
//     }
// });
let startlatlng = ref("");
let endlatlng = ref("");
let show = ref(false);
let gaodeRoute = null;
let routerLayer = null,
  mymap = null; //props.layer;
const setLayer = (map) => {
  console.log("setLayer--->", map);
  routerLayer = new mars2d.layer.GraphicLayer({
    name: "路径规划",
    id: "route",
    type: "route",
  });
  map.addLayer(routerLayer);
  mymap = map;
};
const startClick = () => {
  routerLayer.startDraw({
    type: "marker",
    id: "router_start",
    style: {
      image: assetsUrl("/images/marker/start.png"),
    },
    success: function (graphic) {
      startlatlng.value = graphic.latlng;
      console.log("graphic--->", graphic);
      const point = graphic.latlng;
    },
  });
};
const endClick = () => {
  routerLayer.startDraw({
    type: "marker",
    id: "router_end",
    style: {
      image: assetsUrl("/images/marker/end.png"),
    },
    success: function (graphic) {
      console.log("graphic--->", graphic);
      endlatlng.value = graphic.latlng;
    },
  });
};
const query = () => {
  if (gaodeRoute) {
    gaodeRoute.clear();
  }
  // if(routerLayer){
  //     routerLayer.clear()
  // }
  gaodeRoute = new mars2d.query.GaodeRoute({
    type: "GaodeRoute",
  });
  let startGraphic = routerLayer.getGraphicById("router_start"),
    endGraphic = routerLayer.getGraphicById("router_end");
  console.log(startGraphic, endGraphic);
  gaodeRoute.query({
    type: Number(3),
    points: [startGraphic.coordinates[0], endGraphic.coordinates[0]],
    success: (data) => {
      const firstItem = data.paths[0];
      console.log("firstItem--->", firstItem);
      const latlngs = mars2d.PointTrans.coords2latlngs(firstItem.points);
      const graphic = new mars2d.graphic.Polyline({
        latlngs: latlngs,
        style: {
          color: "#20a0ff",
          width: 5,
        },
        attr: firstItem,
      });
      routerLayer.addGraphic(graphic);
    },
  });
};
const clearRoute = () => {
  routerLayer.clear();
};
const hidePlan = () => {
  show.value = false;
};
const routeBoxClick = () => {
  show.value = !show.value;
};
console.log("routerLayer--->", routerLayer);
defineExpose({
  setLayer,
});
</script>

<style lang="scss" scoped>
.mapRoute {
  width: 300px;
  position: absolute;
  top: 0px;
  right: 0px;
  right: -310px;
  z-index: 10;
  border: 1px #999 solid;
  border-radius: 2px;
  background-color: rgba(255, 255, 255, 0.7);
  box-sizing: border-box;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 1px;
  color: #000;
  transition: all 0.4s linear;
  h3 {
    margin-bottom: 20px;
    font-size: 18px;
    position: relative;
    .closeSpan {
      position: absolute;
      right: 0px;
      top: 0px;
      width: 20px;
      height: 20px;
      background-image: url("../../../assets/images/marker/close.png");
      background-size: 100% 100%;
    }
    // margin-top: 10px;
  }
  .flex {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .mt10 {
    margin-top: 10px;
  }
  .mr10 {
    margin-right: 10px;
  }
  .ml10 {
    margin-left: 5px;
  }
  .editLabel {
    v-deep .el-text.el-text--info {
      margin-right: 10px;
    }
  }
}
.routeBox {
  position: absolute;
  // width: 40px;
  padding: 0 6px;
  height: 30px;
  right: 0px;
  top: 50px;
  color: #000;
  z-index: 10;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  background-color: rgba(255, 255, 255, 1);
  border: 1px#4e70a6 solid;
  overflow: hidden;
  font-size: 16px;
  text-align: center;
  line-height: 30px;
  opacity: 1;
  transition: all 0.4s linear;
}
.hideRoute {
  opacity: 0;
}
.showRoute {
  right: 0px;
}
</style>