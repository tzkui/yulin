<script setup>
import { onMounted, onUnmounted, ref, inject, nextTick } from "vue";
import {
  mapDeafultOps,
  drawGeoJsonStyle,
  LabelStyle,
} from "@/components/map/map2d/config/map.config.js";
import { assetsUrl } from "@/components/map/map2d/hook/index";

const deepmerge = inject("$deepmerge");

const showDialog = ref(false);

const drawGeoJson = (geoJsonLayerParms) => {
  let style = deepmerge(
    drawGeoJsonStyle[geoJsonLayerParms.type],
    geoJsonLayerParms.style || {}
  );
  geoGroup[geoJsonLayerParms.geoType] = new mars2d.layer.GeoJsonLayer({
    name: "geo绘制图层",
    type: "geoJson_" + geoJsonLayerParms.geoType,
    url: geoJsonLayerParms.url,
    mask: geoJsonLayerParms.mask || false, // 标识为遮罩层【重点参数】
    symbol: {
      styleOptions: style,
    },
  });
  map.addLayer(geoGroup[geoJsonLayerParms.geoType]);
  map.setZoom(8);
};
const addCenterTxt = (data) => {
  //根据包含子级的geo文件添加中心点文字
  let geoUrl = data.url;
  let style = deepmerge(LabelStyle, data.style || { zoom: 20 });
  mars2d.Util.fetchJson({
    url: geoUrl,
  }).then((geojson) => {
    const arr = mars2d.Util.geoJsonToGraphics(geojson); // 解析geojson
    arr.forEach((item) => {
      const center = item.attr.centroid;
      let name = item.attr.name;
      let label = new mars2d.graphic.Label({
        latlng: [center[1], center[0]],
        style: style,
      });
      label.text = name;
      labelLayer.addGraphic(label);
    });
    map.addLayer(labelLayer);
  });
};
const addressName = ref("");
const addressInfo = ref({});
// 初始化地图
let map = null,
  geoGroup = {},
  labelLayer = null,
  graphicLayer = null;
const emits = defineEmits(["choiceLocation"]);
const props = defineProps({
  center: {
    type: Object,
    default() {
      return {};
    },
  },
});
const initMap = function () {
  let myBase = deepmerge(mapDeafultOps, {});
  map = new mars2d.Map("select_location_map_box", myBase);
  labelLayer = new mars2d.layer.GraphicLayer({
    name: "文字渲染图层",
    id: "labelLayer",
  });
  graphicLayer = new mars2d.layer.GraphicLayer();
  map.addLayer(graphicLayer);
  // //导入区域边界的geo数据 进行绘制
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
  drawGeoJson(mittData);

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
  drawGeoJson(mittLineData);
  //显示区域的行政区划名称
  setTimeout(() => {
    addCenterTxt({
      url: assetsUrl("/geoJson/yjqx.json"),
      style: { color: "#fff", font_size: 14 },
    });
  }, 500);
  map.on("click", function (e) {
    let position = e.latlng;
    addressInfo.value = position;
    getAddressName(position.lng, position.lat);
    addMarker(position.lng, position.lat);
  });
};
const getAddressName = function (lng, lat) {
  const url = `https://api.tianditu.gov.cn/geocoder?tk=e5560b1fd7c0c13b47e4966d504e83f0&type=geocode&postStr=%7B%27lon%27%3A${lng}%2C%27lat%27%3A${lat}%2C%27ver%27%3A1%7D`;
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      addressName.value = res.result.formatted_address;
    });
};
const addMarker = function (lng, lat) {
  let a = graphicLayer.getGraphicById("point");
  if (a) {
    graphicLayer.removeGraphic(a);
  }
  let graphic = new mars2d.graphic.Marker({
    latlng: [lat, lng],
    id: "point",
    type: "point",
    name: "point",
    style: {
      image: assetsUrl("/images/marker/1.gif"),
      width: 32,
      height: 32,
      horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
      verticalOrigin: mars2d.VerticalOrigin.BOTTOM,
    },
  });
  graphicLayer.addGraphic(graphic);
};
const save = function () {
  emits("choiceLocation", addressInfo.value);
  showDialog.value = false;
};
const initInfo = function () {
  addressInfo.value = { ...props.center };
  let { lng, lat } = addressInfo.value;
  getAddressName(lng, lat);
  addMarker(lng, lat);
};
defineExpose({
  openDialog() {
    showDialog.value = true;
    nextTick(() => {
      initMap();
      initInfo()
    });
  },
});
</script>
<template>
  <Teleport to="#app">
    <div class="model" v-if="showDialog">
      <div class="select_location">
        <div class="title">地图定位</div>
        <div class="address_name">选中位置：{{ addressName }}</div>
        <div class="select_location_map_box" id="select_location_map_box"></div>
        <div class="footer">
          <button class="cancel" @click="showDialog = false">取消</button>
          <button class="save" @click="save">保存</button>
        </div>
        <div class="close" @click="showDialog = false"></div>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.model {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  .select_location {
    width: 80%;
    height: 90%;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
    .title {
      color: #fff;
      background-color: #005171;
      padding-left: 20px;
      height: 50px;
      line-height: 50px;
    }
    #select_location_map_box {
      width: 100%;
      height: calc(100% - 150px);
      position: relative;
      z-index: 9999999;
    }
    .footer {
      text-align: right;
      background-color: #fff;
      height: 60px;
      button {
        width: 60px;
        height: 36px;
        box-sizing: border-box;
        margin-right: 15px;
        font-size: 14px;
        margin-top: 12px;
      }
      .save {
        color: #fff;
        background-color: #007ea1;
        &:hover {
          opacity: 0.9;
        }
      }
      .cancel {
        border: 1px solid #dedede;
        color: #333;
      }
    }
  }
  .close {
    position: absolute;
    right: 20px;
    top: 15px;
    width: 20px;
    height: 20px;
    background: url(@/assets/natural/icon_close.png) no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
  }
  .address_name {
    height: 40px;
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #595959;
    background-color: #fff;
    padding-left: 20px;
  }
}
</style>
