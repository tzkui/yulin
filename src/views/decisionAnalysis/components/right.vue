<template>
  <div class="right">
    <!-- 灾情分析 / 重点防护目标 -->
    <zddxfxVue :center="eventCenter"></zddxfxVue>
    <!-- <ViewBox title="应急保障分析">
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
    </ViewBox> -->
    <ViewBox title="灾情综合查询">
      <div class="disaster_synthesis">
        <div v-show="showDetail" class="disaster_synthesis_details">
          <button class="back_list" @click="() => {
              showDetail = false;
            }
            ">
            返回
          </button>
          <div v-if="disaster_synthesis_details.length" class="synthesis_details">
            <div class="synthesis_detail" v-for="(item, index) in disaster_synthesis_details" :key="index">
              <div class="date_time">
                {{ item.dynamicsDate.substr(0, 10) }}
                <span class="time">{{ item.dynamicsDate.substr(11) }}</span>
              </div>
              <div class="cont">
                <span class="blue">{{ item.dynamicsTag }}</span>
                {{ item.dynamicsContent }}
              </div>
            </div>
          </div>
        </div>

        <div v-show="!showDetail" class="affairmain">
          <!-- 还是判断循环渲染添加进行 -->
          <template v-for="(item, index) in disaster_synthesis">
            <div :class="{ item: true, active: currentEvent == item.event.id }" v-if="item.event.eventLevel == '1'"
              @click="setMarker('zqzhcx', item)" :key="index">
              <p class="itemtitle">{{ item.event.eventLevelName + "事件" }}</p>
              <p class="centers">
                <span class="center_text">详情: {{ item.event.eventContent }}</span>
                <span class="center_text">时间: {{ item.event.eventDate }}</span>
                <span class="center_text">地点: {{ item.event.eventAddress }}</span>
              </p>
              <div class="labels">
                <p class="labels-top">
                  <span class="one">{{ item.event.typeName }}</span>
                  <span class="twopro" v-if="item.event.stateName == '处理中'">{{ item.event.stateName }}</span>
                  <span class="two" v-else>{{ item.event.stateName }}</span>
                </p>
                <p class="labels-top">
                  <span class="three" @click.stop="doZj(item)">战评总结</span>
                  <span class="three" @click.stop="doGd(item)" v-if="item.event.sfgd === '未归档'">归档</span>
                  <span class="three" v-else style="background-color: #5C7CDA;">已归档</span>
                </p>
                <p class="labels-bottoms">
                  <span class="labels-bottom">{{
                    item.event.reportStateName
                  }}</span>
                </p>
              </div>
            </div>
            <!-- 下面这个就是较大事件的 -->
            <div :class="{ itempro: true, active: currentEvent == item.event.id }" v-if="item.event.eventLevel == '3'"
              @click="setMarker('zqzhcx', item)" :key="index">
              <p class="itemtitle">{{ item.event.eventLevelName + "事件" }}</p>
              <p class="centers">
                <span class="center_text">详情: {{ item.event.eventContent }}</span>
                <span class="center_text">时间: {{ item.event.eventDate }}</span>
                <span class="center_text">地点: {{ item.event.eventAddress }}</span>
              </p>
              <div class="labels">
                <p class="labels-top">
                  <span class="one">{{ item.event.typeName }}</span>
                  <span class="twopro" v-if="item.event.stateName == '处理中'">{{ item.event.stateName }}</span>
                  <span class="two" v-else>{{ item.event.stateName }}</span>
                </p>
                <p class="labels-top">
                  <span class="three" @click.stop="doZj(item)">战评总结</span>
                  <span class="three" @click.stop="doGd(item)" v-if="item.event.sfgd === '未归档'">归档</span>
                  <span class="three" v-else style="background-color: #5C7CDA;">已归档</span>
                </p>
                <p class="labels-bottoms">
                  <span class="labels-bottom">{{
                    item.event.reportStateName
                  }}</span>
                </p>
              </div>
            </div>
          </template>
        </div>
      </div>
    </ViewBox>
    <ViewBox title="案例库">
      <div class="case_library">
        <div class="case_library_btn" @click="goPgae">查看</div>
      </div>
    </ViewBox>
    <zpgzDialog ref="zpgzDialogRef"></zpgzDialog>
  </div>
</template>

<script setup>
import { ref, onMounted, inject, nextTick, computed } from "vue";
const $mitt = inject("$mitt");
const emit = defineEmits(["changeRadius", "eventClick"]);
import { ElMessage } from 'element-plus'
import {
  getZdfhmb,
  getYybzfx,
  getZdfhmbType,
  getYybzfxType,
  getZqzhcx,
  doGdApi,
} from "@/api/decision_analysis.js";

import zpgzDialog from './components/zpgzDialog.vue'
import ViewBox from "@/components/common/view-box.vue";
import zddxfxVue from './components/zddxfx.vue'

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
const eventCenter = ref([])
const zpgzDialogRef = ref()
const showDetail = ref(false)
const showNum = ref(false)
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
const dxzhtData = ref({
  name: "大型综合体",
  num: 0,
  value: "大型综合体"
})
// 灾情资源 场所选择tab
const disaster_check_data = ref([]);
// 灾情资源 场所选择tab  已选择内容
const disaster_checked_data = ref("");

const analysis_check_data = ref([]);

onMounted(() => {
  initType();
  initZqzhcx();
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
  } else if (typeId == "尾矿库") {
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
    showNum.value = true;
    effect_cont.value[0].num = Math.floor(res.data.totalArea);
    effect_cont.value[1].num = Math.floor(res.data.total);
    res.data.data.forEach((item) => {
      for (const info of disaster_check_data.value) {
        if (info.value === item.typeId) {
          info.num = item.count;
        }
      }
      allDisasters.value[item.typeId] = item.defenceAims.map((info) => {
        return {
          name: info.name || info.enterpriseName,
          id: info.id,
          markerInfo: getMarkerInfo(item.typeId, info),
        };
      });
    });
    console.log("xxxxxx:", allDisasters.value);
    // nextTick(() => {
    //   for (const key in allDisasters.value) {
    //     allDisasters.value[key].forEach((item) => {
    //       $mitt.emit("addMarker", item.markerInfo);
    //     });
    //   }
    // });
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
    let data = res.data;
    for (const key in data) {
      let list = data[key] || [];
      allAnalysis.value[key] = list.map((item) => {
        return {
          name: item.name,
          id: item.id,
          markerInfo: getMarkerInfo(key, item),
        };
      });
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
const selectZddx = function (info) {
  console.log(info, info.value)
  disaster_checked_data.value = info.value;
};

const goPgae = function () {
  window.location.href = window.baseIp1 + ":20128/basics/eventcase"
}
const disaster_synthesis = ref([]);
// 灾情综合查询列表 详情
const disaster_synthesis_details = ref([]);
const currentEvent = ref();
// 灾情综合查询
const initZqzhcx = async () => {
  let res = await getZqzhcx();
  console.log("getZqzhcx===========>", res);
  disaster_synthesis.value = res.data;
};
// 列表点击撒点...
const setMarker = (type, data) => {
  console.log(type, data)
  eventCenter.value = [data.event.mapX, data.event.mapY]
  // console.log("item===========>", data);
  // return
  disaster_synthesis_details.value = data.eventDynamics;

  let item = data.event;
  currentEvent.value = item.id;
  // 先清除 再撒点
  $mitt.emit("clearAll", { ignore: ["geo绘制图层"] });
  emit("eventClick", item);
  let markerData = {
    markerType: "sj",
    id: item.id,
    lng: item.mapX,
    lat: item.mapY,
    name: item.typeName,
    icon: "/images/marker/1.gif",
    label: { text: item.typeName, font_size: 16 },
    dialogType: "zqzhcx",
    details: {
      date: item.eventDate.replace(" ", "&nbsp;"),
      name: item.eventName,
      location: item.eventAddress,
      cont: item.eventContent,
      typeName: item.typeName,
      eventLevelName: item.eventLevelName,
      zpzj: item.zpzj,
    },
  };
  if (type === "zqzhcx") {
    showDetail.value = !showDetail.value;
    $mitt.emit("addMarker", markerData);
    $mitt.emit("openPopup", markerData);
    $mitt.emit("flyTo", markerData);
  }
};
const doZj = function (info) {
  zpgzDialogRef.value.openDialog(info)
}
const doGd = function (info) {
  console.log("归档了")
  doGdApi({ eventId: info.event.id }).then(res => {
    info.event.sfgd = "已归档"
  }).catch(() => { }).finally(() => {
    ElMessage.success("归档成功")
  })
}
</script>

<style scoped lang="less">
.right {
  .resources {
    height: 520px;

    .effect_cont_lists {
      display: flex;
      justify-content: space-around;
      margin-top: 10px;

      .effect_cont_list {
        height: 95px;
        flex: 1;
        margin-right: 10px;
        background: url("@/assets/decisionAnalysis/effect_box_bg.png") center/100% 100% no-repeat;
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
            background-image: -webkit-linear-gradient(left,
                #e6964f,
                #d16537 80%);
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
        height: 145px;

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
        background: url("@/assets/decisionAnalysis/tab.png") center/99% 100% no-repeat;
        margin-bottom: 8px;
        margin-right: 5px;

        &:nth-child(4n) {
          margin: 0;
        }

        &.active {
          background: url("@/assets/decisionAnalysis/tab_active.png") center/99% 100% no-repeat;
        }
      }
    }
  }
}

.disaster_synthesis {
  height: 220px;
  position: relative;

  .synthesis_search {
    position: absolute;
    top: -55px;
    right: 30px;
    display: flex;
    align-items: center;

    :deep(.el-input) {
      height: 32px;
      width: 150px;
      border: 1px solid #0698d7 !important;
      border-radius: 5px;
    }

    .search_btn {
      height: 30px;
      line-height: 30px;
      width: 58px;
      background: linear-gradient(90deg, #0698d7 0%, #24e3d7 100%);
      text-align: center;
      cursor: pointer;
      font-size: 14px;
      margin-left: 3px;
    }
  }

  .affairmain {
    height: 100%;
    overflow-y: auto;
    padding: 0 10px 0 0;

    .item:hover,
    .item.active {
      background-color: #09212f;
    }

    .item {
      cursor: pointer;
      display: flex;
      width: 100%;
      height: 115px;
      flex-direction: row;
      align-items: center;
      padding: 8px 8px;
      padding-right: 2px;
      border-bottom: 2px solid rgba(10, 54, 72, 1);

      .itemtitle {
        width: 64px;
        height: 24px;
        background-color: #367ebc;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 16px;
      }

      // 中间内容
      .centers {
        width: 174px;
        height: 100%;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        margin-right: 10px;
        font-size: 14px;
        color: rgba(208, 222, 238, 1);
      }

      // 下面就是最后的标签的部分的了
      .labels {
        flex: 1;
        width: 1;

        .labels-top {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;

          .one {
            width: 79px;
            height: 26px;
            background-color: #061b42;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #d9dde2;
            border: 1px solid #1d75d6;
          }

          .two {
            width: 52px;
            height: 26px;
            background-color: #061b42;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #1a73d8;
            border: 1px solid #1d75d6;
          }

          .twopro {
            width: 52px;
            height: 26px;
            background-color: #061b42;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #b9ca3a;
            border: 1px solid #1d75d6;
          }

          .three {
            width: 64px;
            height: 26px;
            background-color: #061b42;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #d9dde2;
            border: 1px solid #1d75d6;
          }
        }

        // 底部的标签
        .labels-bottoms {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: end;
          color: #35dfed;
        }

        .labels-bottom {
          background: linear-gradient(180deg, #0a2049 20%, #335494 100%);
          padding: 5px;
          text-align: end;
          border: 1px solid #48b7bd;
        }
      }
    }

    .centers {
      .center_text {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    // 下面就是较大事件的
    .itempro:hover,
    .itempro.active {
      background-color: #09212f;
    }

    .itempro {
      cursor: pointer;
      display: flex;
      width: 100%;
      height: 105px;
      flex-direction: row;
      align-items: center;
      padding: 8px 8px;
      padding-right: 2px;
      border-bottom: 2px solid rgba(10, 54, 72, 1);
      background-color: transparent;

      .itemtitle {
        width: 64px;
        height: 24px;
        background-color: #eead0e;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 16px;
      }

      // 中间内容
      .centers {
        width: 174px;
        height: 100%;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        margin-right: 10px;
        font-size: 14px;
        color: rgba(208, 222, 238, 1);
      }

      // 下面就是最后的标签的部分的了
      .labels {
        flex: 1;
        width: 1;

        .labels-top {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          margin-bottom: 10px;

          .one {
            width: 64px;
            height: 26px;
            background-color: #061b42;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #d9dde2;
            border: 1px solid #1d75d6;
          }

          .two {
            width: 52px;
            height: 26px;
            background-color: #061b42;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #1a73d8;
            border: 1px solid #1d75d6;
          }

          .twopro {
            width: 52px;
            height: 24px;
            background-color: #061b42;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #b9ca3a;
            border: 1px solid #1d75d6;
          }
        }

        // 底部的标签
        .labels-bottoms {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: end;
        }

        .labels-bottom {
          background: linear-gradient(180deg, #0a2049 20%, #335494 100%);
          padding: 5px;
          text-align: end;
          color: #b2a559;
          border: 1px solid #48b7bd;
        }
      }
    }
  }

  .disaster_synthesis_details {
    height: 100%;
    padding: 0 0 0 20px;
    border-left: 1px solid #0c2230;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: self-start;

    &::before {
      position: absolute;
      content: "";
      top: 2px;
      left: -4px;
      width: 7px;
      height: 7px;
      background: rgba(223, 253, 255, 0.8);
      transform: rotate(45deg);
      box-shadow: 0 0 10px 2px rgba(19, 147, 191, 1);
    }

    &::after {
      position: absolute;
      content: "";
      top: calc((100% - 4px) / 2);
      left: -4px;
      width: 6px;
      height: 6px;
      background: rgba(19, 147, 191, 0.8);
      transform: rotate(45deg);
      box-shadow: 0 0 10px 2px rgba(19, 147, 191, 1);
    }

    .back_list {
      margin-bottom: 20px;
      padding: 6px 15px;
      color: #ffffff;
      box-shadow: inset 0px 0px 10px 0px #159aff;
      background: rgba(21, 154, 255, 0.1);

      &:hover {
        background: rgba(102, 225, 223, 0.1);
        box-shadow: inset 0px 0px 10px 0px #66e1df;
      }
    }

    .synthesis_details {
      flex: 1;
      overflow: auto;
      width: 100%;
    }

    .synthesis_detail {
      margin-bottom: 15px;

      .date_time {
        font-size: 12px;
        color: #eee;
        margin-bottom: 10px;

        .time {
          font-size: 14px;
          color: #fff;
          margin-left: 5px;
        }
      }

      .cont {
        height: 78px;
        overflow: auto;
        background: url("@/assets/decisionAnalysis/command-bg.png") center/100% no-repeat;
        padding: 15px;
        font-size: 14px;
        color: #ccc;
        line-height: 18px;

        .blue {
          color: #21c0bc;
          margin-right: 3px;
        }
      }
    }

    .empty_data {
      width: 100%;
      text-align: center;
      font-size: 14px;
    }
  }
}

.alk_list {
  height: 190px;
  overflow-y: auto;

  >li {
    font-size: 16px;
    line-height: 28px;
    display: flex;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #0a3648;

    .level {
      width: 64px;
      height: 24px;
      background-color: #367ebc;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 16px;
      line-height: 24px;
      text-align: center;
      border-radius: 2px;
    }

    .infos {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }

    &:hover {
      background: #092a33;
    }
  }
}

.case_library {
  position: relative;

  .case_library_btn {
    height: 23px;
    line-height: 23px;
    width: 58px;
    position: absolute;
    top: -50px;
    right: 30px;
    background: linear-gradient(90deg, #0698d7 0%, #24e3d7 100%);
    text-align: center;
    cursor: pointer;
    font-size: 14px;
  }
}
</style>
