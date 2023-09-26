<script setup>
import { ref, inject, onUnmounted, nextTick } from "vue";
import { useEventBus } from "@vueuse/core";

const bus = useEventBus("rainfallThreePopup");
const eventListener = function (e) {
  console.log(e);
  showDialog.value = true;
  popupTitle.value=e.name
  nextTick(() => {
    chart.value = echarts.init(barEchartRef.value);
    chart.value.setOption(barOption);
  });
};
const popupTitle = ref("")
const dataList = ref([
  { id: 1, line1: "00：00", line2: "3.9" },
  { id: 2, line1: "03：00", line2: "2.0" },
  { id: 3, line1: "06：00", line2: "8.9" },
]);
const showDialog = ref(false);
bus.on(eventListener);
const echarts = inject("echarts");
const barEchartRef = ref();
const closeDialog = function () {
  showDialog.value = false;
};
const chart = ref({});
const barOption = {
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
    type: "category",
    data: dataList.value.map((item) => item.line1),
    axisTick: {
      alignWithLabel: true,
    },
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: dataList.value.map((item) => item.line2),
      type: "bar",
      barWidth: "60%",
      name: "雨量",
      itemStyle: {
        color: "#20BC8A",
      },
    },
  ],
};
onUnmounted(() => {
  bus.off(eventListener);
});
</script>
<template>
  <div class="rainfallThreePopup" v-if="showDialog">
    <div class="header">
      <div class="title">{{popupTitle}}</div>
      <div class="close" @click="closeDialog()">
        <el-icon color="#00A3CE" :size="20">
          <Close></Close>
        </el-icon>
      </div>
    </div>
    <div class="icons">
      <div class="icon1"></div>
      <div class="icon2"></div>
      <div class="icon3"></div>
      <div class="icon4"></div>
    </div>
    <div class="main">
      <div ref="barEchartRef" class="chart_box"></div>
    </div>
  </div>
</template>

<style lang="less" scope>
.rainfallThreePopup {
  position: fixed;
  right: 600px;
  top: 400px;
  min-width: 300px;
  box-sizing: border-box;
  z-index: 999;
  // background: #003A54;
  background: linear-gradient(180deg, #01283b 0%, #03101a 54%, #01273e 100%);
  border-radius: 12px;

  .header {
    display: flex;
    justify-content: space-between;
    height: 51px;
    padding: 0 16px;

    .title {
      font-size: 18px;
      font-family: Source Han Sans SC-Bold, Source Han Sans SC;
      font-weight: bold;
      color: #ffffff;
      line-height: 21px;
      margin-top: 17px;
    }

    .close {
      margin-top: 16px;
      cursor: pointer;
    }
  }

  .icons {
    display: flex;
    padding: 0 16px;

    .icon1 {
      width: 6px;
      height: 5px;
      background: #00a3ce;
      transform: skewX(-20deg);
      margin-right: 6px;
    }

    .icon2 {
      width: 6px;
      height: 4px;
      background: #00a3ce;
      transform: skewX(-40deg);
      margin-right: 6px;
      opacity: 0.8;
    }

    .icon3 {
      width: 6px;
      height: 3px;
      background: #00a3ce;
      transform: skewX(-60deg);
      margin-right: 8px;
      opacity: 0.6;
    }

    .icon4 {
      flex: 1;
      height: 1px;
      background: #00a3ce;
    }
  }

  .main {
    padding: 0 16px 16px;
    font-size: 12px;
    font-family: Alibaba PuHuiTi-Regular, Alibaba PuHuiTi;
    font-weight: 400;
    color: #ffffff;

    select {
      width: 77px;
      height: 36px;
      background: #006688;
      border-radius: 4px;
      font-size: 16px;
      font-family: Alibaba PuHuiTi-Regular, Alibaba PuHuiTi;
      font-weight: 400;
      color: #ffffff;
      padding-left: 8px;
    }

    .list {
      border-radius: 6px;
      overflow: hidden;

      li {
        display: flex;
        align-items: center;
        text-align: center;

        .col1 {
          flex: 1;
        }

        .col2 {
          flex: 1;
        }
      }

      &_header {
        display: flex;
        text-align: center;
        align-items: center;
        font-size: 16px;
        font-family: Source Han Sans SC-Regular, Source Han Sans SC;
        font-weight: 400;
        color: #fff;
        height: 50px;
        line-height: 50px;

        .col1,
        .col2 {
          flex: 1;
        }
      }

      &_item {
        font-size: 16px;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #d0deee;
        height: 36px;
        line-height: 36px;
        background-color: #006688;

        .col1,
        .col2 {
          border-right: 1px solid #00688a;
          box-sizing: border-box;
        }

        &:nth-child(2n) {
          background-color: #004764;
        }
      }
    }
  }
}
.chart_box {
  width: 100%;
  height: 300px;
}
</style>
