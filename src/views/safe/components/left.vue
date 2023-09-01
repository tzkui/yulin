<template>
  <div class="left">
    <!-- 危化企业检测预警部分 -->
    <ViewBox class="leftall" title="危化企业监测预警" :height="336">
      <div class="items leftitemsss">
        <div
          v-for="(item, index) in secureList"
          :key="index"
          class="detectionitem leftitemssssmall"
          @click="setMarker('affair', item, index)"
          :class="{ active: currentIndex === index }"
        >
          <!-- 标题 -->
          <div class="titlesmal">
            <span class="icon" v-if="item.name == '较大'">{{ item.name }}</span>
            <span class="icontwo" v-if="item.name !== '较大'">{{
              item.name
            }}</span>
            <span class="title">{{ item.content }}</span>
            <span class="time">{{ item.rqStr }}</span>
          </div>
          <!-- 下面是内容部分的 -->
          <div class="content">
            {{ item.content }}
          </div>
        </div>
      </div>
    </ViewBox>

    <!-- 下面是预警信息统计分析部分 -->
    <ViewBox title="预警信息统计分析" :height="343">
      <div class="sxt">
        <selectDate
          :now-date="dataSelectors.sgdj"
          dateType="sgdj"
          @toogleDate="toogleDate"
        ></selectDate>
      </div>
      <div id="ring">
        <div id="echarts_box" v-if="hxisif"></div>
        <div class="echarts_bg"></div>
      </div>
    </ViewBox>

    <!-- 下面是区企业统计分析部分 -->
    <ViewBox title="辖区企业统计分析" :height="327">
      <div class="cosss">
        <div id="columnar"></div>
      </div>
    </ViewBox>
  </div>
  <checkboxList></checkboxList>
  <qyxxThreePopup
    v-if="showQyxxThreePopup"
    @close-dialog="showQyxxThreePopup = false"
  ></qyxxThreePopup>
  <qyxxCheckbox
    @selectChange="changeBoxSelectChange"
    @closeDialog="closeDialog('qyxx')"
    :checkbox-data="qyxxCheckboxData"
    v-if="firDialogFlags.qyxx"
  ></qyxxCheckbox>
</template>

<!-- 下面这里是js的 -->
<script setup>
import { qyxxData } from "@/api/mock_tzk.js";
import qyxxThreePopup from "./qyxxThreePopup.vue";
const eis = ref(false);
// 导入这个事件的容器
import selectDate from "./selectDate.vue";
// 引入自动滚动轮播的
import "../components/lunbo";
// 导入这个柱状图的图表
import { inject, ref, onMounted, reactive, onUnmounted } from "vue";
// 导入需要打点的这些数据
import { securemarList } from "../../../api/affair_ys";
import {
  viewDetail,
  viewDetail1,
  viewDetail2,
} from "@/utils/funcNames/ys";
import { viewDetail as viewDetailx } from "@/utils/funcNames/tzk.js";
import { useEventBus } from "@vueuse/core";
import qyxxCheckbox from "./qyxxCheckbox.vue";
import checkboxList from "./checkboxList.vue";
import { getWhqyjcyj, getXqqytjfx, getYjxxtjfx } from "@/api/modules/aqsc.js";
// 定义一个数据来代表环形图是否显示和隐藏的
const hxisif = ref(true);
// 这个就是点击年月日周触发的相关的事件的了
const dataSelectors = reactive({
  sgdj: "1",
  sglx: "day",
  qylx: "day",
});
const toogleDate = function (key, val) {
  console.log(key, val, "pppp");
  if (dataSelectors[key] !== val) {
    dataSelectors[key] = val;
    // 然后这里请求数据,到时候改变不同的一个数据格式就是可以的了
    console.log(key, val, "看看这两个玩意是什么");
    if (val == "1") {
      let aaaa = ref([
        { value: 38, name: "未带安全帽" },
        { value: 35, name: "烟感" },
        { value: 30, name: "人员脱岗" },
        { value: 44, name: "水浸" },
        { value: 50, name: "防火区明火" },
        { value: 40, name: "高空坠物" },
      ]);
      ringdata.value = aaaa.value;
      getring(val);
    } else if (val == "2") {
      let aaaa = ref([
        { value: 48, name: "安全帽" },
        { value: 135, name: "烟感" },
        { value: 180, name: "人员脱岗" },
        { value: 184, name: "水浸" },
        { value: 100, name: "防火区明火" },
        { value: 50, name: "高空坠物" },
      ]);
      ringdata.value = aaaa.value;
      getring(ringdata.value);
    } else if (val == "3") {
      let aaaa = ref([
        { value: 88, name: "安全帽" },
        { value: 255, name: "烟感" },
        { value: 210, name: "人员脱岗" },
        { value: 224, name: "水浸" },
        { value: 200, name: "防火区明火" },
        { value: 100, name: "高空坠物" },
      ]);
      ringdata.value = aaaa.value;
      getring(val);
    } else if (val == "4") {
      let aaaa = ref([
        { value: 148, name: "安全帽" },
        { value: 335, name: "烟感" },
        { value: 280, name: "人员脱岗" },
        { value: 384, name: "水浸" },
        { value: 400, name: "防火区明火" },
        { value: 133, name: "高空坠物" },
      ]);
      ringdata.value = aaaa.value;
      getring(val);
    }
  }
};

const firDialogFlags = ref({
  qyxx: false,
});
const closeDialog = function (type) {
  $mitt.emit("hideAllMarker")
  firDialogFlags.value[type] = false;
};

const qyxxCheckboxData = {
  name: "辖区企业列表",
  type: "checkbox_popup",
  hasSerachBar: true,
  inputData: { label: "搜索企业名称", value: "" },
  buttonData: { name: "地图清除" },
  treeData: [
    {
      label: "榆林市",
      num: "27",
      children: [
        {
          label: "榆阳区",
          num: "3",
        },
        {
          label: "横山区",
          num: "2",
        },
        {
          label: "神木县",
          num: "4",
        },
        {
          label: "府谷县",
          num: "1",
        },
        {
          label: "靖边县",
          num: "3",
        },
        {
          label: "定边县",
          num: "4",
        },
        {
          label: "绥德县",
          num: "4",
        },
        {
          label: "米脂县",
          num: "4",
        },
        {
          label: "佳县",
          num: "2",
        },
        {
          label: "吴堡县",
          num: "4",
        },
        {
          label: "清涧县",
          num: "4",
        },
        {
          label: "子洲县",
          num: "4",
        },
      ],
    },
  ],
};
const accidentData = ref([]);
// 这个就是动态获取图表数据的方法
const getAccidentLevelList = function (type) {
  console.log(111);
  setTimeout(() => {
    accidentData.value = [
      { name: "一般", value: 100 },
      { name: "重大", value: 200 },
      { name: "较大", value: 300 },
      { name: "特大", value: 400 },
      { name: "特大", value: 400 },
      { name: "特大", value: 400 },
    ];
  }, 50);
};
const $mitt = inject("$mitt");
// 下面就是打点的方法这些了
// 把这个打点的放在这个循环里面的数据的了
const secureList = ref([]);
const getdatasj = async function () {
  let res = await getWhqyjcyj();
  console.log(res, "=================>看看数据");
  if (res.code == 200) {
    secureList.value = res.data.map((item) => {
      return {
        ...item,
        name: item.eventLvl == 0 ? "一般" : "较大",
        title: item.title,
        time: item.rqStr,
        content: item.contentText,
      };
    });
  }
  secureList.value.forEach((v, i) => {
    secureList.value[i].marker = securemarList[0].maekerList[i];
  });
};
// 定义数据,决定是查看还是隐藏
const cks = ref({
  ck: false,
  hs: false,
  bl: false,
});
// 使用defineEmits注册一个自定义事件
const emit = defineEmits(["getValue", "openDialog"]);
const transValue = () => {
  emit("getValue", cks.value);
  console.log(11111, "==============================>", cks.value);
};
let selectedQyxx = -1;
const openDialog = function (type, info) {
  console.log("xxxxx: ", type, info);
  if (type === "qyxx") {
    let index = info.dataIndex;
    let point = qyxxData[index].pointInfo;
    if (selectedQyxx === index) {
      selectedQyxx = -1;
      firDialogFlags.value.qyxx = false;
      $mitt.emit("changeMarkerState", {
        markerType: point.markerType,
        id: point.id,
        show: false,
      });
    } else {
      firDialogFlags.value.qyxx = true;
      selectedQyxx = index;
    }
  }
  // emit("openDialog", type, info);
};
const rendomLngLat = function (num) {
  let calc = Math.random()*0.75;
  if (new Date().getSeconds() % 2 === 0) {
    return num - 0 + calc;
  } else {
    return num - calc;
  }
};
const changeBoxSelectChange = function (arr) {
  let point = qyxxData[selectedQyxx].pointInfo;
  if (arr.length > 0) {
    console.log("pointInfo+++++++++++++++++++++==", point);
    point = JSON.parse(JSON.stringify(point))
    point.lat = rendomLngLat(point.lat);
    point.lng = rendomLngLat(point.lng);
    point.id = new Date().getTime()
    $mitt.emit("addMarker", point);
  } else {
    $mitt.emit("changeMarkerState", {
      markerType: point.markerType,
      id: point.id,
      show: false,
    });
  }
};
transValue();
getdatasj();
const bus = useEventBus(viewDetail);
const bus1 = useEventBus(viewDetail1);
const bus2 = useEventBus(viewDetail2);
// 查看
bus.on(function (e) {
  // 这里判断我点击的是谁
  console.log("查看", e);
  cks.value.ck = true;
});
// 补录
bus1.on(function (e) {
  // 这里判断我点击的是谁
  console.log("补录", e);
  cks.value.bl = true;
});
// 指挥调度
bus2.on(function (e) {
  // 这里判断我点击的是谁
  console.log("指挥调度");
  window.location.href =
    "http://222.212.82.225:20128/map/index_dispatch?id=77e7e6ff4c1d4da8a4b6c0cdcd4f350f";
});

const busx = useEventBus(viewDetailx);
const viewDetailFunc = function (info) {
  console.log(info);
  const dialogType = info.dialogType;
  if (dialogType === "qyxx") {
    showQyxxThreePopup.value = true;
  }
};
busx.on(viewDetailFunc);
onUnmounted(() => {
  busx.off(viewDetailFunc);
});
// 定义一个数据,存储之前有的这个打了点的数据了
let iscun = ref(true);
let monedata = ref("");
// 来判断我点击的是不是原来的这个
let mmid = ref("");
const currentIndex = ref();
const setMarker = function (type, item, index) {
  if (iscun.value) {
    mmid.value = item.marker.id;
    let mardata = item.marker;
    $mitt.emit("addMarker", mardata);
    $mitt.emit("openPopup", mardata);
    $mitt.emit("openPopup", mardata);
    // 然后还要把我打了点的数据保存下来,待会把她清楚掉
    monedata.value = item.marker;
    iscun.value = false;
    currentIndex.value = index;
  } else {
    if (item.marker.id == mmid.value) {
      mmid.value = item.marker.id;
      $mitt.emit("changeMarkerState", monedata.value);
      iscun.value = true;
      currentIndex.value = "";
    } else {
      // 下面这个就表示已经打了点的了,需要把之前的点取消掉
      // 明白我点的是哪一个
      mmid.value = item.marker.id;
      console.log("我走的这里吗");
      iscun.value = true;
      $mitt.emit("changeMarkerState", monedata.value);
      monedata.value = item.marker;
      currentIndex.value = false;
      // 然后还要再打新的点
      let mardata = item.marker;
      $mitt.emit("addMarker", mardata);
      $mitt.emit("openPopup", mardata);
      $mitt.emit("openPopup", mardata);
      // 然后还要把我打了点的数据保存下来,待会把她清楚掉
      monedata.value = item.marker;
      iscun.value = false;
    }
  }
};

// 实例柱状图的相关的方法
// 名称的数据
const coxdata = ref(qyxxData.map((item) => item.name));
// 下面就是数量的数据了
const cxydata = ref(qyxxData.map((item) => item.num));
const sum = function (arr) {
  return eval(arr.join("+"));
};

// 实例
const echarts = inject("echarts");
let myChart = null;
// let cxydata = [];
// let coxdata = [];
// let totalData = 0;
const getco = async function () {
  let res = await getXqqytjfx();
  console.log(res, "看看具体到底的是写什么鬼子数据的呢");
  if (res.code == 200) {
    coxdata.value = [];
    cxydata.value = [];
    coxdata.value = res.data.tj.map((item) => item.mc);
    cxydata.value = res.data.tj.map((item) => item.sz);
    console.log(coxdata.value, cxydata.value);
  }
  // 下面就是柱状图的一些配置的了
  var chartDom = document.getElementById("columnar");
  // const pageZoom = document.getElementById("app").style.zoom;
  // chartDom.style.zoom = 1 / pageZoom;
  myChart = echarts.init(chartDom);
  var option;
  option = {
    // 这里就是移入之后显示的东西
    tooltip: {
      trigger: "axis",
      show: true,
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      top: "47px",
      left: "10px",
      right: "5px",
      bottom: "25px",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        data: coxdata.value,
        show: true, // 不显示坐标轴线、坐标轴刻度线和坐标轴上的文字
        axisTick: {
          show: false, // 不显示坐标轴刻度线
        },
        axisLine: {
          show: true, // 不显示坐标轴线
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: "rgba(255, 255, 255, 0.85)",
          },
        },
        splitLine: {
          show: false, // 不显示网格线
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        axisLine: {
          show: true,
          lineStyle: {
            color: "rgba(255, 255, 255, 0.85)",
            width: 0,
            type: "dashed",
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
            color: "rgba(41, 49, 54, 1)",
          },
        },
      },
    ],
    series: [
      {
        name: "企业总数:" + sum(cxydata.value) + "家",
        type: "bar",
        barWidth: "12px",
        data: cxydata.value,
        itemStyle: {
          normal: {
            // 设置背景颜色的渐变色
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                { offset: 0, color: "rgba(34, 118, 252, 1)" },
                { offset: 1, color: "rgba(0, 166, 219, 1)" },
              ],
              false
            ),

            // 开启显示顶部的数据
            label: {
              show: true, //开启显示
              position: "top", //在上方显示
              textStyle: {
                //数值样式
                color: "rgba(165, 166, 168, 1)",
                fontSize: 12,
              },
            },
          },
        },
      },
    ],
    legend: {
      // 图例
      show: true,
      top: 12,
      itemGap: 10, // 各个item之间的间隔，单位px，默认为10
      itemWidth: 14, // 图例图形宽度
      itemHeight: 14, // 图例图形高度
      icon: "circle",
      textStyle: {
        fontSize: "14px",
        color: "#C6D1DB", // 图例文字颜色
        lineHeight: 14,
        // 设置图例之间的间距,距离
        rich: {
          verticalAlign: "middle",
        },
        padding: [0, 0, -2, 0], //[上、右、下、左]
      },
      // 盒子的阴影
      itemStyle: {
        shadowColor: "rgba(0, 0, 0, 0.5)",
        shadowBlur: 5,
        shadowOffsetX: 3,
        shadowOffsetY: 5,
      },
    },
    // 下面这个就是提示框的相关的一个配置了
    tooltip: {
      show: true,
      trigger: "axis",
      showContent: true,
      backgroundColor: "rgba(13,20,26,1)",
      showContent: true,
      borderColor: "rgba(255,255,255,0)", //设置自定义边框颜色
      // confine: true,//是否将tooltip框限制在图表的区域内，默认为false
      extraCssText:
        //额外附加到浮层的css样式，此处为为浮层添加阴影及padding
        "box-shadow: 0 0 5px rgba(181, 245, 236, 0.5);padding:5px 15px",
      textStyle: {
        color: "#FFF", // 文字的颜色
        // fontStyle: 'normal',    // 文字字体的风格（'normal'，无样式；'italic'，斜体；'oblique'，倾斜字体）
        // fontWeight: 'normal',    // 文字字体的粗细（'normal'，无样式；'bold'，加粗；'bolder'，加粗的基础上再加粗；'lighter'，变细；数字定义粗细也可以，取值范围100至700）
        fontSize: "14", // 文字字体大小
        // lineHeight: '60',    // 行高
      },
      axisPointer: {
        type: "shadow",
        shadowStyle: {
          color: "rgba(200, 255, 255, 0.2)",
          width: "1",
        },
      },
    },
  };

  option && myChart.setOption(option);
  // tools.loopShowTooltip(myChart, option, { loopSeries: true });//自动轮播主要看这段话
  window.onresize = function () {
    setTimeout(function () {
      myChart.resize();
    }, 10);
  };
  myChart.on("click", function (params) {
    openDialog("qyxx", params);
  });
};

// 下面是这个环形图的各种数据的了
const ringdata = ref([
  { value: 38, name: "未带安全帽" },
  { value: 35, name: "烟感" },
  { value: 30, name: "人员脱岗" },
  { value: 44, name: "水浸" },
  { value: 50, name: "防火区明火" },
  { value: 40, name: "高空坠物" },
]);
// 下面这个就是显示环形图的图表的了
const getring = async function (type = "1") {
  let newringdata = [];
  let newsum = 0;
  let bardata = [];
  let res = await getYjxxtjfx({ type });
  if (res.code == 200) {
    newringdata = res.data.map((item) => item.sz);
    newsum = ref(sum(newringdata));
    bardata = res.data.map((item) => {
      return {
        name: item.mc,
        value: item.sz,
      };
    });
  }
  // 下面来一个求和的一个总数据
  // 求和这个数据放在里面就可以的啦
  // let newringdata = reactive([]);
  // ringdata.value.forEach((v) => {
  //   newringdata.push(v.value);
  // });

  let chartDom = document.getElementById("echarts_box");

  // const pageZoom = document.getElementById("app").style.zoom;
  // chartDom.style.zoom = 1 / pageZoom;

  let myChart2 = echarts.init(chartDom);
  let option;
  option = {
    avoidLabelOverlap: true, //是否启用防止标签重叠策略
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c} ({d}%)",
    },
    title: {
      //标题位置
      left: "center",
      top: "110",
      //标题样式
      text: newsum.value, //\n是换行
      subtext: "预警信息",
      textStyle: {
        fontSize: 32, //标题字体
        color: "rgba(124, 214, 252, 1)",
      },
      fontWeight: "bold",
      subtextStyle: {
        fontSize: 16, //副标题字体
        color: "rgba(255, 255, 255, 1)",
      },
    },
    series: [
      {
        name: "数据",
        type: "pie",
        radius: ["50%", "66%"],
        avoidLabelOverlap: false,
        itemStyle: {
          // 通过设置,设置是否是圆角这种的东西
          borderRadius: 0,
          borderColor: "#0D141A",
          borderWidth: 6,
        },
        //设置数据标签引导线
        labelLine: {
          show: true,
          length: 18,
          length2: 20,
        },
        //格式化数据标签
        label: {
          fontSize: 14,
          position: "outside", // 字体向外对齐
          color: "inherit",
          formatter: "{b|{b}}\n{d|{d}} {e|%}",
          rich: {
            b: {
              color: "#fff",
              fontSize: 14,
              // padding: 10,
              height: 30,
            },
            d: {
              // color: '#fff',
              fontSize: 16,
            },
            e: {
              color: "#fff",
              fontSize: 14,
            },
          },
        },
        data: bardata,
      },
    ],
    // 下面这个就是提示框的相关的一个配置了
    tooltip: {
      show: true,
      // trigger: 'axis',
      showContent: true,
      backgroundColor: "rgba(13,20,26,1)",
      showContent: true,
      borderColor: "rgba(255,255,255,0)", //设置自定义边框颜色
      confine: true, //是否将tooltip框限制在图表的区域内，默认为false
      formatter: "{a}{b} : {c} ({d}%)",
      extraCssText:
        // 额外附加到浮层的css样式，此处为为浮层添加阴影及padding
        "box-shadow: 0 0 5px rgba(181, 245, 236, 0.5);padding:5px 15px",
      textStyle: {
        color: "#FFF", // 文字的颜色
        // fontStyle: 'normal',    // 文字字体的风格（'normal'，无样式；'italic'，斜体；'oblique'，倾斜字体）
        // fontWeight: 'normal',    // 文字字体的粗细（'normal'，无样式；'bold'，加粗；'bolder'，加粗的基础上再加粗；'lighter'，变细；数字定义粗细也可以，取值范围100至700）
        fontSize: "14", // 文字字体大小
        // lineHeight: '60',    // 行高
      },
      // axisPointer: {
      //   type: 'shadow',
      //   shadowStyle: {
      //     color: 'rgba(200, 255, 255, 0.2)',
      //     width: '1'
      //   }
      // }
    },
  };
  myChart2.setOption(option);
  // tools.loopShowTooltip(myChart2, option, { loopSeries: true });//自动轮播主要看这段话
  window.onresize = function () {
    setTimeout(function () {
      myChart2.resize();
    }, 10);
  };
};

onMounted(() => {
  getco();
  getring();
  window.addEventListener("resize", () => {
    myChart.resize();
  });
});

const showQyxxThreePopup = ref(false);
</script>

<!-- 样式 -->
<style scoped lang="less">
// 危化企业这里的背景颜色
.active {
  background: url(../../../assets/left/base_50-1.png) !important;
  background-size: 100% 100% !important;
  background-repeat: no-repeat !important;
  cursor: pointer !important;
}

/* 下面这个是添加的扇形图的样式 */
.sxt {
  position: absolute;
  top: -40px;
  right: 30px;
}

.left {
  padding-left: -10px !important;
}

.items {
  height: 262px;
  margin-bottom: -10px;
  margin-top: -2px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
}

.detectionitem:hover {
  background: url(../../../assets/left/base_50-1.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  cursor: pointer;
}

.detectionitem {
  margin-bottom: 8px;
  padding: 15px;
  background: url(../../../assets/left/base_50-11.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  cursor: pointer;

  .titlesmal {
    display: flex;
    justify-content: space-between;
    margin-bottom: 9px;

    .title {
      font-size: 16px;
    }

    .time {
      font-size: 14px;
    }

    .content {
      font-size: 14px;
    }

    /* 图标 */
    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 41px;
      height: 22px;
      background: #eead0e;
      border-radius: 2px 2px 2px 2px;
      opacity: 1;
      /* border: 1px solid #FFE6A9; */
      font-size: 12px;
      color: #ffffff;
    }

    /* 下面是如果是一般事件的图标样式 */
    .icontwo {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 41px;
      height: 22px;
      background: rgba(53, 126, 189, 1);
      border-radius: 2px 2px 2px 2px;
      opacity: 1;
      /* border: 1px solid #FFE6A9; */
      font-size: 12px;
      color: #ffffff;
    }

    /* 下面这个就是标题 */
    .title {
      width: 187px;
      /* height: 24px; */
      line-height: 24px;
      border-radius: 0px 0px 0px 0px;
      opacity: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* 再下面这个就是文字的内容的了 */
    .time {
      /* width: 143px; */
      height: 20px;
      line-height: 26px;
      font-size: 14px;
      font-family: Source Han Sans SC-Regular, Source Han Sans SC;
      font-weight: 400;
      color: #a5a6a8;
      /* -webkit-background-clip: text;
      -webkit-text-fill-color: transparent; */
    }
  }

  /* 下面就是内容部分的内容的了 */
  .content {
    font-size: 14px;
    font-weight: 400;
    color: #def7ff;
    line-height: 20px;
    -webkit-background-clip: text;
    letter-spacing: 1px;
    /* 不能把这个字设置成透明的东西的了 */
    /* -webkit-text-fill-color: transparent; */
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    /* 超出几行省略 */
    overflow: hidden;
  }
}

/* 下面就是环形图的样式 */
#ring {
  /* height: 280px; */
  margin-bottom: -10px;
  margin-top: -10px;
  position: relative;

  #echarts_box {
    /* margin-top: 5px; */
    height: 287px;
  }

  .echarts_bg {
    width: 200px;
    height: 200px;
    background: url(../../../assets/left/Group427319149.png) no-repeat;
    background-size: 100% 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }
}

.cosss {
  cursor: pointer;
  width: 100%;
  height: 100%;
}

/* 下面就是这个柱状图的样式的了 */
#columnar {
  height: 260px;
  margin-bottom: -10px;
  margin-top: -10px;
}
</style>
