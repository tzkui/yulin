<!-- 2d地图 -->
<template>
  <div id="map2d"></div>
  <div
    class="labeltxt"
    :class="showTxtEdit ? 'showTxt' : ''"
    style="display: none"
  >
    <el-input v-model="labeltxt" placeholder="Please input" />
    <el-button plain @click="isSu">确定</el-button>
    <el-button plain @click="clear">清除</el-button>
  </div>
  <!-- <div class="measureBox" :class="measureShow?'showMeasure':''">
    <el-button plain @click="measureBtn('length')">长度测量</el-button>
    <el-button plain @click="measureBtn('area')">面积测量</el-button>
    <el-button plain @click="measureClear">清除</el-button>
    <div class="btnRound" @click="showMeasureBtn">测绘</div>
  </div> -->
  <mapEdit
    ref="editRef"
    @viewClick="viewClick"
    @eidtClose="eidtClose"
    style="display: none"
  ></mapEdit>
  <mapRoute ref="routeRef" :layer="routeLayer" style="display: none"></mapRoute>
</template>

<script setup>
import {
  ref,
  onMounted,
  onUnmounted,
  inject,
  defineExpose,
  defineCustomElement,
  defineProps,
} from "vue";
import mapEdit from "./components/map-edit.vue";
import mapRoute from "./components/map-route.vue";
import popupInx from "./components/index.vue";
import { assetsUrl } from "./hook/index";
import {
  mapDeafultOps,
  drawLineStyle,
  drawGeoJsonStyle,
  drawArcStyle,
  drawPolygoStyle,
  moveRouteStyle,
  LabelStyle,
} from "./config/map.config";
const popup = defineCustomElement(popupInx);
customElements.define("map-popup", popup);
const $mitt = inject("$mitt");
const deepmerge = inject("$deepmerge");
const editRef = ref("");
const routeRef = ref("");
let map = null,
  markerLayer = {},
  LineLayer = null,
  geoGroup = {},
  drawLayer = null,
  showLayer = null,
  // showLayerGroup={},
  measure = null,
  editLayer = null,
  editLayerGroup = {},
  labelLayer = null,
  routeLayer = null;
// labelClusterLayer =null;
let moveLayer = null;
let labeltxt = ref(""),
  newLayer = null,
  showTxtEdit = ref(false);
let measureShow = ref(false);
let editGraphic = {};
let delMarkerGraphic = [];
let props = defineProps({
  mapOptions: {
    type: Object,
    default: {},
  },
});
let layerWork = null;
const initMap = () => {
  //104.07217,30.663277
  let myBase = deepmerge(mapDeafultOps, props.mapOptions);
  map = new mars2d.Map("map2d", myBase);
  // labelClusterLayer = new mars2d.layer.ClusterLayer()//ClusterLayer();
  LineLayer = new mars2d.layer.GraphicLayer({
    name: "线路绘制图层",
    id: "LineLayer",
  });
  showLayer = new mars2d.layer.GraphicLayer({
    name: "显示图层",
    id: "showLayer",
  });
  measure = new mars2d.thing.Measure({
    type: "Measure",
    id: "Measure",
    name: "测绘分析",
    // style:{
    //     outline:true,
    //     outlineColor:'rgba(51, 135, 204,0.9)',
    //     outlineWidth:3,
    // }
  });
  editLayer = new mars2d.layer.GraphicLayer({
    name: "编辑图层",
    id: "eidt",
    type: "edit",
    hasEdit: true,
    isAutoEditing: true, // 绘制完成后是否自动激活编辑
  });
  moveLayer = new mars2d.layer.GraphicLayer({
    name: "移动路由图层",
    id: "move",
    type: "move",
  });
  drawLayer = new mars2d.layer.GraphicLayer({
    name: "自主绘制图层",
    id: "drawLayer",
  });
  labelLayer = new mars2d.layer.GraphicLayer({
    name: "文字渲染图层",
    id: "labelLayer",
  });
  // drawLayer = new mars2d.layer.GraphicLayer({
  //     hasEdit: true,
  //     isAutoEditing: true // 绘制完成后是否自动激活编辑
  // })

  map.addLayer(LineLayer);
  map.addLayer(drawLayer);
  map.addLayer(showLayer);
  // map.addLayer(labelClusterLayer)
  map.addThing(measure);
  map.addLayer(editLayer);
  map.addLayer(moveLayer);
  map.addLayer(labelLayer);
  console.log("getBounds-->", map.getBounds());
  // map.addLayer(routeLayer)
  // drawEvent();//自主绘制的事件绑定
  measureEvent(); //测绘分析事件绑定
  editEvent(); //编辑图层事件绑定
  routeRef.value.setLayer(map);
  map.on(mars2d.EventType.zoomend, (data) => {
    console.log("zoomEnd--->", data);
    let endData = data.target;
    $mitt.emit("zoomEnd", { newZoom: endData._zoom });
  });
};
//添加图层数据
const addGraphicMarker = (graphicLayer, item) => {
  let url = assetsUrl(item.icon);
  let lableData = item.label;
  const graphic = new mars2d.graphic.DivGraphic({
    latlng: [item.lat, item.lng],
    id: item.id,
    type: item.markerType,
    name: item.name,
    data: item,
    style: {
      html: `<div class="divMarker ${item.markerType}" id='icon_${item.markerType}_${item.id}'>
                        <div class='markerIcon' style=' background-image:url(${url});'>
                            <div class='markertxt'> ${lableData.text}</div>
                        </div>
                      </div>`,
      offsetY: 0,
      horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
      verticalOrigin: mars2d.VerticalOrigin.BOTTOM,
    },
    // attr: item
  });
  graphicLayer.addGraphic(graphic);
  graphic.bindPopup(null, {
    className: "myPopup",
    closeButton: true,
    maxWidth: 500,
    // template:`{content}`
  });
  graphic.on(mars2d.EventType.click, (e) => {
    let json = JSON.stringify(item);
    json = json.replaceAll(" ", "#####");
    e.target.setPopupContent(`<map-popup data=${json}></map-popup>`);
    console.log("graphic--->", e);
    let back = {
      cartesian: e.containerPoint, //转geojson需要的数据
      point: e.latlng, //点击点的经纬度
      graphic: e.target, //图层数据
      data: e.target.options.data, //前端挂在的data数据
    };
    console.log("markerClickBck--->", back);
    $mitt.emit("markerClick", back);
  });
};
//添加列表或对象的判断
const addListOrObj = (layer, data) => {
  if (data.markerList && data.markerList.length > 0) {
    let hs = false;
    data.markerList.forEach((item) => {
      layer.eachGraphic((lItm) => {
        if (lItm.options.type == data.markerType && lItm.id == item.id) {
          hs = true;
        }
      });
      if (!hs) {
        addGraphicMarker(layer, item);
      }
    });
  } else {
    let hasGraphic = false;
    layer.eachGraphic((gra) => {
      if (gra.options.type == data.markerType && gra.id == data.id) {
        hasGraphic = true;
      }
    });
    if (!hasGraphic) {
      addGraphicMarker(layer, data);
    }
  }
};
//添加marker聚合图层
const addLayer = (data) => {
  let hasLayer = map.getLayerById(data.markerType);
  console.log(hasLayer)
  if (hasLayer) {
    addListOrObj(hasLayer, data);
    return;
  }
  let url = assetsUrl(data.icon);
  const clusterLayer = new mars2d.layer.ClusterLayer({
    name: "聚合图层_" + data.markerType,
    id: data.markerType,
    type: data.markerType,
    chunkedLoading: true, // 间隔添加数据，以便页面不冻结。
    showCoverageOnHover: false, // 是否显示聚合标记的边界。
    disableClusteringAtZoom: 8, // 此级别下不聚合
    removeOutsideVisibleBounds: true,
    zoomToBoundsOnClick: false,
    iconCreateFunction: function (cluster) {
      let htmlStr = `<div class="clusterIconClass ${
        data.markerType
      }" style="background-image: url(${url});">
                            <span>${cluster.getChildCount()}</span>
                        </div>`;
      return L.divIcon({ html: htmlStr });
    },
  });
  markerLayer[data.markerType] = clusterLayer; //储存图层数据
  map.addLayer(clusterLayer);
  clusterLayer.on("clusterclick", function (cluster) {
    $mitt.emit("clusterclick", {
      type: data.markerType,
      data: data.markerList,
    });
    console.log("clusterclick---->", cluster.target, data.markerList);
  });
  addListOrObj(clusterLayer, data);
};
//隐藏大类或数据
const hideMarker = (data) => {
  console.log("hideMarker--->", data);
  let type = data.markerType,
    gid = data.id;
  let isShow = data.show;
  if (!type) {
    console.log("缺少必要参数");
    return;
  }
  if (!gid) {
    markerLayer[type].show = isShow;
  } else {
    let getGraphic = null;
    markerLayer[type].eachGraphic((itemGraphic) => {
      if (itemGraphic.id == gid) {
        getGraphic = itemGraphic;
      }
    });
    if (isShow) {
      if (markerLayer[type].hasGraphic(getGraphic)) {
        map.flyToGraphic(getGraphic);
      } else {
        let findGra = delMarkerGraphic.find((igs, ix) => {
          return igs.id == gid;
        });
        markerLayer[type].addGraphic(getGraphic || findGra);
      }
    } else {
      let isDel = delMarkerGraphic.find((igs, ix) => {
        return igs.id == gid;
      });
      if (!isDel) {
        delMarkerGraphic.push(getGraphic);
      }
      markerLayer[type].removeGraphic(getGraphic);
    }
  }
};

const hideAllMarker = () => {
  for (let key in markerLayer) {
    markerLayer[key].eachGraphic((info) => {
      markerLayer[key].removeGraphic(info);
    });
  }
};

//绘制路线
const drawLine = (drawLineParms) => {
  let style = deepmerge(drawLineStyle, drawLineParms.style || {});
  const latlngs = mars2d.PointTrans.coords2latlngs(drawLineParms.position);
  const graphic = new mars2d.graphic.Polyline({
    name: "线路图层_polyline",
    latlngs: latlngs,
    id: drawLineParms.id,
    type: drawLineParms.type,
    style: style,
    attr: { remark: "虚线路线" },
  });
  if (LineLayer.getGraphicById(drawLineParms.id)) {
    let graphic = LineLayer.getGraphicById(drawLineParms.id);
    graphic.redraw();
    console.log("已有该线路更新数据");
    return;
  }
  console.log("latlngs--->", latlngs);
  let start = new mars2d.graphic.DivGraphic({
    latlng: latlngs[0],
    name: "路线图层_polyline_start",
    id: "label_" + drawLineParms.id,
    type: drawLineParms.type,
    style: {
      html: "<div class='lineCont'>起点</div>",
      className: "lineDivStart",
      // text:'起点',
      // color:'#000',
      // font_size:18,
      // border_width:1,
      // border:true,
      // border_style:1,
      // border_color:'#000',
      // horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
      // verticalOrigin: mars2d.VerticalOrigin.BOTTOM
    },
  });
  let end = new mars2d.graphic.DivGraphic({
    name: "路线图层_polyline_end",
    latlng: latlngs[latlngs.length - 1],
    id: "label_" + drawLineParms.id,
    type: drawLineParms.type,
    style: {
      html: "<div class='lineCont'>终点</div>",
      className: "lineDivEnd",
      // text:'终点',
      // color:'#000',
      // font_size:18,
      // border:true,
      // border_width:1,
      // border_style:1,
      // // offsetY:10,
      // border_color:'#000',
      // horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
      // verticalOrigin: mars2d.VerticalOrigin.BOTTOM
    },
  });

  LineLayer[drawLineParms.type] = graphic;
  LineLayer.addGraphic(graphic);
  LineLayer.addGraphic(start);
  LineLayer.addGraphic(end);
  LineLayer[drawLineParms.type].snakeIn();
};
//清除单条或多条线路
const clearDrawLine = (data) => {
  if (!data.type) {
    console.log("缺少主要参数--clearDrawLine--", data);
    return;
  }
  let type = data.type;
  if (!data.id) {
    LineLayer[type].clear();
  } else {
    let LineGraphic = LineLayer[type].getGraphicById(data.id);
    LineLayer[type].removeGraphic(LineGraphic);
  }
};
//绘制geo数据
const drawGeoJson = (geoJsonLayerParms) => {
  if (!geoJsonLayerParms.type || !geoJsonLayerParms.geoType) {
    console.log("缺少必要参数，请查看--->", geoJsonLayerParms);
    return;
  }
  if (geoGroup[geoJsonLayerParms.geoType]) {
    console.log("已有该图层");
    geoGroup[geoJsonLayerParms.geoType].removeGraphic();
    // return
  }
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
const clearDrawGeoJson = function (type = "") {
  console.log(geoGroup, type);
  if (geoGroup[type]) {
    // delete geoGroup[type]
    map.removeLayer(geoGroup[type]);
  }
};
// drawArc
const drawArc = (drawArcParms) => {
  if (!drawArcParms.type) {
    console.log("缺少必要参数请查看", drawArcParms);
    return;
  }
  if (drawLayer) {
    drawLayer.clear();
    drawLayer.off();
  }
  let style = deepmerge(
    drawArcStyle[drawArcParms.type],
    drawArcParms.style || {}
  );
  console.log({
    type: drawArcParms.type,
    style: style,
  });
  drawLayer.startDraw({
    type: drawArcParms.type,
    style: style,
  });
  drawLayer.on(mars2d.EventType.drawCreated, function (e) {
    console.log("创建完成", e);
    let graphic = e.graphic;
    // graphic.text='这是一个文字呀。'
    console.log("newLayer--->", graphic);
    $mitt.emit("drawEnd", graphic);
  });
};
const measureEvent = () => {
  measure.on(mars2d.EventType.drawStart, function (e) {
    console.log("开始绘制", e);
  });
  measure.on(mars2d.EventType.drawAddPoint, function (e) {
    console.log("绘制过程中增加了点", e);
  });
  measure.on(mars2d.EventType.drawRemovePoint, function (e) {
    console.log("绘制过程中删除了点", e);
  });

  measure.on(mars2d.EventType.drawCreated, function (e) {
    console.log("创建完成", e);
  });
  measure.on(mars2d.EventType.removeGraphic, function (e) {
    console.log("删除了量算对象", e);
  });

  measure.on(mars2d.EventType.editStart, function (e) {
    console.log("开始编辑", e);
  });
  measure.on(mars2d.EventType.editAddPoint, function (e) {
    console.log("编辑新增了点", e);
  });
  measure.on(mars2d.EventType.editMovePoint, function (e) {
    console.log("编辑修改了点", e);
  });
  measure.on(mars2d.EventType.editRemovePoint, function (e) {
    console.log("编辑删除了点", e);
  });
  measure.on(mars2d.EventType.editStop, function (e) {
    console.log("停止了编辑", e);
  });
};
const editEvent = () => {
  editLayer.on(mars2d.EventType.drawStart, function (e) {
    console.log("开始绘制", e);
  });
  editLayer.on(mars2d.EventType.drawAddPoint, function (e) {
    console.log("绘制过程中增加了点", e);
  });
  editLayer.on(mars2d.EventType.drawRemovePoint, function (e) {
    console.log("绘制过程中删除了点", e);
  });

  editLayer.on(mars2d.EventType.drawCreated, function (e) {
    console.log("创建完成", e);
  });
  editLayer.on(mars2d.EventType.removeGraphic, function (e) {
    console.log("删除了量算对象", e);
  });

  editLayer.on(mars2d.EventType.editStart, function (e) {
    console.log("开始编辑", e);
    let graphic = e.graphic;
    editGraphic = graphic;
    console.log(graphic.options.id);
    let id = graphic.options.id;
    let graphicObj = graphic.toGeoJSON();
    graphicObj = mars2d.Util.clone(graphicObj);
    console.log("graphicObj数据为", graphicObj);
    editRef.value.setStyle(
      graphicObj.properties.type,
      graphicObj.properties.style,
      id
    );
  });
  editLayer.on(mars2d.EventType.editAddPoint, function (e) {
    console.log("编辑新增了点", e);
  });
  editLayer.on(mars2d.EventType.editMovePoint, function (e) {
    console.log("编辑修改了点", e);
  });
  editLayer.on(mars2d.EventType.editRemovePoint, function (e) {
    console.log("编辑删除了点", e);
  });
  editLayer.on(mars2d.EventType.editStop, function (e) {
    console.log("停止了编辑", e);
    let graphic = e.graphic;
    let geojsonObject = editLayer.toGeoJSON();
    if (geojsonObject == null) {
      return null;
    }
    let graphicData = graphic.toGeoJSON();
    console.log("graphic---->", graphic.toGeoJSON());
    geojsonObject = mars2d.Util.clone(geojsonObject);
    console.log("geojson数据为", geojsonObject);
    // editRef.value.setStyle(graphicData.properties.style)
  });
};
const measureBtn = (type) => {
  if (type == "length") {
    measure.distance({
      style: {
        color: "rgba(51, 135, 204,0.9)",
        width: 2,
      },
    });
  } else {
    measure.area({
      style: {
        color: "rgba(51, 135, 204,0.9)",
        width: 2,
      },
    });
  }
};
const showMeasureBtn = () => {
  measureShow.value = !measureShow.value;
  if (!measureShow.value) {
    measureClear();
  }
};
const measureClear = () => {
  if (measure) {
    measure.clear();
  }
};
const isSu = () => {
  newLayer.text = labeltxt.value;
  // showTxtEdit.value = false
};
const clear = () => {
  drawLayer.removeGraphic(newLayer);
};
//显示绘制图层
const drawPolygonLayer = (data) => {
  let latlngs = [];
  let mystyle = deepmerge(drawPolygoStyle, data.style || {});
  let key = "latlngs";
  if (data.type == "Circle") {
    key = "latlng";
    latlngs = mars2d.PointTrans.latlng2coord(data.positions);
  } else {
    key = "latlngs";
    latlngs = mars2d.PointTrans.coords2latlngs(data.positions);
  }
  //showLayer[data.type]
  showLayer[data.type] = new mars2d.graphic[data.type]({
    type: data.type,
    id: data.type + "_" + data.id,
    [key]: latlngs,
    style: mystyle,
  });
  showLayer.addGraphic(showLayer[data.type]);
  console.log(map.getLayers());
};
const upDataRadius = (data) => {
  let graphic = showLayer.getGraphicById(data.type + "_" + data.id);
  graphic.radius = data.radius;
};
const drawEidtLayer = (data) => {
  let typeStyle = {
    label: {
      text: "label文字",
      font_size: 18,
      color: "#000",
      font_weight: "normal",
    },
    marker: {
      width: 32,
      height: 44,
      image: assetsUrl("/images/marker/default.png"),
      horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
      verticalOrigin: mars2d.VerticalOrigin.BOTTOM,
    },
    line: {
      outline: true,
      outlineColor: "rgba(51, 135, 204,0.9)",
      outlineWidth: 3,
    },
    polygon: {
      fill: true,
      fillColor: "rgba(51, 135, 204,0.7)",
      outline: true,
      outlineColor: "rgba(51, 135, 204,0.9)",
      outlineWidth: 3,
      fillOpacity: 1,
      outlineOpacity: 1,
    },
  };
  let styleObj = {};
  if (data.type == "label") {
    styleObj = typeStyle.label;
  } else if (data.type == "marker") {
    styleObj = typeStyle.marker;
  } else if (data.type == "polyline" || data.type == "brushLine") {
    styleObj = typeStyle.line;
  } else {
    styleObj = typeStyle.polygon;
  }
  editLayer[data] = editLayer.startDraw({
    type: data.type,
    style: styleObj,
  });
  // editLayer.addGraphic(editLayer[data])
};
const viewClick = (data) => {
  console.log("viewClick--->", data);
  if (data.editType.value == "label") {
    editGraphic.text = data.text.value;
    editGraphic.style = {
      font_size: data.font_size.value,
      color: data.color.value,
      font_weight: data.font_weight.value ? "bold" : "normal",
    };
  } else if (data.editType.value == "marker") {
    console.log(editGraphic, "=====marker", data.icon);
    editGraphic.style = {
      image: data.icon,
      // iconUrl:data.icon.value,
      width: data.width.value,
      height: data.height.value,
    };
    // editGraphic.src= data.icon
  } else if (
    data.editType.value == "polyline" ||
    data.editType.value == "brushLine"
  ) {
    editGraphic.style = {
      color: data.lineColor.value,
      width: data.lineWidth.value,
    };
  } else {
    editGraphic.style = {
      fillColor: data.polygonFill.value,
      fillOpacity: data.polygonOpa.value,
      outlineColor: data.polygonColor.value,
      outlineOpacity: data.polygonOpa.value,
      outlineWidth: data.polygonWidth.value,
    };
    // backData = {polygonColor,polygonWidth,polygonFill,polygonOpa,editType}
  }
};
const eidtClose = (data) => {
  let graphic = editLayer.getGraphicById(data.id);
  console.log(graphic);
  // graphic.remove();
  editLayer.removeGraphic(graphic);
};
const moveRoute = (data) => {
  console.log("moveRoute--->>", data);
  if (moveLayer) {
    moveLayer.clear();
  }
  let latlngs = mars2d.PointTrans.coords2latlngs(data.positions);
  let style = deepmerge(moveRouteStyle, data.style || {});
  let moveGraphic = new mars2d.graphic.MovingMarker({
    latlngs: latlngs,
    durations: 3000, //[3000,3000,3000,3000],
    style: {
      image: assetsUrl(style.icon),
      iconSize: [50, 40],
      autostart: true,
    },
    id: "moveIcon",
  });
  let line = new mars2d.graphic.Polyline({
    id: "movingLine",
    latlngs: latlngs,
    style: {
      color: style.color,
      width: style.width,
      opacity: style.opacity,
    },
  });
  let startDiv = new mars2d.graphic.DivGraphic({
    latlng: latlngs[0],
    id: "movingMarkerStart",
    style: {
      html: `<div class='moveDivCont'>起点</div>`,
      className: "startDiv",
    },
  });

  let endDiv = new mars2d.graphic.DivGraphic({
    latlng: latlngs[latlngs.length - 1],
    id: "movingMarkerEnd",
    style: {
      html: `<div class='moveDivCont'>终点</div>`,
      className: "endDiv",
    },
  });
  moveLayer.addGraphic(line);
  moveLayer.addGraphic(moveGraphic);
  moveLayer.addGraphic(startDiv);
  moveLayer.addGraphic(endDiv);
};
const updataMoveRoute = (data) => {
  if (!data.lat || !data.lng) {
    console.log("缺少必要参数");
    return;
  }
  let endGra = moveLayer.getGraphicById("movingMarkerEnd");
  let line = moveLayer.getGraphicById("movingLine");
  let carIcon = moveLayer.getGraphicById("moveIcon");
  moveLayer.removeGraphic(endGra);
  line.addLatLng([data.lat, data.lng]);
  let endDiv = new mars2d.graphic.DivGraphic({
    latlng: [data.lat, data.lng],
    id: "movingMarkerEnd",
    style: {
      html: `<div class='moveDivCont'>终点</div>`,
      className: "endDiv",
    },
  });
  moveLayer.addGraphic(endDiv);
  carIcon.moveTo([data.lat, data.lng], data.duration || 3000);
};
const drawRouteLayer = () => {
  routeLayer.startDraw({
    type: "marker",
    style: {
      image: "img/marker/end.png",
      width: 32,
      height: 44,
    },
    success: function (graphic) {
      endGraphic = graphic;
    },
  });
};
const getBoundData = () => {
  //获取可视区域坐标
  let mapBounds = map.getBounds();
  let northEast = mapBounds._northEast;
  let southWest = mapBounds._southWest;
  let latLngs = [
    [northEast.lat, southWest.lng], //上
    [northEast.lat, northEast.lng], //左
    [southWest.lat, northEast.lng], //下
    [southWest.lat, southWest.lng], //右
  ];
  let cen = map.getCenter();
  let center = [cen.lat, cen.lng];
  let boundsZoom = map.getBoundsZoom(mapBounds);
  let zoom = map.getZoom();
  let boundsData = {
    bounds: latLngs,
    boundsZoom: boundsZoom,
    center: center,
    zoom: zoom,
  };
  return boundsData;
  // $mitt.emit('getBounds',boundsData)
};
const clearDrawTypeGraph = (data) => {
  //清除某个显示数据
  console.log("clearDrawTypeGraph--->", data);
  if (data && data.id) {
    let gar = showLayer.getLayerById(data.id);
    showLayer.removeGraphic(gar); // clear()
  } else {
    console.log("sjsjsjsj");
    showLayer.clear();
  }
};
const clearDrawGraph = (data) => {
  //清除自主绘制的数据
  console.log("clearDrawGraph--->", data);
  if (data && data.id) {
    let gar = drawLayer.getLayerById(drawLayer);
    drawLayer.removeGraphic(gar); // clear()
  } else {
    drawLayer.clear();
  }
};
const openPopup = (data) => {
  //直接打开信息框
  console.log("openPopup--->", data);
  let type = data.markerType;
  let id = data.id;
  markerLayer[type].eachGraphic((graphic) => {
    if (graphic.id == id) {
      let json = JSON.stringify(data);
      json = json.replaceAll(" ", "#####");
      graphic.setPopupContent(`<map-popup data=${json}></map-popup>`);
      graphic.openPopup();
      // map.flyToGraphic(graphic, { duration: 1 });
    }
  });
  // markerLayer[type].openPopup(new L.LatLng(data.lat, data.lng));
};
const hidePopup = (data) => {
  //直接关闭信息框
  let type = data.markerType;
  let id = data.id;
  markerLayer[type].eachGraphic((graphic) => {
    if (graphic.id == id) {
      graphic.closePopup();
    }
  });
};
const addCenterTxt = (data) => {
  //根据包含子级的geo文件添加中心点文字
  let geoUrl = data.url;
  let style = deepmerge(LabelStyle, data.style || {});
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
  });
};
const clearCenterTxt = () => {
  //清除中心点文字
  labelLayer.removeGraphic();
};
const addMapGlLayer = (data = {}) => {
  // mapbox api 申请的token
  mapboxgl.accessToken =
    data.accessToken ||
    "pk.eyJ1Ijoib25lZ2lzZXIiLCJhIjoiY2plZHptcnVuMW5tazMzcWVteHM2aGFsZiJ9.ERWP7zZ-N6fmNl3cRocJ1g";
  // 初始化地图对象
  const mapboxG = L.mapboxGL({
    style: data.style,
    center: data.center, //{ lng: 109, lat: 35.655 },
    zoom: data.zoom || 6,
    pitch: -50,
    minZoom: 5,
    maxZoom: 17,
    touchRotate: false,
    dragRotate: false,
  }).addTo(map);
  let mapboxMap = mapboxG.getMapboxMap();
  mapboxMap.dragPan.disable();
  mapboxMap.scrollZoom.disable();
  map.on(mars2d.EventType.movestart, function () {
    mapboxMap.dragPan.disable();
    mapboxMap.scrollZoom.disable();
  });
};

// 热力图
const addHostLayer = (data) => {
  if (layerWork) {
    map.getLayerById("HeatLayer").remove();
  }
  layerWork = new mars2d.layer.HeatLayer(data, {
    id: "HeatLayer",
    radius: 30,
    blur: 10, //模糊度 越大越模糊
    minOpacity: 0.3, //最开始不透明度
    gradient: {
      0.4: "blue",
      0.6: "cyan",
      0.7: "lime",
      0.8: "yellow",
      1: "red",
    }, //渐变色
  });
  map.addLayer(layerWork);
  map.fitBounds(data);
};

let expImg;
// 截图
const mapToPic = function () {
  // let mapDom = document.querySelector("#map2d .mapboxgl-canvas");
  let mapDom = document.querySelector("#map2d");
  domtoimage
    .toPng(mapDom)
    .then(function (dataUrl) {
      // 创建一个图像元素并显示在页面上
      var img = new Image();
      img.src = dataUrl;
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "截图_"+new Date().getTime();

      // 模拟点击链接以触发下载
      a.click();
    })
    .catch(function (error) {
      console.error("转换为图像时出错：", error);
    });
};

onMounted(() => {
  initMap();
  $mitt.on("mapToPic", mapToPic);
  $mitt.on("addMarker", (data) => {
    //添加标记
    console.log("addMarker--->", data);
    addLayer(data);
  });
  $mitt.on("changeMarkerState", (data) => {
    //修改标记状态
    hideMarker(data);
  });
  $mitt.on("hideAllMarker", () => {
    hideAllMarker();
  });
  $mitt.on("drawPolyline", (data) => {
    //绘制路线
    console.log("drawPolyline--->", data);
    drawLine(data);
  });
  $mitt.on("drawGeoGraph", (data) => {
    //绘制geo数据图层
    console.log("drawGeoGraph--->", data);
    drawGeoJson(data);
  });
  $mitt.on("clearGeoGraph", (type) => {
    clearDrawGeoJson(type);
  });
  $mitt.on("drawGraph", (data) => {
    //自主绘制图层 类似圈选等
    console.log("drawArc--->", data);
    drawArc(data);
  });
  $mitt.on("drawTypeGraph", (data) => {
    //绘制图层按类型显示
    console.log("drawPolygonLayer--->", data);
    drawPolygonLayer(data);
  });
  $mitt.on("drawEidtLayer", (data) => {
    //图层编辑
    console.log("drawEidtLayer--->", data);
    drawEidtLayer(data);
  });

  $mitt.on("flyTo", (data) => {
    //定位到某个点
    console.log("flyTo--->", data);
    if (!data.lat || !data.lng) {
      console.log("缺少必要参数请查看---flyTo--", data);
      return;
    }

    map.flyTo([data.lat, data.lng], data.zoom || map.getZoom()),
      { duration: 4 };
  });
  $mitt.on("mapCenter", (data) => {
    //设置中心点
    console.log("mapCenter--->", data);
    if (!data.lat || data.lng) {
      console.log("缺少必要参数请查看---mapCenter--", data);
      return;
    }
    map.center([data.lat, data.lng]);
  });
  $mitt.on("setZoom", (data) => {
    //设置缩放
    console.log("setZoom--->", data);
    if (!data.zoom) {
      console.log("缺少必要参数请查看---setZoom--", data);
      return;
    }
    // map.zoom(Number(data.zoom));
    map.setZoom(Number(data.zoom));
  });
  $mitt.on("flyHome", () => {
    //回到初始位置
    console.log("flyHome--->");
    map.flyHome({ animate: true, duration: 0.4 });
  });
  $mitt.on("postBounds", (data) => {
    //获取可视区域坐标
    let bData = getBoundData();
    $mitt.emit("getBounds", bData);
  });
  // 热力图
  $mitt.on("addHostLayer", (data) => {
    addHostLayer(data);
  });
  $mitt.on("setBaseMap", (data) => {
    //获取可视区域坐标
    if (!data.name) {
      console.log("缺少主要参数--setBaseMap---", data);
      return;
    }
    map.basemap = data.name; //'蓝色地图'
  });
  $mitt.on("startMove", (data) => {
    moveRoute(data);
  });
  $mitt.on("updataMove", (data) => {
    //获取可视区域坐标
    if (!data.lat || !data.lng) {
      console.log("缺少主要参数--updataMove---", data);
      return;
    }
    updataMoveRoute(data);
  });
  $mitt.on("clearAll", (data) => {
    let layers = map.getLayers();
    let ignoreAry = data && data.ignore ? data.ignore : []; // ['geo绘制图层','聚合图层_wz','路径规划']//data.ignore;
    if (layers && layers.length > 0) {
      layers.forEach((layer) => {
        if (
          layer.name &&
          layer.name.indexOf("地图") == -1 &&
          ignoreAry.toString().indexOf(layer.name) == -1
        ) {
          console.log("layer--->", layer.name);
          layer.clear();
          // layer.removeGraphic();
        }
      });
    }
  });
  $mitt.on("clearDrawLine", (data) => {
    clearDrawLine(data);
  });
  $mitt.on("clearDrawTypeGraph", (data) => {
    clearDrawTypeGraph(data);
  });
  $mitt.on("clearDrawGraph", (data) => {
    clearDrawGraph(data);
  });
  $mitt.on("openPopup", (data) => {
    if (!data.markerType || !data.id) {
      console.log("打开openPopup缺少主要参数-->", data);
      return;
    }
    openPopup(data);
  });
  $mitt.on("hidePopup", (data) => {
    if (!data.markerType || !data.id) {
      console.log("关闭hidePopup缺少主要参数-->", data);
      return;
    }
    hidePopup(data);
  });
  $mitt.on("geoSetCenterTxt", (data) => {
    if (!data.url) {
      console.log("-缺少主要参数->", data);
      return;
    }
    addCenterTxt(data);
  });
  $mitt.on("clearCentTxt", () => {
    clearCenterTxt();
  });
  $mitt.on("upDataRadius", (data) => {
    if (!data.type || !data.radius || !data.id) {
      console.log("缺少主要参数请查看-upDataRadius-->", data);
      return;
    }
    upDataRadius(data);
  });
  $mitt.on("addMapGlLayer", (data) => {
    if (!data.style || !data.center) {
      console.log("缺少主要参数请查看-addMapGlLayer-->", data);
      return;
    }
    addMapGlLayer(data);
  });
});
onUnmounted(() => {
  $mitt.all.delete("addMarker");
  $mitt.all.delete("changeMarkerState");
  $mitt.all.delete("drawPolyline");
  $mitt.all.delete("drawGeoGraph");
  $mitt.all.delete("drawGraph");
  $mitt.all.delete("drawTypeGraph");
  $mitt.all.delete("drawEidtLayer");
  $mitt.all.delete("startMove");
  $mitt.all.delete("flyTo");
  $mitt.all.delete("mapCenter");
  $mitt.all.delete("setZoom");
  $mitt.all.delete("flyHome");
  $mitt.all.delete("postBounds");
  $mitt.all.delete("setBaseMap");
  map.destroy();
  map = null;
});
defineExpose({
  map,
});
</script>

<style lang="scss">
#map2d {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 2;
}

.clusterCountDiv {
  height: 60px;
}

.clusterIconClass {
  width: 40px;
  height: 40px;
  background-size: 100% 100%;
  position: relative;
  top: -16px;
  left: -9px;
  color: #fff;
  text-align: center;
  font-size: 16px;

  span {
    color: #29f1fa;
    position: relative;
    top: -15px;
  }
}

.divMarker {
  position: relative;

  .markerIcon {
    width: 30px;
    height: 30px;
    // background-image: ;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    .markertxt {
      position: absolute;
      top: -20px;
      width: 90px;
      text-align: center;
    }
  }
}

.labeltxt {
  position: absolute;
  z-index: 10;
  right: -330px;
  top: 10px;
  display: flex;
  width: 300px;
  justify-content: space-between;
  align-items: center;
  border: 1px #4e70a6 solid;
  border-radius: 4px;
  transition: all 0.4s linear;
}

.showTxt {
  right: 10px;
}

#app .mars2d-logo {
  display: none;
}

.measureBox {
  position: absolute;
  z-index: 10;
  right: -260px;
  top: 10px;
  display: flex;
  border: 1px #4e70a6 solid;
  border-radius: 4px;
  width: 260px;
  // height: 40px;
  background: rgba(255, 255, 255, 0.8);
  transition: all 0.4s linear;
}

.showMeasure {
  right: 10px;
}

#app .mars2d-edit-move {
  cursor: move;
  background: rgba(255, 255, 255, 0.8);
  // background-image: url("../../assets//images/marker/rigicon.png");
  background-size: 100% 100%;
  border: none;
  background: transparent;
  display: none;
}

#app .leaflet-marker-icon {
  margin-left: -10px;
}

// path[class="leaflet-interactive"]{
//     stroke:red;
//     fill:red
// }
// path[fill="none"]{
//     stroke:red;
//     fill:transparent;
//     // fill:red
// }
.btnRound {
  position: absolute;
  width: 46px;
  height: 32px;
  top: -1px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  border: 1px #4e70a6 solid;
  border-right: 0px;
  text-align: center;
  left: -47px;
  font-size: 16px;
  line-height: 32px;
  transition: all 0.4s linear;
  background: rgba(255, 255, 255, 0.8);
}
</style>
