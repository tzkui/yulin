export let mapDeafultOps = {
  zoom: 8,
  center: { lng: 109.784585, lat: 38.297187 },
  minZoom: 6,
  maxZoom: 22,
  basemaps: [
    { name: "高德地图", type: "gaode", layer: "vec" },
    {
      name: "高德卫星",
      type: "group",
      // show: true,
      layers: [
        { name: "底图", type: "gaode", layer: "img_d" },
        { name: "注记", type: "gaode", layer: "img_z" }
      ]
    },
    {
      pid: 10,
      name: "天地图卫星",
      icon: "img/basemaps/tiandituimage.png",
      type: "tdt",
      layer: "img",
      show: true
    },
    {
      pid: 10,
      name: "天地图地形",
      icon: "img/basemaps/tianditudem.png",
      type: "tdt",
      layer: "ter",
      maxNativeZoom: 14,
      errorTileUrl: "img/tile/errortile.png",
    },
    {
      pid: 10,
      name: "灰色地图",
      type: "arcgis",
      url: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer",
      chinaCRS: "GCJ02",
      icon: "img/basemaps/bd-c-grayscale.png"
    },
    {
      pid: 10,
      name: "蓝色地图",
      type: "arcgis",
      url: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer",
      chinaCRS: "GCJ02",
      icon: "img/basemaps/bd-c-midnight.png"
    }
  ],
  control: {
    scale: true
  },
  operationallayers: [{ name: "经纬网", type: "graticule" }]
}
export let drawLineStyle = {
  lineCap: "round",//两头样式
  width: 3,//宽度
  opacity: 0.8,
  color: "#ff0000",//颜色
  dashArray: "15, 10",//虚线
  snakingSpeed: "200"//运动时间 秒/px
}
export let drawGeoJsonStyle = {
  'line': {//线样式
    outline: true,//是否添加线
    outlineColor: "#6495ED", //颜色
    outlineWidth: 10,//宽度
    outlineOpacity: 0.6//透明度
  },
  'mask': {//反选覆盖样式
    fill: true,//是否覆盖
    fillColor: "rgba(0, 9, 28, 0.6)",//覆盖面颜色
    fillOpacity: 1,//覆盖面透明度
    outline: true,//是否有线
    outlineColor: "#6495ED",//颜色
    outlineWidth: 10,//线宽度
    outlineOpacity: 0.6//透明度
  },
  'arc': {//面覆盖样式
    fill: true,
    fillColor: "#6495ED",
    fillOpacity: 0.8,
  }
}

export let drawArcStyle = {
  'marker': {//图标点
    image: "img/marker/mark1.png",
    width: 32,
    height: 44,
    horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
    verticalOrigin: mars2d.VerticalOrigin.BOTTOM
  },
  'label': {//文字
    text: "文字",
    color: "#000dfc",
    font_size: 25,
    font_family: "楷体"
  },
  'polyline': {//线
    width: 3,
    color: "#000dfc"
  },
  'brushLine': {//曲线
    width: 3,
    color: "#000dfc"
  },
  'polygon': {//多边形
    fill: true,
    fillColor: "#000dfc",
    fillOpacity: 0.3,
    outline: true,
    outlineWidth: 2,
    outlineColor: "#254dc4",
    outlineOpacity: 1
  },
  'rectangle': {//矩形
    fill: true,
    fillColor: "#000dfc",
    fillOpacity: 0.3,
    outline: true,
    outlineWidth: 2,
    outlineColor: "#254dc4",
    outlineOpacity: 1
  },
  'circle': {//圆形
    fill: true,
    fillColor: "#000dfc",
    fillOpacity: 0.3,
    outline: true,
    outlineWidth: 2,
    outlineColor: "#254dc4",
    outlineOpacity: 1
  }

}

export let drawPolygoStyle = {
  fill: true,
  fillColor: 'rgba(51, 135, 204,0.7)',
  outline: true,
  outlineColor: 'rgba(51, 135, 204,0.9)',
  outlineWidth: 3,
  radius: 3000,//单位米
}
export let moveRouteStyle = {
  icon: "/images/marker/car.png",//移动图标
  color: "#00ffff",//路线颜色
  width: 3,//线宽
  opacity: 0.8,//线透明度
}
export let LabelStyle = {
  color: "#000",//字体颜色
  font_size: 20,//字体大小
  font_weight: "normal",// bold  是否加粗
  opacity: "1",//透明度
  font_family: "",//字体
  background: false,//是否开启背景
  background_color: '',//背景色
  className: "",//自定义类名
}