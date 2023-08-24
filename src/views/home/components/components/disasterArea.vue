<script setup>
import ViewBox from "@/components/common/view-box.vue";
import { ref, onMounted, onUnmounted } from "vue";
import { getZqqxfx } from "../../../../api/modules/home"
//灾情分析的下拉框
import { getZqfxDropdowndata } from "../../../../api/decision_analysis.js"

// highchart
import HighCharts from "highcharts";
import Highcharts3D from "highcharts/highcharts-3d";
Highcharts3D(HighCharts);

const checkTime = ref([
  { name: "近三天", num: 1 },
  { name: "近五天", num: 2 },
  { name: "近七天", num: 3 },
]);
// 灾情区域
const disaster_type = ref([
  { name: "洪涝灾害", value: "" },
  { name: "森火事件", value: "" },
  { name: "地质灾害", value: "" },
  { name: "地震灾害", value: "" },
]);
// 定义一个是这个关于获取图表时间和类型的数据
let echatssj = ref("1")
let echatslx = ref('')
const currentCheckTime = ref(1);
const currentDisasterType = ref("");
let timer = ref(null);
const changeTime = async (num) => {
  currentCheckTime.value = num;
  echatssj.value = num
  title.value=0
  // 点击的时候重新调取获取图表的方法
  getechartsData()
};
let color3D = ref(["#39BFFA", "#71D6E5", "#E9BD4B", "#ACEFF3"])
let data3D = ref([
  { name: "洪涝灾害", y: 6, h: 36, percent: "45.23", color: color3D.value[0] },
  { name: "森火事件", y: 2, h: 12, percent: "12.23", color: color3D.value[1] },
  { name: "地质灾害", y: 6, h: 60, percent: "45.23", color: color3D.value[2] },
  { name: "地震灾害", y: 4, h: 24, percent: "40.23", color: color3D.value[3] },
]);
// 定义一个代表这个图表的数据
const checkDisaster = function (value) {
  // console.log(value, "点击")
  currentDisasterType.value = value;
  title.value=0
  echatslx.value = value
  // 点击的时候重新调取获取图表的方法
  getechartsData()
};
// 获取zqqy的类型选择数据
const getxlType = async () => {
  let res = await getZqfxDropdowndata()
  disaster_type.value = res.data
  // console.log(res, "数据看")
}
// 定义一个头部的数据
let title=ref(0)
// 获取图表数据的接口
const getechartsData = async () => {
  let res = await getZqqxfx(echatssj.value, echatslx.value)
  data3D.value = []
  // 定义一个求和的数据
  let sumdata=[]
  res.data.forEach((v, i) => {
    data3D.value.push(
      { name: v.mc, y: v.sz, h: 60, percent: v.sz, color: color3D.value[i] }
    )
    sumdata.push(v.sz)
  })
  sumdata.forEach(v=>{
    title.value+=v
  })
  // console.log(title.value,"看看这个到底是什么")
  highOptions.value.series[0].data = data3D.value
  highOptions.value.title.text =  title.value
  HighCharts.chart("disaster-area-chart", highOptions.value);
}

const highOptions = ref({
  chart: {
    type: "pie",
    backgroundColor: "rgba(255, 255, 255, 0)", // 设置背景颜色透明 默认是白色
    animation: false,
    options3d: {
      enabled: true, //显示图表是否设置为3D
      alpha: 65, // 内旋转角度 从前后看 我理解为以x轴为基准的旋转
      beta: 0, // 外旋转角度 从左右看 我理解为以z轴为基准的旋转  不知道咋形容，用的时候可以都试试 我这样设置的话饼图是躺着的
    },
    marginRight: 220,
    marginTop: 0,
    events: {
      load: function () {
        var chart = this;
        var points = chart.series[0].points;
        var len = points.length;
        var i = 0;
        timer.value && clearInterval(timer.value);
        timer.value = setInterval(function () {
          chart.tooltip.refresh(points[i]);
          i++;
          if (i === len) {
            i = 0;
          }
        }, 1000);
      },
    },
  },
  title: {
    text: title.value, // 饼图的标题
    y: 55,
    x: 78,
    align: "left",
    style: {
      color: "#fff",
      fontSize: 30,
    },
  },
  legend: {
    enabled: true,
    align: "right", //居左显示
    verticalAlign: "bottom", //垂直标的目标地位
    x: 0, //x,y设置图例位置
    y: 15,
    layout: "vertical", //图例布局：竖直方向排列

    itemMarginBottom: 12, //图例每行举上高度
    symbolWidth: 10,
    symbolHeight: 10,
    symbolRadius: 0,
    useHTML: true,
    labelFormat: `<div class='chart3D_legend'> <span class='rect' style='color:{color}'>{name}</span><span>{percent}</span></div>`,
    itemStyle: {
      color: "#f4f4f6",
      fontSize: 12,
    },
    navigation: {
      style: {
        color: "#fff",
      },
    },
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: "pointer",
      size: 150, //饼图外圈直径大小
      innerSize: 120, //饼图的内圈直径大小
      depth: 25,
      showInLegend: true,
      dataLabels: {
        enabled: false, // 显示连线
      },
    },
  },
  tooltip: {
    // 提示设置
    crosshairs: true,
    enabled: true, //false 不显示提示框
    backgroundColor: "transparent",
    borderColor: "transparent", //设置自定义边框颜色
    style: {
      color: "#FFF", // 文字的颜色
      fontSize: "14", // 文字字体大小
    },
    useHTML: true,
    formatter: function () {
      // console.log(this);
      let str = `<div class='tooltip3D'><span style=font-size:22px;color:${this.color
        }>●</span> ${this.key} : ${this.percentage.toFixed(2)}%</div>`;
      return str;
    },
  },
  credits: {
    enabled: false, // 禁用版权信息
  },
  series: [
    {
      colors: color3D.value,
      name: "洪涝",
      type: "pie",
      data: data3D.value,
    },
  ],
});

onMounted(() => {
  // HighCharts.chart("disaster-area-chart", highOptions.value);
  // 图表数据
  getechartsData()
  // 类型选择数据
  getxlType()
});
onUnmounted(() => {
  clearInterval(timer.value);
});
</script>
<template>
  <ViewBox title="灾情区域分析">
    <div class="disaster_area">
      <!-- tab -->
      <div class="tab_box title_tab">
        <span @click="changeTime(item.num)" v-for="(item, index) in checkTime" :key="index" class="tab"
          :class="currentCheckTime == item.num ? 'active' : ''">{{ item.name }}</span>
      </div>
      <div class="disaster_area_cont">
        <div class="tab_box">
          <span @click="checkDisaster(item.value)" class="tab" :class="currentDisasterType == item.value ? 'active' : ''"
            v-for="(item, index) in disaster_type" :key="index">{{ item.name }}</span>
        </div>
      </div>
      <div class="disaster_area_chart" id="disaster-area-chart"></div>
    </div>
  </ViewBox>
</template>
<style lang="scss" scoped>
.disaster_area {
  height: 131px;
  padding: 5px 10px 0 14px;
  position: relative;

  .tab_box {
    .tab {
      // margin-bottom: 4px;
      display: inline-block;
      padding: 3px 3px;
      margin-right: 14px;
      height: 26px;
      line-height: 20px;
      background: #0e4f6e;
      border-radius: 0px 0px 5px 0px;

      font-size: 14px;
      font-family: Source Han Sans SC-Regular, Source Han Sans SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.5);
      cursor: pointer;

      &.active {
        background: #1e78a3;
        color: #ffffff;
      }
    }

    &.title_tab {
      position: absolute;
      top: -40px;
      right: 20px;
    }
  }

  .disaster_area_chart {
    width: 100%;
    height: calc(100% - 17px);
  }

  :deep(.chart3D_legend) {
    font-size: 14px;
    color: #fff;
    line-height: 20px;

    .rect {
      display: inline-block;
      font-size: 12px;
      min-width: 80px;
    }
  }

  :deep(.tooltip3D) {
    box-shadow: 0 0 5px rgba(181, 245, 236, 0.5);
    background: rgba(13, 20, 26, 1);
    padding: 5px 15px 8px;
    border-radius: 4px;
  }
}
</style>
