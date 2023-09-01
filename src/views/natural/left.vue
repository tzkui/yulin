<script setup>
import { onMounted, ref, inject, computed, watch, onUnmounted } from "vue";
import sourceCheckbox from "./components/sourceCheckbox.vue";
import duty from '../home/components/components/duty.vue'
import { useEventBus } from "@vueuse/core";
import { viewDetail } from "../../utils/funcNames/tzk";
import { threePopupData1, popupData } from "@/api/mock_tzk.js";
import threePopup from "./components/threePopup.vue";
import formTablePopup from "./components/formTablePopup.vue";
import syqxxThreePopup from "./components/syqxxThreePopup.vue";
import twoTableThreeePopup from "./components/twoTableThreeePopup.vue";
import wzdbPopup from "./components/wzdbPopup.vue";

import fxgzCompnent from "./leftComponents/fxgz.vue";
import yjzyComponent from "./leftComponents/yjzy.vue";
import fxyhComponent from "./leftComponents/fxyh.vue";

const nowThreeDialogType = ref("");
const nowSyqxxInfo = computed(() => {
  return threePopupData1[nowThreeDialogType.value] || {};
});
const nowPopupInfo = computed(() => {
  return (
    popupData[nowThreeDialogType.value] || {
      title: "地灾隐患点信息",
      type: "list",
      data: [
        {
          label: "积水位置",
          value: "马溪路保通驾校门口",
          row: "row_1", //row_2 row_3  决定一行排几个, 不传默认一行一个
        },
        {
          label: "整改措施",
          value: "对该段积水道路进行整体提升改造。",
        },
        {
          label: "积水原因",
          value:
            "马溪路为南北向道路，武肃街以北段无雨水主管，此段道路武肃街路口地势高，北侧为山体，地势也较高，形成了两头高中间低（低洼处在偏北段）这一局面，且北面山体来水较多。排水方式原交警大队北侧为散排形式，后沿路不断有建房，散排也被基本阻断；保通驾校东侧原有地下管沟汇集雨水排入马溪，后因拆迁该处地下管沟也被阻断，最终导致该段道路雨水汇集后无处排放。",
        },
        {
          label: "责任单位",
          value: "城投集团、城市管理局、交警大队",
        },
        {
          label: "联系人员",
          value: "王振文、章吉、郑世伟",
        },
        {
          label: "联系电话",
          value: "13634136073、13758293931、13868038828",
        },
        {
          label: "措施",
          value: "单体泵排水、打开雨水篦子",
        },
      ],
    }
  );
});
const showSyqxxThreePopup = ref(false);
const showThreePopup = ref(false);
const showHouseThreePopup = ref(false);
const showTwoTableThreePopup = ref(false);
const twoTableThreeePopupType = ref(1);
const yjzyInfo = ref({});
const showWzdbPopup = ref(false);
const bus = useEventBus(viewDetail);
const eventListener = function (e) {
  const syqxx = ["ylzd", "swzd", "sk", "hdzd", "qxzd"];
  if (syqxx.includes(e.dialogType)) {
    nowThreeDialogType.value = e.dialogType;
    showSyqxxThreePopup.value = true;
  } else if (e.dialogType === "jsd" || e.dialogType === "dzyhd") {
    nowThreeDialogType.value = e.dialogType;
    showThreePopup.value = true;
  } else if (e.dialogType === "lswjf") {
    showHouseThreePopup.value = true;
  } else if (e.dialogType === "jydw") {
    showTwoTableThreePopup.value = true;
    twoTableThreeePopupType.value = 1;
  } else if (e.dialogType === "yjwzk") {
    showTwoTableThreePopup.value = true;
    twoTableThreeePopupType.value = 2;
  } else {
    showThreePopup.value = true;
  }
};
bus.on(eventListener);

const wzdbBus = useEventBus("wzdb");
const wzdbEventListener = function (e) {
  showWzdbPopup.value = true;
};
wzdbBus.on(wzdbEventListener);

onUnmounted(() => {
  bus.off(eventListener);
  wzdbBus.off(wzdbEventListener);
});

const sourceCheckboxRef = ref(null);

const fxyhComponentRef=ref()
const fxgzCompnentRef=ref()
const yjzyComponentRef=ref()
const closeAll = function(){
  sourceCheckboxRef.value.clearAll()
  fxyhComponentRef.value.closeDialog()
  fxgzCompnentRef.value.closeDialog()
  yjzyComponentRef.value.closeDialog()
}
</script>

<template>
  <div class="natural_left">
    <duty></duty>
    <fxyhComponent ref="fxyhComponentRef" @closeAll="closeAll"></fxyhComponent>
    <fxgzCompnent ref="fxgzCompnentRef" @closeAll="closeAll"></fxgzCompnent>
    <yjzyComponent ref="yjzyComponentRef" @closeAll="closeAll"></yjzyComponent>
  </div>

  <!-- 应急资源多选框 -->
  <sourceCheckbox ref="sourceCheckboxRef"></sourceCheckbox>

  <!-- 三级弹框 -->
  <syqxxThreePopup
    v-if="showSyqxxThreePopup"
    :name="nowSyqxxInfo.name"
    :list="nowSyqxxInfo.list"
    :showSelect="nowSyqxxInfo.showSelect"
    :selectItems="nowSyqxxInfo.selectItems"
    :headers="nowSyqxxInfo.headers"
    @closeDialog="showSyqxxThreePopup = false"
  >
  </syqxxThreePopup>
  <threePopup
    class="qxxx_dialog"
    :dialogValue="showThreePopup"
    :title="nowPopupInfo.title"
    width="850px"
    height="482px"
    :type="nowPopupInfo.type"
    @closeHandle="showThreePopup = false"
    :data="nowPopupInfo.data"
  >
  </threePopup>
  <formTablePopup
    :name="'房屋信息'"
    v-if="showHouseThreePopup"
    @closeHandle="showHouseThreePopup = false"
  ></formTablePopup>
  <twoTableThreeePopup
    :type="twoTableThreeePopupType"
    v-if="showTwoTableThreePopup"
    @close-handle="showTwoTableThreePopup = false"
  ></twoTableThreeePopup>
  <wzdbPopup
    @close-handle="showWzdbPopup = false"
    v-if="showWzdbPopup"
  ></wzdbPopup>
</template>

<style lang="less" scoped>

.natural_left {
  .moreBtn {
    width: 58px;
    height: 23px;
    position: absolute;
    top: -38px;
    right: 12px;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
    }
  } 
}

.dialog_content {
  width: 300px;

  .info_list {
    &_item {
      display: flex;
      margin-top: 12px;
      align-items: center;

      .left {
        width: 120px;
      }

      .right {
        flex: 1;
        text-align: right;

        .phone {
          margin-left: 8px;
          cursor: pointer;
          float: right;
          width: 20px;
          height: 20px;
          margin-top: -2px;
        }
      }

      &:first-child {
        margin-top: 0;
      }
    }
  }
}

.dialog_footer {
  height: 50px;
  border-top: 1px solid #00a3ce;
  text-align: right;
  padding-right: 16px;
  padding-top: 12px;
  box-sizing: border-box;

  .btn {
    display: inline-block;
    text-align: center;
    font-size: 12px;
    font-family: Source Han Sans SC-Medium, Source Han Sans SC;
    font-weight: 500;
    color: #ffffff;
    width: 50px;
    height: 26px;
    line-height: 26px;
    background: #0d4f6d;
    cursor: pointer;
    border-radius: 2px;

    &:hover {
      background-color: #0c3e5c;
    }
  }
}
</style>
