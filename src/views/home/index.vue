<template>
  <div class="home">
    <!-- 地图 -->
    <div class="map"></div>
    <!-- 无缝滚动 -->
    <div class="scollBox">
      <img src="../../assets/natural/tongzhi.png" class="tz" />
      <!-- <span class="tz-num">2</span> -->
      <vue3-seamless-scroll
        :list="newsList"
        direction="left"
        limitScrollNum="1"
        class="seamless-warp2"
      >
        <ul class="item">
          <li
            v-for="(item, index) in newsList"
            v-text="item.title"
            :key="index"
          ></li>
        </ul>
      </vue3-seamless-scroll>
    </div>
    <!-- 左侧内容 -->
    <pageLeftContent>
      <left @openDialog="openDialog"></left>
    </pageLeftContent>
    <!-- 右侧内容 -->
    <pageRightContent>
      <right @openDialog="openDialog"></right>
      <!-- <right @openDialog="openDialog" :showEventList="showDialog.eventList"></right> -->
    </pageRightContent>
    <!-- 视频监控 -->
    <integratedCommunication
      :show-dialog="showDialog.video"
      @closeVideoDialog="closeDialog('video')"
    >
    </integratedCommunication>
    <!-- 视频会商 -->
    <videoConferencing
      :show-dialog="showDialog.video_conference"
      @closeVideoDialog="closeDialog('video_conference')"
    >
    </videoConferencing>
    <!-- <videoConferencing></videoConferencing> -->
    <!-- 事假列表弹窗 -->
    <dialogVue
      :dialogValue="showDialog.eventList"
      :title="eventListTitle"
      width="850px"
      height="350px"
      top="350px"
      @closeHandle="closeDialog('eventList')"
    >
      <!-- 还是判断循环渲染添加进行 -->
      <div class="affairmain">
        <template v-for="(item, index) in disaster_synthesis">
          <div
            :class="{ item: true, active: currentEvent == item.id }"
            v-if="item.type == '一般事件'"
            @click="setMarker('zqqyfx', item)"
            :key="index"
          >
            <p class="itemtitle">{{ item.name }}</p>
            <p class="centers">
              <span>详情: {{ item.info }}</span>
              <span>时间: {{ item.time }}</span>
              <span>地点: {{ item.location }}</span>
            </p>
            <div class="labels">
              <p class="labels-top">
                <span class="one">{{ item.icons.name }}</span>
                <span class="twopro" v-if="item.icons.state == '处理中'">{{
                  item.icons.state
                }}</span>
                <span class="two" v-if="item.icons.state !== '处理中'">{{
                  item.icons.state
                }}</span>
              </p>
              <p class="labels-bottoms">
                <span class="labels-bottom">{{ item.icons.handle }}</span>
              </p>
            </div>
          </div>
          <!-- 下面这个就是较大事件的 -->
          <div
            :class="{ itempro: true, active: currentEvent == item.id }"
            v-if="item.type == '较大事件'"
            @click="setMarker('zqqyfx', item)"
            :key="index"
          >
            <p class="itemtitle">{{ item.name }}</p>
            <p class="centers">
              <span>详情: {{ item.info }}</span>
              <span>时间: {{ item.time }}</span>
              <span>地点: {{ item.location }}</span>
            </p>
            <div class="labels">
              <p class="labels-top">
                <span class="one">{{ item.icons.name }}</span>
                <span class="twopro" v-if="item.icons.state == '处理中'">{{
                  item.icons.state
                }}</span>
                <span class="two" v-if="item.icons.state !== '处理中'">{{
                  item.icons.state
                }}</span>
              </p>
              <p class="labels-bottoms">
                <span class="labels-bottom">{{ item.icons.handle }}</span>
              </p>
            </div>
          </div>
        </template>
      </div>
    </dialogVue>

    <!-- 事故类型 弹框 -->
    <dialogVue
      :dialogValue="showDialog.eventLevel"
      :title="eventLevelPopupData.title"
      width="850px"
      height="350px"
      top="350px"
      @closeHandle="closeDialog('eventLevel')"
    >
      <div class="level_and_type" :style="{ maxHeight: 350 - 70 + 'px' }">
        <div
          class="event_list"
          v-for="(item, index) in eventLevelPopupData.data"
          :key="index"
          @click="clickEventLevel(item)"
        >
          <div class="event_title">事故发生单位：{{ item.title }}</div>
          <div class="event_cont_box">
            <div
              :class="{ event_cont: true, [child.inline]: true }"
              v-for="(child, cindex) in item.rows"
              :key="cindex"
            >
              <div class="list">
                <span class="label">{{ child.label }}</span>
                <div class="value">{{ child.value }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </dialogVue>

    <twoTableThreeePopup
      :type="twoTableThreeePopupType"
      v-if="showTwoTableThreePopup"
      @close-handle="showTwoTableThreePopup = false"
    ></twoTableThreeePopup>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, inject, defineAsyncComponent  } from "vue";
// import pageLeftContent from "@/components/common/pageLeftContent.vue";
// import pageRightContent from "@/components/common/pageRightContent.vue";
// import left from "./components/left.vue";
// import right from "./components/right.vue";
// import dialogVue from "../../components/common/dialog.vue";
// import integratedCommunication from "@/views/safe/components/integratedCommunication.vue";
// import videoConferencing from "./components/videoConferencing.vue";
import { viewDetail } from "../../utils/funcNames/tzk";
import { useEventBus } from "@vueuse/core";
// import twoTableThreeePopup from "@/views/natural/components/twoTableThreeePopup.vue";
// import videoConferencing from "@/components/common/videoConferencing.vue";
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";
import { getYjjcxx } from "@/api/modules/home.js";


const pageLeftContent = defineAsyncComponent(() => import('@/components/common/pageLeftContent.vue'))
const pageRightContent = defineAsyncComponent(() => import('@/components/common/pageRightContent.vue'))
const left = defineAsyncComponent(() => import('./components/left.vue'))
const right = defineAsyncComponent(() => import('./components/right.vue'))
const dialogVue = defineAsyncComponent(() => import('../../components/common/dialog.vue'))
const integratedCommunication = defineAsyncComponent(() => import('@/views/safe/components/integratedCommunication.vue'))
const videoConferencing = defineAsyncComponent(() => import('./components/videoConferencing.vue'))
const twoTableThreeePopup = defineAsyncComponent(() => import('@/views/natural/components/twoTableThreeePopup.vue'))
const $mitt = inject("$mitt");
const showDialog = ref({
  eventLevel: false,
  eventList: false,
  video: false,
  video_conference: false,
});
const newsList = ref([]);
const twoTableThreeePopupType = ref(1);
const showTwoTableThreePopup = ref(false);
const bus = useEventBus(viewDetail);
const eventListener = function (e) {
  if (e.dialogType === "jydw") {
    showTwoTableThreePopup.value = true;
    twoTableThreeePopupType.value = 1;
  } else if (e.dialogType === "yjwzk") {
    showTwoTableThreePopup.value = true;
    twoTableThreeePopupType.value = 2;
  }
};
bus.on(eventListener);
// 事故等级||事故类型 数据
const eventLevelPopupData = ref({
  title: "一般事件",
  data: [
    {
      title: "XXX化工厂",
      id: "hgc_1",
      rows: [
        {
          label: "具体地点:",
          value: "榆林市 陕西省榆林市榆阳区肤施路",
        },
        {
          label: "详细描述:",
          value: "化工厂未达到检测标准，排放工业污水",
        },
        {
          label: "事件类型:",
          value: "污水排放",
          inline: "inline_3",
        },
        {
          label: "事发区域:",
          value: "榆林市",
          inline: "inline_3",
        },
        {
          label: "上报时间:",
          value: "2023-07-11 18:23:39",
          inline: "inline_3",
        },
      ],
    },
  ],
});

// 事件列表
const disaster_synthesis = ref([
  {
    id: "event1",
    type: "一般事件",
    info: "洪涝灾害事件",
    name: "一般事件",
    time: "2020-06-08 14:36:35",
    location: "xx区xx镇xx村",
    position: [109.58371, 38.38105],
    effect_radius: 200,
    analysis_radius: 400,
    icons: {
      name: "洪涝灾害",
      state: "待处理",
      handle: "事件核实中",
    },
  },
  {
    id: "event2",
    type: "一般事件",
    name: "一般事件",
    info: "洪涝灾害事件",
    time: "2020-06-08 14:36:35",
    location: "xx区xx镇xx村",
    position: [109.8761, 38.38014],
    effect_radius: 260,
    analysis_radius: 580,
    icons: {
      name: "洪涝灾害",
      state: "处理中",
      handle: "已经启动Ⅲ级预案",
    },
  },
  {
    id: "event3",
    type: "较大事件",
    info: "洪涝灾害事件",
    name: "较大事件",
    time: "2020-06-11 16:36:35",
    location: "xx区xx镇xx村",
    position: [109.87725, 38.24045],
    effect_radius: 300,
    analysis_radius: 600,
    icons: {
      name: "洪涝灾害",
      state: "已结案",
      handle: "已经启动Ⅲ级预案",
    },
  },
]);
const eventListTitle = ref();
//

const currentEvent = ref();

const currentEventLevelType = ref({ markerType: "", id: "" });

// 开启弹窗
const openDialog = function (key, info) {
  console.log(key, info);
  // return
  // 事故等级||事故类型
  if (key === "eventLevel") {
    // 没有数据 return
    if (!info.num) return;
    eventLevelPopupData.value.title = info.name;

    // let mardata = qylxlist[0].maekerList[0]
    let position = [109.92832, 38.27419];

    let arr = [];
    for (let index = 1; index < info.num + 1; index++) {
      // 差不多在此范围内随机生成点位
      let lng = (position[0] + "").replace(
        /^(.{4})(.{3})(.*)$/,
        "$1" + Math.round(Math.random() * (999 - 100) + 100) + "$3"
      );
      let lat = (position[1] + "").replace(
        /^(.{4})(.{3})(.*)$/,
        "$1" + Math.round(Math.random() * (999 - 100) + 100) + "$3"
      );

      arr.push({
        title: index + "号化工厂" + info.id,
        id: info.id + "_" + index, //如此唯一
        mardata: {
          markerType: "wxx",
          id: info.id + "_" + index,
          icon: "/images/marker/icon_jigou.png",
          lng: lng,
          lat: lat,
          name: "化工厂",
          label: { text: info.id + "-" + index + "号化工厂", font_size: 16 },
          dialogType: "qylxxx",
          details: {
            name: info.id + "-" + index + "号化工厂",
            job: "榆阳区12号",
            compony: "陕西省双翼有限公司",
            aphone: "白位于",
            phone: "14598989876",
            duty: "榆阳区",
          },
        },
        rows: [
          {
            label: "具体地点:",
            value: "榆林市 陕西省榆林市榆阳区肤施路",
          },
          {
            label: "详细描述:",
            value: "化工厂未达到检测标准，排放工业污水",
          },
          {
            label: "事件类型:",
            value: "污水排放",
            inline: "inline_3",
          },
          {
            label: "事发区域:",
            value: "榆林市",
            inline: "inline_3",
          },
          {
            label: "上报时间:",
            value: "2023-07-11 18:23:39",
            inline: "inline_3",
          },
        ],
      });
    }
    eventLevelPopupData.value.data = arr;
  } else if (key == "eventList") {
    eventListTitle.value = info;
    disaster_synthesis.value = disaster_synthesis.value.map((item) => {
      item.info = info;
      item.icons.name = info;
      return item;
    });
  }

  showDialog.value[key] = true;
};
const closeDialog = function (key) {
  showDialog.value[key] = false;
};
// 点击事故等级||事故类型弹框列表 撒点
const clickEventLevel = (item) => {
  closeDialog("eventLevel");

  // 先清除之前的 再撒点
  if (currentEventLevelType.value.markerType) {
    $mitt.emit("changeMarkerState", {
      markerType: currentEventLevelType.value.markerType,
      id: currentEventLevelType.value.id,
      show: false,
    });
  }
  $mitt.emit("addMarker", item.mardata);
  $mitt.emit("openPopup", item.mardata);
  $mitt.emit("flyTo", item.mardata);

  currentEventLevelType.value.markerType = item.mardata.markerType;
  currentEventLevelType.value.id = item.mardata.id;
};

// 列表点击撒点...  事件列表
const setMarker = (type, item) => {
  // console.log("item===========>", item);
  currentEvent.value = item.id;
  // 先清除 再撒点
  $mitt.emit("clearAll", { ignore: ["geo绘制图层"] });
  // emit("eventClick", item);
  let markerData = {
    markerType: "sj",
    id: "test",
    lng: item.position[0],
    lat: item.position[1],
    // lng: '109.784580',
    // lat: "38.297180",
    name: "事件",
    icon: "/images/marker/1.gif",
    // icon: "/images/marker/mapdot-worm.png",
    label: { text: eventListTitle.value + item.name, font_size: 16 },
    dialogType: "zqqyfx",
    details: {
      name: eventListTitle.value + item.name,
      distance: "502m",
      location: item.location,
      cont: item.info,
    },
  };
  if (type === "zqqyfx") {
    closeDialog("eventList");
    $mitt.emit("addMarker", markerData);
    $mitt.emit("openPopup", markerData);
    $mitt.emit("flyTo", markerData);
  }
};
const getDatas = function () {
  getYjjcxx().then((res) => {
    console.log("预警监测信息：", res);
    let text = res.data.zxyj[0]?.contentText;
    const n = text.length;
    let arr = []
    for(let i=0;i<n/20;i++){
      arr.push(text.slice(i,i+20))
    }
    newsList.value = arr
    newsList.value = [{ title: text }, { title: text }];
  });
};
onMounted(() => {
  getDatas();
});
</script>

<style scoped lang="less">
.home {
  ::-webkit-scrollbar {
    display: none;
  }

  :deep(.box-center) {
    padding: 0;
  }

  // :deep(.left_content),
  // :deep(.right_content) {
  //   background: linear-gradient(145deg, #011741 0%, #11306A 50%, #011741 100%);
  // }
  :deep(.dialog-wid-info) {
    height: calc(100% - 55px);
  }

  // 事件列表
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
        width: auto;
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

  // 事件登记||事件类型 弹框样式
  .level_and_type {
    height: 100%;
    overflow: auto;

    .event_list {
      margin-bottom: 10px;
      cursor: pointer;

      .event_title {
        height: 32px;
        background: rgba(0, 163, 206, 0.15);
        box-shadow: inset 4px 0px 0px 0px #00a3ce;

        font-size: 16px;
        font-family: Source Han Sans SC-Regular, Source Han Sans SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 32px;
        text-indent: 10px;
        margin-bottom: 10px;
      }

      .event_cont_box {
        display: flex;
        flex-wrap: wrap;

        .event_cont {
          width: 100%;

          &.inline_3 {
            width: calc((100% - 16px) / 3);
            margin-right: 8px;

            &:last-child {
              margin: 0;
            }
          }

          .list {
            display: flex;
            font-size: 16px;
            font-family: Source Han Sans SC-Regular, Source Han Sans SC;
            font-weight: 400;
            color: #ffffff;
            line-height: 24px;
            margin-bottom: 8px;

            .label {
              width: 70px;
              margin-right: 20px;
            }
          }
        }
      }
    }
  }
}
.scollBox {
  width: 527px;
  height: 39px;
  padding: 0 20px;
  // background: rgba(6, 152, 215, 0.2);
  background: url(@/assets/common/warn_bg.png) no-repeat;
  background-size: 100% 100%;
  position: absolute;
  left: 50%;
  margin-left: -263px;
  top: 98px;
  cursor: pointer;
  z-index: 9999;
  display: flex;
  align-items: center;

  .tz {
    width: 24px;
    height: 19px;
    padding-right: 10px;
  }

  .tz-num {
    padding-left: 5px;
    font-size: 14px;
    color: #20e6a4;
    padding-right: 10px;
  }

  .seamless-warp2 {
    overflow: hidden;
    height: 39px;
    width: 517px;
    line-height: 39px;
    padding-left: 20px;

    ul.item {
      li {
        float: left;
        margin-right: 10px;
        font-size: 16px;
        font-weight: 500;
        color: #fff;
        padding-left: 10px;
      }
    }
  }
}
</style>
