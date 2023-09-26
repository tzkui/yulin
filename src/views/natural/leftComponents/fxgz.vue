<script setup>
import { computed, onMounted, ref, inject } from "vue";
import { assetsUrl } from "@/components/map/map2d/hook/index";

import qxxxDialog from "@/components/common/dialog.vue";

// 水雨情信息一级弹窗
import ylzdFirDialog from "../components/syqxxFirDialogs/ylzd.vue";
import swzdFirDialog from "../components/syqxxFirDialogs/swzd.vue";
import skFirDialog from "../components/syqxxFirDialogs/sk.vue";
import jsdFirDialog from "../components/syqxxFirDialogs/jsd.vue";
import hdzdFirDialog from "../components/syqxxFirDialogs/hdzd.vue";

import { getFxgz } from "@/api/modules/zrzh.js";

const $mitt = inject("$mitt");

const emits = defineEmits(['closeAll'])
// 水雨情信息列表
const syqList = ref([
  { id: "ylzd", name: "雨量站点" },
  { id: "swzd", name: "水位站点" },
  { id: "sk", name: "水库" },
  { id: "jsd", name: "积水点" },
  { id: "hdzd", name: "河道站点" },
]);
const qxList = ref([
  { id: "qxyt", name: "气象云图", imgUrl: assetsUrl("/natural/qxyt.png") },
  { id: "qxldt", name: "气象雷达图", imgUrl: assetsUrl("/natural/qxldt.png") },
  { id: "jslxx", name: "降水量信息", imgUrl: assetsUrl("/natural/jslxx.png") },
]);
const closeDialog = function () {
  clearAllMarker();
  selectedItem.value = "";
};

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

const selectedItem = ref("");
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
          icon: "/images/marker/icon_ylzd.png",
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
          icon: "/images/marker/icon_swzd.png",
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
        name: item.name,
        num1: "--",
        num2: "--",
        num3: "--",
        markerInfo: {
          markerType: "sk",
          id: item.id,
          icon: "/images/marker/icon_sk.png",
          lng: item.mapX,
          lat: item.mapY,
          name: "水库",
          label: { text: "水库", font_size: 16 },
          dialogType: "sk",
          details: {
            dqsw: "123",
            xxsw: "123",
            gsw: "123",
            address: "0mm",
            status: "#25E3D8",
            name: item.name
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
          icon: "/images/marker/icon_jsd.png",
          lng: item.mapX,
          lat: item.mapY,
          name: "积水点信息",
          label: { text: "积水点信息", font_size: 16 },
          dialogType: "jsd",
          details: {
            name: item.jswz,
            info: item.jsyy,
            person: item.zrr,
            phone: item.lxdh,
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
          icon: "/images/marker/icon_hdzd.png",
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
const clearAllMarker = function () {
  $mitt.emit("hideAllMarker");
};
const openDialog = function (info, flag) {
  if(info.id===selectedItem.value){
    clearAllMarker();
    selectedItem.value = ""
    return;
  }
  emits("closeAll")
  selectedItem.value = info.id;
  // 如果是气象信息
  if (flag) {
    qxxx_dialog_info.value = {
      name: info.name,
      imgUrl: info.imgUrl,
    };
  }
};
const showQxxxDialog = computed(() => {
  const arr = ["qxyt", "qxldt", "jslxx"];
  return arr.includes(selectedItem.value);
});
defineExpose({
  closeDialog
})
onMounted(() => {
  getSyqList();
});
</script>

<template>
  <ViewBox title="风险感知">
    <div class="fxgz">
      <div class="syqxx">
        <div class="header">水雨情信息</div>
        <ul class="list">
          <li
            v-for="item in syqList"
            :key="item.id"
            @click="openDialog(item)"
            :class="selectedItem === item.id ? 'selectedSyqxx' : ''"
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
            :class="selectedItem === item.id ? 'selectedSyqxx' : ''"
            @click="openDialog(item, true)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
  </ViewBox>
  <!-- 雨量站点一级弹框 -->
  <ylzdFirDialog
    v-if="selectedItem === 'ylzd'"
    @closeDialog="closeDialog"
    :list="yl_list"
  ></ylzdFirDialog>
  <!-- 水位站点一级弹框 -->
  <swzdFirDialog
    v-if="selectedItem === 'swzd'"
    @closeDialog="closeDialog"
    :list="swzd_list"
  ></swzdFirDialog>
  <!-- 水库一级弹窗 -->
  <skFirDialog
    v-if="selectedItem === 'sk'"
    @closeDialog="closeDialog"
    :list="sk_list"
  ></skFirDialog>
  <!-- 积水点一级弹窗 -->
  <jsdFirDialog
    v-if="selectedItem === 'jsd'"
    @closeDialog="closeDialog"
    :list="jsd_list"
  ></jsdFirDialog>

  <!-- 河道站点一级弹框 -->
  <hdzdFirDialog
    v-if="selectedItem === 'hdzd'"
    @closeDialog="closeDialog"
    :list="hdzd_list"
  ></hdzdFirDialog>

  <!-- 气象信息弹框 -->
  <qxxxDialog
    class="qxxx_dialog"
    :title="qxxx_dialog_info.name"
    :dialogValue="showQxxxDialog"
    width="970px"
    height="800px"
    @closeHandle="closeDialog"
  >
    <div style="width: 928px; height: 720px">
      <img
        :src="qxxx_dialog_info.imgUrl"
        style="width: 100%; height: 100%"
        alt=""
      />
    </div>
  </qxxxDialog>
</template>

<style lang="less" scoped>
@imgUrl: "@/assets/natural/";
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
  .qxxx_dialog {
    width: auto;
    height: auto;
    transform: translate(calc(960px - 50%), calc(540px - 50%));
  }
</style>
