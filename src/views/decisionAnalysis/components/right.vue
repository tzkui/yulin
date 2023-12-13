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
import * as basicPoint from "./pointInfo.js";
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
const disaster_check_data = ref([]);
// 灾情资源 场所选择tab  已选择内容
const disaster_checked_data = ref([]);

const disaster_resources_list = ref([]);

/**
 * 应用对象统计 数据
 */
// 应用统计 选择tab
const analysis_check_data = ref([]);
// 应用统计 选择tab  已选择内容
const analysis_checked_data = ref([]);
const application_object_list = ref([]);
onMounted(() => {
  initType();
});
let timer1 = null;
// 滑块改变
const changeRaduis = (type, val) => {
  emit("changeRadius", type, val);
  if (type === "effect_radius") {
    if (timer1) {
      clearTimeout(timer1);
    }
    timer1 = setTimeout(() => {
      getAllDisasters();
    }, 500);
  }
};
// 撒点func
const addMarker = (type, item) => {
  console.log(type, item);

  let markerData = {
    markerType: item.markerType,
    id: item.id,
    lng: item.mapX,
    lat: item.mapY,
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
  $mitt.emit("addMarker", markerData);
  $mitt.emit("openPopup", markerData);
  $mitt.emit("flyTo", markerData);
};

const addMarkers = function (typeId, list) {
  $mitt.emit("hideAllMarker");
  if (typeId == "4dc072310d1310c95dd3d1d5349cdf9c") {
    list.forEach((v) => {
      console.log(v)
      $mitt.emit("addMarker", {
        markerType: "ltkc",
        id: v.id,
        icon: "/images/marker/icon_fei_meikuang.png",
        lng: v.mapX || "",
        lat: v.mapY || "",
        name: "露天矿场",
        label: { text: "露天矿场", font_size: 16 },
        dialogType: "zqfx",
        details: {
          name: v.name,
          linkName: v.linkName,
          linkPhone: v.linkPhone,
          storageCapacity: v.storageCapacity,
        },
      });
    });
  }
  // else if(typeId == "4dc072310d1310c95dd3d1d5349cdf9c") {
  //   basicPoint.ltkcdd.markerList = list.map((v) => {
  //     return {
  //       markerType: "ltkc",
  //       id: v.id,
  //       icon: "/images/marker/icon_fei_meikuang.png",
  //       lng: v.mapX || "",
  //       lat: v.mapY || "",
  //       name: "露天矿场",
  //       label: { text: "露天矿场1", font_size: 16 },
  //       dialogType: "zqfx",
  //       details: {
  //         name: v.name,
  //         linkName: v.linkName,
  //         linkPhone: v.linkPhone,
  //         storageCapacity: v.storageCapacity,
  //       },
  //     };
  //   });
  // }
};
let allDisasters = {};
const getAllDisasters = function () {
  const params = {
    map_x: props.centerPoint[0],
    map_y: props.centerPoint[1],
    radius: props.radius.effect_radius / 1000,
    typeIds: disaster_check_data.value.map((item) => item.value),
  };
  getZdfhmb(params).then((res) => {
    console.log(res);
    effect_cont.value[0].num = Math.floor(res.data.totalArea);
    effect_cont.value[1].num = Math.floor(res.data.total);
    res.data.data.forEach((item) => {
      allDisasters[item.typeId] = item.defenceAims;
      addMarkers(item.typeId, item.defenceAims);
    });
  });
};
const initType = function () {
  getZdfhmbType().then((res) => {
    disaster_check_data.value = res.data;
    getAllDisasters();
  });
  getYybzfxType().then((res) => {
    analysis_check_data.value = res.data;
  });
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
    radius = props.radius.effect_radius / 1000;
    funcName = getZdfhmb;
    // 清除打点的
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
        // 没有露天矿场的
        if (ids.indexOf("4dc072310d1310c95dd3d1d5349cdf9c") == -1) {
          basicPoint.ltkcdd.markerList = [];
        }
        // 没有学校
        if (ids.indexOf("5dfd1e89da99722490da9839145ab498") == -1) {
          basicPoint.xxdd.markerList = [];
          // console.log(basicPoint.xxdd.markerList, "====>看这个数据的嘞")
        }
        // 没有超市
        if (ids.indexOf("60f10175641c56360bf2c24d81a6f31c") == -1) {
          basicPoint.csdd.markerList = [];
        }
        // 没有企业的
        if (ids.indexOf("6a95025bf122e6150de7e0e142525b53") == -1) {
          basicPoint.qydd.markerList = [];
        }
        // 没有旅游景区的
        if (ids.indexOf("87aff28c9ab509c703c70f99919a422b") == -1) {
          basicPoint.lyjqdd.markerList = [];
        }
        // 没有体育馆的
        if (ids.indexOf("8a7e9d3ff3e1c8bd4368f534f1fb4ac1") == -1) {
          basicPoint.tygdd.markerList = [];
        }
        // 公共文化场所的
        if (ids.indexOf("d9dbb206574b2bba3e61854c9619db75") == -1) {
          basicPoint.ggwhcsdd.markerList = [];
        }
        // 医院的
        if (ids.indexOf("efdedec4f3450981d8d0fae0dc95b15a") == -1) {
          basicPoint.yydd.markerList = [];
        }

        if (res.data.data[i2].typeId == "4dc072310d1310c95dd3d1d5349cdf9c") {
          // 露天矿场的就是
          console.log(v2.defenceAims, "进入露天矿场的");
          basicPoint.ltkcdd.markerList = v2.defenceAims.map((v) => {
            return {
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
            };
          });
          // 学校的这个打点的了
        } else if (
          res.data.data[i2].typeId == "5dfd1e89da99722490da9839145ab498"
        ) {
          if (v2.defenceAims.length > 0) {
            v2.defenceAims.forEach((v, i) => {
              basicPoint.xxdd.markerList.push({
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
            basicPoint.xxdd.markerList = [];
          }
          // 下面这个就是超市的打点的了
        } else if (
          res.data.data[i2].typeId == "60f10175641c56360bf2c24d81a6f31c"
        ) {
          if (v2.defenceAims.length > 0) {
            v2.defenceAims.forEach((v, i) => {
              basicPoint.csdd.markerList.push({
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
            basicPoint.csdd.markerList = [];
          }
        }
        // 企业的
        else if (
          res.data.data[i2].typeId == "6a95025bf122e6150de7e0e142525b53"
        ) {
          if (v2.defenceAims.length > 0) {
            v2.defenceAims.forEach((v, i) => {
              basicPoint.qydd.markerList.push({
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
            basicPoint.qydd.markerList = [];
          }
        }
        // 旅游景区
        else if (
          res.data.data[i2].typeId == "87aff28c9ab509c703c70f99919a422b"
        ) {
          if (v2.defenceAims.length > 0) {
            v2.defenceAims.forEach((v, i) => {
              basicPoint.lyjqdd.markerList.push({
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
            basicPoint.lyjqdd.markerList = [];
          }
        }
        // 体育馆
        else if (
          res.data.data[i2].typeId == "8a7e9d3ff3e1c8bd4368f534f1fb4ac1"
        ) {
          if (v2.defenceAims.length > 0) {
            v2.defenceAims.forEach((v, i) => {
              basicPoint.tygdd.markerList.push({
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
            basicPoint.lyjqdd.markerList = [];
          }
        }
        // 公共文化场所的
        else if (
          res.data.data[i2].typeId == "d9dbb206574b2bba3e61854c9619db75"
        ) {
          if (v2.defenceAims.length > 0) {
            v2.defenceAims.forEach((v, i) => {
              basicPoint.ggwhcsdd.markerList.push({
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
            basicPoint.ggwhcsdd.markerList = [];
          }
        }
        // 医院的
        else if (
          res.data.data[i2].typeId == "d9dbb206574b2bba3e61854c9619db75"
        ) {
          if (v2.defenceAims.length > 0) {
            v2.defenceAims.forEach((v, i) => {
              basicPoint.yydd.markerList.push({
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
            basicPoint.yydd.markerList = [];
          }
        }
        // $mitt.emit('clearAll', { ignore: ['geo绘制图层'] })
        $mitt.emit("hideAllMarker");
        if (basicPoint.ltkcdd.markerList.length > 0) {
          console.log("xxxxx:", basicPoint.ltkcdd);
          $mitt.emit("addMarker", basicPoint.ltkcdd);
        }
        if (basicPoint.xxdd.markerList.length > 0) {
          $mitt.emit("addMarker", basicPoint.xxdd);
        }
        if (basicPoint.csdd.markerList.length > 0) {
          $mitt.emit("addMarker", basicPoint.csdd);
        }
        if (basicPoint.qydd.markerList.length > 0) {
          $mitt.emit("addMarker", basicPoint.qydd);
        }
        if (basicPoint.lyjqdd.markerList.length > 0) {
          $mitt.emit("addMarker", basicPoint.lyjqdd);
        }
        if (basicPoint.tygdd.markerList.length > 0) {
          $mitt.emit("addMarker", basicPoint.tygdd);
        }
        if (basicPoint.ggwhcsdd.markerList.length > 0) {
          $mitt.emit("addMarker", basicPoint.ggwhcsdd);
        }
        if (basicPoint.yydd.markerList.length > 0) {
          $mitt.emit("addMarker", basicPoint.yydd);
        }
      });
    }
    // 下面就是点击下面的
  } else if (type == "analysis") {
    console.log(res, data, "我是下面点击的东西");
    // 重点物资
    if (res.data.zdwz) {
      res.data.zdwz.forEach((v, i) => {
        basicPoint.zdwzdd.markerList.push({
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
      basicPoint.zdwzdd.markerList = [];
    }

    // 物资仓库的
    if (res.data.wzck) {
      res.data.wzck.forEach((v, i) => {
        basicPoint.wzckdd.markerList.push({
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
      basicPoint.wzckdd.markerList = [];
    }

    // 救援队伍的
    if (res.data.jydw) {
      res.data.jydw.forEach((v, i) => {
        basicPoint.jydwdd.markerList.push({
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
      basicPoint.jydwdd.markerList = [];
    }
    // 避难场所的
    if (res.data.bncs) {
      res.data.bncs.forEach((v, i) => {
        basicPoint.bncsdd.markerList.push({
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
      basicPoint.bncsdd.markerList = [];
    }
    // 大型机械的
    if (res.data.dxjx) {
      res.data.dxjx.forEach((v, i) => {
        basicPoint.dxjxdd.markerList.push({
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
      basicPoint.dxjxdd.markerList = [];
    }
    // 应急广播的
    if (res.data.yjgb) {
      res.data.yjgb.forEach((v, i) => {
        basicPoint.yjgbdd.markerList.push({
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
      basicPoint.yjgbdd.markerList = [];
    }
    // 视频监控的
    if (res.data.spjk) {
      res.data.spjk.forEach((v, i) => {
        basicPoint.spjkdd.markerList.push({
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
      basicPoint.spjkdd.markerList = [];
    }
    $mitt.emit("hideAllMarker");
    if (basicPoint.wzckdd.markerList.length > 0) {
      $mitt.emit("addMarker", basicPoint.wzckdd);
    }
    if (basicPoint.jydwdd.markerList.length > 0) {
      $mitt.emit("addMarker", basicPoint.jydwdd);
    }
    if (basicPoint.zdwzdd.markerList.length > 0) {
      $mitt.emit("addMarker", basicPoint.zdwzdd);
    }
    if (basicPoint.bncsdd.markerList.length > 0) {
      $mitt.emit("addMarker", basicPoint.bncsdd);
    }
    if (basicPoint.dxjxdd.markerList.length > 0) {
      $mitt.emit("addMarker", basicPoint.dxjxdd);
    }
    if (basicPoint.yjgbdd.markerList.length > 0) {
      $mitt.emit("addMarker", basicPoint.yjgbdd);
    }
    if (basicPoint.spjkdd.markerList.length > 0) {
      $mitt.emit("addMarker", basicPoint.spjkdd);
    }
  }
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
