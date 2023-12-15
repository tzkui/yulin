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
                active: disaster_checked_data === item.value,
              }"
              @click="selectZddx(item)"
            >
              {{ item.name }}
            </div>
          </div>
          <!-- 列表 -->
          <div class="cont_lists">
            <div
              class="cont_list"
              v-for="(item, index) in zddxList"
              :key="index"
              @click="flyTo(item)"
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
                active: analysis_checked_data === item.value,
              }"
              @click="selectYjbzfx(item)"
            >
              {{ item.name }}
            </div>
          </div>
          <!-- 列表 -->
          <div class="cont_lists">
            <div
              class="cont_list"
              v-for="(item, index) in yjbzfxList"
              :key="index"
              @click="flyTo(item)"
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
import { ref, onMounted, inject, nextTick, computed } from "vue";
const $mitt = inject("$mitt");
const emit = defineEmits(["changeRadius"]);
import {
  getZdfhmb,
  getYybzfx,
  getZdfhmbType,
  getYybzfxType,
} from "@/api/decision_analysis.js";

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
const disaster_checked_data = ref("");

const analysis_check_data = ref([]);
// 应用统计 选择tab  已选择内容
const analysis_checked_data = ref("");
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
  } else if (type === "analysis_radius") {
    if (timer1) {
      clearTimeout(timer1);
    }
    timer1 = setTimeout(() => {
      getAllAnalysis();
    }, 500);
  }
};
const getMarkerInfo = function (typeId, data) {
  if (typeId == "4dc072310d1310c95dd3d1d5349cdf9c") {
    // 汽车站
    return {
      markerType: "qcz",
      id: data.id,
      icon: "/images/marker/icon_fei_meikuang.png",
      lng: data.mapX || "",
      lat: data.mapY || "",
      name: "汽车站",
      label: { text: "汽车站", font_size: 16 },
      dialogType: "zqfx",
      details: {
        name: data.name,
        areaCovered: data.areaCovered + " ㎡",
        linkName: data.linkName,
        linkPhone: data.linkPhone,
      },
    };
  } else if (typeId == "5dfd1e89da99722490da9839145ab498") {
    // 学校
    return {
      markerType: "xx",
      id: data.id,
      icon: "/images/marker//mapdot-school.png",
      lng: data.mapX || "",
      lat: data.mapY || "",
      name: "学校",
      label: { text: "学校", font_size: 16 },
      dialogType: "zqfx_xx",
      details: {
        name: data.name,
        area: data.areaCovered + " ㎡",
        linkName: data.linkName,
        linkPhone: data.linkPhone,
        location: data.location,
      },
    };
  } else if (typeId == "60f10175641c56360bf2c24d81a6f31c") {
    // 加气站
    return {
      markerType: "cs",
      id: data.id,
      icon: "/images/marker/m2.png",
      lng: data.mapX || "",
      lat: data.mapY || "",
      name: "加气站",
      label: { text: "加气站", font_size: 16 },
      dialogType: "jqz",
      details: {
        name: data.name,
        area: data.areaCovered + " ㎡",
        linkName: data.linkName,
        linkPhone: data.linkPhone,
        location: data.location,
      },
    };
  } else if (typeId == "6a95025bf122e6150de7e0e142525b53") {
    // 油气站
    return {
      markerType: "qy",
      id: data.id,
      icon: "/images/marker/mapdot-building-6.png",
      lng: data.mapX || "",
      lat: data.mapY || "",
      name: "油气站",
      label: { text: "油气站", font_size: 16 },
      dialogType: "yqz",
      details: {
        name: data.name,
        area: data.areaCovered + " ㎡",
        linkName: data.linkName,
        linkPhone: data.linkPhone,
        location: data.location,
      },
    };
  } else if (typeId == "87aff28c9ab509c703c70f99919a422b") {
    // 旅游景区
    return {
      markerType: "lyjq",
      id: data.id,
      icon: "/images/marker/mapdot-construction-machinery.png",
      lng: data.mapX || "",
      lat: data.mapY || "",
      name: "lyjq",
      label: { text: "旅游景区", font_size: 16 },
      dialogType: "lyjq",
      details: {
        name: data.name,
        area: data.areaCovered + " ㎡",
        linkName: data.linkName,
        linkPhone: data.linkPhone,
        location: data.location,
      },
    };
  } else if (typeId == "8a7e9d3ff3e1c8bd4368f534f1fb4ac1") {
    // 体育馆
    return {
      markerType: "tyg",
      id: data.id,
      icon: "/images/marker/icon_warehouse.png",
      lng: data.mapX || "",
      lat: data.mapY || "",
      name: "体育馆",
      label: { text: "体育馆", font_size: 16 },
      dialogType: "tyg",
      details: {
        name: data.name,
        area: data.areaCovered + " ㎡",
        linkName: data.linkName,
        linkPhone: data.linkPhone,
        location: data.location,
      },
    };
  } else if (typeId == "d9dbb206574b2bba3e61854c9619db75") {
    // 公共文化场所
    return {
      markerType: "ggwhcs",
      id: data.id,
      icon: "/images/marker/mapdot-scientific.png",
      lng: data.mapX || "",
      lat: data.mapY || "",
      name: "公共文化场所",
      label: { text: "公共文化场所", font_size: 16 },
      dialogType: "ggwhcs",
      details: {
        name: data.name,
        area: data.areaCovered + " ㎡",
        linkName: data.linkName,
        linkPhone: data.linkPhone,
        location: data.location,
      },
    };
  } else if (typeId == "efdedec4f3450981d8d0fae0dc95b15a") {
    // 医院
    return {
      markerType: "zddx_yy",
      id: data.id,
      icon: "/images/marker/mapdot-scientific.png",
      lng: data.mapX || "",
      lat: data.mapY || "",
      name: "医院",
      label: { text: "医院", font_size: 16 },
      dialogType: "zddx_yy",
      details: {
        name: data.name,
        area: data.areaCovered + " ㎡",
        linkName: data.linkName,
        linkPhone: data.linkPhone,
        location: data.location,
      },
    };
  } else if (typeId == "zdwz") {
    // 重点物资
    return {
      markerType: "zdwz",
      id: data.id,
      icon: "/images/marker/icon-space.png",
      lng: data.mapX || "",
      lat: data.mapY || "",
      name: "重点物资",
      label: { text: "重点物资", font_size: 16 },
      dialogType: "newyydxtj",
      details: {
        name: data.name,
        linkName: data.linkName,
        linkPhone: data.linkPhone,
        storageCapacity: data.storageCapacity,
      },
    };
  } else if (typeId == "wzck") {
    // 物资仓库
    return {
      markerType: "wzck",
      id: data.id,
      icon: "/images/marker/icon_warehouse.png",
      lng: data.mapX || "",
      lat: data.mapY || "",
      name: "物资仓库",
      label: { text: "物资仓库", font_size: 16 },
      dialogType: "yjwzk",
      details: {
        title: data.name,
        person: data.linkName,
        phone: data.linkPhone,
        address: data.address,
      },
    };
  } else if (typeId == "jydw") {
    // 救援队伍
    return {
      markerType: "jydw",
      id: data.id,
      icon: "/images/marker/icon_team.png",
      lng: data.mapX || "",
      lat: data.mapY || "",
      name: "救援队伍",
      label: { text: "救援队伍", font_size: 16 },
      dialogType: "newyydxtj",
      details: {
        name: data.name,
        linkName: data.linkName,
        linkPhone: data.linkPhone,
        storageCapacity: data.storageCapacity,
      },
    };
  } else if (typeId == "bncs") {
    // 避难场所
    return {
      markerType: "bncs",
      id: data.id,
      icon: "/images/marker/icon-bncs.png",
      lng: data.mapX || "",
      lat: data.mapY || "",
      name: "避难场所",
      label: { text: "避难场所", font_size: 16 },
      dialogType: "bncs",
      details: {
        title: data.name,
        area: data.areaCovered,
        accommodateNum: data.accommodateNum,
        person: data.linkName,
        phone: data.linkPhone,
      },
    };
  } else if (typeId == "dxjx") {
    // 大型机械
    return {
      markerType: "dxjx",
      id: data.id,
      icon: "/images/marker/mapdot-construction-machinery.png",
      lng: data.mapX || "",
      lat: data.mapY || "",
      name: "大型机械",
      label: { text: "大型机械", font_size: 16 },
      dialogType: "yydxtj",
      details: {
        name: data.name,
        linkName: data.linkName,
        linkPhone: data.linkPhone,
        storageCapacity: data.storageCapacity,
      },
    };
  } else if (typeId == "yjgb") {
    // 应急广播
    return {
      markerType: "yjgb",
      id: data.id,
      icon: "/images/marker/mapdot-volume-up-f.png",
      lng: data.mapX || "",
      lat: data.mapY || "",
      name: "应急广播",
      label: { text: "应急广播", font_size: 16 },
      dialogType: "yydxtj",
      details: {
        name: data.name,
        linkName: data.linkName,
        linkPhone: data.linkPhone,
        storageCapacity: data.storageCapacity,
      },
    };
  } else if (typeId == "spjk") {
    // 视频监控
    return {
      markerType: "spjk",
      id: data.id,
      icon: "/images/marker/mapdot-scientific.png",
      lng: data.mapX || "",
      lat: data.mapY || "",
      name: "视频监控",
      label: { text: "视频监控", font_size: 16 },
      dialogType: "spjk",
      details: {
        monitorName: data.name,
        typeName: data.typeName,
        location: data.location,
      },
    };
  } else if (typeId == "煤矿") {
    return {
      markerType: "mk",
      id: data.id,
      lng: data.longitude,
      lat: data.latitude,
      name: "煤矿",
      icon: "/images/marker/icon_meikuang.png",
      label: { text: "煤矿", font_size: 16 },
      dialogType: "mk",
      details: {
        name: data.enterpriseName,
        type: data.enterpriseType,
        area: data.xzqhName,
        address: data.address,
      },
    };
  } else if (typeId == "非煤矿山") {
    return {
      markerType: "fmks",
      id: data.id,
      lng: data.longitude,
      lat: data.latitude,
      name: "非煤矿山",
      icon: "/images/marker/icon_kuangshan.png",
      label: { text: "非煤矿山", font_size: 16 },
      dialogType: "fmks",
      details: {
        name: data.enterpriseName,
        type: data.enterpriseType,
        area: data.xzqhName,
        address: data.address,
      },
    };
  } else if (typeId == "烟花爆竹") {
    return {
      markerType: "yhbzqy",
      id: data.id,
      lng: data.longitude,
      lat: data.latitude,
      name: "烟花爆竹企业",
      icon: "/images/marker/icon_yanhua.png",
      label: { text: "烟花爆竹企业", font_size: 16 },
      dialogType: "yhbzqy",
      details: {
        name: data.enterpriseName,
        type: data.enterpriseType,
        area: data.xzqhName,
        address: data.address,
      },
    };
  } else if (typeId == "危化") {
    return {
      markerType: "qyxx",
      id: data.id,
      lng: data.longitude,
      lat: data.latitude,
      name: "危化企业",
      icon: "/images/marker/mapdot-dangerous-chemicals.png",
      label: { text: "危化企业", font_size: 16 },
      dialogType: "qyxx",
      details: {
        name: data.enterpriseName,
        type: data.enterpriseType,
        area: data.xzqhName,
        address: data.address,
      },
    };
  }else if (typeId == "尾矿库") {
    return {
      markerType: "qyxx",
      id: data.id,
      lng: data.longitude,
      lat: data.latitude,
      name: "尾矿库",
      icon: "/images/marker/mapdot-dangerous-chemicals.png",
      label: { text: "尾矿库", font_size: 16 },
      dialogType: "qyxx",
      details: {
        name: data.enterpriseName,
        type: data.enterpriseType,
        area: data.xzqhName,
        address: data.address,
      },
    };
  }
};
let allDisasters = ref({});
const getAllDisasters = function () {
  const params = {
    map_x: props.centerPoint[0],
    map_y: props.centerPoint[1],
    radius: props.radius.effect_radius / 1000,
    typeIds: disaster_check_data.value.map((item) => item.value),
  };
  getZdfhmb(params).then((res) => {
    effect_cont.value[0].num = Math.floor(res.data.totalArea);
    effect_cont.value[1].num = Math.floor(res.data.total);
    res.data.data.forEach((item) => {
      allDisasters.value[item.typeId] = item.defenceAims.map((info) => {
        return {
          name: info.name || info.enterpriseName,
          id: info.id,
          markerInfo: getMarkerInfo(item.typeId, info),
        };
      });
    });
    console.log("xxxxxx:",allDisasters.value)
    nextTick(() => {
      for (const key in allDisasters.value) {
        allDisasters.value[key].forEach((item) => {
          $mitt.emit("addMarker", item.markerInfo);
        });
      }
    });
  });
};
let allAnalysis = ref({});
const getAllAnalysis = function () {
  const params = {
    map_x: props.centerPoint[0],
    map_y: props.centerPoint[1],
    radius: props.radius.analysis_radius / 1000,
    typeIds: analysis_check_data.value.map((item) => item.value),
  };
  getYybzfx(params).then((res) => {
    console.log(res);
    let data = res.data;
    for (const key in data) {
      let list = data[key] || [];
      allAnalysis.value[key] = list
        .map((item) => {
          return {
            name: item.name,
            id: item.id,
            markerInfo: getMarkerInfo(key, item),
          };
        })
        .slice(0, 10);
    }
    nextTick(() => {
      console.log(allAnalysis.value);
      for (const key in allAnalysis.value) {
        allAnalysis.value[key].forEach((item) => {
          $mitt.emit("addMarker", item.markerInfo);
        });
      }
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
    getAllAnalysis();
  });
};
const flyTo = function (info) {
  $mitt.emit("openPopup", info.markerInfo);
  $mitt.emit("flyTo", info.markerInfo);
};
const zddxList = computed(() => {
  return allDisasters.value[disaster_checked_data.value] || [];
});
const yjbzfxList = computed(() => {
  return allAnalysis.value[analysis_checked_data.value] || [];
});
const selectZddx = function (info) {
  disaster_checked_data.value = info.value;
};
const selectYjbzfx = function (info) {
  analysis_checked_data.value = info.value;
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
        height: 100px;

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
