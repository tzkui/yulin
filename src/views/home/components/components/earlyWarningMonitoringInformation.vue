<script setup>
import ViewBox from "@/components/common/view-box.vue";
import { ref, inject, onMounted, onUnmounted } from "vue";
import { getYjjcxx, getQxyj } from "@/api/modules/home.js";
import ylzdFirDialog from "@/views/natural/components/syqxxFirDialogs/ylzd.vue";
import hdzdFirDialog from "@/views/natural/components/syqxxFirDialogs/hdzd.vue";
import skFirDialog from "@/views/natural/components/syqxxFirDialogs/sk.vue";
import dzjc from "./dialogs/dzjc.vue";
import aqscjc from "./dialogs/aqscjc.vue";
import lhjc from "./dialogs/lhjc.vue";
import { assetsUrl } from "@/components/map/map2d/hook/index";
import moment from "moment";

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
const bottomList = ref([
  {
    id: 1,
    name: "八里河水位监测站",
    time: "07-31 10:00:25",
    info: "八里河监测站水位接近最大流速",
  },
  {
    id: 2,
    name: "八里河水位监测站",
    time: "07-31 10:00:25",
    info: "八里河监测站水位接近最大流速",
  },
  {
    id: 3,
    name: "八里河水位监测站",
    time: "07-31 10:00:25",
    info: "八里河监测站水位接近最大流速",
  },
]);
const titleInfo = ref("");
const yjDetail = ref({
  img: "../images/qx_icon/2_1.png",
  name: "高温橙色预警信号",
  time1: "2023.09.04",
  time2: "15:32",
  areas: ["佳县"],
});
const citys = [
  "榆阳区",
  "横山区",
  "神木市",
  "府谷县",
  "靖边县",
  "定边县",
  "绥德县",
  "米脂县",
  "佳县",
  "吴堡县",
  "清涧县",
  "子洲县",
];
const getQxyjDetail = function () {
  getQxyj().then((res) => {
    console.log("包含城市：", res);
    let data = res.data[0];
    let areas = [];
    citys.forEach((item) => {
      if (data.alarmContent.includes(item)) {
        areas.push(item);
      }
    });
    console.log("包含城市：", areas);
    let time1 = data.alarmTime.split(" ")[0];
    let time2 = data.alarmTime.split(" ")[1].slice(0, 5);
    let name = data.alarmName + data.alarmColor + "预警";
    console.log("xxxxxxxxx",name)
    const arr1 = [
      0,
      1,
      "暴雨",
      "暴雪",
      "寒潮",
      "大风",
      "沙尘暴",
      "高温",
      "干旱",
      "雷电",
      "冰雹",
      "霜冻",
      "大雾",
      "霾",
      "道路结冰",
    ];
    const arr2 = [0, "蓝色", "黄色", "橙色", "红色"];
    let imgName =
      arr1.indexOf(data.alarmType) + "_" + arr2.indexOf(data.alarmColor);
      console.log("xxxxxx",imgName)
    yjDetail.value = {
      alarmColor: data.alarmColor,
      img: "../images/qx_icon/" + imgName + ".png",
      name: name,
      time1: time1,
      time2: time2,
      areas: areas,
    };
  });
};
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
  getQxyjDetail();
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
  } else if (item.type === "hdz") {
    list = item.markerList.map((item) => {
      return {
        id: item.id,
        name: item.stcd,
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
            name: item.stcd,
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
        yhdmc: item.yhdmc,
        yhdlx: item.yhdlx,
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
            yhdmc: item.yhdmc,
            yhdlx: item.yhdlx,
            dd: item.dd,
            jcfzr: item.jcfzr,
            jcfzrlxdh: item.jcfzrlxdh,
          },
        },
      };
    });
  } else if (item.type === "skz") {
    list = item.markerList.map((item) => {
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
          icon: "/images/marker/icon_fanghu.png",
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
          icon: "/images/marker/icon_shyhd.png",
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
  console.log("zzz,",item)
  if(item.name==="地质监测"){
    dataList.value = item.markerList
  }else{
    getDataList(item);
    dataList.value.forEach(item=>{
      $mitt.emit("addMarker", item.markerInfo)
    })
  }
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
const jsonUrls = {
  榆阳区: "yyq",
  横山区: "hsq",
  神木市: "sms",
  府谷县: "fgx",
  靖边县: "jbx",
  定边县: "dbx",
  绥德县: "sdx",
  米脂县: "mzx",
  佳县: "jx",
  吴堡县: "wbx",
  清涧县: "qjx",
  子洲县: "zzx",
};
const maskColors = {
  "蓝色" : "#68E1FC",
  "黄色": "#FCCB12",
  "橙色": "#EF7C12",
  "红色": "#D11216"
}
const setMap = function () {
  console.log("xxxxxxx",yjDetail.value,yjDetail.value.alarmColor)
  // //导入包含行政区划的geo数据 进行绘制
  let list = yjDetail.value.areas;
  if (!areaFlag) {
    areaFlag = true;
    list.forEach((item) => {
      $mitt.emit("drawGeoGraph", {
        url: assetsUrl(`/geoJson/${jsonUrls[item]}.json`),
        geoType: jsonUrls[item],
        mask: false,
        type: "mask",
        style: {
          fillColor: maskColors[yjDetail.value.alarmColor],
        },
      });
    });
  } else {
    areaFlag = false;
    list.forEach((item) => {
      $mitt.emit("clearGeoGraph", jsonUrls[item]);
    });
  }
};
const audioControlFun = function (info = {}) {
  if (info.order === "openHomeYjjcxx") {
    let type = info.type;
    for(const typeInfo of warning_type.value){
      if(typeInfo.type === type){
        checkWarningType(typeInfo)
      }
    }
  }
};
onMounted(() => {
  getDatas();
  $mitt.on("audioControl", audioControlFun)
});
onUnmounted(() => {
  $mitt.off("audioControl", audioControlFun);
});
</script>
<template>
  <ViewBox title="预警监测信息">
    <div class="warning_monitoring">
      <div class="warning_info">
        <img
          :src="yjDetail.img"
          style="height: 100%; cursor: pointer"
          @click="setMap"
        />
        <div style="margin-left: 40px">
          <div class="row">
            <div class="warning_type orange">{{ yjDetail.name }}</div>
            <div>{{ yjDetail.time1 }}</div>
          </div>
          <div class="row">
            <div class="area" :title="yjDetail.areas.join('、')">
              影响区域：{{ yjDetail.areas.join("、") }}
            </div>
            <div>{{ yjDetail.time2 }}</div>
          </div>
        </div>
      </div>
      <div class="monitor_box">
        <div
          @click="checkWarningType(item)"
          class="monitor_item"
          v-for="(item, index) in warning_type"
          :key="index"
          :class="currentWarningType == item.type ? 'active' : ''"
        >
          <div class="type">
            {{ item.name === "安全生产监测" ? "生产监测" : item.name }}
          </div>
          <div class="num">{{ item.num }}</div>
        </div>
      </div>
      <div style="height: 38px; overflow-y: hidden">
        <vue3-seamless-scroll
          class="scroll_box"
          :list="bottomList"
          hover
          :step="0.5"
        >
          <li class="monitor_list" v-for="item in bottomList" :key="item.id">
            <span class="station">{{ item.name }}</span>
            <span class="date">{{ item.time }}</span>
            <span class="info" :title="item.info"
              >监测信息：{{ item.info }}</span
            >
          </li>
        </vue3-seamless-scroll>
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
    :listData="dataList"
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
    display: flex;
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
    .row {
      display: flex;
      .warning_type {
        width: 180px;
        font-size: 18px;
        margin-bottom: 18px;
      }
      .orange {
        color: #fa7d2d;
      }
      .area {
        width: 180px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  .monitor_box {
    display: flex;
    flex-wrap: wrap;

    .monitor_item {
      width: 130px;
      box-sizing: border-box;
      padding-left: 64px;
      margin-right: 10px;
      margin-bottom: 20px;

      &:nth-child(3n) {
        margin-right: 0;
      }

      height: 56px;
      background: left top no-repeat;
      cursor: pointer;

      // &.active {
      //   box-shadow: inset 0px 0px 43px 0px rgba(15, 169, 175, 0.46),
      //     0px 0px 92px 0px rgba(0, 44, 92, 0.16),
      //     0px 4px 15px 0px rgba(0, 9, 0, 0.45);
      //   border-radius: 8px 8px 8px 8px;
      //   border: 1px solid rgba(56, 247, 255, 0.7);
      // }

      @for $i from 1 through 6 {
        &:nth-child(#{$i}) {
          background-image: url(@/assets/home/yj#{$i}.png);
        }
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
