<script setup>
import ViewBox from "@/components/common/view-box.vue";
import { ref, inject, onMounted, computed } from "vue";
import { getFxgz } from "@/api/modules/zrzh.js";
import { getYjjcxx } from "@/api/modules/home.js";
import ylzdFirDialog from "@/views/natural/components/syqxxFirDialogs/ylzd.vue";
import hdzdFirDialog from "@/views/natural/components/syqxxFirDialogs/hdzd.vue";
import skFirDialog from "@/views/natural/components/syqxxFirDialogs/sk.vue";
import dzjc from "./dialogs/dzjc.vue";
import aqscjc from "./dialogs/aqscjc.vue";
import lhjc from "./dialogs/lhjc.vue";
import { assetsUrl } from "@/components/map/map2d/hook/index";
const $mitt = inject("$mitt");
const currentWarningType = ref("");
// 监测预警
const warning_type = ref([
  { name: "雨情监测", type: "ylz", num: "0" },
  { name: "河道监测", type: "hdz", num: "0" },
  { name: "地质监测", type: "dzjc", num: "0" },
  { name: "水库监测", type: "skz", num: "0" },
  { name: "安全生产监测", type: "aqscjc", num: "0" },
  { name: "林火监测", type: "lhjc", num: "0" },
]);
const dataList = ref([]);
const titleInfo = ref("");
const getDatas = function () {
  getYjjcxx().then((res) => {
    titleInfo.value = res.data.zxyj[0]?.contentText;
    const list = res.data.jcxx;
    for (const info of warning_type.value) {
      for (const data of list) {
        if (info.name === data.mc) {
          info.num = data.sl;
          info.markerList = data.jh;
        }
      }
    }
  });
};
const getDataList = function (item) {
  let list = [];
  if (item.type === "ylz") {
    list = item.markerList.map((item) => {
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
  } else if (item.type === "hdz") {
    list = item.markerList.map((item) => {
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
  } else if (item.type === "dzjc") {
    list = item.markerList.map((item) => {
      return {
        id: item.id,
        disasterSite: item.disasterSite,
        disasterType: item.disasterType,
        markerInfo: {
          markerType: "dzjc",
          id: item.id,
          icon: "/images/marker/icon-worn.png",
          lng: item.mapX,
          lat: item.mapY,
          name: "地质监测",
          label: { text: "地质监测", font_size: 16 },
          dialogType: "dzjc",
          details: {
            disasterSite: item.disasterSite,
            disasterType: item.disasterType,
          },
        },
      };
    });
  } else if (item.type === "skz") {
    list = item.markerList.map((item) => {
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
  } else if (item.type === "aqscjc") {
    list = item.markerList.map((item) => {
      return {
        id: item.id,
        equipmentName: item.equipmentName,
        orgName: item.orgName,
        surveyObject: item.surveyObject,
        markerInfo: {
          markerType: "aqscjc",
          id: item.id,
          icon: "/images/marker/icon-worn.png",
          lng: item.mapX,
          lat: item.mapY,
          name: "安全生产监测",
          label: { text: "安全生产监测", font_size: 16 },
          dialogType: "aqscjc",
          details: {
            equipmentName: item.equipmentName,
            orgName: item.orgName,
            surveyObject: item.surveyObject,
            location: item.location,
          },
        },
      };
    });
  } else if (item.type === "lhjc") {
    list = item.markerList.map((item) => {
      return {
        id: item.id,
        areaName: item.areaName,
        areaMeasue: item.areaMeasue,
        typeName: item.typeName,
        markerInfo: {
          markerType: "lhjc",
          id: item.id,
          icon: "/images/marker/icon-worn.png",
          lng: item.mapX,
          lat: item.mapY,
          name: "林火监测",
          label: { text: "林火监测", font_size: 16 },
          dialogType: "lhjc",
          details: {
            areaName: item.areaName,
            areaMeasue: item.areaMeasue,
            typeName: item.typeName,
            areaAddr: item.areaAddr,
            areaPerson: item.areaPerson,
            phone: item.areaPhone,
          },
        },
      };
    });
  }
  dataList.value = list;
};
const checkWarningType = (item) => {
  $mitt.emit("hideAllMarker");
  getDataList(item);
  if (currentWarningType.value == item.type) {
    currentWarningType.value = "";
  } else {
    currentWarningType.value = item.type;
  }
};
const closeDialog = function () {
  currentWarningType.value = "";
  $mitt.emit("hideAllMarker");
};
let areaFlag = false;
const setMap = function () {
  // //导入包含行政区划的geo数据 进行绘制
  if (!areaFlag) {
    areaFlag = true;
    let mittLineData = {
      url: assetsUrl("/geoJson/jx.json"),
      geoType: "jxArea",
      mask: false,
      type: "mask",
      style: {
        fillColor: "#CD8F55",
      },
    };
    $mitt.emit("drawGeoGraph", mittLineData);
  }else{
    areaFlag = false;
    $mitt.emit("clearGeoGraph","jxArea")
  }
};
onMounted(() => {
  getDatas();
});
</script>
<template>
  <ViewBox title="预警监测信息">
    <div class="warning_monitoring">
      <div class="warning_info">
        <img
          src="@/assets/home/mai.png"
          style="height: 100%; cursor: pointer"
          @click="setMap"
        />
        <!-- <p class="info_box">
          {{ titleInfo }}
        </p> -->
      </div>
      <div class="monitor_box">
        <div
          @click="checkWarningType(item)"
          class="monitor_item"
          v-for="(item, index) in warning_type"
          :key="index"
          :class="currentWarningType == item.type ? 'active' : ''"
        >
          <b class="num">{{ item.num }}</b>
          <span class="type">{{ item.name }}</span>
        </div>
      </div>
      <div class="monitor_list">
        <span class="station">XXXX站点</span>
        <span class="date">07-31 10:00:25</span>
        <span class="info">监测信息：XXXXXXXXXXXXXX</span>
      </div>
    </div>
  </ViewBox>
  <!-- 雨量站点一级弹框 -->
  <ylzdFirDialog
    v-if="currentWarningType === 'ylz'"
    @closeDialog="closeDialog"
    :list="dataList"
    style="right: 460px; left: unset"
  ></ylzdFirDialog>
  <!-- 河道站点一级弹框 -->
  <hdzdFirDialog
    v-if="currentWarningType === 'hdz'"
    @closeDialog="closeDialog"
    :list="dataList"
    style="right: 460px; left: unset"
  ></hdzdFirDialog>
  <!-- 水库一级弹窗 -->
  <skFirDialog
    v-if="currentWarningType === 'skz'"
    @closeDialog="closeDialog"
    :list="dataList"
    style="right: 460px; left: unset"
  ></skFirDialog>
  <dzjc
    v-if="currentWarningType === 'dzjc'"
    @closeDialog="closeDialog"
    :list="dataList"
    style="right: 460px; left: unset"
  ></dzjc>
  <aqscjc
    v-if="currentWarningType === 'aqscjc'"
    @closeDialog="closeDialog"
    :list="dataList"
    style="right: 460px; left: unset"
  ></aqscjc>
  <lhjc
    v-if="currentWarningType === 'lhjc'"
    @closeDialog="closeDialog"
    :list="dataList"
    style="right: 460px; left: unset"
  ></lhjc>
</template>
<style lang="scss" scoped>
.warning_monitoring {
  height: 323px;
  padding: 8px 10px 0 20px;

  .warning_info {
    height: 90px;
    padding: 8px 10px;
    background: rgba(9, 65, 93, 0.61);
    border: 1px solid;
    border-image: linear-gradient(
        90deg,
        rgba(0, 96, 128, 1),
        rgba(0, 96, 128, 0),
        rgba(0, 96, 128, 0.34)
      )
      1 1;

    font-size: 14px;
    font-family: Alibaba PuHuiTi-Medium, Alibaba PuHuiTi;
    font-weight: 500;
    color: #ffffff;
    line-height: 24px;
    margin-bottom: 12px;

    .info_box {
      overflow: auto;
      height: 74px;
      // text-overflow: -o-ellipsis-lastline;
      // overflow: hidden;
      // text-overflow: ellipsis;
      // display: -webkit-box;
      // line-clamp: 3;
      // -webkit-line-clamp: 3;
      // -webkit-box-orient: vertical;
    }
  }

  .monitor_box {
    display: flex;
    flex-wrap: wrap;

    .monitor_item {
      margin: 0 40px 12px 0;

      &:nth-child(3n) {
        margin-right: 0;
      }

      width: calc((100% - 80px) / 3);
      height: 75px;
      background: url("@/assets/home/monitor_bg.png") center/73px 70px no-repeat;
      cursor: pointer;

      &.active {
        background: url("@/assets/home/monitor_bg_active.png") center/73px 70px
          no-repeat;
        box-shadow: inset 0px 0px 43px 0px rgba(15, 169, 175, 0.46),
          0px 0px 92px 0px rgba(0, 44, 92, 0.16),
          0px 4px 15px 0px rgba(0, 9, 0, 0.45);
        border-radius: 8px 8px 8px 8px;
        border: 1px solid rgba(56, 247, 255, 0.7);
      }

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .num {
        font-size: 25px;
        font-family: Source Han Sans SC-Bold, Source Han Sans SC;
        font-weight: bold;
        color: #ffe871;
        line-height: 36px;
      }

      .type {
        line-height: 21px;
        font-size: 15px;
        font-family: Source Han Sans SC-Regular, Source Han Sans SC;
        font-weight: 400;
        color: #ffffff;
      }
    }
  }

  .monitor_list {
    height: 38px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    font-size: 14px;
    font-family: Source Han Sans SC-Regular, Source Han Sans SC;
    font-weight: 400;
    color: #fff;

    background: rgba(9, 65, 93, 0.61);
    border: 1px solid;
    border-image: linear-gradient(
        90deg,
        rgba(0, 96, 128, 1),
        rgba(0, 96, 128, 0),
        rgba(0, 96, 128, 0.34)
      )
      1 1;

    .date {
      margin: 0 15px;
    }

    > span {
      width: calc((100% - 30px) / 3);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
