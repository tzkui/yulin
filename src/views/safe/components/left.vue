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
            <span :class="item.name == '较大'?'icon':'icontwo'">{{ item.name }}</span>
            <span class="title">{{ item.title }}</span>
            <span class="time">{{ item.time }}</span>
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
    name="辖区企业列表"
    :listData="qyListData"
    v-if="firDialogFlags.qyxx"
    @closeDialog="closeDialog"
  ></qyxxCheckbox>
</template>

<!-- 下面这里是js的 -->
<script setup>
import { qyxxData } from "@/api/mock_tzk.js";
import qyxxThreePopup from "./qyxxThreePopup.vue";

// 导入这个事件的容器
import selectDate from "./selectDate.vue";
// 引入自动滚动轮播的
import "../components/lunbo";
// 导入这个柱状图的图表
import { inject, ref, onMounted, reactive, onUnmounted } from "vue";
import { viewDetail as viewDetailx } from "@/utils/funcNames/tzk.js";
import { useEventBus } from "@vueuse/core";
import qyxxCheckbox from "@/views/safe/components/qyxxSelectDialog.vue";
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
    getring(val);
  }
};

const firDialogFlags = ref({
  qyxx: false,
});
const qyListData = ref([]);
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
        // name: item.eventLevel == 1 ? "较大" : "一般",
        name: "一般",
        title: item.eventName,
        time: item.eventDate,
        content: item.eventContent,
      };
    });
  }
  secureList.value.forEach((v, i) => {
    v.marker = {
      markerType: "wxx",
        id: v.id,
        icon: "/images/marker/1.gif",
        lng: '109.984485',
        lat: "38.597187",
        name: "预警",
        label: { text: "预警", font_size: 16 },
        dialogType: "whqyxx",
        details: {
          name: v.title,
          // level: v.eventLvl===0?'一般':'重大',
          level: '一般',
          time: v.eventDate,
          content: v.content,
        }
    }
    $mitt.emit("addMarker", v.marker)
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
transValue();
getdatasj();
const closeDialog = function(){
  $mitt.emit("hideAllMarker")
  firDialogFlags.value.qyxx = false;
}
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
const getco = async function () {
  let res = await getXqqytjfx();
  console.log(res, "看看具体到底的是写什么鬼子数据的呢");
  if (res.code == 200) {
    coxdata.value = [];
    cxydata.value = [];
    coxdata.value = res.data.tj.map((item) => item.mc);
    cxydata.value = res.data.tj.map((item) => item.sz);
    console.log(coxdata.value, cxydata.value);
    let typeDict = {}
    qyListData.value = res.data.tree.map((item) => {
      if (item.spare1) {
        let json = JSON.parse(item.spare1);
        let type = json.enterpriseType;
        typeDict[type] = typeDict[type] || 0;
        typeDict[type]+=1
        return {
          id: item.id,
          dataType: item.dataType,
          pid: item.pid,
          title: item.title,
          num:item.count,
          treeId: item.dataType + "--" + item.id,
          mapX: json.longitude,
          mapY: json.latitude,
          searchInfo: json.enterpriseType+","+item.title,
          detail: json,
        }
      } else {
        return {
          ...item,
          num: item.count,
          treeId: item.dataType + "--" + item.id,
          searchInfo: ""
        };
      }
    });
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
        name: "企业总数:" + cxydata.value[0] + "家",
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
  console.log("fjkdf", type)
  let newringdata = [];
  let newsum = 0;
  let bardata = [];
  let res = await getYjxxtjfx({ type });
  console.log("xxxxxxxx预警信息统计分析",  res )
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
