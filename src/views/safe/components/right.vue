<script setup>
import selectDate from "./selectDate.vue";
import { inject, onMounted, reactive, ref, onUnmounted } from "vue";
import { getSgdjfx, getSglxfx, getZdddspjk } from "../../../api/modules/aqsc";
import { useEventBus } from "@vueuse/core";
const dataSelectors = reactive({
  sgdj: "day",
  sglx: "day",
  qylx: "day",
});

const videoConferencingBus = useEventBus("openVideoMonitoring")
const openVideoConferencing = function(){
  videoConferencingBus.emit({type:"onlyConferencing"})

}
const toogleDate = function (key, val) {
  if (dataSelectors[key] !== val) {
    dataSelectors[key] = val;
    if (key === "sgdj") {
      getAccidentLevelList(val);
    } else if (key === "sglx") {
      getAccidentTypeList(val);
    } else if (key === "qylx") {
      getEnterpriseTypeList(val);
    }
  }
};
// 事故等级分析数据
const accidentData = ref([]);

// 事故类型分析列表
const accidentTypeList = ref([]);

// 企业类型分析列表
const enterpriseTypeList = ref([]);

// 下面改成一个新的这个企业类型的一个分析的列表的东西
const newenterpriseTypeList = ref([
  {
    lx: "D类企业",
    zb: "50%",
    img: imms1,
    color: "#B5E61D",
    // 下面就是一个数组,然后是一个数据的了
    qydatas: [
      {
        name: "xxx有限公司",
        lxr: "白国雨",
        fr: "白国雨",
        kysj: "2012-10-12",
        jszt: "完成",
        qylx: "农业",
        aqscbz: "A",
        jd: "10°50'",
        wd: "10°50'",
        xxdz: "榆阳区123号",
        tydm: "12108402101215B12",
        lxdh1: "13778193829",
        lxdh2: "13778193829",
        sfgy: "否",
        zddbrs: "241",
        szqy: "榆阳区",
        wxlx: "无",
        sgcs: "2",
        fxdj: "一级风险",
        sgdt: "已结案",
      },
      {
        name: "xxx有限公司",
        lxr: "王虎",
        fr: "王虎",
        kysj: "2012-10-12",
        jszt: "完成",
        qylx: "农业",
        aqscbz: "A",
        jd: "10°50'",
        wd: "10°50'",
        xxdz: "榆阳区123号",
        tydm: "12108402101215B12",
        lxdh1: "13778197829",
        lxdh2: "13778197829",
        sfgy: "否",
        zddbrs: "241",
        szqy: "榆阳区",
        wxlx: "无",
        sgcs: "1",
        fxdj: "一级风险",
        sgdt: "已结案",
      },
      {
        name: "xxx罐头厂",
        lxr: "刘致函",
        fr: "刘致函",
        kysj: "2012-10-12",
        jszt: "完成",
        qylx: "农业",
        aqscbz: "A",
        jd: "10°50'",
        wd: "10°50'",
        xxdz: "榆阳区123号",
        tydm: "12108402101215B12",
        lxdh1: "13778193827",
        lxdh2: "13778193827",
        sfgy: "否",
        zddbrs: "241",
        szqy: "榆阳区",
        wxlx: "无",
        sgcs: "1",
        fxdj: "一级风险",
        sgdt: "已结案",
      },
      {
        name: "xxx有限公司",
        lxr: "夏雨",
        fr: "夏雨",
        kysj: "2012-10-12",
        jszt: "完成",
        qylx: "农业",
        aqscbz: "A",
        jd: "10°50'",
        wd: "10°50'",
        xxdz: "榆阳区123号",
        tydm: "12108402101215B12",
        lxdh1: "14778193829",
        lxdh2: "14778193829",
        sfgy: "否",
        zddbrs: "241",
        szqy: "榆阳区",
        wxlx: "无",
        sgcs: "0",
        fxdj: "一级风险",
        sgdt: "已结案",
      },
    ],
  },
  {
    lx: "C类企业",
    zb: "25%",
    img: imms2,
    color: "#00A2E8",
    // 下面就是一个数组,然后是一个数据的了
    qydatas: [
      {
        name: "xxx有限公司",
        lxr: "刘国雨",
        fr: "刘国雨",
        kysj: "2012-10-12",
        jszt: "完成",
        qylx: "农业",
        aqscbz: "A",
        jd: "10°50'",
        wd: "10°50'",
        xxdz: "榆阳区123号",
        tydm: "12108402101215B12",
        lxdh1: "13778193629",
        lxdh2: "13778193629",
        sfgy: "否",
        zddbrs: "241",
        szqy: "榆阳区",
        wxlx: "无",
        sgcs: "1",
        fxdj: "二级风险",
        sgdt: "已结案",
      },
      {
        name: "xxx有限公司",
        lxr: "白飞",
        fr: "白飞",
        kysj: "2012-10-12",
        jszt: "完成",
        qylx: "农业",
        aqscbz: "A",
        jd: "10°50'",
        wd: "10°50'",
        xxdz: "榆阳区123号",
        tydm: "12108402101215B12",
        lxdh1: "13778193829",
        lxdh2: "13778193829",
        sfgy: "否",
        zddbrs: "241",
        szqy: "榆阳区",
        wxlx: "无",
        sgcs: "0",
        fxdj: "二级风险",
        sgdt: "已结案",
      },
    ],
  },
  {
    lx: "B类企业",
    zb: "17.5%",
    img: imms3,
    color: "#FFF200",
    // 下面就是一个数组,然后是一个数据的了
    qydatas: [
      {
        name: "xxx有限公司",
        lxr: "蒋天",
        fr: "蒋天",
        kysj: "2012-10-12",
        jszt: "完成",
        qylx: "农业",
        aqscbz: "A",
        jd: "10°50'",
        wd: "10°50'",
        xxdz: "榆阳区123号",
        tydm: "12108402101215B12",
        lxdh1: "13778193829",
        lxdh2: "13778193829",
        sfgy: "否",
        zddbrs: "241",
        szqy: "榆阳区",
        wxlx: "无",
        sgcs: "1",
        fxdj: "三级风险",
        sgdt: "已结案",
      },
    ],
  },
  {
    lx: "A类企业",
    zb: "17.5%",
    img: imms4,
    color: "#DE1B23",
    // 下面就是一个数组,然后是一个数据的了
    qydatas: [
      {
        name: "xxx有限公司",
        lxr: "百谷",
        fr: "百谷",
        kysj: "2012-10-12",
        jszt: "完成",
        qylx: "农业",
        aqscbz: "A",
        jd: "10°50'",
        wd: "10°50'",
        xxdz: "榆阳区123号",
        tydm: "12108402101215B12",
        lxdh1: "13778193829",
        lxdh2: "13778193829",
        sfgy: "否",
        zddbrs: "241",
        szqy: "榆阳区",
        wxlx: "无",
        sgcs: "0",
        fxdj: "四级风险",
        sgdt: "已结案",
      },
    ],
  },
]);

// 重点地点视频监控列表
const monitorList = ref([]);

// 返回随机数
const getRandom = function (max = 100) {
  return parseInt(Math.random() * max);
};

// 获取事故等级分析数据
const getAccidentLevelList = async function (type = "1") {
  let res = await getSgdjfx({ type: type });
  if(res.code == 200){
    accidentData.value = res.data.map((item,index) =>{
      return {
        name:item.mc,
        value:item.sz,
        id:index,
        ...item
      }
    })
    option.series[0].data = accidentData.value;
    option.series[1].data = accidentData.value;
    setAccidentTypeChart(option);
    setChartAction();
  }else{
    setTimeout(() => {
    accidentData.value = [
      { name: "一般", value: getRandom(), id: "dj1" },
      { name: "重大", value: getRandom(), id: "dj2" },
      { name: "较大", value: getRandom(), id: "dj3" },
      { name: "特大", value: getRandom(), id: "dj4" },
    ];
    option.series[0].data = accidentData.value;
    option.series[1].data = accidentData.value;
    setAccidentTypeChart(option);
    setChartAction();
  }, 50);
  }

};
// 获取事故类型分析数据
import img1 from "../../../assets/safe/type1.png";
import img2 from "../../../assets/safe/type2.png";
import img3 from "../../../assets/safe/type3.png";
import img4 from "../../../assets/safe/type4.png";
// '/src/assets/safe/num' + (index + 1) + '.png'
// import imm1 from "../../../assets/safe/num1.png"
const getAccidentTypeList = async function (type = "1") {
  let res = await getSglxfx({ type });
  const IMGLIST = [img1, img2, img3, img4];
  if (res.code == 200) {
    setTimeout(() => {
      accidentTypeList.value = res.data.map((item, index) => {
        return {
          imgSrc: IMGLIST[index],
          id: index,
          num: item.sz,
          name: item.mc,
          ...item,
        };
      });
    }, 50);
  } else {
    setTimeout(() => {
      accidentTypeList.value = [
        {
          name: "事故类型一",
          num: getRandom(20),
          imgSrc: img1,
          id: "lx1",
        },
        {
          name: "事故类型二",
          num: getRandom(20),
          imgSrc: img2,
          id: "lx2",
        },
        {
          name: "事故类型三",
          num: getRandom(20),
          imgSrc: img3,
          id: "lx3",
        },
        {
          name: "事故类型四",
          num: getRandom(20),
          imgSrc: img4,
          id: "lx4",
        },
        {
          name: "事故类型五",
          num: getRandom(20),
          imgSrc: "/src/assets/safe/type4.png",
          id: "lx5",
        },
      ];
    }, 50);
  }
};
// 获取企业类型分析数据
import imms1 from "../../../assets/safe/num1.png";
import imms2 from "../../../assets/safe/num2.png";
import imms3 from "../../../assets/safe/num3.png";
import imms4 from "../../../assets/safe/num4.png";
const getEnterpriseTypeList = async function (type = "1") {
    setTimeout(() => {
      enterpriseTypeList.value = [
        {
          num: getRandom(200),
          percent: "20%",
          type: "危化行业",
          id: 1,
          img: imms1,
        },
        {
          num: getRandom(200),
          percent: "20%",
          type: "工贸行业",
          id: 2,
          img: imms2,
        },
        {
          num: getRandom(200),
          percent: "20%",
          type: "工贸行业",
          id: 3,
          img: imms3,
        },
        {
          num: getRandom(200),
          percent: "20%",
          type: "工贸行业",
          id: 4,
          img: imms4,
        },
      ];
    }, 50);
};
// 获取重点地点视频监控列表
const getmonitorList = async function (type = "1") {
  let res = await getZdddspjk({ type });
  if (res.code == 200) {
    setTimeout(() => {
      monitorList.value = res.data.map((item) => {
        return {
          imgUrl:
            "https://img1.baidu.com/it/u=422078137,1307526884&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800",
          ...item,
        };
      });
    }, 50);
  } else {
    setTimeout(() => {
      monitorList.value = [
        {
          id: 1,
          name: "xxx化工厂",
          imgUrl:
            "https://img1.baidu.com/it/u=422078137,1307526884&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800",
        },
        {
          id: 2,
          name: "xxx化工厂",
          imgUrl:
            "https://img1.baidu.com/it/u=422078137,1307526884&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800",
        },
        {
          id: 3,
          name: "xxx化工厂",
          imgUrl:
            "https://img1.baidu.com/it/u=422078137,1307526884&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800",
        },
      ];
    }, 50);
  }
};

// 编写echarts图
const echarts = inject("echarts");
let accidentTypeChart = null;
const setAccidentTypeChart = function (option) {
  let chart_box = document.getElementById("accident_type_chart_box");
  const pageZoom = document.getElementById("app").style.zoom;
  chart_box.style.zoom = pageZoom;
  accidentTypeChart = echarts.init(chart_box);
  accidentTypeChart.setOption(option);

  accidentTypeChart.on("click", function (params) {
    console.log("accidentTypeChart=========>", params);
    openDialog("eventLevel", {
      name: params.name + "事故",
      id: params.data.id,
      num: params.data.sz,
      jh:params.data.jh
    });
  });
};
const colors = [
  "72,127,249",
  "253,135,0",
  "248,214,0",
  "228,98,114",
  "159,224,128",
  "126,211,244",
  "63,177,124",
  "169,105,198",
];
// echarts配置项
const option = {
  tooltip: {
    backgroundColor: "#0D141A",
    trigger: "item",
    formatter: "{b}: {c} ({d}%)",
    textStyle: {
      color: "#fff",
    },
  },
  series: [
    {
      type: "pie",
      name: "pie1",
      radius: ["40%", "68%"], // 圆环的位置和大小
      data: [],
      hoverAnimation: false,
      label: {
        show: false,
      },
      itemStyle: {
        normal: {
          color: function (info) {
            return `rgba(${colors[info.dataIndex]},0.3)`;
          },
          borderRadius: 2,
          borderColor: "#0D141A",
          borderWidth: 2,
        },
      },
    },
    {
      type: "pie",
      name: "pie2",
      radius: ["70%", "78%"], // 圆环的位置和大小
      itemStyle: {
        normal: {
          color: function (info) {
            return `rgba(${colors[info.dataIndex]},1)`;
          },
          borderRadius: 2,
          borderColor: "#0D141A",
          borderWidth: 4,
        },
      },
      label: {
        formatter: "{b|{b}：}{d|{d}%}",
        rich: {
          b: {
            color: "#fff",
            fontSize: 14,
          },
          d: {
            color: "#fff",
            fontSize: 14,
          },
        },
      },
      data: [],
    },
  ],
};
// 设置图表的行为
const setChartAction = function () {
  accidentTypeChart.on("mouseover", function (params) {
    clearInterval(timer);
    if (params.seriesName === "pie1") {
      let dataIndex = params.dataIndex;
      accidentTypeChart.dispatchAction({
        type: "highlight",
        dataIndex,
      });
    }
    if (chartDataIndex !== params.dataIndex) {
      accidentTypeChart.dispatchAction({
        type: "downplay",
        dataIndex: chartDataIndex,
      });
    }
  });
  accidentTypeChart.on("mouseout", function (params) {
    // chartAutoPlay();
    if (params.seriesName === "pie1") {
      let dataIndex = params.dataIndex;
      accidentTypeChart.dispatchAction({
        type: "downplay",
        dataIndex,
      });
    }
  });
};

// 自动播放
let timer = null;
let chartDataIndex = 0;
// const chartAutoPlay = function () {
//   timer = setInterval(() => {
//     // const n = accidentData.value.length;
//     // if (chartDataIndex === n - 1) {
//     //   chartDataIndex = 0;
//     // } else {
//     //   chartDataIndex++;
//     // }
//     accidentTypeChart.dispatchAction({
//       type: "highlight",
//       dataIndex: chartDataIndex,
//     });
//     accidentTypeChart.dispatchAction({
//       type: "downplay",
//       dataIndex: chartDataIndex === 0 ? n - 1 : chartDataIndex - 1,
//     });
//     accidentTypeChart.dispatchAction({
//       type: "showTip",
//       seriesIndex: 0,
//       dataIndex: chartDataIndex,
//     });
//   }, 1000);
// };

onMounted(() => {
  getAccidentTypeList();
  getEnterpriseTypeList();
  getmonitorList();
  getAccidentLevelList();
  // chartAutoPlay();
});
onUnmounted(() => {
  clearInterval(timer);
});
// 使用defineEmits注册一个自定义事件
const emit = defineEmits(["getValue10", "openDialog"]);
const openDialog = function (type, info) {
  emit("openDialog", type, info);
};
const qylxisshow = ref(true);
const qylxcl = (item) => {
  console.log(item, "看看我是个什么东东");
  emit("getValue10", item, qylxisshow.value);
};

// 下面这个就是企业类型的的相关的打点的事件的了
// const qilxclick=function(item){
//   transValue(item)
// }
</script>

<template>
  <div class="right">
    <ViewBox title="安全事故统计分析" :height="797">
      <div class="box1">
        <div class="sgdjfx">
          <div class="header">
            <div class="title">事故等级分析</div>
            <div class="dates">
              <selectDate
                :now-date="dataSelectors.sgdj"
                dateType="sgdj"
                @toogleDate="toogleDate"
              ></selectDate>
            </div>
          </div>
          <div class="main">
            <div id="accident_type_chart_box"></div>
            <div class="echarts_bg"></div>
          </div>
        </div>
        <div class="sglxfx">
          <div class="header">
            <div class="title">事故类型分析</div>
            <div class="dates">
              <selectDate
                :now-date="dataSelectors.sglx"
                dateType="sglx"
                @toogleDate="toogleDate"
              ></selectDate>
            </div>
          </div>
          <div class="main">
            <div class="typeList">
              <div
                class="typeItem"
                @click="openDialog('eventLevel', item)"
                v-for="item in accidentTypeList"
                :key="item.id"
              >
                <div class="imgBox">
                  <img :src="item.imgSrc" alt="" />
                </div>
                <div class="infos">
                  <div class="numBox">
                    <span class="num">{{ item.num }}</span>
                    <span class="chu">处</span>
                  </div>
                  <div class="typeBox">{{ item.name }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="qylxfx">
          <div class="header">
            <div class="title">危化企业事故类型分析</div>
            <div class="dates">
              <selectDate
                :now-date="dataSelectors.qylx"
                dateType="qylx"
                @toogleDate="toogleDate"
              ></selectDate>
            </div>
          </div>
          <div class="type_list_item list_header">
            <div class="line1">危化企业风险类型</div>
            <div class="line2">发生事故数量(家)</div>
            <div class="line3">事故占比</div>
          </div>
          <ul class="type_list">
            <li
              class="type_list_item"
              v-for="(item, index) in newenterpriseTypeList"
              :key="index"
              @click="qylxcl(item)"
            >
              <div class="line1">
                <img :src="item.img" alt="" />
                <div class="word" :style="{ color: item.color }">
                  {{ item.lx }}
                </div>
              </div>
              <div class="line2">{{ item.qydatas.length }}</div>
              <div class="line3">{{ item.zb }}</div>
            </li>
          </ul>
        </div>
      </div>
    </ViewBox>
    <ViewBox title="重点地点视频监控" :height="198">
      <div class="box2">
        <ul class="monitorList">
          <li
            v-for="item in monitorList"
            :key="item.id"
            @click="openVideoConferencing"
          >
            <div class="imgBox">
              <img :src="item.imgUrl" alt="" />
            </div>
            <div class="infoBox">
              <div class="word">{{ item.monitorName }}</div>
            </div>
          </li>
        </ul>
      </div>
    </ViewBox>
  </div>
</template>

<style lang="less" scoped>
.right {
  .box1 {
    padding: 0 5px;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;

      .title {
        font-size: 14px;
        font-family: Source Han Sans CN-Medium, Source Han Sans CN;
        font-weight: 500;
        color: #ffffff;
        line-height: 16px;
        position: relative;
        padding-left: 21px;

        &::before {
          content: "";
          display: block;
          background: url(@/assets/safe/point.png) no-repeat;
          background-size: 100% 100%;
          width: 15px;
          height: 15px;
          position: absolute;
          left: 0;
          top: 0;
        }
      }
    }

    .main {
      border-bottom: 1px solid #054353;
    }

    .sgdjfx {
      margin-bottom: 12px;

      .main {
        position: relative;
        // padding-bottom: 9px;

        #accident_type_chart_box {
          height: 200px;
          width: 100%;
        }

        .echarts_bg {
          width: 190px;
          height: 190px;
          background: url(@/assets/safe/echarts_bg.png) no-repeat;
          background-size: 100% 100%;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -51%);
          pointer-events: none;
        }
      }
    }

    .sglxfx {
      padding-bottom: 6px;
      margin-bottom: 12px;
      cursor: pointer;

      .typeList {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        height: 168px;
        overflow-y: auto;

        &::-webkit-scrollbar {
          display: none;
          width: 0;
        }

        .typeItem {
          width: 195px;
          height: 68px;
          background: url(@/assets/safe/type_bg.png) no-repeat;
          background-size: 100% 100%;
          display: flex;
          align-items: center;
          margin-bottom: 16px;

          .imgBox {
            width: 56px;
            height: 56px;
            margin: 0 12px;

            img {
              width: 100%;
              height: 100%;
            }
          }

          .infos {
            .numBox {
              margin-bottom: 6px;

              .num {
                font-size: 16px;
                font-family: Source Han Sans SC-Medium, Source Han Sans SC;
                font-weight: 500;
                color: #f9fefc;
              }

              .chu {
                font-size: 14px;
                font-family: Source Han Sans SC-Regular, Source Han Sans SC;
                font-weight: 400;
                color: #a5a6a8;
                margin-left: 6px;
              }
            }

            .typeBox {
              font-size: 14px;
              font-family: Source Han Sans SC-Regular, Source Han Sans SC;
              font-weight: 400;
              color: #ffffff;
            }
          }
        }
      }
    }

    .qylxfx {
      .type_list {
        width: 400px;
        margin: 0 auto;
        height: 168px;
        overflow-y: auto;

        &::-webkit-scrollbar {
          display: none;
        }

        &_item {
          line-height: 38px;
          display: flex;
          height: 38px;
          margin-bottom: 4px;
          box-sizing: border-box;
          border: 1px solid;
          border-image: linear-gradient(
              180deg,
              rgba(0, 96, 128, 0.56),
              rgba(0, 96, 128, 0.23)
            )
            1 1;
          border-radius: 4px;
          cursor: pointer;

          &:not(.list_header):hover {
            background: rgba(9, 65, 93, 0.61);
          }

          .line1 {
            width: 176px;
            margin-left: 15px;
            font-size: 14px;
            img {
              width: 31px;
              height: 21px;
              margin-right: 14px;
              margin-top: 9px;
              float: left;
            }

            .word {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              font-size: 14px;
              font-family: Source Han Sans CN-Regular, Source Han Sans CN;
              font-weight: 400;
              color: #ffffff;
            }
          }

          .line2 {
            width: 110px;
            text-align: center;
            margin-right: 100px;
            font-size: 14px;
            margin-right: 25px;
            font-family: Source Han Sans CN-Regular, Source Han Sans CN;
            font-weight: 400;
          }

          .line3 {
            text-align: center;
            width: 64px;
            font-size: 14px;
          }
        }
      }

      .list_header {
        color: #c3edff;
        width: 400px;
        cursor: auto;
        margin: 0 auto 4px;
        background: url(@/assets/safe/list_header_bg.png) no-repeat;
        background-size: 100% 100%;
        border: none;
      }
    }
  }

  .box2 {
    .monitorList {
      display: flex;
      flex-wrap: wrap;
      overflow-y: auto;
      height: 122px;
      justify-content: space-between;

      &::-webkit-scrollbar {
        display: none;
      }

      li {
        position: relative;
        width: 181px;
        height: 120px;
        margin-top: 4px;
        cursor: pointer;

        &:nth-child(1),
        &:nth-child(2) {
          margin-top: 0;
        }

        .imgBox {
          width: 100%;
          height: 100%;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .infoBox {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 25px;
          background: rgba(0, 0, 0, 0.7);
          line-height: 25px;
          padding-left: 27px;
          font-size: 15px;
          font-family: Source Han Sans CN-Regular, Source Han Sans CN;
          font-weight: 400;
          color: #ffffff;

          &::before {
            content: "";
            width: 15px;
            height: 15px;
            display: block;
            background: url(@/assets/safe/map.png) no-repeat;
            background-size: 100% 100%;
            position: absolute;
            left: 4px;
            bottom: 5px;
          }
        }
      }
    }
  }
}
</style>