<script setup>
import { ref, inject } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const $mitt = inject("$mitt");
const openDialog = function () {
  showDialog.value = true;
};
const showDialog = ref(false);
const closeDialog = function () {
  showDialog.value = false;
};
const recordList = ref([
  { id: 1, label: "语音1：", content: "需要打开自然灾害监测专题页面" },
  { id: 2, label: "语音2：", content: "打开自然灾害监测专题页面" },
  { id: 3, label: "语音3：", content: "打开自然灾害监测专题页面" },
  { id: 4, label: "语音4：", content: "打开自然灾害监测专题页面" },
  { id: 5, label: "语音5：", content: "打开自然灾害监测专题页面" },
  { id: 6, label: "语音6：", content: "打开自然灾害监测专题页面" },
]);

const audioVal = ref("");
const yjzyList = [
  { type: "jydw", name: "救援队伍" },
  { type: "yjzj", name: "应急专家" },
  { type: "yjwzk", name: "物资仓库" },
  { type: "bncs", name: "避难场所" },
  { type: "yjzb", name: "救援装备" },
  { type: "fhmb", name: "防护目标" },
  { type: "txl", name: "通讯录" },
  { type: "sphs", name: "视频会商" },
  { type: "whqy", name: "危化企业" },
];
const warningTypes = [
  { name: "雨情监测", type: "ylz" },
  { name: "河道监测", type: "hdz" },
  { name: "地质监测", type: "dzjc" },
  { name: "水库监测", type: "skz" },
  { name: "安全生产监测", type: "aqscjc" },
  { name: "林火监测", type: "lhjc" },
];
const fxyhs = [
  { id: "dzyhd", name: "地灾隐患点" },
  { id: "lswjf", name: "历史危旧房" },
  { id: "dzyfq", name: "地灾易发区" },
  { id: "shyhd", name: "森火隐患点" },
  { id: "shzh", name: "山洪灾害" },
  { id: "csyld", name: "城市易涝点" },
];
const fxgzs = [
  { id: "ylzd", name: "雨量站点" },
  { id: "swzd", name: "水位站点" },
  { id: "sk", name: "水库" },
  { id: "jsd", name: "积水点" },
  { id: "hdzd", name: "河道站点" },
  { id: "qxyt", name: "气象云图" },
  { id: "qxldt", name: "气象雷达图" },
  { id: "jslxx", name: "降水量信息" },
];
const zrzhYjzyList = [
  { id: "yjry", name: "应急人员" },
  { id: "yjzj", name: "应急专家" },
  { id: "jydw", name: "救援队伍" },
  { id: "yjwzk", name: "应急物资库" },
  { id: "bncs", name: "避灾场所" },
  { id: "spjk", name: "视频监控" },
];
const search = function () {
  const val = audioVal.value;
  if (val.includes("打开指挥调度一张图")) {
    $mitt.emit("audioControl", { order: "changeRoute", index: 0 });
  } else if (val.includes("打开自然灾害")) {
    $mitt.emit("audioControl", { order: "changeRoute", index: 1 });
  } else if (val.includes("打开安全生产")) {
    $mitt.emit("audioControl", { order: "changeRoute", index: 2 });
  } else if (val.includes("打开辅助决策")) {
    $mitt.emit("audioControl", { order: "changeRoute", index: 3 });
  } else if (val.includes("值班")) {
    $mitt.emit("audioControl", { order: "openDuty" });
  } else {
    if (route.name === "zhddyzt") {
      for (let yjzyTab of yjzyList) {
        if (val.includes("打开" + yjzyTab.name)) {
          $mitt.emit("audioControl", {
            order: "openHomeYjzy",
            type: yjzyTab.type,
          });
          return;
        }
      }
      for (let warningType of warningTypes) {
        if (val.includes("打开" + warningType.name)) {
          $mitt.emit("audioControl", {
            order: "openHomeYjjcxx",
            type: warningType.type,
          });
          return;
        }
      }
    }
    if (route.name === "zrzhjc") {
      for (let fxyh of fxyhs) {
        if (val.includes("打开" + fxyh.name)) {
          $mitt.emit("audioControl", {
            order: "openZrzhFxyh",
            data: fxyh,
          });
          return;
        }
      }
      for (let fxgz of fxgzs) {
        if (val.includes("打开" + fxgz.name)) {
          $mitt.emit("audioControl", {
            order: "openZrzhFxgz",
            id: fxgz.id,
          });
          return;
        }
      }
      for (let zrzhYjzy of zrzhYjzyList) {
        if (val.includes("打开" + zrzhYjzy.name)) {
          $mitt.emit("audioControl", {
            order: "openZrzhYjzy",
            data: zrzhYjzy,
          });
          return;
        }
      }
    }
  }
};
</script>
<template>
  <div @click="openDialog" class="word">
    <img class="bg" src="@/assets/common/record.png" alt="" />
    <div class="recordDialog" v-if="showDialog">
      <img
        class="close"
        src="@/assets/common/icon_close.png"
        @click.stop="closeDialog"
        alt=""
      />
      <div class="input_box">
        <input
          type="text"
          style="border: 1px solid #00ffff; color: #fff"
          v-model="audioVal"
          placeholder="请输入"
          @keyup.enter="search"
        />
        <button @click="search">指令</button>
      </div>
      <div class="record_content">
        <ul class="record_list">
          <li v-for="item in recordList" :key="item.id">
            <div class="label">{{ item.label }}</div>
            <div class="value">{{ item.content }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input_box {
  display: flex;
  align-items: center;
  margin: 45px auto 0;
  width: 80%;
  button {
    width: 60px;
    line-height: 24px;
    background-color: transparent;
    color: #fff;
    border: 1px solid #00ffff;
  }
  input {
    height: 25px;
    padding-left: 10px;
    line-height: 25px;
  }
}
.word {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  .bg {
    width: 34px;
    height: 34px;
  }
}
.recordDialog {
  position: absolute;
  right: -80px;
  bottom: 50px;
  width: 320px;
  height: 260px;
  background-color: #fff;
  text-align: center;
  border-radius: 5px;
  background: url(@/assets/common/record_box-bg.png) no-repeat;
  background-size: 100% 100%;
  .close {
    position: absolute;
    right: 10px;
    top: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .record_content {
    .record_list {
      height: 192px;
      overflow-y: auto;
      margin-top: 10px;
      > li {
        display: flex;
        font-size: 16px;
        font-family: Source Han Sans SC-Regular, Source Han Sans SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 18px;
        letter-spacing: 1px;
        padding: 0 16px;
        .label {
          flex-shrink: 0;
        }
        .value {
          text-align: left;
        }
        &:not(:last-child) {
          margin-bottom: 8px;
        }
      }
    }
  }
}
</style>
