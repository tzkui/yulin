<template>
  <div class="right">
    <!-- 灾情分析 / 重点防护目标 -->
    <zddxfxVue :center="eventCenter" ref="zddxfxRef"></zddxfxVue>
    <ViewBox title="灾情综合查询">
      <div class="disaster_synthesis">
        <div v-show="showDetail" class="disaster_synthesis_details">
          <button
            class="back_list"
            @click="
              () => {
                showDetail = false;
              }
            "
          >
            返回
          </button>
          <div
            v-if="disaster_synthesis_details.length"
            class="synthesis_details"
          >
            <div
              class="synthesis_detail"
              v-for="(item, index) in disaster_synthesis_details"
              :key="index"
            >
              <div class="date_time">
                {{ item.dynamicsDate.substr(0, 10) }}
                <span class="time">{{ item.dynamicsDate.substr(11) }}</span>
              </div>
              <div class="cont">
                <span class="blue">{{ item.dynamicsTag }}</span>
                {{ item.dynamicsContent }}
              </div>
            </div>
          </div>
        </div>

        <div v-show="!showDetail" class="affairmain">
          <!-- 还是判断循环渲染添加进行 -->
          <template v-for="(item, index) in disaster_synthesis">
            <div
              :class="{ item: true, active: currentEvent == item.event.id }"
              v-if="item.event.eventLevel == '1'"
              @click="setMarker('zqzhcx', item)"
              :key="index"
            >
              <p class="itemtitle">{{ item.event.eventLevelName + "事件" }}</p>
              <p class="centers">
                <span class="center_text"
                  >详情: {{ item.event.eventContent }}</span
                >
                <span class="center_text"
                  >时间: {{ item.event.eventDate }}</span
                >
                <span class="center_text"
                  >地点: {{ item.event.eventAddress }}</span
                >
              </p>
              <div class="labels">
                <p class="labels-top">
                  <span class="one">{{ item.event.typeName }}</span>
                  <span
                    class="twopro"
                    v-if="item.event.stateName == '处理中'"
                    >{{ item.event.stateName }}</span
                  >
                  <span class="two" v-else>{{ item.event.stateName }}</span>
                </p>
                <p class="labels-top">
                  <span class="three" @click.stop="doZj(item)">战评总结</span>
                  <span
                    class="three"
                    @click.stop="doGd(item)"
                    v-if="item.event.sfgd === '未归档'"
                    >归档</span
                  >
                  <span class="three" v-else style="background-color: #5c7cda"
                    >已归档</span
                  >
                </p>
                <p class="labels-bottoms">
                  <span class="labels-bottom">{{
                    item.event.reportStateName
                  }}</span>
                </p>
              </div>
            </div>
            <!-- 下面这个就是较大事件的 -->
            <div
              :class="{ itempro: true, active: currentEvent == item.event.id }"
              v-if="item.event.eventLevel == '3'"
              @click="setMarker('zqzhcx', item)"
              :key="index"
            >
              <p class="itemtitle">{{ item.event.eventLevelName + "事件" }}</p>
              <p class="centers">
                <span class="center_text"
                  >详情: {{ item.event.eventContent }}</span
                >
                <span class="center_text"
                  >时间: {{ item.event.eventDate }}</span
                >
                <span class="center_text"
                  >地点: {{ item.event.eventAddress }}</span
                >
              </p>
              <div class="labels">
                <p class="labels-top">
                  <span class="one">{{ item.event.typeName }}</span>
                  <span
                    class="twopro"
                    v-if="item.event.stateName == '处理中'"
                    >{{ item.event.stateName }}</span
                  >
                  <span class="two" v-else>{{ item.event.stateName }}</span>
                </p>
                <p class="labels-top">
                  <span class="three" @click.stop="doZj(item)">战评总结</span>
                  <span
                    class="three"
                    @click.stop="doGd(item)"
                    v-if="item.event.sfgd === '未归档'"
                    >归档</span
                  >
                  <span class="three" v-else style="background-color: #5c7cda"
                    >已归档</span
                  >
                </p>
                <p class="labels-bottoms">
                  <span class="labels-bottom">{{
                    item.event.reportStateName
                  }}</span>
                </p>
              </div>
            </div>
          </template>
        </div>
      </div>
    </ViewBox>
    <ViewBox title="案例库">
      <div class="case_library">
        <div class="case_library_btn" @click="goPgae">查看</div>
      </div>
    </ViewBox>
    <zpgzDialogVue ref="zpgzDialogRef"></zpgzDialogVue>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from "vue";
const $mitt = inject("$mitt");
const emit = defineEmits(["changeRadius", "eventClick"]);
import { ElMessage } from "element-plus";
import { getZqzhcx, doGdApi } from "@/api/decision_analysis.js";

import zpgzDialogVue from "./components/zpgzDialog.vue";
import ViewBox from "@/components/common/view-box.vue";
import zddxfxVue from "./components/zddxfx.vue";

const zddxfxRef = ref()
const eventCenter = ref([]);
const zpgzDialogRef = ref();
const showDetail = ref(false);
onMounted(() => {
  initZqzhcx();
});
const goPgae = function () {
  window.location.href = window.baseIp1 + ":20128/basics/eventcase";
};
const disaster_synthesis = ref([]);
// 灾情综合查询列表 详情
const disaster_synthesis_details = ref([]);
const currentEvent = ref();
// 灾情综合查询
const initZqzhcx = async () => {
  let res = await getZqzhcx();
  console.log("getZqzhcx===========>", res);
  disaster_synthesis.value = res.data;
};
// 列表点击撒点...
const setMarker = (type, data) => {
  disaster_synthesis_details.value = data.eventDynamics;

  let item = data.event;
  currentEvent.value = item.id;
  // 先清除 再撒点
  $mitt.emit("clearAll", { ignore: ["geo绘制图层"] });
  eventCenter.value = [data.event.mapX, data.event.mapY];
  $mitt.emit('drawTypeGraph', {
    type: 'Circle',
    id: 'effect_radius',
    positions: eventCenter.value,
    style: {
      radius: zddxfxRef.value.radius,
      fillColor: "rgba(255,0,0,.3)",
      outlineColor: "#ee3844",
      outlineWidth: 5,
    }
  })
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
      date: item.eventDate.replace(" ", "&nbsp;"),
      name: item.eventName,
      location: item.eventAddress,
      cont: item.eventContent,
      typeName: item.typeName,
      eventLevelName: item.eventLevelName,
      zpzj: item.zpzj,
    },
  };
  if (type === "zqzhcx") {
    showDetail.value = !showDetail.value;
    $mitt.emit("addMarker", markerData);
    $mitt.emit("openPopup", markerData);
    $mitt.emit("flyTo", markerData);
  }
};
const doZj = function (info) {
  zpgzDialogRef.value.openDialog(info);
};
const doGd = function (info) {
  doGdApi({ eventId: info.event.id })
    .then((res) => {
      info.event.sfgd = "已归档";
    })
    .catch(() => {})
    .finally(() => {
      ElMessage.success("归档成功");
    });
};
</script>

<style scoped lang="less">
.disaster_synthesis {
  height: 220px;
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

          .three {
            width: 64px;
            height: 26px;
            background-color: #061b42;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #d9dde2;
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
      padding-right: 2px;
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
          flex-wrap: wrap;
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
        background: url("@/assets/decisionAnalysis/command-bg.png") center/100%
          no-repeat;
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

.alk_list {
  height: 190px;
  overflow-y: auto;

  > li {
    font-size: 16px;
    line-height: 28px;
    display: flex;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #0a3648;

    .level {
      width: 64px;
      height: 24px;
      background-color: #367ebc;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 16px;
      line-height: 24px;
      text-align: center;
      border-radius: 2px;
    }

    .infos {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }

    &:hover {
      background: #092a33;
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
</style>
