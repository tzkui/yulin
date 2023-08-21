<script setup>
import ViewBox from "@/components/common/view-box.vue";
import { ref, inject, onMounted, computed } from "vue";
import { getFxgz } from "@/api/modules/zrzh.js";
import ylzdFirDialog from "@/views/natural/components/syqxxFirDialogs/ylzd.vue";
import hdzdFirDialog from "@/views/natural/components/syqxxFirDialogs/hdzd.vue";
import skFirDialog from "@/views/natural/components/syqxxFirDialogs/sk.vue";

const $mitt = inject("$mitt");
const currentWarningType = ref("");
const warning_detail = ref();
// 监测预警
const warning_type = ref([
  { name: "雨情监测", type: "ylz", num: "0" },
  { name: "河道监测", type: "hdz", num: "0" },
  { name: "地质监测", type: "dzjc", num: "0" },
  { name: "水库监测", type: "skz", num: "0" },
  { name: "安全生产监测", type: "aqscjc", num: "0" },
  { name: "林火监测", type: "lhjc", num: "0" },
]);
const datas = {
  ylz: {},
  hdz: {},
  skz: {},
};
const dataList = computed(()=>{
  return datas[currentWarningType.value]?.jh || []
})
const getDatas = function () {
  getFxgz().then((res) => {
    for (let key in datas) {
      datas[key] = res.data[key];
    }
    for (const info of warning_type.value) {
      if (datas[info.type]) {
        info.num = datas[info.type].sl;
      }
    }
  });
};
const checkWarningType = (item) => {
  // console.log('选择监测类型=====>', item);
  // if (item.num == 0) return;
  if (currentWarningType.value == item.type) {
    currentWarningType.value = "";
    // $mitt.emit("changeMarkerState", { markerType: item.type, show: false });
  } else {
    currentWarningType.value = item.type;
    console.log("xxxxx:", currentWarningType)
    // warning_detail.value = getDetail(item);
  }
};
const getDetail = (item) => {
  let object = {};
  object.type = item.type;
  object.name = item.name;
  switch (item.type) {
    case "yqjc":
      object.column = [{ label: "排名" }, { label: "名称" }, { label: "雨量" }];
      object.data = [
        {
          id: "test_" + item.type,
          name: "雨量监测站点",
          num: "--",
          markerInfo: {
            markerType: item.type,
            id: "test_" + item.type,
            icon: "/images/marker/icon-worn.png",
            lng: 109.00449,
            lat: 37.95844,
            name: "雨量监测站",
            label: { text: "雨量监测站", font_size: 16 },
            dialogType: "ylzd",
            details: {
              name: "榆林雨量监测站",
              time: "2023-07-09\t16:20:00",
              h1: "0mm",
              h2: "0mm",
              h3: "0mm",
              h4: "0mm",
              h5: "0mm",
            },
          },
        },
      ];
      break;
    case "hdjc":
      object.column = [];
      object.data = [
        {
          id: "test_" + item.type,
          name: "无定河一号监测站",
          address: "榆林市佳县峪口乡任家畔村20号",
          markerInfo: {
            markerType: item.type,
            id: "test_" + item.type,
            icon: "/images/marker/icon-worn.png",
            lng: 110.00449,
            lat: 37.04025,
            name: "河道监测站",
            label: { text: "河道监测站", font_size: 16 },
            dialogType: "hdzd",
            details: {
              name: "榆林河道监测站",
              time: "2023-07-09\t16:20:00",
              h1: "0mm",
              h2: "0mm",
              h3: "0mm",
              h4: "0mm",
              h5: "0mm",
            },
          },
        },
      ];
      break;
    case "dzjc":
    case "aqscjc":
    case "lhjc":
      object.column = [
        { label: "序号" },
        { label: "监测点" },
        { label: "数量" },
      ];
      object.data = [
        {
          id: "test_" + item.type,
          name: "葛富村1号崩塌",
          num: "2",
          markerInfo: {
            markerType: item.type,
            id: "test_" + item.type,
            icon: "/images/marker/icon-worn.png",
            lng: 109.27378,
            lat: 37.95844,
            name: "监测站",
            label: { text: item.name + "站", font_size: 16 },
            dialogType: "ylzd",
            details: {
              name: "榆林监测站",
              time: "2023-07-09\t16:20:00",
              h1: "0mm",
              h2: "0mm",
              h3: "0mm",
              h4: "0mm",
              h5: "0mm",
            },
          },
        },
      ];
      break;
    case "skjc":
      object.column = [];
      object.data = [
        {
          id: "test_" + item.type,
          name: "寺沟水库",
          num1: "123",
          num2: "123",
          num3: "123",
          markerInfo: {
            markerType: item.type,
            id: "test_" + item.type,
            icon: "/images/marker/icon-worn.png",
            lng: 107.86835,
            lat: 37.87737,
            name: "水库",
            label: { text: "水库", font_size: 16 },
            dialogType: "hdzd",
            details: {
              name: "榆林水库",
              time: "2023-07-09\t16:20:00",
              h1: "0mm",
              h2: "0mm",
              h3: "0mm",
              h4: "0mm",
              h5: "0mm",
            },
          },
        },
      ];
    default:
      () => {};
      break;
  }
  return object;
};
const closeDialog = function(){
  currentWarningType.value = ""
}
onMounted(() => {
  getDatas();
});
</script>
<template>
  <ViewBox title="预警监测信息">
    <div class="warning_monitoring">
      <div class="warning_info">
        <p class="info_box">
          5月26日11时，陕西省气象台发布暴雨蓝色预警。受高空槽和低层切变线共同影响，预计5月26日20时至27日20时榆林东部局地、延安中东部、关中东部、商洛西北部、汉中东部，安排人员前往
        </p>
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
    style="right: 460px;left: unset;"
  ></ylzdFirDialog>
  <!-- 河道站点一级弹框 -->
  <hdzdFirDialog
    v-if="currentWarningType === 'hdz'"
    @closeDialog="closeDialog"
    :list="dataList"
    style="right: 460px;left: unset;"
  ></hdzdFirDialog>
  <!-- 水库一级弹窗 -->
  <skFirDialog
    v-if="currentWarningType === 'skz'"
    @closeDialog="closeDialog"
    :list="dataList"
    style="right: 460px;left: unset;"
  ></skFirDialog>
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
