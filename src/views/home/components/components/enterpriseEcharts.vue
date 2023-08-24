<script setup>
import ViewBox from "@/components/common/view-box.vue";
import { onMounted, ref, inject } from "vue";
import Common from "@/utils/common.js";
let commonFunc = Common();

const emits = defineEmits(["clickEcharts"]);
import { getQyfb, getQyfbTree } from "@/api/modules/home.js";
// echarts实例
const echarts = inject("echarts");
const initChart = (option) => {
  option.series = company_chart_data.value.map((item, index) => {
    return {
      name: item.name,
      barWidth: "35%",
      type: "bar",
      stack: "1", // 如果stack一樣就會堆疊
      barWidth: 12,
      // barGap:'20%',
      data: item.data,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            // color: 'rgba(231,142,102,0.8)',
            color: commonFunc.hexToRgba(option.color[index], 0.8),
          },
          {
            offset: 1,
            // color: 'rgba(91,46,70,0.8)'
            color: commonFunc.hexToRgba(option.color[index], 0),
          },
        ]),
      },
    };
  });
  option.legend.data = company_chart_data.value.map((item, index) => {
    return {
      name: item.name,
      itemStyle: {
        color: option.color[index],
      },
    };
  });

  let chartDom = document.getElementById("enterprise-distribution");
  // const pageZoom = document.getElementById("app").style.zoom;
  // chartDom.style.zoom = 1 / pageZoom;

  let Mychart = echarts.init(chartDom);
  option && Mychart.setOption(option);

  tools.loopShowTooltip(Mychart, option, { loopSeries: true }); //自动轮播主要看这段话
  window.onresize = () => {
    Mychart.resize();
  };

  Mychart.on("click", async (params) => {
    let res = await getQyfbTree()
    // console.log(res,"看看数据是什么")
    // console.log('params', params);
    emits("clickEcharts", res.data);
  });
};
// 图表内容
const option = ref({
  color: [
    "#2276FC",
    "#5FD5EC",
    "#FFCF5F",
    "#C669FF",
    "#22FCA0",
    "#BFEC5F",
    "#6C5FFF",
    "#FF6996",
  ],
  grid: {
    top: "25%",
    left: "3%",
    right: "4%",
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
    icon: "circle",
    top: 12,
    itemGap: 20,
    itemHeight: 8,
    itemWidth: 8,
    padding: [0, 20],
    textStyle: {},
    data: [
      // { name: '非煤矿山', itemStyle: { color: '#2276FC', } }
    ],
    formatter: (name) => {
      let str = name.length >= 5 ? name : `{a|${name}}`;
      return echarts.format.truncateText(str, 68, "14px", "…");
    },
    textStyle: {
      color: "rgba(255,255,255,0.85)",
      rich: {
        a: {
          width: 60,
          backgroundColor: "transparent",
        },
      },
    },
  },
  xAxis: [
    {
      axisTick: {
        show: false,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#aaa",
        },
      },
      data: [
        "榆阳区",
        "横山区",
        "神木县",
        "府谷县",
        "靖边县",
        "定边县",
        "绥德县",
        "米脂县",
        "佳县",
        "吴堡县",
        "清涧县",
        "子洲县",
      ],
    },
  ],

  yAxis: {
    type: "value",
    splitNumber: 4,
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
// 图表数据
const company_chart_data = ref([
  { name: "非煤矿山", data: [45, 50, 100, 25, 10, 0, 1, 0, 0, 0, 0, 30] },
  { name: "危险化学品", data: [5, 0, 10, 25, 20, 10, 0, 0, 0, 0, 0, 0] },
  { name: "冶金", data: [0, 11, 11, 0, 11, 10, 10, 0, 0, 0, 0, 0] },
  { name: "有色金属", data: [10, 11, 0, 70, 11, 10, 0, 20, 0, 20, 0, 0] },
  { name: "建材", data: [10, 11, 0, 11, 0, 10, 0, 0, 100, 10, 0, 0] },
  { name: "机械", data: [0, 0, 11, 0, 70, 10, 0, 0, 0, 0, 10, 0] },
  { name: "轻工业", data: [0, 0, 0, 0, 0, 100, 10, 0, 0, 30, 0, 0] },
  { name: "纺织业", data: [0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 20, 0] },
]);
const getInfos = function () {
  getQyfb().then((res) => {
    console.log("企业分布：", res);
    const arr = [
      { name: "煤炭", key: "mt", data: [] },
      { name: "非煤矿山", key: "fmks", data: [] },
      { name: "烟花爆竹", key: "yhbz", data: [] },
      { name: "化工", key: "hg", data: [] },
      { name: "危险物品", key: "wxwp", data: [] },
      { name: "烟草", key: "yc", data: [] },
      { name: "金属冶炼", key: "jsyl", data: [] },
      { name: "机械", key: "jx", data: [] },
    ];
    res.data.forEach(item => {
      arr.forEach(info => {
        info.data.push(item[info.key])
      })
    })
    company_chart_data.value = arr;
    option.value.xAxis[0].data = res.data.map(item => item.mc)
    // company_chart_data.value = res.data.map((item) => {
    //   return {
    //     name: item.mc,
    //     data: [
    //       item.fmks,
    //       item.wxhxp,
    //       item.yj,
    //       item.ysjs,
    //       item.jc,
    //       item.jx,
    //       item.qgy,
    //       item.fzy,
    //     ],
    //   };
    // });
    // company_chart_data.value = company_chart_data.value.map((item) => item + 2);
    // console.log(company_chart_data.value);
    initChart(option.value);
  });
};
onMounted(() => {
  // initChart(option.value);
  getInfos();
});
</script>
<template>
  <ViewBox title="企业分布">
    <div class="enterprise_distribution" id="enterprise-distribution"></div>
  </ViewBox>
</template>
<style lang="scss" scoped>
.enterprise_distribution {
  height: 297px;
  padding: 0 8px 0 0;
}
</style>
