<template>
  <ViewBox title="总体分析">
    <div class="disaster_situation">
      <timeSelect
        @selectTime="selectTime"
        v-if="['类型分析', '区域分析'].includes(current_disater_tab)"
        :isEarthquake="false"
      ></timeSelect>
      <!-- tab 切换chart -->
      <div class="disaster_tabs">
        <div
          v-for="(item, index) in disaster_tab"
          :key="index"
          :class="{ disaster_tab: true, active: current_disater_tab == item }"
          @click="changeChart(item)"
        >
          {{ item }}
        </div>
      </div>
      <!-- chart -->
      <div class="disaster_chart" id="disaster-chart"></div>
    </div>
  </ViewBox>
</template>

<script setup>
import { ref, onMounted, onUnmounted, inject, nextTick, computed } from "vue";
import timeSelect from "./timeSelect.vue";
const emit = defineEmits(["eventClick"]);
const $mitt = inject("$mitt");

// echarts实例
const echarts = inject("echarts");
import ViewBox from "@/components/common/view-box.vue";
import {
  getZqfxDropdowndata,
  getZqfxLeveldata,
  getZqcxNew,
} from "@/api/decision_analysis.js";
// tab
const disaster_tab = ref([
  "总体分析",
  "类型分析",
  "趋势分析",
  "区域分析",
  "灾情热力图",
]);
const current_disater_tab = ref("总体分析");
// 下拉选项
const disaster_types = ref([]);
const current_disater_type = ref();
// 图表内容
let Mychart = null;
const chartData = ref();
let chartInterval = null; //轮播 interval
onMounted(() => {
  initDisasterTypes();
});
onUnmounted(() => {
  clearInterval(chartInterval);
});
// 灾情总体分析下拉
const initDisasterTypes = async () => {
  let res = await getZqfxDropdowndata();
  let list = res.data || [];
  disaster_types.value = [list.pop(), ...list];
  current_disater_type.value = disaster_types.value[0].value;
  typeId.value = disaster_types.value[0].value;
  initFxTimes();
  initZqfxLeveldata(typeId.value)
};
// 灾情分析等级与区域
const initZqfxLeveldata = async (id) => {
  const param = {
    typeId: id,
    startTime: startTime.value,
    endTime: endTime.value,
  };
  let res = await getZqfxLeveldata(param);
  console.log("getZqfxLeveldata=========>灾情", res);
  chartData.value = res.data;
};
const typeId = ref("");
const startTime = ref("");
const endTime = ref("");
const initFxTimes = function () {
  let year = new Date().getFullYear();
  const getData = function (year, index) {
    ztfxOption.legend.data[index] = year + "年";
    ztfxOption.series[index].name = year + "年";
    for (let i = 1; i < 13; i++) {
      let month = i < 10 ? `0${i}` : i + "";
      let endDay = "31";
      if ([4, 6, 9, 11].includes(i)) {
        endDay = "30";
      } else if (i === 2) {
        if (year % 4 === 0) {
          endDay = "29";
        } else {
          endDay = "28";
        }
      }
      let param = {
        typeId: typeId.value,
        startTime: year + "-" + month + "-01",
        endTime: year + "-" + month + "-" + endDay,
      };
      getZqfxLeveldata(param).then((res) => {
        let num = 0;
        res.data.area.forEach((item) => {
          num += item.value || 0;
        });
        ztfxOption.series[index].data[i - 1] = num;
      });
    }
  };
  getData(year, 0);
  getData(year - 1, 1);
  const setZzl = function () {
    setTimeout(() => {
      let flag = true;
      for (let i = 0; i < 12; i++) {
        let num1 = ztfxOption.series[0].data[i];
        let num2 = ztfxOption.series[1].data[i];
        if (num1 === undefined || num2 === undefined) {
          flag = false;
          break;
        }
      }
      if (flag) {
        for (let i = 0; i < 12; i++) {
          let num1 = ztfxOption.series[0].data[i];
          let num2 = ztfxOption.series[1].data[i];
          if (num2 === 0) {
            ztfxOption.series[2].data[i] = 0;
          } else {
            ztfxOption.series[2].data[i] = Math.round(
              ((num1 - num2) / num2) * 100
            );
          }
          initChart(ztfxOption);
        }
        console.log(ztfxOption.series[2]);
      } else {
        setZzl();
      }
    }, 1000);
  };
  setZzl();
};
// 图表
const initChart = function (option) {
  let chartDom = document.getElementById("disaster-chart");
  const pageZoom = document.getElementById("app").style.zoom;
  chartDom.style.zoom = 1 / pageZoom;
  // 已经存在就销毁，避免重复渲染
  if (Mychart != null) {
    Mychart.dispose();
    clearInterval(chartInterval);
  }

  Mychart = echarts.init(chartDom);
  option && Mychart.setOption(option);
  window.onresize = () => {
    Mychart.resize();
  };

  // 轮播
  let curIndex = -1;
  let interval = 2000;
  setTimeout(() => {
    carouselFuc();
  }, 1000);
  chartInterval = setInterval(carouselFuc, interval);
  function carouselFuc() {
    var dataLen = option.series[0].data.length;
    curIndex = (curIndex + 1) % dataLen;
    // console.log('curIndex', curIndex);
    // 遍历饼图数据，取消所有图形的高亮效果
    for (var idx in option.series[0].data)
      Mychart.dispatchAction({
        type: "downplay",
        seriesIndex: 0,
        dataIndex: idx,
      });
    Mychart.dispatchAction({
      type: "highlight",
      seriesIndex: 0,
      dataIndex: curIndex,
    });
    Mychart.dispatchAction({
      type: "showTip",
      seriesIndex: 0,
      dataIndex: curIndex,
    });
  }
  Mychart.on("mouseover", (params) => {
    // 用户鼠标悬浮到某一图形时，停止自动切换并高亮鼠标悬浮的图形
    clearInterval(chartInterval);
    curIndex = params.dataIndex - 1;
    carouselFuc();
  });

  Mychart.on("mouseout", (params) => {
    // 用户鼠标移出时，重新开始自动切换
    if (chartInterval) clearInterval(chartInterval);
    chartInterval = setInterval(carouselFuc, interval);
  });
};
const ztfxOption = {
  backgroundColor: "",
  color: ["#72A9FE", "#FFC533", "#56C994", "#F6856E", "#ffa43a"],
  title: {},
  legend: {
    orient: "horizontal",
    data: ["2024年", "2023年", "增长率"],
    left: 0,
    top: "0%",
    textStyle: {
      color: "#fff",
      fontSize: 12,
    },
  },
  grid: {
    left: "2%",
    right: "4%",
    bottom: "8%",
    top: "16%",
    containLabel: true,
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
    textStyle: {
      align: "left",
    },
  },
  xAxis: [
    {
      type: "category",
      data: [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月",
      ],
      axisTick: {
        show: false,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#BFC3C6",
        },
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#fff",
          fontSize: 12,
        },
        formatter: "{value}",
      },
    },
  ],
  yAxis: [
    {
      type: "value",
      minInterval: 1,
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: "#cdd5e2",
        },
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#fff",
          fontSize: 12,
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(255,255,255,0.2)",
        },
      },
    },
    {
      type: "value",
      nameTextStyle: {
        color: "#fff",
      },
      position: "right",
      axisLine: {
        lineStyle: {
          color: "#cdd5e2",
        },
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: true,
        formatter: "{value} %", //右侧Y轴文字显示
        textStyle: {
          color: "#fff",
          fontSize: 12,
        },
      },
    },
  ],
  dataZoom: [
    {
      show: true,
      realtime: true,
      height: 12,
      start: 0,
      end: 70,
      bottom: "2%",
      textStyle: {
        color: "#fff",
      },
    },
    {
      type: "inside",
      realtime: true,
      height: 12,
      start: 0,
      end: 70,
      textStyle: {
        color: "#fff",
      },
    },
  ],
  series: [
    {
      name: "2024年",
      type: "bar",
      barWidth: "40%",
      data: [],
      itemStyle: {
        color: "#B3CDE3",
      },
    },
    {
      name: "2023年",
      type: "bar",
      barWidth: "40%",
      data: [],
      itemStyle: {
        color: "#386CB0",
      },
    },
    {
      name: "增长率",
      type: "line",
      yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
      smooth: false, //平滑曲线显示
      symbol: "circle", //标记的图形为实心圆
      symbolSize: 6, //标记的大小
      itemStyle: {
        normal: {
          color: "#ffa43a",
        },
      },
      lineStyle: {
        color: "#B99614",
      },
      data: [],
    },
  ],
};

// 类型分析的饼图配置项
const getPieChartOption = function (data) {
  const pieChartOption = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      top: "60",
      right: "right",
      formatter: function (name) {
        let num = 0;
        data.forEach((item) => {
          if (item.name === name) {
            num = item.value;
          }
        });
        return `${name}：{b|${num}}`;
      },
      textStyle: {
        color: "#fff",
        rich: {
          b: {
            fontWeight: 600,
          },
        },
      },
    },
    series: [
      {
        type: "pie",
        radius: "60%",
        center: ["35%", "60%"],
        label: {
          show: false,
        },
        silent: true,
        clockwise: true,
        data: data,
      },
    ],
  };
  return pieChartOption;
};
const setLxfxChart = function () {
  let data = [
    {
      value: 10,
      name: "地震灾害",
      id: "595cb6699fd2833adae0a96ea29900a9",
      itemStyle: { color: "#5298D8" },
    },
    {
      value: 20,
      name: "地质灾害",
      id: "ec6d04e1f363c1655d1a7aaed2d88e5a",
      itemStyle: { color: "#F57A27" },
    },
    {
      value: 30,
      name: "防汛防洪",
      id: "b894936f083fe9333ef883e6f4ad3048",
      itemStyle: { color: "#A4A4A4" },
    },
    {
      value: 25,
      name: "森火灾害",
      id: "de539197ff68c6a96958928925e8ba7c",
      itemStyle: { color: "#FAC300" },
    },
  ];
  let promises = [];
  data.forEach((item) => {
    let params = {
      typeId: item.id,
      startTime: startTime.value,
      endTime: endTime.value,
    };
    promises.push(getZqfxLeveldata(params));
  });
  Promise.allSettled(promises).then((res) => {
    for (let i = 0; i < res.length; i++) {
      if (res[i].status === "fulfilled") {
        let total = 0;
        res[i].value.data.area.forEach((item) => {
          total += item.value;
        });
        data[i].value = total;
      }
    }
    initChart(getPieChartOption(data));
  });
};
const setQsfxChart = function () {
  const ids = new Map();
  let year = new Date().getFullYear();
  ids.set("595cb6699fd2833adae0a96ea29900a9", "地震灾害");
  ids.set("ec6d04e1f363c1655d1a7aaed2d88e5a", "地质灾害");
  ids.set("b894936f083fe9333ef883e6f4ad3048", "防汛抗洪");
  ids.set("de539197ff68c6a96958928925e8ba7c", "森火灾害");
  let param = {
    typeId: Array.from(ids.keys()).join(","),
    startTime: year + "-01-01",
    endTime: year + "-12-31",
  };
  getZqcxNew(param).then((res) => {
    console.log(res);
    let lists = [];
    ids.forEach((val, key) => {
      lists.push(res.data[key].map((item) => item.num));
    });
    let option = {
      tooltip: {
        trigger: "axis",
      },
      legend: {
        icon: "circle",
        data: ["地震灾害", "地质灾害", "防汛抗洪", "森火灾害"],
        textStyle: {
          color: "#fff",
          fontSize: 12,
        },
        top: 0,
        left: "center",
      },
      dataZoom: [
        {
          show: true,
          realtime: true,
          height: 12,
          start: 0,
          end: 50,
          bottom: "2%",
          textStyle: {
            color: "#fff",
          },
        },
        {
          type: "inside",
          realtime: true,
          height: 12,
          start: 0,
          end: 50,
          textStyle: {
            color: "#fff",
          },
        },
      ],
      grid: {
        top: "23%",
        left: "3%",
        right: "1%",
        bottom: "12%",
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        axisLine: {
          show: true,
          lineStyle: {
            color: "#BFC3C6",
          },
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: "#fff",
            fontSize: 12,
          },
          formatter: "{value}",
        },
        data: [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月",
        ],
      },
      yAxis: {
        type: "value",
        minInterval: 1,
        axisLabel: {
          show: true,
          textStyle: {
            color: "#fff",
            fontSize: 12,
          },
        },
      },
      series: [
        {
          name: "地震灾害",
          type: "line",
          stack: "Total",
          data: lists[0],
          smooth: true,
          itemStyle: {
            color: "#FA8024",
          },
        },
        {
          name: "地质灾害",
          type: "line",
          stack: "Total",
          data: lists[1],
          smooth: true,
          itemStyle: {
            color: "#885EFB",
          },
        },
        {
          name: "防汛抗洪",
          type: "line",
          stack: "Total",
          data: lists[2],
          smooth: true,
          itemStyle: {
            color: "#00D6D6",
          },
        },
        {
          name: "森火灾害",
          type: "line",
          stack: "Total",
          data: lists[3],
          smooth: true,
          itemStyle: {
            color: "#DA4767",
          },
        },
      ],
    };
    initChart(option);
  });
};
const setQyfxChart = function () {
  let param = {
    typeId: typeId.value,
    startTime: startTime.value,
    endTime: endTime.value,
  };
  getZqfxLeveldata(param).then((res) => {
    let area = res.data.area;
    let option = {
      backgroundColor: "",
      color: ["#72A9FE", "#FFC533", "#56C994", "#F6856E", "#ffa43a"],
      legend: {
        data: ["灾情数量"],
        left: 0,
        top: "12%",
        textStyle: {
          color: "#fff",
          fontSize: 12,
        },
      },
      grid: {
        left: "2%",
        right: "4%",
        bottom: "8%",
        top: "26%",
        containLabel: true,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
        textStyle: {
          align: "left",
        },
      },
      xAxis: [
        {
          type: "category",
          data: area.map(item=>item.name),
          axisTick: {
            show: false,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#BFC3C6",
            },
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff",
              fontSize: 12,
            },
            formatter: "{value}",
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          minInterval: 1,
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#cdd5e2",
            },
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff",
              fontSize: 12,
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,0.2)",
            },
          },
        },
      ],
      dataZoom: [
        {
          show: true,
          realtime: true,
          height: 12,
          start: 0,
          end: 40,
          bottom: "2%",
          textStyle: {
            color: "#fff",
          },
        },
        {
          type: "inside",
          realtime: true,
          height: 12,
          start: 0,
          end: 40,
          textStyle: {
            color: "#fff",
          },
        },
      ],
      series: [
        {
          name: "灾情数量",
          type: "bar",
          barWidth: "40%",
          data: area.map(item=>item.value),
          itemStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                { offset: 0, color: "#00B0F0" },
                { offset: 1, color: "#9BE4FF" },
              ],
            },
          },
          label: {
            normal: {
              show: true, //是否显示
              position: "top", //文字位置
              formatter: "{c}", //c后面加单位
              color: "#ffffff",
              fontSize: 12,
            },
          },
        },
      ],
    };
    initChart(option);
  });
};
const changeChart = (item) => {
  if(current_disater_tab.value==="灾情热力图"){
    $mitt.emit("removeHostLayer")
  }
  current_disater_tab.value = item;
  switch (item) {
    case "总体分析":
      initChart(ztfxOption);
      break;
    case "类型分析":
      setLxfxChart();
      break;
    case "趋势分析":
      setQsfxChart();
      break;
    case "区域分析":
      setQyfxChart();
      break;
    case "灾情热力图":
      addHotMap();
      break;
    default:
      () => {};
      break;
  }
};
const addHotMap = function () {
  let list = chartData.value.hot.filter((item) => {
    return item.mapX !== "null" && item.mapY !== "null";
  });
  if (list.length > 0) {
    let points = list.map((item) => {
      return [item.mapY - 0, item.mapX - 0, item.num];
    });
    $mitt.emit("addHostLayer", points);
  }
};
const selectTime = function ([start, end]) {
  if (start && end) {
    startTime.value = start;
    endTime.value = end;
  } else {
    startTime.value = "";
    endTime.value = "";
  }
  if (current_disater_tab.value === "类型分析") {
    setLxfxChart();
  } else if (current_disater_tab.value === "趋势分析") {
    setQsfxChart();
  } else if (current_disater_tab.value === "区域分析") {
    setQyfxChart();
  }
};
</script>

<style scoped lang="less">
.disaster_situation {
  height: 230px;
  position: relative;
  display: flex;

  .type_select_box {
    position: absolute;
    top: -50px;
    right: 30px;

    :deep(.el-select) {
      .el-input {
        height: 25px;
        width: 120px;
      }

      .el-input__wrapper {
        box-shadow: none !important;
        border-radius: 0;
        background: #09262e !important;
        border: 2px solid #0698d7 !important;
      }

      .el-input__inner {
        height: 100%;
      }

      .el-select-dropdown__item.selected {
        background-color: rgba(0, 0, 0, 0.1) !important;
        color: #53befc !important;
      }

      .el-select-dropdown__item {
        font-size: 16px !important;
        height: 28px !important;
        padding: 4px !important;
      }
    }
  }

  .disaster_tabs {
    width: 96px;

    .disaster_tab {
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      width: 100%;
      font-size: 12px;
      background: url("@/assets/decisionAnalysis/tab.png") center/99% 100%
        no-repeat;
      margin-bottom: 8px;

      &:hover,
      &.active {
        background: url("@/assets/decisionAnalysis/tab_active.png") center/99%
          100% no-repeat;
      }
    }
  }

  .disaster_chart {
    flex: 1;
    // overflow: hidden;
  }
}
</style>
