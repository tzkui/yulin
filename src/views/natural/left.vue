<script setup>
import { onMounted, ref, inject, computed, watch, onUnmounted } from "vue";
import viewDialog1 from "@/components/common/dialog.vue";
import sourceCheckbox from "./components/sourceCheckbox.vue";
import duty from '../home/components/components/duty.vue'
import firDialog from "./components/firDialog.vue";
import { assetsUrl } from "@/components/map/map2d/hook/index";
import { useEventBus } from "@vueuse/core";
import { syqxxLists, fxyhLists, checkboxDatas } from "@/api/mock_tzk.js";
import { viewDetail } from "../../utils/funcNames/tzk";
import { threePopupData1, popupData } from "@/api/mock_tzk.js";
import threePopup from "./components/threePopup.vue";
import formTablePopup from "./components/formTablePopup.vue";
import syqxxThreePopup from "./components/syqxxThreePopup.vue";
import twoTableThreeePopup from "./components/twoTableThreeePopup.vue";
import wzdbPopup from "./components/wzdbPopup.vue";
import selectDialogVue from "./components/selectDialog.vue";
// 水雨情信息一级弹窗
import ylzdFirDialog from "./components/syqxxFirDialogs/ylzd.vue";
import swzdFirDialog from "./components/syqxxFirDialogs/swzd.vue";
import skFirDialog from "./components/syqxxFirDialogs/sk.vue";
import jsdFirDialog from "./components/syqxxFirDialogs/jsd.vue";
import hdzdFirDialog from "./components/syqxxFirDialogs/hdzd.vue";

import { getZbxx, getFxyh, getFxgz, getYjzy } from "@/api/modules/zrzh.js";
import commonFun from "@/utils/common.js";
const { initTree } = commonFun();

const treeConfig = ref({})

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
const fxyhInfo = ref({});
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

const dispatchBus = useEventBus("dispatch");
const dispatchEventListener = function () {
  window.location.href =
    "http://222.212.82.225:20128/map/index_dispatch?id=77e7e6ff4c1d4da8a4b6c0cdcd4f350f";
};
dispatchBus.on(dispatchEventListener);

const closeAllDialog = function () {
  for (let key in dialogFlags.value) {
    dialogFlags.value[key] = false;
  }
  showHouseThreePopup.value = false;
  showSyqxxThreePopup.value = false;
  showThreePopup.value = false;
  showTwoTableThreePopup.value = false;
  showWzdbPopup.value = false;
};

onUnmounted(() => {
  bus.off(eventListener);
  wzdbBus.off(wzdbEventListener);
});

const $mitt = inject("$mitt");

const dutyList = ref([]); // 值班信息列表
const syqList = ref([
  { id: "ylzd", name: "雨量站点" },
  { id: "swzd", name: "水位站点" },
  { id: "sk", name: "水库" },
  { id: "jsd", name: "积水点" },
  { id: "hdzd", name: "河道站点" },
]); // 水雨情信息列表
const qxList = ref([]); // 气象信息列表
const yjzyList = ref([]); // 应急资源列表
const dialogFlags = ref({
  syqxx: false,
  qxxx: false,
  yjzy: false,
  ylzd: false,
  swzd: false,
  sw: false,
  jsd: false,
  hdzd: false,
  yjry: false,
  yjzj: false,
  jydw: false,
  yjwzk: false,
  bncs: false,
  spjk: false,
  select: false,
});
// 雨量站点列表
const yl_list = ref([]);
// 水位站点列表
const swzd_list = ref([]);
const sk_list = ref([]);
// 积水点列表
const jsd_list = ref([]);
// 河道站点列表
const hdzd_list = ref([]);

const qxxx_dialog_info = ref({});
// 获取值班列表
const getDutyList = function () {
  getZbxx().then((res) => {
    dutyList.value = res.data.map((item) => {
      return {
        id: item.id,
        name: item.personalName,
        job: item.roleName,
        phone: item.personalPhone,
      };
    });
  });
};
const getFxyhInfo = function () {
  getFxyh().then((res) => {
    fxyhInfo.value = res.data;
  });
};
// 获取水雨情信息列表
const getSyqList = function () {
  getFxgz().then((res) => {
    let info = res.data;
    yl_list.value = info.ylz.jh.map((item) => {
      return {
        id: item.id,
        name: item.stnm,
        num: "--",
        markerInfo: {
          markerType: "ylzd",
          id: item.id,
          icon: "/images/marker/icon-worn.png",
          lng: item.lgtd,
          lat: item.lttd,
          name: "雨量监测站",
          label: { text: "雨量监测站", font_size: 16 },
          dialogType: "ylzd",
          details: {
            name: item.stnm,
            time: "2023-07-09\t16:20:00",
            h1: "0mm",
            h2: "0mm",
            h3: "0mm",
            h4: "0mm",
            h5: "0mm",
          },
        },
      };
    });
    swzd_list.value = info.swz.jh.map((item) => {
      return {
        id: item.id,
        name: item.stnm,
        num1: "--",
        num2: "--",
        num3: "--",
        markerInfo: {
          markerType: "swzd",
          id: item.id,
          icon: "/images/marker/icon-worn.png",
          lng: item.lgtd,
          lat: item.lttd,
          name: "水位站点",
          label: { text: "水位站点", font_size: 16 },
          dialogType: "swzd",
          details: {
            name: item.stnm,
            type: item.sttp,
            sxmc: item.hnnm,
            address: item.stlc,
          },
        },
      };
    });
    sk_list.value = info.skz.jh.map((item) => {
      return {
        id: item.id,
        name: item.stnm,
        num1: "--",
        num2: "--",
        num3: "--",
        markerInfo: {
          markerType: "sk",
          id: item.id,
          icon: "/images/marker/icon-worn.png",
          lng: item.lgtd,
          lat: item.lttd,
          name: "水库",
          label: { text: "水库", font_size: 16 },
          dialogType: "sk",
          details: {
            dqsw: "123",
            xxsw: "123",
            gsw: "123",
            address: "0mm",
            status: "#25E3D8",
          },
        },
      };
    });
    jsd_list.value = info.jsd.jh.map((item) => {
      return {
        id: item.id,
        name: item.jswz,
        markerInfo: {
          markerType: "jsd",
          id: item.id,
          icon: "/images/marker/icon-worn.png",
          lng: item.lgtd,
          lat: item.lttd,
          name: "积水点信息",
          label: { text: "积水点信息", font_size: 16 },
          dialogType: "jsd",
          details: {
            name: item.jswz,
            info: item.jsyy,
            person: item.zrr,
            phone: item.jsyy,
          },
        },
      };
    });
    hdzd_list.value = info.hdz.jh.map((item) => {
      return {
        id: item.id,
        name: item.stnm,
        address: item.stlc,
        markerInfo: {
          markerType: "hdzd",
          id: item.id,
          icon: "/images/marker/icon-worn.png",
          lng: item.lgtd,
          lat: item.lttd,
          name: "河道站点",
          label: { text: "河道站点", font_size: 16 },
          dialogType: "hdzd",
          details: {
            name: item.stnm,
            type: item.sttp,
            sxmc: item.hnnm,
            address: item.stlc,
          },
        },
      };
    });
  });
};
// 获取气象信息列表
const getQxList = function () {
  setTimeout(() => {
    qxList.value = [
      { id: 1, name: "气象云图", imgUrl: assetsUrl("/natural/qxyt.png") },
      { id: 2, name: "气象雷达图", imgUrl: assetsUrl("/natural/qxldt.png") },
      { id: 3, name: "降水量信息", imgUrl: assetsUrl("/natural/jslxx.png") },
    ];
  }, 50);
};
// 获取应急资源列表
const getYjzyList = function () {
  getYjzy().then((res) => {
    console.log("xxxxxxxxxxx", res);
    let data = res.data;
    yjzyInfo.value = data;
    yjzyList.value = [
      { id: "yjry", name: "应急人员", num: data.yjry.sl },
      { id: "yjzj", name: "应急专家", num: data.yjzj.sl },
      { id: "jydw", name: "救援队伍", num: data.jydw.sl },
      { id: "yjwzk", name: "应急物资库", num: data.yjwzk.sl },
      { id: "bncs", name: "避灾场所", num: data.bncs.sl },
      { id: "spjk", name: "视频监控", num: data.spjk.sl },
    ];
  });
};

const sourceCheckboxRef = ref(null);
onMounted(() => {
  getFxyhInfo();
  getDutyList();
  getSyqList();
  getQxList();
  getYjzyList();
});
let syqxxMarkerList = ref([]); // 判断水雨情信息选中与否
const setMarker = function (type, info = {}) {
  selectedModule.value = type;
  closeAllDialog();
  setTimeout(() => {
    if (type === "syqxx") {
      if (syqxxMarkerList.value.includes(info.id)) {
        let data = syqxxLists[info.id];
        // $mitt.emit("changeMarkerState", {
        //   markerType: data.markerType,
        //   id: data.maekerList[0].id,
        //   show: false,
        // });
        syqxxMarkerList.value = syqxxMarkerList.value.filter(
          (item) => item !== info.id
        );
      } else {
        dialogFlags.value[info.id] = true;
        if (syqxxLists[info.id]) {
          // $mitt.emit("addMarker", syqxxLists[info.id]);
          syqxxMarkerList.value.push(info.id);
        }
      }
    } else if (type === "qxxx") {
      dialogFlags.value[type] = true;
      qxxx_dialog_info.value = info;
    } else if (type === "yjzy") {
      if (info.num === 0) return;
      if (selectedFxyh.value === info.id) {
        selectedFxyh.value = "";
        dialogFlags.value.select = false;
      } else {
        let list = yjzyInfo.value[info.id].jh.map((item) => {
          return {
            ...item,
            label: item.title,
            num: item.count,
            treeId: item.dataType + "--" + item.id,
          };
        });
        selectedFxyh.value = info.id;
        dialogFlags.value.select = true;
        checkBoxPopupData.value = {
          name: info.name,
          listType: yjzyInfo.value[info.id].lx,
          type: yjzyInfo.value[info.id].lx,
          listData: list,
          dialogType: info.id,
        };
      }
    } else if (type === "fxyh") {
      $mitt.emit("clearAll", { ignore: ["geo绘制图层"] });
      $mitt.emit("geoSetCenterTxt", {
        url: assetsUrl("/geoJson/yjqx.json"),
        style: { color: "#fff", font_size: 14 },
      });
      let list = fxyhInfo.value[info.id].jh.map((item) => {
        return {
          ...item,
          label: item.title,
          num: item.count,
          treeId: item.dataType + "--" + item.id,
        };
      });
      if (selectedFxyh.value === info.id) {
        selectedFxyh.value = "";
        dialogFlags.value.select = false;
      } else {
        selectedFxyh.value = info.id;
        checkBoxPopupData.value.name = info.name;
        dialogFlags.value.select = true;
        // $mitt.emit("addMarker", fxyhLists[info.id][0]);
      }
      console.log(fxyhInfo.value, info.id, list);
      if (info.id === "dzyhd") {
        checkBoxPopupData.value = {
          name: "地质灾害隐患点",
          listType: fxyhInfo.value[info.id].lx,
          type: fxyhInfo.value[info.id].lx,
          listData: list,
          dialogType: info.id,
        };
      } else {
        checkBoxPopupData.value = {
          name: info.name,
          listType: fxyhInfo.value[info.id].lx,
          type: fxyhInfo.value[info.id].lx,
          listData: list,
          dialogType: info.id,
        };
      }
    }
  }, 20);
};

const closeDialog = function (type) {
  dialogFlags.value[type] = false;
};
const selectedFxyh = ref("");
const checkBoxPopupData = ref({
  name: "地质灾害隐患点",
  ...checkboxDatas[0],
});

const selectedYjzy = ref([]);
const checkedChange = function (arr) {
  selectedYjzy.value = arr;
  console.log(arr);
};

// 选中的大的模块
const selectedModule = ref("");
watch(selectedModule, function (val, old) {
  console.log(val, old);
  if (old) {
    if (val !== "syqxx" && syqxxMarkerList.value.length > 0) {
      syqxxMarkerList.value = [];
    }
    if (old === "yjzy") {
      console.log(sourceCheckboxRef);
      sourceCheckboxRef.value.clearAll();
      dialogFlags.value.select = false;
    } else {
      $mitt.emit("clearAll", { ignore: ["geo绘制图层"] });
    }
  }
});
</script>

<template>
  <div class="natural_left">
    <duty></duty>
    <ViewBox title="风险隐患">
      <div class="fxyh">
        <div class="line line1">
          <div
            @click="setMarker('fxyh', { id: 'dzyhd', name: '地灾隐患点' })"
            :class="[
              'fxyh_item',
              selectedFxyh === 'dzyhd' ? 'selectedFxyh' : '',
            ]"
          >
            <div class="num">{{ fxyhInfo.dzyhd?.sl || 0 }}</div>
            <div class="word">地灾隐患点</div>
          </div>
          <div class="space"></div>
          <div
            @click="setMarker('fxyh', { id: 'lswjf', name: '历史危旧房' })"
            :class="[
              'fxyh_item',
              selectedFxyh === 'lswjf' ? 'selectedFxyh' : '',
            ]"
          >
            <div class="num">{{ fxyhInfo.lswjf?.sl || 0 }}</div>
            <div class="word">历史危旧房</div>
          </div>
        </div>
        <div class="line line2">
          <div
            @click="setMarker('fxyh', { id: 'dzyfq', name: '地灾易发区' })"
            :class="[
              'fxyh_item',
              selectedFxyh === 'dzyfq' ? 'selectedFxyh' : '',
            ]"
          >
            <div class="num">{{ fxyhInfo.dzyfq?.sl || 0 }}</div>
            <div class="word">地灾易发区</div>
          </div>
          <div class="space"></div>
          <div
            @click="setMarker('fxyh', { id: 'shyhd', name: '森火隐患点' })"
            :class="[
              'fxyh_item',
              selectedFxyh === 'shyhd' ? 'selectedFxyh' : '',
            ]"
          >
            <div class="num">{{ fxyhInfo.shyhd?.sl || 0 }}</div>
            <div class="word">森火隐患点</div>
          </div>
        </div>
        <div class="line line3">
          <div
            @click="setMarker('fxyh', { id: 'shzh', name: '山洪灾害' })"
            :class="[
              'fxyh_item',
              selectedFxyh === 'shzh' ? 'selectedFxyh' : '',
            ]"
          >
            <div class="num">{{ fxyhInfo.shzh?.sl || 0 }}</div>
            <div class="word">山洪灾害</div>
          </div>
          <div class="space"></div>
          <div
            @click="setMarker('fxyh', { id: 'csyld', name: '城市易涝点' })"
            :class="[
              'fxyh_item',
              selectedFxyh === 'csyld' ? 'selectedFxyh' : '',
            ]"
          >
            <div class="num">{{ fxyhInfo.csyld?.sl || 0 }}</div>
            <div class="word">城市易涝点</div>
          </div>
        </div>
        <div class="bg"></div>
      </div>
    </ViewBox>
    <ViewBox title="风险感知">
      <div class="fxgz">
        <div class="syqxx">
          <div class="header">水雨情信息</div>
          <ul class="list">
            <li
              v-for="item in syqList"
              :key="item.id"
              @click="setMarker('syqxx', item)"
              :class="syqxxMarkerList.includes(item.id) ? 'selectedSyqxx' : ''"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
        <div class="qxxx">
          <div class="header">气象信息</div>
          <ul class="list">
            <li
              v-for="item in qxList"
              :key="item.id"
              @click="setMarker('qxxx', item)"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
      </div>
    </ViewBox>
    <ViewBox title="应急资源">
      <div class="yjzy">
        <ul class="yjzy_list">
          <li
            v-for="item in yjzyList"
            :key="item.id"
            @click="setMarker('yjzy', item)"
            :class="selectedYjzy.includes(item.id) ? 'selectedYjzy' : ''"
          >
            <div class="line1">{{ item.num }}</div>
            <div class="line2">{{ item.name }}</div>
          </li>
        </ul>
      </div>
    </ViewBox>
  </div>
  <!-- 气象信息弹框 -->
  <viewDialog1
    class="qxxx_dialog"
    :title="qxxx_dialog_info.name"
    :dialogValue="dialogFlags.qxxx"
    width="970px"
    height="800px"
    @closeHandle="closeDialog('qxxx')"
  >
    <div style="width: 928px; height: 720px">
      <img
        :src="qxxx_dialog_info.imgUrl"
        style="width: 100%; height: 100%"
        alt=""
      />
    </div>
  </viewDialog1>

  <!-- 应急资源多选框 -->
  <sourceCheckbox ref="sourceCheckboxRef" :infos="yjzyInfo"></sourceCheckbox>

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

  <!-- 雨量站点一级弹框 -->
  <ylzdFirDialog
    v-if="dialogFlags.ylzd"
    @closeDialog="closeDialog"
    :list="yl_list"
  ></ylzdFirDialog>
  <!-- 水位站点一级弹框 -->
  <swzdFirDialog
    v-if="dialogFlags.swzd"
    @closeDialog="closeDialog"
    :list="swzd_list"
  ></swzdFirDialog>
  <!-- 水库一级弹窗 -->
  <skFirDialog
    v-if="dialogFlags.sk"
    @closeDialog="closeDialog"
    :list="sk_list"
  ></skFirDialog>
  <!-- 积水点一级弹窗 -->
  <jsdFirDialog
    v-if="dialogFlags.jsd"
    @closeDialog="closeDialog"
    :list="jsd_list"
  ></jsdFirDialog>

  <!-- 河道站点一级弹框 -->
  <hdzdFirDialog
    v-if="dialogFlags.hdzd"
    @closeDialog="closeDialog"
    :list="hdzd_list"
  ></hdzdFirDialog>

  <selectDialogVue
    :name="checkBoxPopupData.name"
    :listData="checkBoxPopupData.listData"
    :listType="checkBoxPopupData.listType"
    @closeDialog="closeDialog"
    :dialogType="checkBoxPopupData.dialogType"
    v-if="dialogFlags.select"
    :treeConfig="treeConfig"
  >
  </selectDialogVue>
</template>

<style lang="less" scoped>
@imgUrl: "@/assets/natural/";

.qxxx_dialog {
  width: auto;
  height: auto;
  transform: translate(calc(960px - 50%), calc(540px - 50%));
}

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

  .duty_list {
    display: flex;
    align-items: center;
    padding-left: 5px;

    &_item {
      width: 132px;
      height: 68px;
      box-sizing: border-box;
      padding-left: 46px;
      position: relative;
      background: url("@{imgUrl}person_bg.png") no-repeat;
      background-size: 100% 100%;

      .job {
        font-size: 16px;
        font-family: Alibaba PuHuiTi-Regular, Alibaba PuHuiTi;
        font-weight: 400;
        color: #c6d1db;
        line-height: 19px;
        margin-top: 11px;
        margin-bottom: 5px;
      }

      .name {
        font-size: 14px;
        font-family: Alibaba PuHuiTi-Regular, Alibaba PuHuiTi;
        font-weight: 400;
        color: #ffffff;
        line-height: 16px;

        img {
          width: 19px;
          height: 19px;
          margin-left: 5px;
        }
      }

      &:not(:first-child) {
        margin-left: 7px;
      }
    }
  }

  .fxyh {
    position: relative;
    height: 176px;
    box-sizing: border-box;
    padding-top: 18px;

    .bg {
      width: 230px;
      height: 177px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
      background: url("@{imgUrl}risk_bg.png") no-repeat;
      background-size: 100% 100%;
      z-index: 2;
    }

    .line {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;

      .num {
        font-size: 18px;
        font-family: Source Han Sans SC-Bold, Source Han Sans SC;
        font-weight: bold;
        color: #ffffff;
        line-height: 21px;
      }

      .word {
        font-size: 15px;
        font-family: Source Han Sans SC-Regular, Source Han Sans SC;
        font-weight: 400;
        color: #d0deee;
        line-height: 18px;
      }
    }

    .line1 {
      .space {
        width: 180px;
      }
    }

    .line2 {
      margin: 11px 0;

      .space {
        width: 243px;
      }
    }

    .line3 {
      margin-top: 20px;

      .space {
        width: 196px;
      }
    }
  }

  .fxgz {
    padding-left: 4px;

    .header {
      font-size: 16px;
      font-family: Alibaba PuHuiTi-Medium, Alibaba PuHuiTi;
      font-weight: 500;
      color: #ffffff;
      line-height: 28px;
      padding-left: 23px;
      background: url("@{imgUrl}point.png") no-repeat;
      background-size: 12px 12px;
      background-position: 0 8px;
      margin-bottom: 10px;
    }

    .list {
      display: flex;
      flex-wrap: wrap;

      li {
        width: 126px;
        height: 42px;
        line-height: 42px;
        margin-bottom: 10px;
        text-align: center;
        background: url("@{imgUrl}bg1.png") no-repeat;
        background-size: 100% 100%;
        margin-left: 16px;
        cursor: pointer;

        &:nth-child(3n + 1) {
          margin-left: 0;
        }

        &:hover {
          background-image: url("@{imgUrl}bg1_active.png");
        }
      }

      .selectedSyqxx {
        background-image: url("@{imgUrl}bg1_active.png");
      }
    }
  }

  .yjzy {
    padding-left: 4px;

    &_list {
      display: flex;
      flex-wrap: wrap;

      li {
        width: 120px;
        height: 80px;
        margin-left: 25px;
        margin-bottom: 12px;
        background: url("@{imgUrl}bg2.png") no-repeat;
        background-size: 100% 100%;
        text-align: center;
        cursor: pointer;

        &:nth-child(3n + 1) {
          margin-left: 0;
        }

        &:hover {
          background-image: url("@{imgUrl}bg2_active.png");
        }

        .line1 {
          font-size: 22px;
          font-family: Source Han Sans SC-Bold, Source Han Sans SC;
          font-weight: bold;
          color: #ffffff;
          line-height: 48px;
        }

        .line2 {
          font-size: 15px;
          font-family: Alibaba PuHuiTi-Regular, Alibaba PuHuiTi;
          font-weight: 400;
          color: #d0deee;
          line-height: 32px;
        }
      }

      .selectedYjzy {
        background-image: url("@{imgUrl}bg2_active.png");
      }
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

.time_select {
  height: 25px;
  background: #006688;
  border-radius: 5px 5px 5px 5px;
  font-size: 16px;
  font-family: Microsoft YaHei-Bold, Microsoft YaHei;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.82);
  cursor: pointer;
  padding: 0 12px;
}

.firDialog_main {
  .searchBox {
    display: flex;
    margin-bottom: 11px;

    .btn {
      width: 90px;
      height: 32px;
      background: linear-gradient(90deg, #0698d7 0%, #1e89fd 100%);
      border-radius: 4px 4px 4px 4px;
      line-height: 32px;
      text-align: center;
      font-size: 16px;
      font-family: Alibaba PuHuiTi-Regular, Alibaba PuHuiTi;
      font-weight: 400;
      color: #ffffff;
      margin-left: 3px;
      flex-shrink: 0;
      cursor: pointer;
    }
  }

  .list_content {
    border: 1px solid rgba(6, 152, 215, 0.5);
    font-size: 16px;
    font-family: Source Han Sans SC-Regular, Source Han Sans SC;
    font-weight: 400;
    color: #ffffff;
    padding-bottom: 4px;
    text-align: center;
    line-height: 24px;

    .list_header {
      display: flex;
      text-align: center;
      margin-top: 12px;
      margin-bottom: 8px;
    }

    .list {
      &_item {
        margin-top: 8px;
        display: flex;
        margin-top: 8px;
        text-align: center;

        .sort {
          width: 32px;
          font-family: Source Han Sans SC-Regular, Source Han Sans SC;
          font-weight: 400;
          color: #ffdf53;
        }
      }
    }

    .line1 {
      margin-left: 10px;
      width: 100px;
      text-align: center;
    }

    .line2,
    .line3,
    .line4 {
      width: 80px;
      text-align: center;
    }
  }

  .btns {
    display: flex;
    justify-content: space-between;

    .btn {
      width: 115px;
      height: 36px;
      border-radius: 4px;
      text-align: center;
      line-height: 36px;

      &1 {
        background-color: #038cfa;
        cursor: pointer;
      }

      &2 {
        background: linear-gradient(90deg, #0698d7 0%, #1e89fd 100%);
        color: #d0deee;
        cursor: pointer;
      }
    }

    select {
      width: 77px;
      height: 36px;
      background: #006688;
      border-radius: 4px;
      font-size: 16px;
      font-family: Alibaba PuHuiTi-Regular, Alibaba PuHuiTi;
      font-weight: 400;
      color: #ffffff;
    }
  }
}

.firDialog_main {
  :deep(.el-input) {
    flex: 1;
    height: 36px;
    background: linear-gradient(90deg, #0698d7 0%, #1e89fd 100%);
    border-radius: 4px 4px 4px 4px;
    border: 1px solid !important;
    border-image: linear-gradient(
        90deg,
        rgba(6, 152, 215, 1),
        rgba(30, 137, 253, 1)
      )
      1 1 !important;
    margin-right: 3px;
    font-size: 16px;
  }
}

.checkbox_popup {
  padding: 0 10px;

  .search_bar {
    display: flex;

    :deep(.el-input) {
      flex: 1;
      height: 36px;
      background: linear-gradient(90deg, #0698d7 0%, #1e89fd 100%);
      border-radius: 4px 4px 4px 4px;
      border: 1px solid !important;
      border-image: linear-gradient(
          90deg,
          rgba(6, 152, 215, 1),
          rgba(30, 137, 253, 1)
        )
        1 1 !important;
      margin-right: 3px;
      font-size: 16px;
    }

    .button {
      width: 97px;
      height: 36px;
      background: linear-gradient(90deg, #0698d7 0%, #1e89fd 100%) !important;
      border-radius: 4px 4px 4px 4px;
      font-size: 16px;
    }
  }

  :deep(.el-tree) {
    margin-top: 10px;
    background: transparent;

    // 隐藏 展开收起icon
    .el-tree-node__expand-icon {
      display: none;
    }

    .el-checkbox__inner {
      width: 20px;
      height: 20px;
      border: 1px solid #0075a4;
      border-radius: 0;
      background: transparent;
    }

    .el-checkbox__input.is-checked .el-checkbox__inner {
      border: none;
      background: url("@/assets/natural/check_Property.png") center/99% 99%
        no-repeat;

      &::after {
        display: none;
      }
    }

    .el-tree-node {
      font-size: 16px;
      font-family: Source Han Sans SC-Regular, Source Han Sans SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 19px;

      .yellow {
        color: #ffdf53;
        margin-left: 10px;
      }
    }

    .el-tree-node__content {
      margin: 4px 0;
    }

    .el-tree-node:focus > .el-tree-node__content,
    .el-tree-node__content:hover {
      background-color: RGBA(10, 91, 131, 0.3);
    }
  }
}

.fxyh_item {
  cursor: pointer;
}

.selectedFxyh {
  .num,
  .word {
    color: #ffdf53 !important;
  }
}

.red {
  color: #ff0000;
}
.yellow {
  color: yellow;
}
.blue {
  color: burlywood;
}
.green {
  color: green;
}
</style>
