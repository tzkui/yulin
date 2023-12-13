<!-- 2d地图 -->
<template>
  <!-- <div id="m2d"></div> -->
  <div class="mapBox">
    <map2d ref="map2dRef"></map2d>
    <div class="mapLeft">
      <el-button type="primary" @click="addOnceMarker('2_4')">添加单个标记</el-button>
      <!-- <el-button type="primary" @click="addOnceMarker('2_5')">添加单1个标记</el-button> -->
      <el-button type="primary" @click="addMarker2">批量添加</el-button>
      <el-button type="primary" @click="polyline('wz')">路线</el-button>
      <el-button type="primary" @click="polyline2('yj')">路线2</el-button>
      <el-button type="primary" @click="hideMarker('wz', '2_2')">隐藏/隐藏类</el-button>
      <el-button type="primary" @click="drawGeoLayer">绘制区域高亮</el-button>
      <el-button type="primary" @click="startMove">路线回放</el-button>
      <el-button type="primary" @click="upDataLine">更新线路</el-button>
      <el-button type="primary" @click="getBounds">获取可视区域数据</el-button>

      <div>自主绘制</div>
      <el-select v-model="drawType" @change="drawChange" class="m-2" placeholder="请选择图形">
        <el-option v-for="item in drawOps" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <div>各种类图标展示</div>
      <el-select v-model="polygon" @change="polygonChange" class="m-2" placeholder="请选择图形">
        <el-option v-for="item in polygonType" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <div> 绘制可编辑</div>
      <el-select v-model="drawEditType" @change="drawEditChange" class="m-2" placeholder="请选择图形">
        <el-option v-for="item in drawEdit" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <div>切换底图</div>
      <el-button type="primary" @click="setBaseClick('蓝色地图')">蓝色地图</el-button>
      <el-button type="primary" @click="setBaseClick('灰色地图')">灰色地图</el-button>
      <el-button type="primary" @click="setBaseClick('天地图地形')">天地图地形</el-button>
      <el-button type="primary" @click="setBaseClick('天地图卫星')">天地图卫星</el-button>
      <el-button type="primary" @click="clearAll">清除所有</el-button>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { ref, onMounted, onUnmounted, inject } from "vue";
import map2d from "@/components/map/map2d/map.vue";
import { assetsUrl } from "@/components/map/map2d/hook/index";
const $mitt = inject("$mitt");
let map2dRef = ref("");
let drawType = ref("");
let markerList = [
  {
    markerType: "yj",
    id: "1",
    icon: "/marker/m1.png",
    name: "应急标记",
    markerList: [
      {
        markerType: "yj",
        id: "1_2",
        icon: "/marker/m1.png",
        name: "应急标记",
        lng: "104.128009",
        lat: "30.555859",
        label: { text: "应急2", font_size: 16 },
      },
    ],
  },
  {
    markerType: "wz",
    id: "2",
    icon: "/marker/m2.png",
    name: "物资标记",
    markerList: [
      {
        markerType: "wz",
        id: "2_2",
        icon: "/marker/m2.png",
        lng: "104.055713",
        lat: "30.658779",
        name: "物资3",
        label: { text: "物资3", font_size: 16 },
      },
      {
        markerType: "wz",
        id: "2_3",
        lng: "104.080554",
        lat: "30.666913",
        name: "物资2",
        phone: "13511117659",
        icon: "/marker/m2.png",
        label: { text: "物资2", font_size: 16 },
      },
    ],
  },
];
let markerList2 = [
  {
    markerType: "wz",
    id: "2",
    icon: "/marker/m2.png",
    name: "物资标记",
    markerList: [
      {
        markerType: "wz",
        id: "2_7",
        icon: "/marker/m2.png",
        lng: "104.055713",
        lat: "30.658779",
        name: "物资7",
        label: { text: "物资7", font_size: 16 },
      },
      {
        markerType: "wz",
        id: "2_3",
        lng: "104.080554",
        lat: "30.666913",
        name: "物资2",
        phone: "13511117659",
        icon: "/marker/m2.png",
        label: { text: "物资2", font_size: 16 },
      },
    ],
  },
];
let drawOps = [
  {
    value: "marker",
    label: "图标点",
  },
  {
    value: "label",
    label: "文字",
  },
  {
    value: "polyline",
    label: "线",
  },
  {
    value: "brushLine",
    label: "曲线",
  },
  {
    value: "polygon",
    label: "多边形",
  },
  {
    value: "rectangle",
    label: "矩形",
  },
  {
    value: "circle",
    label: "圆形",
  },
];

let drawEdit = [
  {
    value: "marker",
    label: "图标点",
  },
  {
    value: "label",
    label: "文字",
  },
  {
    value: "polyline",
    label: "线",
  },
  {
    value: "brushLine",
    label: "曲线",
  },
  {
    value: "polygon",
    label: "多边形",
  },
  {
    value: "rectangle",
    label: "矩形",
  },
  {
    value: "circle",
    label: "圆形",
  },
  {
    value: "straightArrow",
    label: "粗直箭头",
  },
  {
    value: "fineArrow",
    label: "粗单尖直箭头",
  },
  {
    value: "fineArrowYW",
    label: "燕尾直箭头",
  },
  {
    value: "attackArrow",
    label: "攻击箭头",
  },
  {
    value: "attackArrowPW",
    label: "平尾攻击箭头",
  },
  {
    value: "attackArrowYW",
    label: "燕尾攻击箭头",
  },
  {
    value: "doubleArrow",
    label: "钳击箭头",
  },
  {
    value: "gatheringPlace",
    label: "集结地",
  },
];
let drawEditType = ref("");
let polygon = ref("");
let polygonType = [
  {
    value: "StraightArrow",
    label: "粗直箭头",
  },
  {
    value: "FineArrow",
    label: "粗单尖直箭头",
  },
  {
    value: "FineArrowYW",
    label: "燕尾直箭头",
  },
  {
    value: "AttackArrow",
    label: "攻击箭头",
  },
  {
    value: "AttackArrowPW",
    label: "平尾攻击箭头",
  },
  {
    value: "AttackArrowYW",
    label: "燕尾攻击箭头",
  },
  {
    value: "DoubleArrow",
    label: "钳击箭头",
  },
  {
    value: "Polygon",
    label: "各种面",
  },
  {
    value: "Circle",
    label: "圆",
  },
  {
    value: "GatheringPlace",
    label: "集结地",
  },
];
let polygonTypeS = {
  StraightArrow: [
    [104.060495, 30.656598],
    [104.06286, 30.655975],
    [104.058791, 30.656869],
  ],
  GatheringPlace: [
    [104.067506, 30.658798],
    [104.065021, 30.657667],
    [104.064082, 30.660074],
  ],
  FineArrow: [
    [104.060495, 30.656598],
    [104.06286, 30.655975],
    [104.059702, 30.661181],
  ],
  FineArrowYW: [
    [104.060495, 30.656598],
    [104.06286, 30.655975],
    [104.064149, 30.660842],
  ],
  AttackArrowYW: [
    [104.068238, 30.652159],
    [104.073049, 30.65125],
    [104.070543, 30.654056],
    [104.07076, 30.667146],
  ],
  AttackArrowPW: [
    [104.061449, 30.653681],
    [104.063579, 30.653725],
    [104.061295, 30.658366],
  ],
  AttackArrow: [
    [104.068238, 30.652159],
    [104.073049, 30.65125],
    [104.070543, 30.654056],
    [104.07076, 30.667146],
  ],
  DoubleArrow: [
    [104.0771, 30.639738],
    [104.09677, 30.637716],
    [104.085334, 30.652687],
    [104.087095, 30.644519],
  ],
  Polygon: [
    [104.084989, 30.618419],
    [104.106238, 30.62101],
    [104.101792, 30.634915],
    [104.084263, 30.635248],
  ],
  FineArrow: [
    [104.095994, 30.635374],
    [104.104781, 30.648357],
  ],
  PolygonEntity: [
    [104.084989, 30.618419],
    [104.106238, 30.62101],
    [104.101792, 30.634915],
    [104.084263, 30.635248],
  ],
  Circle: [104.084989, 30.618419],
};
let typeS = ref(true);
const addMarker = () => {
  console.log(map2dRef.value);
  markerList.forEach((item, inx) => {
    console.log(item);
    // map2dRef.value.addLayer(item)
    $mitt.emit("addMarker", item);
  });
};
const addMarker2 = () => {
  console.log(map2dRef.value);
  markerList2.forEach((item, inx) => {
    console.log(item);
    // map2dRef.value.addLayer(item)
    $mitt.emit("addMarker", item);
  });
};
const addOnceMarker = (id) => {
  //104.078782,30.658803
  let data = {
    markerType: "wz",
    id: id,
    lng: "104.078782",
    lat: "30.658803",
    name: "物资4",
    phone: "13511117659",
    icon: "/marker/m2.png",
    label: { text: "物资4", font_size: 16 },
  };
  $mitt.emit("addMarker", data);
};
const polyline = () => {
  let data = {
    type: "polyline2",
    id: "2",
    position: [
      [104.063132, 30.668433, 0],
      [104.063164, 30.659817, 0],
    ],
    style: {
      color: "#00ffff",
    },
  };
  $mitt.emit("drawPolyline", data);
};
const polyline2 = () => {
  let data = {
    type: "polyline3",
    id: "3",
    position: [
      [104.071308, 30.673216, 0],
      [104.073895, 30.609583, 0],
    ],
    style: {
      color: "#00ffff",
    },
  };
  $mitt.emit("drawPolyline", data);
};
const hideMarker = (type, id) => {
  typeS.value = !typeS.value;
  let data = {
    markerType: type,
    id: id,
    show: typeS.value,
  };
  $mitt.emit("changeMarkerState", data);
};
const drawGeoLayer = () => {
  let mittData = {
    url: assetsUrl("/geojson/cd.json"),
    geoType: "maskGeo",
    mask: true,
    type: "mask",
    style: {
      outlineColor: "#00ffff",
    },
  };
  $mitt.emit("drawGeoGraph", mittData);
};
const drawChange = () => {
  let type = drawType.value;
  console.log("type-->", type);
  $mitt.emit("drawGraph", { type: type });
};
const polygonChange = () => {
  let type = polygon.value;
  let position = polygonTypeS[type];
  console.log(type, position);
  if (!position || position.length < 1) {
    console.log("无法获取位置信息。。。");
    return;
  }
  $mitt.emit("drawTypeGraph", { type: type, id: 1, positions: position });
};
const drawEditChange = () => {
  console.log(drawEditType.value);
  $mitt.emit("drawEidtLayer", { type: drawEditType.value });
};
const startMove = () => {
  $mitt.emit("startMove", {
    type: "line1",
    positions: [
      [104.053737, 30.61555],
      [104.0583, 30.613872],
      [104.062971, 30.612442],
      [104.069224, 30.611479],
    ],
  });
};
const getBounds = () => {
  $mitt.emit("postBounds");
};
const setBaseClick = (layerName) => {
  $mitt.emit("setBaseMap", {
    name: layerName,
  });
};
const upDataLine = () => {
  //,
  $mitt.emit("updataMove", { lat: "30.619726", lng: "104.090281" });
};
const clearAll = () => {
  $mitt.emit("clearAll");
};
onMounted(() => {
  addMarker();
  $mitt.on("getBounds", (data) => {
    console.log("getBounds--->", data);
  });
});
</script>

<style lang="scss" scoped>
.mapBox {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.mapLeft {
  position: absolute;
  z-index: 10;
  left: 0px;
  top: 0px;
  border: 1px #4e70a6 solid;
  border-radius: 4px;
  width: 120px;
  box-sizing: border-box;
  padding: 0 10px;
  height: 100%;
  background-color: #000;
  z-index: 20;
  color: #fff;
  font-size: 16px;

  button {
    width: 100%;
    margin: 0px;
    margin-top: 10px;
  }
}
</style>