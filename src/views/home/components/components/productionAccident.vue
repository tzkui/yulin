<script setup>
import ViewBox from "@/components/common/view-box.vue";
import { ref, onMounted, inject } from "vue";
import Common from "@/utils/common.js";
let commonFunc = Common();
// echarts实例
const echarts = inject("echarts");
// 图表数据
const safe_chart_data = ref([
  { name: "类型一", data: [45, 60, 45, 50, 60, 39, 35] },
  { name: "类型二", data: [15, 30, 35, 20, 40, 66, 25] },
  { name: "类型三", data: [25, 20, 15, 40, 20, 36, 55] },
]);
// 图表内容
let Mychart = null;
// let chartInterval = null; //轮播 interval
const option = ref({
  color: ["#0094FF", "#FF922E", "#F16C55"],
  grid: {
    top: "30%",
    left: "2%",
    right: "5%",
    bottom: "8%",
    containLabel: true,
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
  legend: {
    //   right: 10,
    top: 15,
    icon: "rect",
    itemWidth: 12,
    itemHeight: 6,
    itemGap: 20,
    itemStyle: {
      opacity: 1,
    },
    textStyle: {
      color: "#C6D1DB",
      fontSize: 14,
    },
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ["榆阳县", "横山区", "神木县", "府谷县", "佳县", "定边县", "子洲县"],
    axisLine: {
      lineStyle: {
        width: 2,
        color: "#3F4F5E",
      },
    },
    axisLabel: {
      textStyle: {
        color: "#B4C0CC",
      },
    },
    axisTick: {
      show: false,
    },
  },
  yAxis: {
    type: "value",
    splitNumber: 3,
    axisLabel: {
      textStyle: {
        color: "#B4C0CC",
      },
    },
    splitLine: {
      lineStyle: {
        type: "dashed",
        color: "#3F4F5E",
      },
    },
  },
  series: [],
});
onMounted(() => {
  initChart(option.value);
});
const initChart = (option) => {
  option.series = safe_chart_data.value.map((item, index) => {
    return {
      name: item.name,
      data: item.data,
      type: "line",
      smooth: true,
      // showSymbol: false,
      symbol: "none",
      lineStyle: {
        normal: {
          // color: 'rgba(255, 163, 147, .8)',
          color: commonFunc.hexToRgba(option.color[index], 0.5),
        },
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
          {
            offset: 0,
            // color: 'rgba(255, 163, 147, 0)'
            color: commonFunc.hexToRgba(option.color[index], 0),
          },
          {
            offset: 1,
            // color: 'rgba(255, 163, 147, .3)'
            color: commonFunc.hexToRgba(option.color[index], 0.3),
          },
        ]),
      },
    };
  });

  let chartDom = document.getElementById("safety-production");
  // const pageZoom = document.getElementById("app").style.zoom;
  // chartDom.style.zoom = 1 / pageZoom;

  // 已经存在就销毁，避免重复渲染
  if (Mychart != null) {
    Mychart.dispose();
  }
  Mychart = echarts.init(chartDom);
  option && Mychart.setOption(option);
  tools.loopShowTooltip(Mychart, option, { loopSeries: true }); //自动轮播主要看这段话
  window.onresize = () => {
    Mychart.resize();
  };
  Mychart.getZr().on("click", (params) => {
    const pointInPixel = [params.offsetX, params.offsetY];
    if (Mychart.containPixel("grid", pointInPixel)) {
      let xIndex = Mychart.convertFromPixel({ seriesIndex: 0 }, [
        params.offsetX,
        params.offsetY,
      ])[0];
      console.log(xIndex);
      openDialog("eventLevel", {
        name: option.xAxis.data[xIndex] + "事故",
        id: "id_" + xIndex,
        num: 3,
      });
    }
  });
};
</script>
<template>
  <ViewBox title="安全生产事故分析">
    <div class="safety_production" id="safety-production"></div>
  </ViewBox>
</template>

<style scoped lang="less">
.safety_production {
  height: 193px;
}
</style>
