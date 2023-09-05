<template>
  <div class="right" :ck="ck" :hs="hs">
    <!-- 天气情况部分内容 -->
    <div class="weather">
      <div class="title">
        <img src="../../assets/naturalRightimg/icon7.png" alt="" />
      </div>
      <div class="icons">
        <div class="icon-item">
          <img src="../../assets/naturalRightimg/icon6.png" alt="" />
          <div>
            <span>风速</span>
            <p>2 <span class="smallicon">级</span></p>
          </div>
        </div>
        <div class="icon-item">
          <img src="../../assets/naturalRightimg/icon5.png" alt="" />
          <div>
            <span>pm2.5</span>
            <p>86</p>
          </div>
        </div>
        <div class="icon-item">
          <img src="../../assets/naturalRightimg/icon4.png" alt="" />
          <div>
            <span>风向</span>
            <p>东南</p>
          </div>
        </div>
      </div>
      <!-- 再下面就是日期时间这些的了 -->
      <div class="times">
        <div class="time-item" v-for="(item, index) in weathers" :key="index">
          <p class="month">{{ item.time }}</p>
          <p class="day">{{ item.day }}</p>
          <p class="icon">
            <img src="../../assets/naturalRightimg/taityang.png" alt="" />
          </p>
          <p class="temperature">{{ item.temperature }}</p>
        </div>
      </div>
    </div>

    <!-- 下面就是预警部分的了 -->
    <div class="warning">
      <div class="title">
        <img src="../../assets/naturalRightimg/icon3.png" alt="" />
      </div>
      <!-- 下面就是主要内容 -->
      <div class="main">
        <!-- 这里通过筛选进行判断,然后循环渲染 -->
        <template v-for="(item, index) in warnings" :key="index">
          <div class="itemtext">
            <div class="main-title">
              <p class="maintitleimg" :class="item.type">{{ item.name }}</p>
              <!-- <img class="maintitleimg" src="../../assets//naturalRightimg/Frame 427320375.png" alt=""> -->
              <p>{{ item.title }}</p>
            </div>
            <div class="text">
              <p>
                {{ item.content }}
              </p>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- 再下面就是这个事件信息这些的东西了 -->
    <div class="affair">
      <div class="title">
        <img src="../../assets/naturalRightimg/icon2.png" alt="" />
      </div>
      <div class="affairmain">
        <!-- 还是判断循环渲染添加进行 -->
        <template v-for="(item, index) in events" :key="index">
          <div
            class="item"
            :class="{ active: currentIndex === index }"
            v-if="item.type == 1"
            @click="setMarker('affair', item, index)"
            :key="index"
          >
            <p class="itemtitle">{{ item.name }}</p>
            <p class="centers">
              <span class="ellipsis" :title="item.info"
                >详情: {{ item.info }}</span
              >
              <span>时间: {{ item.time }}</span>
              <span class="ellipsis" :title="item.location"
                >地点: {{ item.location }}</span
              >
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
            class="itempro"
            :class="{ active: currentIndex === index }"
            v-else
            @click="setMarker('affair', item, index)"
          >
            <p class="itemtitle">{{ item.name }}</p>
            <p class="centers">
              <span class="ellipsis">详情: {{ item.info }}</span>
              <span>时间: {{ item.time }}</span>
              <span class="ellipsis">地点: {{ item.location }}</span>
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
    </div>
  </div>
  <div class="isss">
    <eject
      title="应急事件"
      :data="data"
      :buttondata="buttondata"
      :imgs="imgs"
      :islook="islook"
      @FatherMethod="FatherMethod"
      @closeDialog="closeDialog"
      :top="top"
      :left="left"
    ></eject>
  </div>
</template>

<script setup>
// 导入弹出组件
import eject from "../../components/common/emergencybomb.vue";
import { ref, reactive, inject, onMounted } from "vue";
const $mitt = inject("$mitt");
import { getSjxx, getYjxx } from "@/api/modules/zrzh.js";
// 定义数据,决定是查看还是隐藏
const cks = ref({
  ck: false,
  hs: false,
  bl: false,
});
// 使用defineEmits注册一个自定义事件
const emit = defineEmits(["getValue"]);
const transValue = () => {
  emit("getValue", cks.value);
  console.log(11111, "==============================>", cks.value);
};
transValue();
const warnings = ref([]);
const getWarnings = function () {
  getYjxx().then((res) => {
    console.log(res);
    const levels = ["蓝色预警", "黄色预警", "橙色预警", "红色预警"];
    const types = ["blue_level", "yellow_level", "orange_level", "red_level"];
    warnings.value = res.data.map((item) => {
      return {
        type: types[item.eventLvl],
        name: levels[item.eventLvl],
        title: item.title,
        content: item.contentText,
      };
    });
  });
};
// 下面就是事件信息这个的数据的了哟
const events = ref([]);
const getEvents = function () {
  getSjxx().then((res) => {
    let l1 = ["待处理", "属实"];
    const l2 = ["属实", "已启动响应"];
    events.value = res.data.map((item) => {
      return {
        type: item.eventLevel,
        info: item.eventContent,
        name: item.eventLevelName,
        time: item.reportDate,
        location: item.eventAddress,
        icons: {
          name: item.typeName,
          state: item.stateName,
          handle: "已经启动Ⅳ级预案",
        },
        marker: {
          markerType: "ssj",
          id: item.id,
          icon: "/images/marker/1.gif",
          lng: item.mapX,
          lat: item.mapY,
          name: "事件",
          label: { text: "事件", font_size: 16 },
          dialogType: "yjjsj",
          details: {
            name: item.eventName,
            type: item.typeName,
            time: item.reportDate,
            address: item.eventAddress,
            des: item.eventContent,
            id: item.id,
            hideEventSupplementaryRecording: !l1.includes(item.stateName),
            hideDispatch: !l2.includes(item.stateName),
            hideEventVerification: item.stateName !== "待处理",
          },
        },
        detailInfo: { ...item },
      };
    });
  });
};
onMounted(() => {
  getWarnings();
  getEvents();
});
// 定义一个数据来控制这个事件信息的弹出框的显示和隐藏的啦
const evislook = ref(true);

// 然后这里是把决定是否显示或者隐藏的传递过去
// const emits = defineEmits(['openDialog'])
// const openDialog = function (a) {
//   console.log("看看我点击了没有")
// }

// 定义一个数据,存储之前有的这个打了点的数据了
let iscun = ref(true);
let monedata = ref("");
// 来判断我点击的是不是原来的这个
let mmid = ref("");
const currentIndex = ref();
const setMarker = function (type, item, index) {
  // 这个是为了变背景颜色的
  currentIndex.value = index;
  if (iscun.value) {
    mmid.value = item.marker.id;
    item.marker.details.name = item.location + "发生l" + item.info;
    item.marker.details.job = item.info;
    item.marker.details.compony = item.reportDate;
    item.marker.details.aphone = item.location;
    item.marker.details.phone = "";
    let mardata = item.marker;
    $mitt.emit("addMarker", mardata);
    $mitt.emit("openPopup", mardata);
    $mitt.emit("flyTo", mardata);
    // 然后还要把我打了点的数据保存下来,待会把她清楚掉
    monedata.value = item.marker;
    iscun.value = true;
  } else {
    if (item.marker.id == mmid.value) {
      $mitt.emit("changeMarkerState", monedata.value);
      iscun.value = true;
      mmid.value = item.marker.id;
      // 这个是为了变背景颜色的
      currentIndex.value = "";
    } else {
      // 下面这个就表示已经打了点的了,需要把之前的点取消掉
      mmid.value = item.marker.id;
      console.log("我走的这里吗");
      iscun.value = true;
      $mitt.emit("changeMarkerState", monedata.value);
      monedata.value = item.marker;
      // 然后还要再打新的点
      item.marker.details.name = item.location + "发生l" + item.info;
      item.marker.details.job = item.info;
      item.marker.details.compony = item.time;
      item.marker.details.aphone = item.location;
      item.marker.details.phone =
        "事件描述等等事件描述等等事件描等等事件描述等等事件描等等";
      let mardata = item.marker;
      $mitt.emit("addMarker", mardata);
      $mitt.emit("openPopup", mardata);
      $mitt.emit("openPopup", mardata);
      // 然后还要把我打了点的数据保存下来,待会把她清楚掉
      monedata.value = item.marker;
      iscun.value = false;
    }
  }
  // 上面这个是打点的事件,然后下面就是顺便把这个弹框也要弹出来的一个事件的了
  evislook.value = true;
};

// 加入传递的值是是一个数据的形式,到时候直接把数据传递过去循环这个就直接可以的了
// 下面这些数据都是模拟假的数据,方便展示出来看的
// 下面这个是控制弹窗显示还是隐藏的
const islook = ref(false);
const data = reactive([
  {
    content: "xx街道xx村发生一起山体滑坡事件",
    name: "事件名称",
  },
  {
    content: "17323215510",
    name: "事件名称",
    img: "https://img1.baidu.com/it/u=3302184040,3713353210&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1689958800&t=c5544548483d80e372afb5e9f2ecfefc",
  },
  {
    content: "正常",
    name: "状态",
  },
  {
    content:
      "各位领导,  各位领导,  各位领导,  各位领导, 各位领导,  各位领导,  各位领导,  各位领导,各位领导,  各位领导,  各位领导, ",
    name: "事件描述",
  },
]);
// 下面再来一个传递这个按钮的值
const buttondata = reactive(["核实", "指挥调度"]);
// 下面这个就是按钮旁边的一直图片
const imgs = reactive([
  "https://img1.baidu.com/it/u=3302184040,3713353210&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1689958800&t=c5544548483d80e372afb5e9f2ecfefc",
  "https://img1.baidu.com/it/u=3302184040,3713353210&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1689958800&t=c5544548483d80e372afb5e9f2ecfefc",
  "https://img1.baidu.com/it/u=3302184040,3713353210&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1689958800&t=c5544548483d80e372afb5e9f2ecfefc",
]);
// 传的方法
function FatherMethod() {
  console.log("这是FatherMethod");
}
function closeDialog() {
  islook.value = false;
}

const top = ref("100px");
const left = ref("-500px");

// 下面定义一个关于这个每天的天气的一个数据
const weathers = ref([
  {
    time: "10月21日",
    day: "今天",
    icon: "",
    temperature: "14°C/22°C",
  },
  {
    time: "10月22日",
    day: "明天",
    icon: "",
    temperature: "12°C/32°C",
  },
  {
    time: "10月23日",
    day: "后天",
    icon: "",
    temperature: "18°C/22°C",
  },
  {
    time: "10月24日",
    day: "后后天",
    icon: "",
    temperature: "16°C/42°C",
  },
]);
</script>

<style lang="less" scoped>
// 下面这个这个就是点击打点的时候会把这个背景的样式进行一个激活的了
// 危化企业这里的背景颜色
.active {
  background-color: #09212f !important;
  cursor: pointer;
}

.ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

// 首先就是整个的一共样式
.right {
  height: 100%;
  width: 100%;
  padding-left: 14px;

  // 天气部分
  .weather {
    width: 100%;

    // 下面就是头部部分
    .title {
      height: 56px;
      width: 100%;
    }

    .icons {
      display: flex;
      justify-content: space-between;
      width: 410px;
      margin: 8px 6px 22px 6px;

      .icon-item {
        display: flex;
        align-items: center;

        span {
          font-size: 16px;
          color: rgba(208, 222, 238, 1);
        }

        p {
          font-size: 20px;
          margin-top: 10px;
          color: rgba(255, 255, 255, 1);

          .smallicon {
            font-size: 12px;
            color: rgba(255, 255, 255, 1);
          }
        }
      }

      img {
        width: 66px;
        height: 66px;
        margin-right: 15px;
      }
    }

    // 下面的时间部分
    .time-item:hover {
      background-color: #0b2b33;
    }

    .times {
      height: 114px;
      width: 410px;
      margin: 0px 6px 14px 6px;
      cursor: pointer;
      overflow-y: auto;

      &::-webkit-scrollbar {
        display: none;
      }

      .time-item {
        height: 37px;
        display: flex;
        // align-items: center;
        justify-content: space-between;
        font-size: 15px;
        color: rgba(255, 255, 255, 1);

        .month {
          width: 138px;
          height: 100%;
          display: flex;
          align-items: center;
          padding-left: 12px;
        }

        .day {
          width: 77px;
          height: 100%;
          display: flex;
          align-items: center;
          padding-left: 12px;
        }

        .temperature {
          width: 109px;
          height: 100%;
          display: flex;
          align-items: center;
          padding-left: 12px;
        }

        .icon {
          width: 85px;
          display: flex;
          align-items: center;
          padding-left: 12px;

          img {
            width: 28px;
            height: 28px;
          }
        }
      }
    }
  }

  // 下面就是预警部分的了
  .warning {
    .title {
      height: 56px;
      width: 100%;
    }

    // 下面这个就是内容部分的东西的了
    .main {
      margin: 8px 0px 0px 6px;
      height: 223px;
      overflow-y: auto;

      &::-webkit-scrollbar {
        display: none;
      }

      .item {
        cursor: pointer;
        height: 49px;
        border-bottom: 1px rgba(15, 73, 96, 1) solid;
        margin-bottom: 18px;

        .main-title {
          display: flex;
          font-size: 16px;
          color: rgba(255, 255, 255, 1);

          .maintitleimg {
            width: 56px;
            height: 24px;
            margin-right: 16px;
            background: #357ebd;
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 6px 8px;
          }

          p {
            width: 132px;
            // white-space: nowrap;
            // overflow: hidden;
            // text-overflow: ellipsis;
          }
        }
      }

      // 有文字的相关的东西
      .itemtext {
        cursor: pointer;

        .main-title {
          display: flex;
          font-size: 16px;
          color: rgba(255, 255, 255, 1);
          align-items: center;
          margin-bottom: 12px;

          .maintitleimg {
            width: 56px;
            height: 24px;
            font-size: 12px;
            margin-right: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 6px 8px;
          }

          .blue_level {
            background: #357ebd;
          }

          .yellow_level {
            background-color: #8e8e07;
          }

          .orange_level {
            background-color: #eead0e;
          }

          .red_level {
            background-color: red;
          }

          p {
            width: 180px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        .text {
          height: 80px;
          color: rgba(208, 222, 238, 1);
          line-height: 20px;
          font-size: 14px;
          letter-spacing: 2px;
          word-break: break-all;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 4;
          /* 超出几行省略 */
          overflow: hidden;
          margin-bottom: 40px;
        }
      }
    }
  }

  // 下面是这个事件处理的样式的了
  .affairmain {
    width: 412px;
    height: 358px;
    overflow-y: auto;

    &::-webkit-scrollbar {
      display: none;
    }

    .item:hover {
      background-color: #09212f;
    }

    .item {
      cursor: pointer;
      display: flex;
      width: 100%;
      height: 116px;
      flex-direction: row;
      align-items: center;
      padding: 8px 8px;
      padding-right: 2px;
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
        width: 174px;
        height: 100%;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        margin-right: 10px;
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
            width: 79px;
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
            padding: 0px 2px;
            background-color: #061b42;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #1a73d8;
            border: 1px solid #1d75d6;
            display: inline-block;
            text-align: center;
            line-height: 26px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
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
            display: inline-block;
            text-align: center;
            line-height: 26px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
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
    .itempro:hover {
      background-color: #09212f;
    }

    .itempro {
      cursor: pointer;
      display: flex;
      width: 100%;
      height: 116px;
      flex-direction: row;
      align-items: center;
      padding: 8px 8px;
      padding-right: 2px;
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
        width: 174px;
        height: 100%;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        margin-right: 10px;
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
            width: 79px;
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
            display: inline-block;
            text-align: center;
            line-height: 26px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
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
            display: inline-block;
            text-align: center;
            line-height: 26px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
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
}
</style>
