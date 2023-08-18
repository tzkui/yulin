<template>
  <div class="left">
    <ViewBox title="灾情分析">
      <div class="disaster_situation">
        <div class="type_select_box">
          <el-select @change="changeDisaster" v-model="current_disater_type" placeholder="请选择类型" :teleported="false">
            <el-option v-for="item in disaster_types" :key="item.value" :label="item.name" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <!-- tab 切换chart -->
        <div class="disaster_tabs">
          <div v-for="(item, index) in disaster_tab" :key="index"
            :class="{ 'disaster_tab': true, 'active': current_disater_tab == item }" @click="changeChart(item)">
            {{ item }}</div>
        </div>
        <!-- chart -->
        <div class="disaster_chart" id="disaster-chart">

        </div>
      </div>
    </ViewBox>
    <ViewBox title="灾情综合查询">
      <div class="disaster_synthesis">
        <!-- 搜索框 -->
        <!-- <div class="synthesis_search">
          <el-input v-model="disaster_serach" placeholder="" />
          <div class="search_btn">搜索</div>
        </div> -->
        <!-- 列表 -->
        <div v-show="showDetail" class="disaster_synthesis_details">
          <button class="back_list" @click="() => { showDetail = false; }">返回</button>
          <div v-if="disaster_synthesis_details.length" class="synthesis_details">
            <div class="synthesis_detail" v-for="(item, index) in disaster_synthesis_details" :key="index">
              <div class="date_time">
                {{ item.dynamicsDate.substr(0, 10) }} <span class="time">{{ item.dynamicsDate.substr(11) }}</span>
              </div>
              <div class="cont">
                <span class="blue">{{ item.dynamicsTag }}</span>
                {{ item.dynamicsContent }}
              </div>
            </div>
          </div>
          <div class="empty_data">
            暂无数据
          </div>
        </div>
        <div v-show="!showDetail" class="affairmain">
          <!-- 还是判断循环渲染添加进行 -->
          <template v-for=" (item, index) in disaster_synthesis">
            <div :class="{ 'item': true, 'active': currentEvent == item.event.id }" v-if="item.event.eventLevel == '1'"
              @click="setMarker('zqzhcx', item)" :key="index">
              <p class="itemtitle">{{ item.event.eventLevelName + '事件' }}</p>
              <p class="centers">
                <span class="center_text">详情: {{ item.event.eventContent }}</span>
                <span class="center_text">时间: {{ item.event.eventDate }}</span>
                <span class="center_text">地点: {{ item.event.eventAddress }}</span>
              </p>
              <div class="labels">
                <p class="labels-top">
                  <span class="one">{{ item.event.typeName }}</span>
                  <span class="twopro" v-if="item.event.stateName == '处理中'">{{ item.event.stateName }}</span>
                  <span class="two" v-else>{{ item.event.stateName }}</span>
                </p>
                <p class="labels-bottoms">
                  <span class="labels-bottom">{{ item.event.reportStateName }}</span>
                </p>
              </div>
            </div>
            <!-- 下面这个就是较大事件的 -->
            <div :class="{ 'itempro': true, 'active': currentEvent == item.event.id }" v-if="item.event.eventLevel == '3'"
              @click="setMarker('zqzhcx', item)" :key="index">
              <p class="itemtitle">{{ item.event.eventLevelName + '事件' }}</p>
              <p class="centers">
                <span class="center_text">详情: {{ item.event.eventContent }}</span>
                <span class="center_text">时间: {{ item.event.eventDate }}</span>
                <span class="center_text">地点: {{ item.event.eventAddress }}</span>
              </p>
              <div class="labels">
                <p class="labels-top">
                  <span class="one">{{ item.event.typeName }}</span>
                  <span class="twopro" v-if="item.event.stateName == '处理中'">{{ item.event.stateName }}</span>
                  <span class="two" v-else>{{ item.event.stateName }}</span>
                </p>
                <p class="labels-bottoms">
                  <span class="labels-bottom">{{ item.event.reportStateName }}</span>
                </p>
              </div>
            </div>
          </template>
        </div>
      </div>
    </ViewBox>
    <ViewBox title="案例库">
      <div class="case_library">
        <div class="case_library_btn">
          查看
        </div>
      </div>
    </ViewBox>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, inject, nextTick } from "vue";
const emit = defineEmits(["eventClick"]);
const $mitt = inject("$mitt");

// echarts实例
const echarts = inject("echarts");
import ViewBox from "@/components/common/view-box.vue";
import { getZqfxDropdowndata, getZqfxLeveldata, getZqzhcx } from '@/api/decision_analysis.js'
// tab
const disaster_tab = ref(["分析", "等级", "趋势", "区域"]);
const current_disater_tab = ref("分析");
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
        { value: 200, name: "一般火灾" },
        { value: 40, name: "较大火灾" },
        { value: 10, name: "重大火灾" },
        { value: 5, name: "特大火灾" },
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
const chartData = ref()
let chartInterval = null; //轮播 interval
// 灾情综合查询列表
const disaster_serach = ref();
const showDetail = ref(true);
const currentEvent = ref();
const disaster_synthesis = ref([]);
// 灾情综合查询列表 详情
const disaster_synthesis_details = ref([]);

onMounted(() => {
  initDisasterTypes()
  initZqzhcx()
});
onUnmounted(() => {
  clearInterval(chartInterval);
});

// 灾情分析下拉
const initDisasterTypes = async () => {
  let res = await getZqfxDropdowndata()
  // console.log('initDisasterTypes=========>',res);
  disaster_types.value = res.data
  current_disater_type.value = res.data[0].value
  initZqfxLeveldata(res.data[0].value)
}
// 灾情分析等级与区域
const initZqfxLeveldata = async (id) => {
  let res = await getZqfxLeveldata({ typeId: id })
  // console.log('getZqfxLeveldata=========>', res);
  chartData.value = res.data
  changeChart(current_disater_tab.value)
}
// 切换灾情类型
const changeDisaster = (val) => {
  initZqfxLeveldata(val)
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
    case "分析":
    case "等级":
      let allNum = 0
      let level = ['', '一般火灾', '较大火灾', '重大火灾', '特大火灾']
      option.value.series[0].data = chartData.value.level.map(item => {
        allNum += item.count
        return { value: item.count, name: level[item.eventlevel] }
      })
      option.value.series[0].label.formatter = () => { return `{total|${allNum}} 个\r\n{text|总数}`; }

      initChart(option.value);
      break;
    case "趋势":
      let dataArr = []
      noption.xAxis.data = chartData.value.date.map(item => {
        dataArr.push(item.count)
        return item.month + '月'
      })
      noption.series = [{
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
      }]

      initChart(noption);
      break;
    case "区域":
      let dataArea = []
      noption.xAxis.data = chartData.value.area.map(item => {
        dataArea.push(item.value)
        return item.name
      })
      noption.series = [{
        name: "数量",
        type: "bar",
        barWidth: 25,
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
      },]
      initChart(noption);
      break;

    default:
      () => { };
      break;
  }
};
// 灾情综合查询
const initZqzhcx = async () => {
  let res = await getZqzhcx()
  console.log('getZqzhcx===========>', res);
  disaster_synthesis.value = res.data
  setMarker("zqzhcx", disaster_synthesis.value[0]);
}
// 列表点击撒点...
const setMarker = (type, data) => {
  // console.log("item===========>", data);
  // return
  disaster_synthesis_details.value = data.eventDynamics

  let item = data.event
  currentEvent.value = item.id;
  // 先清除 再撒点
  $mitt.emit("clearAll", { ignore: ["geo绘制图层"] });
  emit("eventClick", item);
  let markerData = {
    markerType: "sj",
    id: item.id,
    lng: item.mapX,
    lat: item.mapY,
    name: item.typeName,
    icon: "/images/marker/1.gif",
    label: { text: item.typeName, font_size: 16 },
    dialogType: "zqzhcx",
    details: {
      date: item.eventDate.replace(' ', '&nbsp;'),
      name: item.eventName,
      location: item.eventAddress,
      cont: item.eventContent,
    },
  };
  if (type === "zqzhcx") {
    showDetail.value = !showDetail.value;
    $mitt.emit("addMarker", markerData);
    $mitt.emit("openPopup", markerData);
    $mitt.emit("flyTo", markerData);
  }
};
</script>

<style scoped lang="less">
.left {
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
          background-color: rgba(0, 0, 0, .1) !important;
          color: #53befc !important;
        }

        .el-select-dropdown__item {
          font-size: 16px !important;
          height: 28px !important;
          padding: 4px 0 !important;
        }

      }
    }

    .disaster_tabs {
      width: 100px;

      .disaster_tab {
        height: 45px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        width: 100%;
        font-size: 12px;
        background: url("@/assets/decisionAnalysis/tab.png") center/99% 100% no-repeat;
        margin-bottom: 8px;

        &:hover,
        &.active {
          background: url("@/assets/decisionAnalysis/tab_active.png") center/99% 100% no-repeat;
        }
      }
    }

    .disaster_chart {
      flex: 1;
      overflow: hidden;
    }
  }

  .disaster_synthesis {
    height: 520px;
    position: relative;

    .synthesis_search {
      position: absolute;
      top: -55px;
      right: 30px;
      display: flex;
      align-items: center;

      :deep(.el-input) {
        height: 32px;
        width: 150px;
        border: 1px solid #0698d7 !important;
        border-radius: 5px;
      }

      .search_btn {
        height: 30px;
        line-height: 30px;
        width: 58px;
        background: linear-gradient(90deg, #0698d7 0%, #24e3d7 100%);
        text-align: center;
        cursor: pointer;
        font-size: 14px;
        margin-left: 3px;
      }
    }

    .affairmain {
      height: 100%;
      overflow-y: auto;
      padding: 0 10px 0 0;

      .item:hover,
      .item.active {
        background-color: #09212f;
      }

      .item {
        cursor: pointer;
        display: flex;
        width: 100%;
        height: 115px;
        flex-direction: row;
        align-items: center;
        padding: 8px 8px;
        border-bottom: 2px solid rgba(10, 54, 72, 1);

        .itemtitle {
          width: 64px;
          height: 24px;
          background-color: #367ebc;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 16px;
        }

        // 中间内容
        .centers {
          width: 178px;
          height: 100%;
          display: flex;
          justify-content: space-around;
          flex-direction: column;
          margin-right: 16px;
          font-size: 14px;
          color: rgba(208, 222, 238, 1);

        }

        // 下面就是最后的标签的部分的了
        .labels {
          flex: 1;
          width: 1;

          .labels-top {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;

            .one {
              width: 64px;
              height: 26px;
              background-color: #061b42;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #d9dde2;
              border: 1px solid #1d75d6;
            }

            .two {
              width: 52px;
              height: 26px;
              background-color: #061b42;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #1a73d8;
              border: 1px solid #1d75d6;
            }

            .twopro {
              width: 52px;
              height: 26px;
              background-color: #061b42;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #b9ca3a;
              border: 1px solid #1d75d6;
            }
          }

          // 底部的标签
          .labels-bottoms {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: end;
            color: #35dfed;
          }

          .labels-bottom {
            background: linear-gradient(180deg, #0a2049 20%, #335494 100%);
            padding: 5px;
            text-align: end;
            border: 1px solid #48b7bd;
          }
        }
      }

      .centers {
        .center_text {
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }

      // 下面就是较大事件的
      .itempro:hover,
      .itempro.active {
        background-color: #09212f;
      }

      .itempro {
        cursor: pointer;
        display: flex;
        width: 100%;
        height: 105px;
        flex-direction: row;
        align-items: center;
        padding: 8px 8px;
        border-bottom: 2px solid rgba(10, 54, 72, 1);
        background-color: transparent;

        .itemtitle {
          width: 64px;
          height: 24px;
          background-color: #eead0e;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 16px;
        }

        // 中间内容
        .centers {
          width: 178px;
          height: 100%;
          display: flex;
          justify-content: space-around;
          flex-direction: column;
          margin-right: 16px;
          font-size: 14px;
          color: rgba(208, 222, 238, 1);
        }

        // 下面就是最后的标签的部分的了
        .labels {
          flex: 1;
          width: 1;

          .labels-top {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;

            .one {
              width: 64px;
              height: 26px;
              background-color: #061b42;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #d9dde2;
              border: 1px solid #1d75d6;
            }

            .two {
              width: 52px;
              height: 26px;
              background-color: #061b42;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #1a73d8;
              border: 1px solid #1d75d6;
            }

            .twopro {
              width: 52px;
              height: 24px;
              background-color: #061b42;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #b9ca3a;
              border: 1px solid #1d75d6;
            }
          }

          // 底部的标签
          .labels-bottoms {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: end;
          }

          .labels-bottom {
            background: linear-gradient(180deg, #0a2049 20%, #335494 100%);
            padding: 5px;
            text-align: end;
            color: #b2a559;
            border: 1px solid #48b7bd;
          }
        }
      }
    }

    .disaster_synthesis_details {
      height: 100%;
      padding: 0 0 0 20px;
      border-left: 1px solid #0c2230;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: self-start;

      &::before {
        position: absolute;
        content: "";
        top: 2px;
        left: -4px;
        width: 7px;
        height: 7px;
        background: rgba(223, 253, 255, 0.8);
        transform: rotate(45deg);
        box-shadow: 0 0 10px 2px rgba(19, 147, 191, 1);
      }

      &::after {
        position: absolute;
        content: "";
        top: calc((100% - 4px) / 2);
        left: -4px;
        width: 6px;
        height: 6px;
        background: rgba(19, 147, 191, 0.8);
        transform: rotate(45deg);
        box-shadow: 0 0 10px 2px rgba(19, 147, 191, 1);
      }

      .back_list {
        margin-bottom: 20px;
        padding: 6px 15px;
        color: #ffffff;
        box-shadow: inset 0px 0px 10px 0px #159aff;
        background: rgba(21, 154, 255, 0.1);

        &:hover {
          background: rgba(102, 225, 223, 0.1);
          box-shadow: inset 0px 0px 10px 0px #66e1df;
        }
      }

      .synthesis_details {
        flex: 1;
        overflow: auto;
        width: 100%;
      }

      .synthesis_detail {
        margin-bottom: 15px;

        .date_time {
          font-size: 12px;
          color: #eee;
          margin-bottom: 10px;

          .time {
            font-size: 14px;
            color: #fff;
            margin-left: 5px;
          }
        }

        .cont {
          height: 78px;
          overflow: auto;
          background: url("@/assets/decisionAnalysis/command-bg.png") center/100% no-repeat;
          padding: 15px;
          font-size: 14px;
          color: #ccc;
          line-height: 18px;

          .blue {
            color: #21c0bc;
            margin-right: 3px;
          }
        }
      }

      .empty_data {
        width: 100%;
        text-align: center;
        font-size: 14px;
      }
    }
  }

  .case_library {
    position: relative;

    .case_library_btn {
      height: 23px;
      line-height: 23px;
      width: 58px;
      position: absolute;
      top: -50px;
      right: 30px;
      background: linear-gradient(90deg, #0698d7 0%, #24e3d7 100%);
      text-align: center;
      cursor: pointer;
      font-size: 14px;
    }
  }
}
</style>