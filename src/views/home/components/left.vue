<template>
  <div class="left">
    <duty></duty>
    <information></information>
    <resource
      @openDialog="openDialog"
      @closeAllDialog="closeAllDialog"
    ></resource>
    <enterpriseEcharts></enterpriseEcharts>
    <!-- 图例 -->
    <treeCheck ref="treeCheckRef"></treeCheck>

    <!-- 列表弹框 树形多选   应急资源 企业分布 -->
    <selectDialogVue
      :name="checkBoxPopupData.name"
      :listData="checkBoxPopupData.listData"
      @closeDialog="closeDialog"
      @setMarker="setMarker"
      @removeMarker="removeMarker"
      v-if="dialogFlags.select"
    >
    </selectDialogVue>
  </div>
</template>

<script setup>
import treeCheck from "./treeCheck.vue";
import { ref, inject } from "vue";
import { icon_config } from "@/config/common.js";
const $mitt = inject("$mitt");
const emit = defineEmits(["openDialog"]);
import { useEventBus } from "@vueuse/core";
// 获取企业分布的相关的数据
import { getQyfbTree } from "@/api/modules/home.js";

import duty from "./components/duty.vue";
import information from "./components/information.vue";
import resource from "./components/resource.vue";
import enterpriseEcharts from "./components/enterpriseEcharts.vue";

import selectDialogVue from "./selectDialog.vue";
const dialogFlags = ref({
  select: false,
});
const closeAllDialog = function () {
  for (let key in dialogFlags.value) {
    dialogFlags.value[key] = false;
  }
};
// 弹框 列表多选
let checkBoxPopupData = ref({
  name: "救援队伍",
  listData: [
    {
      label: "榆林市",
      typeName: "榆林市",
      num: "415",
      id: "0",
      children: [
        { label: "榆阳区", typeName: "榆阳区", num: "41", id: "1" },
        { label: "横山区", typeName: "横山区", num: "34", id: "2" },
        { label: "神木县", typeName: "神木县", num: "34", id: "3" },
        { label: "府谷县", typeName: "府谷县", num: "34", id: "4" },
        { label: "靖边县", typeName: "靖边县", num: "34", id: "5" },
        { label: "定边县", typeName: "定边县", num: "34", id: "6" },
        { label: "绥德县", typeName: "绥德县", num: "34", id: "7" },
        { label: "米脂县", typeName: "米脂县", num: "34", id: "8" },
        { label: "佳县", typeName: "佳县", num: "34", id: "9" },
        { label: "吴堡县", typeName: "吴堡县", num: "34", id: "10" },
        { label: "清涧县", typeName: "清涧县", num: "34", id: "11" },
        { label: "子洲县", typeName: "子洲县", num: "34", id: "12" },
      ],
    },
  ],
});
let currentMarkerTypeData = ref({});
const closeDialog = function (type) {
  dialogFlags.value[type] = false;
};
const openDialog = (item, index) => {
  // console.log('item========>', item);
  if (item.type == "sphs") {
    emit("openDialog", "video_conference");
    return;
  } else if (item.type == "spjk") {
    emit("openDialog", "video");
    return;
  }
  checkBoxPopupData.value.name = item.name;
  dialogFlags.value.select = true;

  currentMarkerTypeData.value.item = item;
  currentMarkerTypeData.value.index = index;
  let dataArr = [];

  let needCirculate = [
    "yjry",
    "yjzj",
    "yjck",
    "bncs",
    "yjzb",
    "yjdb",
    "wrj",
    "wxdh",
    "zdtx",
  ];
  if (item.type == "yjdw") {
    dataArr = [
      {
        label: "榆林市",
        typeName: "榆林市",
        num: "45",
        id: "0",
        children: [
          {
            label: "消防救援队伍",
            typeName: "消防救援队伍",
            num: "41",
            id: "1",
            pid: "0",
          },
          {
            label: "救援队伍",
            typeName: "救援队伍",
            num: "34",
            id: "2",
            pid: "0",
          },
          {
            label: "紧急救援队伍",
            typeName: "紧急救援队伍",
            num: "34",
            id: "3",
            pid: "0",
          },
        ],
      },
    ];
  } else if (needCirculate.includes(item.type)) {
    let arr = [];
    for (let index = 1; index < item.num - 0 + 1; index++) {
      arr.push({
        label: item.name + index,
        typeName: item.name + index,
        num: 11 + index,
        id: index,
        pid: "0",
      });
    }
    dataArr = [
      {
        label: "榆林市",
        typeName: "榆林市",
        num: "45",
        id: "0",
        children: arr,
      },
    ];
  } else if (item.type == "txl") {
    dataArr = [
      {
        label: "应急机构",
        typeName: "应急机构",
        num: "41",
        id: "1",
        children: [
          { label: "曾某某", typeName: "曾某某", id: "5", pid: "1" },
          { label: "张三", typeName: "张三", id: "6", pid: "1" },
        ],
      },
      { label: "救援队伍", typeName: "救援队伍", num: "34", id: "2" },
      { label: "应急人员", typeName: "应急人员", num: "34", id: "3" },
      { label: "应急专家", typeName: "应急专家", num: "34", id: "4" },
    ];
  } else {
    dataArr = [
      {
        label: "榆林市",
        typeName: "榆林市",
        num: "415",
        id: "0",
        children: [
          { label: "榆阳区", typeName: "榆阳区", num: "41", id: "1", pin: "0" },
          { label: "横山区", typeName: "横山区", num: "34", id: "2", pin: "0" },
          { label: "神木县", typeName: "神木县", num: "34", id: "3", pin: "0" },
          { label: "府谷县", typeName: "府谷县", num: "34", id: "4", pin: "0" },
          { label: "靖边县", typeName: "靖边县", num: "34", id: "5", pin: "0" },
          { label: "定边县", typeName: "定边县", num: "34", id: "6", pin: "0" },
          { label: "绥德县", typeName: "绥德县", num: "34", id: "7", pin: "0" },
          { label: "米脂县", typeName: "米脂县", num: "34", id: "8", pin: "0" },
          { label: "佳县", typeName: "佳县", num: "34", id: "9", pin: "0" },
          {
            label: "吴堡县",
            typeName: "吴堡县",
            num: "34",
            id: "10",
            pin: "0",
          },
          {
            label: "清涧县",
            typeName: "清涧县",
            num: "34",
            id: "11",
            pin: "0",
          },
          {
            label: "子洲县",
            typeName: "子洲县",
            num: "34",
            id: "12",
            pin: "0",
          },
        ],
      },
    ];
  }
  console.log("zzzzzzzzzzzzzzz,", dataArr);
  checkBoxPopupData.value.listData = dataArr;
};
const removeMarker = (data) => {
  // console.log('removeMarker=========>',data);
  let item = currentMarkerTypeData.value.item;
  $mitt.emit("changeMarkerState", {
    markerType: item.type,
    id: item.type + "_" + data.label,
    show: false,
  });
};
const setMarker = (data) => {
  // console.log(data);
  let position = [110.00449, 37.95844];

  let item = currentMarkerTypeData.value.item || {}; //撒点信息
  if (!data.icon) {
    item = { ...item, ...data };
  } else {
    item = { ...data };
  }
  let obj = item; //展示字段
  // 处理空格 避免撒点弹框转换json字符串报错
  for (const key in obj) {
    obj[key] = (obj[key] + "").replace(" ", "&nbsp;");
  }

  // 差不多在此范围内随机生成点位
  let lng = (position[0] + "").replace(
    /^(.{4})(.{1})(.*)$/,
    "$1" + Math.floor(Math.random() * 10) + "$3"
  );
  let lat = (position[1] + "").replace(
    /^(.{3})(.{1})(.*)$/,
    "$1" + Math.floor(Math.random() * 10) + "$3"
  );
  let markerData = {
    markerType: item.type,
    id: item.type + "_" + (item.label || item.id),
    lng: item.lng || lng,
    lat: item.lat || lat,
    name: item.typeName + item.id,
    icon: item.icon && icon_config[item.icon].icon,
    label: { text: item.typeName + (item.name || item.id), font_size: 16 },
    dialogType: item.type,
    details: obj,
  };
  $mitt.emit("addMarker", markerData);
  $mitt.emit("openPopup", markerData);
  $mitt.emit("flyTo", markerData);
};

// 查看
const checkDetailBus = useEventBus("checkDetail");
const detailListener = (e) => {
  console.log("e========>", e);
};
checkDetailBus.on(detailListener);
</script>

<style scoped lang="less">
.left {
  :deep(.firDialog) {
    left: 460px;
  }
}
</style>
