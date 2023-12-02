<template>
  <div class="right">
    <!-- 灾情分析 / 重点防护目标 -->
    <ViewBox title="重点对象分析">
      <div class="resources">
        <div class="effect_radius">
          影响半径<span class="blue">{{ radius.effect_radius }}米</span>
          <el-slider
            v-model="radius.effect_radius"
            :max="100000"
            @input="
              ($event) => {
                changeRaduis('effect_radius', $event);
              }
            "
            :show-tooltip="false"
          ></el-slider>
          <!-- 受灾内容 -->
          <div class="effect_cont_lists">
            <div
              class="effect_cont_list"
              v-for="(item, index) in effect_cont"
              :key="index"
            >
              <div class="cont_num">
                <span class="num">{{ item.num.toFixed(0) }}</span
                >{{ item.unit }}
              </div>
              <div class="cont_type">
                {{ item.type }}
              </div>
            </div>
          </div>
          <!-- 可多选box -->
          <div class="checkboxs">
            <div
              v-for="(item, index) in disaster_check_data"
              :key="index"
              :class="{
                check_item: true,
                active: disaster_checked_data.includes(item),
              }"
              @click="onCheck('effect', item)"
            >
              {{ item.name }}
            </div>
          </div>
          <!-- 列表 -->
          <div class="cont_lists">
            <div
              class="cont_list"
              v-for="(item, index) in disaster_resources_list"
              :key="index"
              @click="addMarker('zqzyfx', item)"
            >
              <div class="label">{{ item.name }}</div>
              <div class="value_1">
                {{ item.distance }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ViewBox>
    <ViewBox title="应急保障分析">
      <div class="application_object">
        <div class="analysis_radius">
          分析半径<span class="blue">{{ radius.analysis_radius }}米</span>
          <el-slider
            @input="
              ($event) => {
                changeRaduis('analysis_radius', $event);
              }
            "
            v-model="radius.analysis_radius"
            :max="150000"
            :show-tooltip="false"
          ></el-slider>
          <!-- 可多选box -->
          <div class="checkboxs">
            <div
              v-for="(item, index) in analysis_check_data"
              :key="index"
              :class="{
                check_item: true,
                active: analysis_checked_data.includes(item),
              }"
              @click="onCheck('analysis', item)"
            >
              {{ item.name }}
            </div>
          </div>
          <!-- 列表 -->
          <div class="cont_lists">
            <div
              class="cont_list"
              v-for="(item, index) in application_object_list"
              :key="index"
              @click="addMarker('yydxtj', item)"
            >
              <div class="label">{{ item.name }}</div>
              <div class="value_1">
                {{ item.num }}
              </div>
              <div class="value_2">
                {{ item.distance }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ViewBox>
  </div>
</template>

<script setup>
import { ref, onMounted, inject, nextTick } from "vue";
const $mitt = inject("$mitt");
const emit = defineEmits(["changeRadius"]);
import {
  getZdfhmb,
  getYybzfx,
  getZdfhmbType,
  getYybzfxType,
} from "@/api/decision_analysis.js";
import { icon_config } from "../config";

import ViewBox from "@/components/common/view-box.vue";
const props = defineProps({
  radius: {
    type: Object,
    default: {
      effect_radius: 200,
      analysis_radius: 200,
    },
  },
  centerPoint: {
    type: Array,
    default: [],
  },
});
/**
 * 灾情资源分析 数据
 */

// 重点物资的打点事件
const zdwzdd = ref({
  markerType: "zdwz",
  id: "1",
  icon: "/images/marker/icon-space.png",
  name: "重点物资",
  maekerList: [],
});
// 物资仓库的打点事件
const wzckdd = ref({
  markerType: "wzck",
  id: "2",
  icon: "/images/marker/icon_warehouse.png",
  name: "物资仓库",
  maekerList: [],
});
// 救援物资的打点的数据
const jydwdd = ref({
  markerType: "jydw",
  id: "3",
  icon: "/images/marker/icon_team.png",
  name: "救援队伍",
  maekerList: [],
});
// 避难场所
const bncsdd = ref({
  markerType: "bncs",
  id: "4",
  icon: "/images/marker/icon-bncs.png",
  name: "避难场所",
  maekerList: [],
});
// 大型机械
const dxjxdd = ref({
  markerType: "dxjx",
  id: "5",
  icon: "/images/marker/mapdot-construction-machinery.png",
  name: "大型机械",
  maekerList: [
    //   {
    //     markerType: "dxjx",
    //     id: "5_1",
    //     icon: "/images/marker/mapdot-construction-machinery.png",
    //     lng: '109.71230', lat: "38.23824",
    //     name: "大型机械",
    //     label: { text: "大型机械1", font_size: 16 },
    //     dialogType: "yydxtj",
    //     details: {
    //       name: "大型机械1",
    //       num: '115人',
    //       distance: "距2500km",
    //     }
    //   },
  ],
});
// 应急广播
const yjgbdd = ref({
  markerType: "yjgb",
  id: "6",
  icon: "/images/marker/mapdot-volume-up-f.png",
  name: "应急广播",
  maekerList: [
    //   {
    //     markerType: "yjgb",
    //     id: "6_1",
    //     icon: "/images/marker/mapdot-volume-up-f.png",
    //     lng: '109.64733', lat: "38.24603",
    //     name: "应急广播",
    //     label: { text: "应急广播1", font_size: 16 },
    //     dialogType: "yydxtj",
    //     details: {
    //       name: "应急广播1",
    //       num: '115人',
    //       distance: "距2500km",
    //     }
    //   },
  ],
});
// 视频监控
const spjkdd = ref({
  markerType: "spjk",
  id: "7",
  icon: "/images/marker/mapdot-scientific.png",
  name: "视频监控",
  maekerList: [
    // {
    //     markerType: "spjk",
    //     id: "7_1",
    //     icon: "/images/marker/mapdot-scientific.png",
    //     lng: '109.70637', lat: "38.23220",
    //     name: "视频监控",
    //     label: { text: "视频监控1", font_size: 16 },
    //     dialogType: "yydxtj",
    //     details: {
    //         name: "视频监控1",
    //         num: 1 + '115人',
    //         distance: "距2500km",
    //     }
    // },
  ],
});

// 灾情分析相关的撒点信息的了
// 露天矿场的了
const ltkcdd = ref({
  markerType: "ltkc",
  id: "1",
  icon: "/images/marker/icon_fei_meikuang.png",
  name: "露天矿场",
  maekerList: [
    // {
    //     markerType: "ltkc",
    //     id: "1_1",
    //     icon: "/images/marker/mapdot-materia.png",
    //     lng: '109.70081', lat: "38.28285",
    //     name: "露天矿场",
    //     label: { text: "露天矿场1", font_size: 16 },
    //     dialogType: "zqfx",
    //     details: {
    //         name: "露天矿场1",
    //         num: '115人',
    //         distance: "距2500km",
    //     }
    // },
  ],
});
// 学校的
const xxdd = ref({
  markerType: "xx",
  id: "2",
  icon: "/images/marker/mapdot-school.png",
  name: "学校",
  maekerList: [
    {
      markerType: "xx",
      id: "2_1",
      icon: "/images/marker/mapdot-school.png",
      lng: "109.75813",
      lat: "38.30719",
      name: "学校",
      label: { text: "学校1", font_size: 16 },
      dialogType: "zqfx",
      details: {
        name: "学校1",
        num: "115人",
        distance: "距2500km",
      },
    },
  ],
});
// 超市的
const csdd = ref({
  markerType: "cs",
  id: "3",
  icon: "/images/marker/m2.png",
  name: "超市",
  maekerList: [
    {
      markerType: "cs",
      id: "3_1",
      icon: "/images/marker/m2.png",
      lng: "109.75096",
      lat: "38.26007",
      name: "超市",
      label: { text: "超市1", font_size: 16 },
      dialogType: "zqfx",
      details: {
        name: "超市1",
        num: "115人",
        distance: "距2500km",
      },
    },
  ],
});
// 企业的
const qydd = ref({
  markerType: "qy",
  id: "4",
  icon: "/images/marker/mapdot-building-6.png",
  name: "企业",
  maekerList: [
    {
      markerType: "qy",
      id: "4_1",
      icon: "/images/marker/mapdot-building-6.png",
      lng: "109.68167",
      lat: "38.25636",
      name: "企业",
      label: { text: "企业", font_size: 16 },
      dialogType: "zqfx",
      details: {
        name: "企业1",
        num: "115人",
        distance: "距2500km",
      },
    },
  ],
});
// 旅游景区的
const lyjqdd = ref({
  markerType: "lyjq",
  id: "5",
  icon: "/images/marker/mapdot-construction-machinery.png",
  name: "lyjq",
  maekerList: [
    {
      markerType: "lyjq",
      id: "5_1",
      icon: "/images/marker/mapdot-construction-machinery.png",
      lng: "109.71230",
      lat: "38.23824",
      name: "lyjq",
      label: { text: "旅游景区", font_size: 16 },
      dialogType: "zqfx",
      details: {
        name: "lyjq",
        num: "115人",
        distance: "距2500km",
      },
    },
  ],
});
// 体育馆的
const tygdd = ref({
  markerType: "tyg",
  id: "6",
  icon: "/images/marker/icon_warehouse.png",
  name: "体育馆",
  maekerList: [
    {
      markerType: "tyg",
      id: "6_1",
      icon: "/images/marker/icon_warehouse.png",
      lng: "109.64733",
      lat: "38.24603",
      name: "体育馆",
      label: { text: "体育馆1", font_size: 16 },
      dialogType: "zqfx",
      details: {
        name: "育馆1",
        num: "115人",
        distance: "距2500km",
      },
    },
  ],
});

// 公告文化场所的
const ggwhcsdd = ref({
  markerType: "ggwhcs",
  id: "7",
  icon: "/images/marker/mapdot-scientific.png",
  name: "公告文化场所",
  maekerList: [
    {
      markerType: "ggwhcs",
      id: "7_1",
      icon: "/images/marker/mapdot-scientific.png",
      lng: "109.70637",
      lat: "38.23220",
      name: "公告文化场所",
      label: { text: "公告文化场所1", font_size: 16 },
      dialogType: "zqfx",
      details: {
        name: "公告文化场所1",
        num: 1 + "115人",
        distance: "距2500km",
      },
    },
  ],
});
// 医院打点的
const yydd = ref({
  markerType: "yy",
  id: "8",
  icon: "/images/marker/mapdot-scientific.png",
  name: "医院",
  maekerList: [
    {
      markerType: "yy",
      id: "8_1",
      icon: "/images/marker/mapdot-scientific.png",
      lng: "109.70637",
      lat: "38.23220",
      name: "医院",
      label: { text: "医院", font_size: 16 },
      dialogType: "zqfx",
      details: {
        name: "医院",
        num: 1 + "115人",
        distance: "距2500km",
      },
    },
  ],
});

// 灾情影响 统计内容
const effect_cont = ref([
  {
    num: 0,
    unit: "㎡",
    type: "影响面积",
  },
  {
    num: 0,
    unit: "个",
    type: "防护目标",
  },
]);
// 灾情资源 场所选择tab
const disaster_check_data = ref([
  { name: "学校" },
  { name: "医院" },
  { name: "公共文化场所" },
  { name: "旅游景区" },
  { name: "企业" },
  { name: "体育馆" },
  { name: "超市" },
  { name: "露天矿山" },
]);
// 灾情资源 场所选择tab  已选择内容
const disaster_checked_data = ref([]);
// 灾情资源 列表
const disaster_resources_All = ref({
  学校: [
    {
      markerType: "xx",
      id: "xx_1",
      name: "希望小学",
      distance: "距2314m",
      lng: "110.97928",
      lat: "39.44162",
    },
    {
      markerType: "xx",
      id: "xx_2",
      name: "第七中学",
      distance: "距369km",
      lng: "110.74074",
      lat: "39.01995",
    },
  ],
});
const disaster_resources_list = ref([]);

/**
 * 应用对象统计 数据
 */
// 应用统计 选择tab
const analysis_check_data = ref([
  { name: "重点物资" },
  { name: "物资仓库" },
  { name: "救援队伍" },
  { name: "避难场所" },
  { name: "大型机械" },
  { name: "应急广播" },
  { name: "视频监控" },
]);
// 应用统计 选择tab  已选择内容
const analysis_checked_data = ref([]);
//  应用对象 列表
const application_object_All = ref({
  重点物资: [
    {
      markerType: "zdwz",
      id: "zdwz_1",
      name: "物资一",
      num: "115人",
      distance: "距2314m",
      lng: "109.70081",
      lat: "38.28285",
    },
    {
      markerType: "zdwz",
      id: "zdwz_2",
      name: "物资二",
      num: "125人",
      distance: "距369km",
      lng: "109.78777",
      lat: "38.29434",
    },
    {
      markerType: "zdwz",
      id: "zdwz_3",
      name: "物资三",
      num: "25人",
      distance: "距379km",
    },
    {
      markerType: "zdwz",
      id: "zdwz_4",
      name: "物资四",
      num: "155人",
      distance: "距369km",
    },
    {
      markerType: "zdwz",
      id: "zdwz_5",
      name: "物资五",
      num: "65人",
      distance: "距569km",
    },
    {
      markerType: "zdwz",
      id: "zdwz_6",
      name: "物资六",
      num: "85人",
      distance: "距969km",
    },
  ],
});
const application_object_list = ref([]);
onMounted(() => {
  // checkPlace('学校')
  // checkAnalysis('重点物资')
  initType();
});
// 滑块改变
const changeRaduis = (type, val) => {
  emit("changeRadius", type, val);
};
// 撒点func
const addMarker = (type, item) => {
  console.log(type, item);
  // 先清除 再撒点
  // $mitt.emit('clearAll', { ignore: ['geo绘制图层'] })

  // 差不多在范围内随机生成点位
  let lng = (props.centerPoint[0] + "").replace(
    /^(.{6})(.{1})(.*)$/,
    "$1" + Math.floor(Math.random() * 10) + "$3"
  );
  let lat = (props.centerPoint[1] + "").replace(
    /^(.{6})(.{1})(.*)$/,
    "$1" + Math.floor(Math.random() * 10) + "$3"
  );

  let markerData = {
    markerType: item.markerType,
    id: item.id,
    lng: lng,
    lat: lat,
    // lng: item.lng,
    // lat: item.lat,
    name: item.name,
    icon: icon_config[item.markerType].icon,
    label: { text: item.name, font_size: 16 },
    dialogType: type,
    details: {},
  };

  if (type == "zqzyfx") {
    markerData.details = {
      name: item.name,
      distance: item.distance,
    };
  } else if (type == "yydxtj") {
    markerData.details = {
      name: item.name,
      num: item.num,
      distance: item.distance,
    };
  }
  // console.log(markerData);
  $mitt.emit("addMarker", markerData);
  $mitt.emit("openPopup", markerData);
  $mitt.emit("flyTo", markerData);
};

let objConfig = {
  学校: "xx",
  医院: "yy",
  公共文化场所: "ggwhcs",
  旅游景区: "lyjq",
  企业: "qy",
  体育馆: "tyg",
  超市: "cs",
  露天矿场: "ltks",
  重点物资: "zdwz",
  物资仓库: "wzck",
  救援队伍: "jydw",
  避难场所: "bncs",
  大型机械: "dxjx",
  应急广播: "yjgb",
  视频监控: "spjk",
};
let topDict = Object.create(null);
const initType = async () => {
  let effect = await getZdfhmbType();
  // 这个地方就是上面的一个相关的参数的了
  console.log(effect, "看看这个里面是什么的数据====================>");
  disaster_check_data.value = Array.isArray(effect.data)
    ? effect.data
    : [effect.data];
  let analysis = await getYybzfxType();
  analysis_check_data.value = Array.isArray(analysis.data)
    ? analysis.data
    : [analysis.data];
};
/*
 * 资源分析
 */
const onCheck = async (type, item) => {
  let currentData, currentList, radius, funcName;
  if (type == "effect") {
    console.log(11);
    currentData = disaster_checked_data.value;
    currentList = disaster_resources_list.value;
    radius = props.radius.effect_radius;
    funcName = getZdfhmb;
    // 清楚打点的
  } else if (type == "analysis") {
    console.log(22);
    currentData = analysis_checked_data.value;
    currentList = application_object_list.value;
    radius = props.radius.analysis_radius;
    funcName = getYybzfx;
  }

  let index = currentData.indexOf(item);

  // 判断 无则加，有则减
  if (index == -1) {
    currentData.push(item);
  } else {
    currentData.splice(index, 1);
    // nextTick(() => {
    //     $mitt.emit('changeMarkerState', { markerType: objConfig[item], show: false })
    // })
  }
  // console.log('已选择场所=======>', currentData);
  let ids = currentData.map((item) => {
    return item.value;
  });
  let params = {
    map_x: props.centerPoint[0],
    map_y: props.centerPoint[1],
    radius: radius,
    typeIds: ids,
  };

  let res = await funcName(params);
  console.log("获取列表=====》", params, "传递的是什么");
  // 点击上面的
  if (type == "effect") {
    // 没有经过这个页数为0的了
    $mitt.emit("hideAllMarker");
    if (res.data) {
      effect_cont.value[0].num = res.data.totalArea || 0;
      effect_cont.value[1].num = res.data.total || 0;
      res.data.data.forEach((v2, i2) => {
        console.log(ids, "大家的ids这里");
        console.log(
          ids.indexOf("5dfd1e89da99722490da9839145ab498"),
          "id有没有"
        );
        // 没有露天矿场的
        if (ids.indexOf("4dc072310d1310c95dd3d1d5349cdf9c") == -1) {
          ltkcdd.value.maekerList = [];
          // console.log(ltkcdd.value.maekerList, "====>看这个数据的嘞")
        }
        // 没有学校
        if (ids.indexOf("5dfd1e89da99722490da9839145ab498") == -1) {
          xxdd.value.maekerList = [];
          // console.log(xxdd.value.maekerList, "====>看这个数据的嘞")
        }
        // 没有超市
        if (ids.indexOf("60f10175641c56360bf2c24d81a6f31c") == -1) {
          csdd.value.maekerList = [];
        }
        // 没有企业的
        if (ids.indexOf("6a95025bf122e6150de7e0e142525b53") == -1) {
          qydd.value.maekerList = [];
        }
        // 没有旅游景区的
        if (ids.indexOf("87aff28c9ab509c703c70f99919a422b") == -1) {
          lyjqdd.value.maekerList = [];
        }
        // 没有体育馆的
        if (ids.indexOf("8a7e9d3ff3e1c8bd4368f534f1fb4ac1") == -1) {
          tygdd.value.maekerList = [];
        }
        // 公共文化场所的
        if (ids.indexOf("d9dbb206574b2bba3e61854c9619db75") == -1) {
          ggwhcsdd.value.maekerList = [];
        }
        // 医院的
        if (ids.indexOf("efdedec4f3450981d8d0fae0dc95b15a") == -1) {
          yydd.value.maekerList = [];
        }

        if (res.data.data[i2].typeId == "4dc072310d1310c95dd3d1d5349cdf9c") {
          // 露天矿场的就是
          console.log(v2.defenceAims, "进入露天矿场的");
          if (v2.defenceAims.length > 0) {
            v2.defenceAims.forEach((v, i) => {
              ltkcdd.value.maekerList.push({
                markerType: "ltkc",
                id: v.id,
                icon: "/images/marker/icon_fei_meikuang.png",
                lng: v.mapX || "",
                lat: v.mapY || "",
                name: "露天矿场",
                label: { text: "露天矿场1", font_size: 16 },
                dialogType: "zqfx",
                details: {
                  name: v.name,
                  linkName: v.linkName,
                  linkPhone: v.linkPhone,
                  storageCapacity: v.storageCapacity,
                },
              });
            });
          } else {
            ltkcdd.value.maekerList = [];
          }
          // 学校的这个打点的了
        } else if (
          res.data.data[i2].typeId == "5dfd1e89da99722490da9839145ab498"
        ) {
          if (v2.defenceAims.length > 0) {
            v2.defenceAims.forEach((v, i) => {
              xxdd.value.maekerList.push({
                markerType: "xx",
                id: v.id,
                icon: "/images/marker//mapdot-school.png",
                lng: v.mapX || "",
                lat: v.mapY || "",
                name: "学校",
                label: { text: "学校1", font_size: 16 },
                dialogType: "zqfx",
                details: {
                  name: "学校1",
                  num: "115人",
                  distance: "距2500km",
                },
              });
            });
          } else {
            xxdd.value.maekerList = [];
          }
          // 下面这个就是超市的打点的了
        } else if (
          res.data.data[i2].typeId == "60f10175641c56360bf2c24d81a6f31c"
        ) {
          if (v2.defenceAims.length > 0) {
            v2.defenceAims.forEach((v, i) => {
              csdd.value.maekerList.push({
                markerType: "cs",
                id: v.id,
                icon: "/images/marker/m2.png",
                lng: v.mapX || "",
                lat: v.mapY || "",
                name: "超市",
                label: { text: "超市1", font_size: 16 },
                dialogType: "zqfx",
                details: {
                  name: v.name,
                  linkName: v.linkName,
                  linkPhone: v.linkPhone,
                  storageCapacity: v.storageCapacity,
                },
              });
            });
          } else {
            csdd.value.maekerList = [];
          }
        }
        // 企业的
        else if (
          res.data.data[i2].typeId == "6a95025bf122e6150de7e0e142525b53"
        ) {
          if (v2.defenceAims.length > 0) {
            v2.defenceAims.forEach((v, i) => {
              qydd.value.maekerList.push({
                markerType: "qy",
                id: v.id,
                icon: "/images/marker/mapdot-building-6.png",
                lng: v.mapX || "",
                lat: v.mapY || "",
                name: "企业",
                label: { text: "企业", font_size: 16 },
                dialogType: "zqfx",
                details: {
                  name: v.name,
                  linkName: v.linkName,
                  linkPhone: v.linkPhone,
                  storageCapacity: v.storageCapacity,
                },
              });
            });
          } else {
            qydd.value.maekerList = [];
          }
        }
        // 旅游景区
        else if (
          res.data.data[i2].typeId == "87aff28c9ab509c703c70f99919a422b"
        ) {
          if (v2.defenceAims.length > 0) {
            v2.defenceAims.forEach((v, i) => {
              lyjqdd.value.maekerList.push({
                markerType: "lyjq",
                id: v.id,
                icon: "/images/marker/mapdot-construction-machinery.png",
                lng: v.mapX || "",
                lat: v.mapY || "",
                name: "lyjq",
                label: { text: "旅游景区", font_size: 16 },
                dialogType: "zqfx",
                details: {
                  name: v.name,
                  linkName: v.linkName,
                  linkPhone: v.linkPhone,
                  storageCapacity: v.storageCapacity,
                },
              });
            });
          } else {
            lyjqdd.value.maekerList = [];
          }
        }
        // 体育馆
        else if (
          res.data.data[i2].typeId == "8a7e9d3ff3e1c8bd4368f534f1fb4ac1"
        ) {
          if (v2.defenceAims.length > 0) {
            v2.defenceAims.forEach((v, i) => {
              tygdd.value.maekerList.push({
                markerType: "tyg",
                id: v.id,
                icon: "/images/marker/icon_warehouse.png",
                lng: v.mapX || "",
                lat: v.mapY || "",
                name: "体育馆",
                label: { text: "体育馆1", font_size: 16 },
                dialogType: "zqfx",
                details: {
                  name: v.name,
                  linkName: v.linkName,
                  linkPhone: v.linkPhone,
                  storageCapacity: v.storageCapacity,
                },
              });
            });
          } else {
            lyjqdd.value.maekerList = [];
          }
        }
        // 公共文化场所的
        else if (
          res.data.data[i2].typeId == "d9dbb206574b2bba3e61854c9619db75"
        ) {
          if (v2.defenceAims.length > 0) {
            v2.defenceAims.forEach((v, i) => {
              ggwhcsdd.value.maekerList.push({
                markerType: "ggwhcs",
                id: v.id,
                icon: "/images/marker/mapdot-scientific.png",
                lng: v.mapX || "",
                lat: v.mapY || "",
                name: "公告文化场所",
                label: { text: "公告文化场所1", font_size: 16 },
                dialogType: "zqfx",
                details: {
                  name: v.name,
                  linkName: v.linkName,
                  linkPhone: v.linkPhone,
                  storageCapacity: v.storageCapacity,
                },
              });
            });
          } else {
            ggwhcsdd.value.maekerList = [];
          }
        }
        // 医院的
        else if (
          res.data.data[i2].typeId == "d9dbb206574b2bba3e61854c9619db75"
        ) {
          if (v2.defenceAims.length > 0) {
            v2.defenceAims.forEach((v, i) => {
              yydd.value.maekerList.push({
                markerType: "yy",
                id: v.id,
                icon: "/images/marker/mapdot-scientific.png",
                lng: v.mapX || "",
                lat: v.mapY || "",
                name: "医院",
                label: { text: "医院", font_size: 16 },
                dialogType: "zqfx",
                details: {
                  name: v.name,
                  linkName: v.linkName,
                  linkPhone: v.linkPhone,
                  storageCapacity: v.storageCapacity,
                },
              });
            });
          } else {
            yydd.value.maekerList = [];
          }
        }
        // $mitt.emit('clearAll', { ignore: ['geo绘制图层'] })
        $mitt.emit("hideAllMarker");
        if (ltkcdd.value.maekerList.length > 0) {
          $mitt.emit("addMarker", ltkcdd.value);
        }
        if (xxdd.value.maekerList.length > 0) {
          $mitt.emit("addMarker", xxdd.value);
        }
        if (csdd.value.maekerList.length > 0) {
          $mitt.emit("addMarker", csdd.value);
        }
        if (qydd.value.maekerList.length > 0) {
          $mitt.emit("addMarker", qydd.value);
        }
        if (lyjqdd.value.maekerList.length > 0) {
          $mitt.emit("addMarker", lyjqdd.value);
        }
        if (tygdd.value.maekerList.length > 0) {
          $mitt.emit("addMarker", tygdd.value);
        }
        if (ggwhcsdd.value.maekerList.length > 0) {
          $mitt.emit("addMarker", ggwhcsdd.value);
        }
        if (yydd.value.maekerList.length > 0) {
          $mitt.emit("addMarker", yydd.value);
        }
      });
    }

    // console.log(ids, "===================")
    // console.log(res.data, "===========>现在拿到的数据的了")
    // ids.forEach((v, i) => {
    //     res.data.data.forEach((v2, i2) => {
    //         if (ids[i2] == res.data.data[i2].typeId) {
    //             console.log(v2, "这个就是相同的")
    //         }
    //     })
    // })

    // 下面就是点击下面的
  } else if (type == "analysis") {
    // $mitt.emit("addMarker", ddlist.value)
    // $mitt.emit("flyTo", ddlist.value.maekerList[0])
    // $mitt.emit("openPopup", ddlist.value.maekerList[0])
    console.log(res, data, "我是下面点击的东西");
    // 重点物资
    if (res.data.zdwz) {
      res.data.zdwz.forEach((v, i) => {
        zdwzdd.value.maekerList.push({
          markerType: "zdwz",
          id: v.id,
          icon: "/images/marker/icon-space.png",
          lng: v.mapX || "",
          lat: v.mapY || "",
          name: "重点物资",
          label: { text: v.materialName || "", font_size: 16 },
          dialogType: "newyydxtj",
          details: {
            name: v.name,
            linkName: v.linkName,
            linkPhone: v.linkPhone,
            storageCapacity: v.storageCapacity,
          },
        });
      });
    } else {
      zdwzdd.value.maekerList = [];
    }

    // 物资仓库的
    if (res.data.wzck) {
      res.data.wzck.forEach((v, i) => {
        wzckdd.value.maekerList.push({
          markerType: "wzck",
          id: v.id,
          icon: "/images/marker/icon_warehouse.png",
          lng: v.mapX || "",
          lat: v.mapY || "",
          name: "物资仓库",
          label: { text: v.name || "", font_size: 16 },
          dialogType: "newyydxtj",
          details: {
            name: v.name,
            linkName: v.linkName,
            linkPhone: v.linkPhone,
            storageCapacity: v.storageCapacity,
          },
        });
      });
    } else {
      wzckdd.value.maekerList = [];
    }

    // 救援队伍的
    if (res.data.jydw) {
      res.data.jydw.forEach((v, i) => {
        jydwdd.value.maekerList.push({
          markerType: "jydw",
          id: v.id,
          icon: "/images/marker/icon_team.png",
          lng: v.mapX || "",
          lat: v.mapY || "",
          name: "救援队伍",
          label: { text: v.name || "", font_size: 16 },
          dialogType: "newyydxtj",
          details: {
            name: v.name,
            linkName: v.linkName,
            linkPhone: v.linkPhone,
            storageCapacity: v.storageCapacity,
          },
        });
      });
    } else {
      jydwdd.value.maekerList = [];
    }
    // 避难场所的
    if (res.data.bncs) {
      res.data.bncs.forEach((v, i) => {
        bncsdd.value.maekerList.push({
          markerType: "bncs",
          id: v.id,
          icon: "/images/marker/icon-bncs.png",
          lng: v.mapX || "",
          lat: v.mapY || "",
          name: "避难场所",
          label: { text: v.name || "", font_size: 16 },
          dialogType: "newyydxtj",
          details: {
            name: v.name,
            linkName: v.linkName,
            linkPhone: v.linkPhone,
            storageCapacity: v.storageCapacity,
          },
        });
      });
    } else {
      bncsdd.value.maekerList = [];
    }
    // 大型机械的
    if (res.data.dxjx) {
      res.data.dxjx.forEach((v, i) => {
        dxjxdd.value.maekerList.push({
          markerType: "dxjx",
          id: v.id,
          icon: "/images/marker/mapdot-construction-machinery.png",
          lng: v.mapX || "",
          lat: v.mapY || "",
          name: "大型机械",
          label: { text: v.name || "", font_size: 16 },
          dialogType: "yydxtj",
          details: {
            name: v.name,
            linkName: v.linkName,
            linkPhone: v.linkPhone,
            storageCapacity: v.storageCapacity,
          },
        });
      });
    } else {
      dxjxdd.value.maekerList = [];
    }
    // 应急广播的
    if (res.data.yjgb) {
      res.data.yjgb.forEach((v, i) => {
        yjgbdd.value.maekerList.push({
          markerType: "yjgb",
          id: v.id,
          icon: "/images/marker/mapdot-volume-up-f.png",
          lng: v.mapX || "",
          lat: v.mapY || "",
          name: "应急广播",
          label: { text: "应急广播1", font_size: 16 },
          dialogType: "yydxtj",
          details: {
            name: v.name,
            linkName: v.linkName,
            linkPhone: v.linkPhone,
            storageCapacity: v.storageCapacity,
          },
        });
      });
    } else {
      yjgbdd.value.maekerList = [];
    }
    // 视频监控的
    if (res.data.spjk) {
      res.data.spjk.forEach((v, i) => {
        spjkdd.value.maekerList.push({
          markerType: "spjk",
          id: v.id,
          icon: "/images/marker/mapdot-scientific.png",
          lng: v.mapX || "",
          lat: v.mapY || "",
          name: "视频监控",
          label: { text: "视频监控1", font_size: 16 },
          dialogType: "yydxtj",
          details: {
            name: v.name,
            linkName: v.linkName,
            linkPhone: v.linkPhone,
            storageCapacity: v.storageCapacity,
          },
        });
      });
    } else {
      spjkdd.value.maekerList = [];
    }
    $mitt.emit("hideAllMarker");
    // $mitt.emit("addMarker", jydwdd.value)
    // $mitt.emit("addMarker", wzckdd.value)
    // $mitt.emit("addMarker", zdwzdd.value)
    if (wzckdd.value.maekerList.length > 0) {
      $mitt.emit("addMarker", wzckdd.value);
    }
    if (jydwdd.value.maekerList.length > 0) {
      $mitt.emit("addMarker", jydwdd.value);
    }
    if (zdwzdd.value.maekerList.length > 0) {
      $mitt.emit("addMarker", zdwzdd.value);
    }
    if (bncsdd.value.maekerList.length > 0) {
      $mitt.emit("addMarker", bncsdd.value);
    }
    if (dxjxdd.value.maekerList.length > 0) {
      $mitt.emit("addMarker", dxjxdd.value);
    }
    if (yjgbdd.value.maekerList.length > 0) {
      $mitt.emit("addMarker", yjgbdd.value);
    }
    if (spjkdd.value.maekerList.length > 0) {
      $mitt.emit("addMarker", spjkdd.value);
    }

    // setTimeout(() => {
    //     $mitt.emit("hideAllMarker")
    // }, 10);
    // setTimeout(() => {
    //     $mitt.emit("addMarker", zdwzdd.value)
    //     $mitt.emit("addMarker", wzckdd.value)
    //     $mitt.emit("addMarker", jydwdd.value)
    // }, 1000);
    // $mitt.emit("flyTo", ddlist.value.maekerList[0])
    // $mitt.emit("openPopup", ddlist.value.maekerList[0])
    // setTimeout(() => {
    // $mitt.emit("hideAllMarker")
    // }, 1000);
  }
  // currentList

  // let arr = []
  // currentData.map(item => {
  //     arr.push(...disaster_resources_All.value[item])
  //     return
  // })
  // disaster_resources_list.value = arr
};
/*
 * 应用对象统计
 */
const checkAnalysis = (name) => {
  let index = analysis_checked_data.value.indexOf(name);
  if (index == -1) {
    analysis_checked_data.value.push(name);
  } else {
    analysis_checked_data.value.splice(index, 1);
    nextTick(() => {
      $mitt.emit("changeMarkerState", {
        markerType: objConfig[name],
        show: false,
      });
    });
  }
  console.log("已选择分析对象=======>", analysis_checked_data.value);
  let arr = [];
  analysis_checked_data.value.map((item) => {
    arr.push(...application_object_All.value[item]);
    return;
  });
  application_object_list.value = arr;
};
</script>

<style scoped lang="less">
.right {
  .resources {
    height: 470px;

    .effect_cont_lists {
      display: flex;
      justify-content: space-around;
      margin-top: 10px;

      .effect_cont_list {
        height: 95px;
        flex: 1;
        margin-right: 10px;
        background: url("@/assets/decisionAnalysis/effect_box_bg.png")
          center/100% 100% no-repeat;
        text-align: center;

        &:last-child {
          margin: 0;
        }

        .cont_num {
          line-height: 60px;
          color: #ccc;

          .num {
            font-size: 22px;
            font-weight: bold;
            margin-right: 5px;
            -webkit-text-fill-color: transparent;
            background-image: -webkit-linear-gradient(
              left,
              #e6964f,
              #d16537 80%
            );
            background-clip: text;
            -webkit-background-clip: text;
          }
        }

        .cont_type {
          line-height: 26px;
          font-size: 14px;
          color: #ccc;
          letter-spacing: 1px;
        }
      }
    }

    .effect_radius {
      .cont_lists {
        height: 190px;

        .cont_list {
          .label {
            width: 80%;
          }
        }
      }
    }
  }

  .application_object {
    height: 345px;

    .analysis_radius {
      .cont_lists {
        height: 170px;

        .cont_list {
          .label {
            width: 50%;
          }

          .value_1 {
            width: 30%;
          }

          .value_2 {
            width: 20%;
          }
        }
      }
    }
  }

  // 相同样式
  .resources,
  .application_object {
    .effect_radius,
    .analysis_radius {
      margin-top: 10px;
      font-size: 15px;

      .blue {
        margin-left: 8px;
        color: #59d4d1;
        font-weight: bold;
      }

      .cont_lists {
        overflow: auto;

        // margin-top: 8px;
        .cont_list {
          display: flex;
          line-height: 38px;
          margin: 4px 0;
          padding: 0 10px;
          position: relative;

          &:nth-child(even) {
            background: #081c25;
          }

          &:hover {
            background: #092a33;

            &::before {
              position: absolute;
              content: "";
              height: 16px;
              width: 2px;
              left: 0;
              top: 10px;
              background: #56cecc;
            }
          }

          .label {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }

    :deep(.el-slider) {
      margin-top: 5px;

      .el-slider__runway {
        background-color: #062f41;
        border: 1px solid #1b4257;
      }

      .el-slider__bar {
        background: linear-gradient(90deg, #1a678b 0%, #1b9dbf 100%);
      }

      .el-slider__button {
        background: radial-gradient(circle, #a9eefa, #4eb3cd);
        box-shadow: 0 0 12px 5px #1393bf;
        border: none;
        height: 10px;
        width: 10px;

        &:hover {
          transform: scale(1.01);
        }
      }
    }

    .checkboxs {
      margin-top: 20px;
      display: flex;
      flex-wrap: wrap;

      .check_item {
        height: 45px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        width: calc((100% - 15px) / 4);
        font-size: 14px;
        background: url("@/assets/decisionAnalysis/tab.png") center/99% 100%
          no-repeat;
        margin-bottom: 8px;
        margin-right: 5px;

        &:nth-child(4n) {
          margin: 0;
        }

        &.active {
          background: url("@/assets/decisionAnalysis/tab_active.png") center/99%
            100% no-repeat;
        }
      }
    }
  }
}
</style>
