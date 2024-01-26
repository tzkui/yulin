<template>
  <ViewBox title="地震分析">
    <div class="disaster_situation">
      <div class="type_select_box">
        <!-- <el-select
          @change="changeDisaster"
          v-model="current_disater_type"
          placeholder="请选择类型"
          :teleported="false"
        >
          <el-option
            v-for="item in disaster_types"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          >
          </el-option>
        </el-select> -->
      </div>
      <timeSelect @selectTime="selectTime" :isEarthquake="true"></timeSelect>
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
      <div class="disaster_chart" id="disaster-chart3"></div>
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
const disaster_tab = ref([
  "类型占比",
  "类型分布",
  "震级分析",
  "重点关注",
  "地震频发区",
]);
const current_disater_tab = ref("震级分析");
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

// 灾情分析下拉
const initDisasterTypes = async () => {
  let res = await getZqfxDropdowndata();
  let list = res.data || [];
  disaster_types.value = [list.pop(), ...list];
  console.log("xxxxxx", disaster_types.value);
  current_disater_type.value = disaster_types.value[3].value;
  initZqfxLeveldata(disaster_types.value[3].value);
};
const startTime = ref("");
const endTime = ref("");
// 灾情分析震级与区域
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
  let chartDom = document.getElementById("disaster-chart3");
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
  if(current_disater_tab.value==="地震频发区"){
    $mitt.emit("removeHostLayer")
  }
  current_disater_tab.value = item;
  switch (item) {
    case "类型占比":
      setLxzbChart();
      break;
    case "类型分布":
      setLxfbChart();
      break;
    case "震级分析":
      setZjfxChart();
      break;
    case "重点关注":
      setZdgzChart();
      break;
    case "地震频发区":
      addHotMap();
      break;
    default:
      () => {};
      break;
  }
};
const setLxzbChart = function () {
  let option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      icon: "circle",
      top: "center",
      left: "0",
      orient: "vertical",
      textStyle: {
        color: "#fff",
        fontSize: 10,
      },
    },
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        center: ["60%", "50%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            color: "#fff",
            fontWeight: "500",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 0, name: "构造地震", itemStyle: { color: "#5B9BD5" } },
          { value: 0, name: "火山地震", itemStyle: { color: "#ED7D31" } },
          { value: 0, name: "塌陷地震", itemStyle: { color: "#A5A5A5" } },
          { value: 0, name: "诱发地震", itemStyle: { color: "#FFC000" } },
          { value: 0, name: "人工地震", itemStyle: { color: "#4472C4" } },
        ],
      },
    ],
  };
  initChart(option);
};
const setLxfbChart = function () {
  let option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      textStyle: {
        color: "#fff",
        fontSize: 12,
      },
      icon: "circle",
      bottom: "5%",
      left: "center",
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "23%",
      top: "16%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        data: [
          "榆林市",
          "神木市",
          "榆阳区",
          "横山区",
          "府谷县",
          "靖边县",
          "定边县",
          "绥德县",
          "米脂县",
          "佳县",
          "吴堡县",
          "清润县",
          "子洲县",
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
        axisLabel: {
          show: true,
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
        name: "构造地震",
        type: "bar",
        stack: "Ad",
        emphasis: {
          focus: "series",
        },
        itemStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 1,
            x2: 0,
            y2: 0,
            colorStops: [
              { offset: 0, color: "#2D5E9A" },
              { offset: 1, color: "#3A7CCB" },
            ],
          },
        },
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: "火山地震",
        type: "bar",
        stack: "Ad",
        emphasis: {
          focus: "series",
        },
        itemStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 1,
            x2: 0,
            y2: 0,
            colorStops: [
              { offset: 0, color: "#ED1C24" },
              { offset: 1, color: "#9D2D2A" },
            ],
          },
        },
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: "塌陷地震",
        type: "bar",
        stack: "Ad",
        emphasis: {
          focus: "series",
        },
        itemStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 1,
            x2: 0,
            y2: 0,
            colorStops: [
              { offset: 0, color: "#769635" },
              { offset: 1, color: "#9CC746" },
            ],
          },
        },
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: "诱发地震",
        type: "bar",
        stack: "Ad",
        emphasis: {
          focus: "series",
        },
        itemStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 1,
            x2: 0,
            y2: 0,
            colorStops: [
              { offset: 0, color: "#5E427E" },
              { offset: 1, color: "#7B57A8" },
            ],
          },
        },
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: "人工地震",
        type: "bar",
        stack: "Ad",
        emphasis: {
          focus: "series",
        },
        itemStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 1,
            x2: 0,
            y2: 0,
            colorStops: [
              { offset: 0, color: "#2788A1" },
              { offset: 1, color: "#35B2D4" },
            ],
          },
        },
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    ],
  };
  initChart(option);
};
const setZjfxChart = function () {
  let param = {
    typeId: "595cb6699fd2833adae0a96ea29900a9",
    startTime: startTime.value,
    endTime: endTime.value,
  };
  getZqfxLeveldata(param).then((res) => {
    let levels = res.data.level;
    let vals = [0, 0, 0, 0, 0, 0, 0];
    levels.forEach((item) => {
      vals[item.eventlevel - 1] = item.count;
    });
    let data = [
      { value: vals[0], name: "超微震", itemStyle: { color: "#00E9DB" } },
      { value: vals[1], name: "微震", itemStyle: { color: "#00D0FF" } },
      { value: vals[2], name: "有感地震", itemStyle: { color: "#2F6FFF" } },
      { value: vals[3], name: "中强震", itemStyle: { color: "#4E60FF" } },
      { value: vals[4], name: "强震", itemStyle: { color: "#164FFF" } },
      { value: vals[5], name: "大地震", itemStyle: { color: "#39A8C4" } },
      { value: vals[6], name: "巨大地震", itemStyle: { color: "#ED7D31" } },
    ];
    let option = {
      tooltip: {
        trigger: "item",
      },
      legend: {
        bottom: "1%",
        left: "center",
        icon: "circle",
        textStyle: {
          color: "#fff",
        },
      },
      series: [
        {
          type: "pie",
          radius: ["30%", "50%"],
          avoidLabelOverlap: false,
          label: {
            show: true,
            textStyle: {
              color: "#FFFFFF",
            },
            formatter(param) {
              return `${param.name}: ${param.percent}%`;
            },
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 24,
              fontWeight: "bold",
            },
          },
          data: data,
        },
      ],
    };
    initChart(option);
  });
};
const setZdgzChart = function () {
  let param = {
    typeId: "595cb6699fd2833adae0a96ea29900a9",
    startTime: startTime.value,
    endTime: endTime.value,
  };
  getZqfxLeveldata(param).then((res) => {
    let levels = res.data.level;
    let vals = [0, 0, 0, 0, 0, 0, 0];
    levels.forEach((item) => {
      vals[item.eventlevel - 1] = item.count;
    });
    let data = [
      { value: vals[0], name: "超微震", itemStyle: { color: "#5B9BD5" } },
      { value: vals[1], name: "微震", itemStyle: { color: "#ED7D31" } },
      { value: vals[2], name: "有感地震", itemStyle: { color: "#A5A5A5" } },
      { value: vals[3], name: "中强震", itemStyle: { color: "#FFC000" } },
      { value: vals[4], name: "强震", itemStyle: { color: "#4472C4" } },
      { value: vals[5], name: "大地震", itemStyle: { color: "#39A8C4" } },
      { value: vals[6], name: "巨大地震", itemStyle: { color: "#255E91" } },
    ];
    let total = 0;
    data.forEach((item) => {
      total += item.value;
    });
    if (total === 0) {
      total = 1;
    }
    let option = {
      legend: {
        orient: "vertical",
        right: 0,
        top: 60,
        icon: "",
        textStyle: {
          color: "#fff",
        },
        formatter(param) {
          let percent = 0;
          for (const info of data) {
            if (info.name === param) {
              percent = parseInt((info.value / total) * 10000) / 100;
              break;
            }
          }
          return `${param}: ${percent}%`;
        },
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      series: [
        {
          name: "Nightingale Chart",
          type: "pie",
          radius: [0, 80],
          center: ["30%", "50%"],
          roseType: "area",
          label: {
            show: false,
          },
          itemStyle: {
            borderRadius: 8,
          },
          data: data,
        },
      ],
    };
    initChart(option);
  });
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
  height: 300px;
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
