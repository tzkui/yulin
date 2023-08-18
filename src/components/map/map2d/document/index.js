/**
 * 添加地图标记
 * addMarker
 */
let addMarkerListParms = [{
  markerType: "标记类型", //*
  name: "文字说明",
  icon: "图标",//*
  markerList: [{
    markerType: "标记类型", //*
    lng: "经度",//*
    lat: "纬度",//*
    name: "文字说明",
    id: "",//*
    label: { text: "显示文字", font_size: "" }//文字显示 有就显示 没有就不显示
  }]
},
]
//单个marker添加
let addMarkerObjParms = {
  markerType: "标记类型", //*
  lng: "经度",//*
  lat: "纬度",//*
  name: "文字说明",
  id: "",//*
  label: { text: "显示文字", font_size: "" }

}
/**
* 直接打开信息框
* openPopup
*/
let openPopupParms = { //将整个数据绑定到展示组件中
  markerType: "",//* 图层类型
  id: ""// * 数据id
}

/**
* 直接关闭信息框
* hidePopup
*/
let hidePopupParms = { //
  markerType: "",//* 图层类型
  id: ""// * 数据id
}


/**
* 修改大类或 大类下数据状态
* changeMarkerState
*/
let changeMarkerStateParms = {
  markerType: "标记类型", //*
  id: "",// 修改大类下的某一个时候 必填
  show: "" //* 当前状态 true/flase
}


/**
* 添加geojson数据
* drawGeoGraph
*/
let drawGeoGraphParms = { //
  geoType: "",//* 图层类型
  type: "",//* arc 高亮面覆盖  mask 反选  line 区域线 控制几种类型的样式
  mask: false,//是否反选 
  geoJson: {},//geo格式的数据 *
  url: "",//与上面的geoJson数据任选一个 访问连接 优先取数据
  style: {}//样式参照 mars3d 对应geojson 样式配置 常用样式配置参照配置文件中 GeoJsonLayerDefult
}

/**
* 主动绘制方法 类似圈选画框
* drawGraph
* 绘制成功 触发  drawEnd 返回图层信息
*/
let drawGraphParms = {
  id: "",// 暂时非必填 若需要展示多个自主绘制则需要
  type: "绘制的类型",//* marker(标记) label（文字） polyline(线) brushLine（曲线） polygon（面） rectangle（矩形）circle（圆形） 
  style: {//样式覆盖 不同类型样式常用覆盖 参考 config中的 drawArcStyle
    fill: true,//是否填充
    fillColor: "#000dfc",//填充色
    fillOpacity: 0.3,//填充透明度 0 - 1
    outline: true,//是否边线
    outlineWidth: 2,//线宽
    outlineColor: "#254dc4",//颜色
    outlineOpacity: 1//透明度
  }
}
/**
* 清除主动绘制的数据
* clearDrawGraph
*/
let clearDrawGraphParms = {
  id: ""//数据id有清除单个 无清除所有
}

/**
* 显示绘制图层
* drawTypeGraph
* 
*/
let drawPolygonLayerParms = {
  type: "图标类型",//* StraightArrow (粗直箭头) FineArrow (粗单尖直箭头) FineArrowYW (燕尾直箭头) AttackArrow (攻击箭头) AttackArrowPW (平尾攻击箭头) AttackArrowYW (燕尾攻击箭头) DoubleArrow (钳击箭头) Polygon (各种面) Circle (圆)  GatheringPlace(集结地)
  positions: [],//* 经纬度集合
  style: {//样式覆盖 常用样式覆盖参考 drawPolygoStyle 圆的样式参数 需要添加 radius 半径覆盖默认的 

  }
}

/**
 * 更新显示类型的圆重新设置半径
 * upDataRadius
 */
let upDataRadiusParms = {
  type: "",//*类型
  radius: "",//* 更新的半径值
  id: ""//* 绘制圆的id
}

/**
* 清除显示绘制图层
* clearDrawTypeGraph
*/

let clearDrawTypeGraphParms = {
  id: ""//有图层id清除某一个 没有清除所有
}

/**
* 绘制路线
* drawPolyline
*/

let drawPolylineParms = {
  type: "类型",//*
  id: "唯一标识",//*,
  position: [[], []],//路线坐标信息 *
  style: {//样式覆盖 参考  drawLineStyle 

  }
}


/**
* 清除单条或所有路线
* 
*/
let clearDrawLineParms = {
  type: "",//类型 *
  id: ""//* 数据id 有id则清除单条 无id 清除大类
}

/**
* 飞行到某个点
* flyTo 
*/
let flyToParms = {
  lat: "",//*
  lng: ""//*
}

/**
* 设置地图层级
* setZoom
*/
let setZoomParms = {
  zoom: ""//*层级数值
}

/**
* 回到初始可视区域
* flyHome
*/
let flyHomeParms = {

}

/**
* 根据包含子级的geo数据添加中心区域文字
* geoSetCenterLable
*/
let geoSetCenterTxtParms = {
  url: "",//* 包含子区的geo数据路径
  style: {}//对文字样式设置 常用样式参考  LabelStyle
}

/**
* 清除区域中心文字
* clearCentTxt
*/
let clearCentTxtParms = {

}

/**
* 设置地图
* setBaseMap
*/
let setBaseMapParms = {
  name: "底图名称"//* 已配置到basemap中的地图名称
}
/**
* 设置地图中线点
* mapCenter
*/

let mapCenterParms = {
  lat: "",//*
  lng: ""//*
}

/**
* 路线回放
* startMove
*/

let startMoveParms = {
  type: "",// *路线分类
  positions: [],//*经纬度集合
  style: {
    icon: "",
    color: "",
    width: "",
    opacity: "",
  }
}
//修改起点终点的样式 css 覆盖 .moveDivCont 这个class的样式

/**
* 更新路线
* updataMoveRoute
*/
let updataMoveRouteParms = {
  type: "",// *路线分类
  lat: "",// *
  lng: ""// *
}

/**
* 聚合点击触发回调方法
* clusterclick
* $mitt.emit('clusterclick',[])
*/
let backClusterclick = [[], []];//该聚合图层下的数据列表

/**
* 标记marker点击触发回调
* markerClick
* $mitt.emit('markerClick',graphic)
*/
let backmarkerClick = {
  cartesian: '',//笛卡尔坐标
  point: '',//点的经纬度
  graphic: '',//图层数据
  data: '',//前端挂在的data数据
}

/**
* 清除地图上的所有数据
* clearAll
*/

let clearAllParms = {
  ignore: ['geo绘制图层', '路径规划', '文字渲染图层', '编辑图层', '显示图层', ' 自主绘制图层'],//忽略清除的参数  
}

/**
* postBounds
* 
* 发送获取可视区域的请求
*/

/**
* getBounds
* 
* 获取可视区域数据
* data={
* bounds: [ //可视区域四角坐标
* [30.712323321009055, 103.95366668701173],//上
* [30.712323321009055, 104.1661834716797],//右
* [30.58044033028413, 104.1661834716797],下
* [30.58044033028413, 103.95366668701173]//左
* ]
* boundsZoom: 13,//可视区域中最大层级
* center: [30.646404308290613, 104.05992507934572],//可视区域中心点
* zoom: 13//当前层级
* }
*/





