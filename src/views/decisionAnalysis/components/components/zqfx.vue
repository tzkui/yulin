<template>
  <ViewBox title="灾情总体分析">
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
      <timeSelect @selectTime="selectTime" v-if="current_disater_tab!=='总体分析'" :isEarthquake="false"></timeSelect>
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
} from "@/api/decision_analysis.js";
// tab
const disaster_tab = ref(["总体分析", "类型分析", "趋势分析", "区域分析", "灾情热力图"]);
const current_disater_tab = ref("总体分析");
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
    confine: true, //是否将tooltip框限制在图表的区域分析内，默认为false
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
// 灾情总体分析下拉
const initDisasterTypes = async () => {
  let res = await getZqfxDropdowndata();
  // console.log('initDisasterTypes=========>',res);
  let list = res.data || [];
  disaster_types.value = [list.pop(), ...list];
  console.log("xxxxxx", disaster_types.value);
  current_disater_type.value = disaster_types.value[0].value;
  typeId.value = disaster_types.value[0].value
  
  initFxTimes() 
  initZqfxLeveldata(disaster_types.value[0].value);
};
const typeId = ref("")
const startTime = ref("");
const endTime = ref("");
// 灾情总体分析类型分析与区域分析 
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
// 切换灾情类型
const changeDisaster = (val) => {
  initZqfxLeveldata(val);
};

const initFxTimes = function(){
  let year = new Date().getFullYear();
  const getData = function(year,index){
    for(let i=1;i<13;i++){
      let month = i<10?`0${i}`:i+"";
      let endDay = "31"
      if([4,6,9,11].includes(i)){
        endDay="30"
      }else if(i===2){
        if(year%4===0){
          endDay = "29"
        }else{
          endDay="28"
        }
      }
      let param = {
        typeId: typeId.value,
        startTime: year+"-"+month+"-01",
        endTime: year+"-"+month+"-"+endDay,
      }
      getZqfxLeveldata(param).then(res=>{ 
        console.log(res.data.area, res.data.area.reduce((a,b)=>a.value+b.value, {value: 0}))
        let num = 0;
        res.data.area.forEach(item=>{
          num+=item.value||0;
        })
        hbtOption.series[index].data[i-1] = num
      })
    }
  }
  getData(year,0)
  getData(year-1,1)
}
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
const hbtOption = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  legend: {
    show: false,
  },
  grid: [
    // 调整上下图表的大小及位置
    {
      show: false,
      top: "10%",
      left: 30,
      right: 0,
      height: "38%",
    },
    {
      show: false,
      top: "50%",
      left: 30,
      right: 30,
      height: "0%",
    },
    {
      show: false,
      bottom: "5%",
      left: 30,
      right: 0,
      height: "38%",
    },
  ],
  xAxis: [
    {
      type: "category",
      position: "center",
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      zlevel: 200,
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: true,
        align: "center",
        textStyle: {
          color: "#fff",
          fontSize: 10,
        },
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
    {
      gridIndex: 1,
      type: "category",
      position: "center",
      axisLine: {
        show: false,
      },
      axisTick: {
        show: true,
      },
      zlevel: 200,
      axisLabel: {
        show: false,
      },
      data: [],
    },
    {
      gridIndex: 2,
      type: "category",
      position: "top",
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      zlevel: 200,
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: false,
        textStyle: {
          color: "#fff",
          fontSize: 10,
        },
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
  ],
  yAxis: [
    {
      type: "value",
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      minInterval: 1,
      axisLabel: {
        show: true,
        textStyle: {
          color: "#fff",
        },
      },
    },
    {
      gridIndex: 1,
      show: false,
    },
    {
      gridIndex: 2,
      type: "value",
      inverse: true,
      minInterval: 1,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#fff",
        },
      },
    },
  ],
  series: [
    {
      name: new Date().getFullYear()+"年",
      type: "bar",
      xAxisIndex: 0,
      yAxisIndex: 0,
      itemStyle: {
        color: "#EE7E2D",
      },
      stack: "center1",
      data: [2, 3, 4, 5, 6, 7, 8, 3, 5, 7, 4, 2],
      barWidth: 15,
    },
    {
      name: new Date().getFullYear()-1+"年",
      type: "bar",
      showBackground: false,
      xAxisIndex: 2,
      yAxisIndex: 2,
      itemStyle: {
        color: "#4273C5",
      },
      stack: "center2",
      data: [8, 3, 2, 3, 4, 5, 6, 7, 8, 3, 5, 7],
      barWidth: 15,
    },
  ],
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
    case "总体分析":
      initChart(hbtOption);
      break;
    case "类型分析":
      let allNum = 0;
      let level = ["", "一般灾害", "较大灾害", "重大灾害", "特大灾害"];
      const colors = ["","#EE7E2D", "#FC5531", "#FEA67E","#FEC300"]
      option.value.series[0].data = chartData.value.level.map((item, index) => {
        allNum += item.count;
        return { value: item.count, name: level[item.eventlevel], itemStyle: {color: colors[item.eventlevel]} };
      });
      option.value.series[0].label.formatter = () => {
        return `{total|${allNum}} 个\r\n{text|总数}`;
      };

      initChart(option.value);
      break;
    case "趋势分析":
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
    case "区域分析":
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
    case "灾情热力图":
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
    overflow: hidden;
  }
}
</style>
