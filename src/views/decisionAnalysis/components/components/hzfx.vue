<template>
  <ViewBox title="火灾分析">
    <div class="disaster_situation">
      <timeSelect @selectTime="selectTime" :isEarthquake="false"></timeSelect>
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
      <div class="disaster_chart" id="disaster-chart2"></div>
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
} from "@/api/decision_analysis.js";
// tab
const disaster_tab = ref(["分析", "等级", "趋势", "区域", "热力图"]);
const current_disater_tab = ref("趋势");
// 下拉选项
const disaster_types = ref([]);
const current_disater_type = ref();
// 图表内容
let Mychart = null;
const option = ref({
  tooltip: {
    show: true,
    showContent: true,
    backgroundColor: "rgba(13,20,26,1)",
    showContent: true,
    borderColor: "rgba(255,255,255,0)", //设置自定义边框颜色
    confine: true, //是否将tooltip框限制在图表的区域内，默认为false
    formatter: `{a}{b} : {c} ({d}%)`,
    extraCssText:
      // 额外附加到浮层的css样式，此处为为浮层添加阴影及padding
      "box-shadow: 0 0 5px rgba(181, 245, 236, 0.5);padding:5px 15px",
    textStyle: {
      color: "#FFF", // 文字的颜色
      fontSize: "14", // 文字字体大小
    },
  },
  legend: {
    orient: "vertical",
    type: "",
    top: "center",
    right: "15",
    icon: "circle",
    itemWidth: 16,
    itemHeight: 16,
    itemGap: 30,
    formatter: function (name) {
      return "{title|" + name + "}";
    },
    textStyle: {
      color: "inherit",
      rich: {
        title: {
          fontSize: 14,
          padding: [0, 15, 0, 15],
        },
      },
    },
  },
  series: [
    {
      name: "",
      type: "pie",
      radius: ["52%", "65%"],
      center: ["30%", "50%"],
      avoidLabelOverlap: false,
      label: {
        position: "center",
        formatter: () => {
          return "{total|255} 个\r\n{text|总数}";
        },
        rich: {
          total: {
            fontSize: 30,
            lineHeight: 60,
          },
          text: {
            color: "#ccc",
            fontSize: 18,
          },
        },
        color: "#fff",
        fontSize: 14,
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 200, name: "一般灾害" },
        { value: 40, name: "较大灾害" },
        { value: 10, name: "重大灾害" },
        { value: 5, name: "特大灾害" },
      ],
    },
    // 样式而已...
    {
      type: "gauge",
      name: "",
      radius: "93%",
      startAngle: "0",
      endAngle: "-359.99",
      splitNumber: "40",
      center: ["30%", "50%"],
      pointer: {
        show: false,
      },
      title: {
        show: false,
      },
      detail: {
        show: false,
      },
      data: [
        {
          value: 95,
          name: "",
        },
      ],
      axisLine: {
        lineStyle: {
          width: 15,
          opacity: 0,
        },
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
        length: 2,
        lineStyle: {
          color: "#4f5c64",
          width: 8,
          type: "solid",
        },
      },
      axisLabel: {
        show: false,
      },
    },
    {
      name: "",
      type: "pie",
      startAngle: 90,
      radius: ["72%", "74%"],
      emphasis: {
        scale: false,
      },
      tooltip: {
        show: false,
      },
      center: ["30%", "50%"],
      labelLine: {
        show: false,
      },
      itemStyle: {
        color: "rgba(66, 66, 66, .4)",
        shadowBlur: 10,
        shadowColor: "rgba(253, 249, 20, .3)",
      },
      data: [
        {
          value: 100,
        },
      ],
    },
    {
      name: "",
      type: "pie",
      startAngle: 90,
      radius: ["74.5%", "76%"],
      emphasis: {
        scale: false,
      },
      tooltip: {
        show: false,
      },
      center: ["30%", "50%"],
      labelLine: {
        show: false,
      },
      itemStyle: {
        color: "rgba(66, 66, 66, .3)",
        shadowBlur: 10,
        shadowColor: "rgba(253, 249, 20, .3)",
      },
      data: [
        {
          value: 100,
        },
      ],
    },
    {
      name: "",
      type: "pie",
      startAngle: 90,
      radius: ["76.5%", "77.8%"],
      emphasis: {
        scale: false,
      },
      tooltip: {
        show: false,
      },
      center: ["30%", "50%"],
      labelLine: {
        show: false,
      },
      itemStyle: {
        color: "rgba(66, 66, 66, .2)",
        shadowBlur: 10,
        shadowColor: "rgba(253, 249, 20, .3)",
      },
      data: [
        {
          value: 100,
        },
      ],
    },
    {
      name: "",
      type: "pie",
      startAngle: 90,
      radius: ["79.5%", "80.5%"],
      emphasis: {
        scale: false,
      },
      tooltip: {
        show: false,
      },
      center: ["30%", "50%"],
      labelLine: {
        show: false,
      },
      itemStyle: {
        color: "rgba(66, 66, 66, .1)",
        shadowBlur: 10,
        shadowColor: "rgba(253, 249, 20, .3)",
      },
      data: [
        {
          value: 100,
        },
      ],
    },
  ],
});
const chartData = ref();
let chartInterval = null; //轮播 interval
onMounted(() => {
  initDisasterTypes();
});
onUnmounted(() => {
  clearInterval(chartInterval);
});

// 灾情分析下拉
const initDisasterTypes = async () => {
  let res = await getZqfxDropdowndata();
  // console.log('initDisasterTypes=========>',res);
  let list = res.data || []
  disaster_types.value = [list.pop(),...list];
  console.log("xxxxxx",disaster_types.value)
  current_disater_type.value = disaster_types.value[5].value;
  initZqfxLeveldata(disaster_types.value[5].value);
};
const startTime = ref("");
const endTime = ref("");
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
  changeChart(current_disater_tab.value);
};
// 图表
const initChart = function (option) {
  let chartDom = document.getElementById("disaster-chart2");
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
const changeChart = (item) => {
  current_disater_tab.value = item;
  let noption = {
    grid: {
      top: "18%",
      bottom: "23%", //也可设置left和right设置距离来控制图表的大小
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(13,20,26,1)",
      showContent: true,
      borderColor: "rgba(255,255,255,0)", //设置自定义边框颜色
      extraCssText:
        "box-shadow: 0 0 5px rgba(181, 245, 236, 0.5);padding:5px 15px",
      textStyle: {
        color: "#FFF", // 文字的颜色
        fontSize: "14", // 文字字体大小
      },
      axisPointer: {
        type: "shadow",
        shadowStyle: {
          color: "rgba(200, 255, 255, 0.2)",
          width: "1",
        },
      },
    },
    xAxis: {
      data: ["1", "2", "3", "4", "5"],
      axisLine: {
        show: true, //隐藏X轴轴线
        lineStyle: {
          color: "#26353c",
        },
      },
      axisTick: {
        show: false, //隐藏X轴刻度
      },
      axisLabel: {
        show: true,
        color: "#fff", //X轴文字颜色
        fontSize: 16,
        interval: 0,
        formatter: function (value) {
          return value.split("").join("\n");
        },
      },
    },
    yAxis: [
      {
        type: "value",
        name: "",
        minInterval: 1,
        nameTextStyle: {
          color: "#fff",
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: true,
          color: "#fff",
          fontSize: 16,
        },
      },
      {
        type: "value",
        gridIndex: 0,
        min: 50,
        max: 100,
        splitLine: {
          show: true,
          lineStyle: {
            color: "#10222d",
          },
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
      },
    ],
    series: [
      // {
      //   name: "数量",
      //   type: "bar",
      //   barWidth: 25,
      //   label: {
      //     show: true,
      //     position: "top",
      //     color: "#fff",
      //     fontSize: 16,
      //   },
      //   itemStyle: {
      //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      //       {
      //         offset: 0,
      //         color: "rgba(38,218,207,1)",
      //       },
      //       {
      //         offset: 1,
      //         color: "rgba(38,218,207,0)",
      //       },
      //     ]),
      //   },
      //   data: [4.2, 3.8, 4.8, 3.5, 2.9],
      // },
      // {
      //   name: "数量",
      //   type: "line",
      //   showAllSymbol: true, //显示所有图形。
      //   symbolSize: 2, //标记的大小
      //   itemStyle: {
      //     //折线拐点标志的样式
      //     color: "#c5cf9b",
      //   },
      //   lineStyle: {
      //     color: "#c5cf9b",
      //   },
      //   data: [4.2, 3.8, 4.8, 3.5, 2.9],
      // },
    ],
  };
  switch (item) {
    case "分析":
    case "等级":
      let allNum = 0;
      let level = ["", "一般灾害", "较大灾害", "重大灾害", "特大灾害"];
      const colors = ["","#EE7E2D", "#FC5531", "#FEA67E","#FEC300"]
      option.value.series[0].data = chartData.value.level.map((item) => {
        allNum += item.count;
        return { value: item.count, name: level[item.eventlevel], itemStyle: {color: colors[item.eventlevel]} };
      });
      option.value.series[0].label.formatter = () => {
        return `{total|${allNum}} 个\r\n{text|总数}`;
      };

      initChart(option.value);
      break;
    case "趋势":
      let dataArr = [];
      noption.xAxis.data = chartData.value.date.map((item) => {
        dataArr.push(item.count);
        return item.month + "月";
      });
      noption.series = [
        {
          name: "数量",
          type: "line",
          showAllSymbol: true, //显示所有图形。
          symbolSize: 2, //标记的大小
          itemStyle: {
            //折线拐点标志的样式
            color: "#c5cf9b",
          },
          lineStyle: {
            color: "#c5cf9b",
          },
          data: dataArr,
        },
      ];

      initChart(noption);
      break;
    case "区域":
      let dataArea = [];
      noption.xAxis.data = chartData.value.area.map((item) => {
        dataArea.push(item.value);
        return item.name;
      });
      noption.series = [
        {
          name: "数量",
          type: "bar",
          barWidth: 14,
          label: {
            show: true,
            position: "top",
            color: "#fff",
            fontSize: 16,
          },
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(38,218,207,1)",
              },
              {
                offset: 1,
                color: "rgba(38,218,207,0)",
              },
            ]),
          },
          data: dataArea,
        },
      ];
      initChart(noption);
      break;
    case "热力图":
      addHotMap();
      break;
    default:
      () => {};
      break;
  }
};
const addHotMap = function () {
  console.log(chartData.value);
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
  initZqfxLeveldata(current_disater_type.value);
};
</script>

<style scoped lang="less">
  .disaster_situation {
    height: 230px;
    position: relative;
    display: flex;

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
      overflow: hidden;
    }
  }

</style>
