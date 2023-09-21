<script setup>
import { computed, inject, ref } from "vue";
import { getZyfxList } from "@/api/modules/home.js";

const showDialog = ref(false);
const $mitt = inject("$mitt");
const drawEnd = function (info) {
  console.log(info);
  queryParams.value.map_x = info.center.lng + "";
  queryParams.value.map_y = info.center.lat + "";
  queryParams.value.radius = info.radius + "";
  showDialog.value = true;
  getAllList();
};
$mitt.on("drawEnd", drawEnd);

const queryParams = ref({
  map_x: "",
  map_y: "",
  radius: "",
  types: ["ry", "wzk", "jydw", "spjk", "dxjx", "bncs"],
});
const tabList = ref([
  { id: "ry", name: "人员" },
  { id: "wzk", name: "物资库" },
  { id: "jydw", name: "救援队伍" },
  { id: "spjk", name: "视频监控" },
  { id: "dxjx", name: "大型机械" },
  { id: "bncs", name: "避难场所" },
]);
const selectedTab = ref("ry");
const allListData = ref({});
const getAllList = function () {
  const param = {
    ...queryParams.value,
    radius: (queryParams.value.radius / 1000).toFixed(2),
  };
  getZyfxList(param).then((res) => {
    console.log("xxxxx", res);
    allListData.value = res.data;
    markAllPoint();
  });
};
const markAllPoint = function () {
  markRyPoint();
  markWzkPoint();
  markJydwPoint();
  markSpjkPoint();
  markDxjxPoint();
  markBncsPoint();
};

const markRyPoint = function () {
  let list = allListData.value.ry;
  list.forEach((item) => {
    $mitt.emit("addMarker", {
      markerType: "yjry",
      id: item.id,
      icon: "/images/marker/icon_renyuan.png",
      lng: item.mapX,
      lat: item.mapY,
      name: "应急人员",
      label: { text: "应急人员", font_size: 16 },
      dialogType: "yjry",
      details: {
        personalName: item.personalName,
        job: item.jobShortName,
        orgName: item.orgName,
        linkPhone: item.linkPhone,
        duties: item.duties,
      },
    });
  });
};
const markWzkPoint = function () {
  let list = allListData.value.wzk;
  list.forEach((item) => {
    $mitt.emit("addMarker", {
      markerType: "yjwzk",
      id: item.id,
      icon: "/images/marker/icon_material.png",
      lng: item.mapX,
      lat: item.mapY,
      name: "物资库",
      label: { text: "物资库", font_size: 16 },
      dialogType: "yjwzk",
      details: {
        title: item.storageName,
        person: item.linkName,
        address: item.address,
        phone: item.linkPhone,
      },
    });
  });
};
const markJydwPoint = function () {
  let list = allListData.value.jydw;
  list.forEach((item) => {
    $mitt.emit("addMarker", {
      markerType: "jydw",
      id: item.id,
      icon: "/images/marker/icon_team.png",
      lng: item.mapX,
      lat: item.mapY,
      name: "救援队伍",
      label: { text: "救援队伍", font_size: 16 },
      dialogType: "jydw",
      details: {
        title: item.name,
        type: item.typeName,
        total: item.amount,
        person: item.linkName,
        phone: item.linkPhone,
      },
    });
  });
};
const markSpjkPoint = function () {
  let list = allListData.value.spjk;
  list.forEach((item) => {
    $mitt.emit("addMarker", {
      markerType: "spjk",
      id: item.id,
      icon: "/images/marker/mapdot-scientific.png",
      lng: item.mapX,
      lat: item.mapY,
      name: "视频监控",
      label: { text: "视频监控", font_size: 16 },
      dialogType: "spjk",
      details: {
        monitorName: item.monitorName,
        typeName: item.typeName,
        location: item.location,
        playerUrl: item.playerUrl,
      },
    });
  });
};
const markDxjxPoint = function () {
  let list = allListData.value.dxjx;
  list.forEach((item) => {
    $mitt.emit("addMarker", {
      markerType: "dxjx",
      id: item.id,
      icon: "/images/marker/icon_shelter.png",
      lng: item.mapX,
      lat: item.mapY,
      name: "大型机械",
      label: { text: "大型机械", font_size: 16 },
      dialogType: "dxjx",
      details: {
        ...item,
      },
    });
  });
};
const markBncsPoint = function () {
  let list = allListData.value.bncs;
  list.forEach((item) => {
    $mitt.emit("addMarker", {
      markerType: "bncs",
      id: item.id,
      icon: "/images/marker/icon_shelter.png",
      lng: item.mapX,
      lat: item.mapY,
      name: "避难场所",
      label: { text: "避难场所", font_size: 16 },
      dialogType: "bncs",
      details: {
        title: item.name,
        area: item.areaCovered + "㎡",
        person: item.accommodateNum,
        address: item.location,
      },
    });
  });
};

const closeDialog = function () {
  showDialog.value = false;
};
const nowList = computed(() => {
  return allListData.value[selectedTab.value] || [];
});
</script>

<template>
  <div class="resource_analysis_dialog" v-if="showDialog">
    <div class="header">资源分析1</div>
    <div class="content">
      <div class="area">
        圈选范围：<span style="color: #fb8681"
          >{{ (queryParams.radius / 1000).toFixed(2) }} </span
        >公里
      </div>
      <ul class="tabs">
        <li
          class="tab"
          v-for="item in tabList"
          :key="item.id"
          :class="selectedTab === item.id ? 'selectedTab' : ''"
          @click="selectedTab = item.id"
        >
          {{ item.name }}
        </li>
      </ul>
      <ul class="point_list">
        <li class="item" v-for="item in nowList" :key="item.id">
          <div class="name">
            {{ item.name || item.monitorName || storageName }}
          </div>
          <div class="address">地址：{{ item.location || item.address }}</div>
          <!-- <div class="distance">
            约<span>{{ item.distance }}</span
            >米
          </div> -->
        </li>
      </ul>
    </div>
    <div class="close_icon" @click="closeDialog"></div>
  </div>
</template>

<style lang="scss" scoped>
.resource_analysis_dialog {
  position: absolute;
  left: 455px;
  top: 160px;
  color: #fff;
  width: 320px;
  padding: 24px;
  background: url(@/assets/common/dia.png) no-repeat;
  background-size: 100% 100%;
  .header {
    text-align: center;
    font-size: 24px;
    font-weight: 600;
  }
  .content {
    .area {
      font-size: 14px;
      text-align: center;
      margin: 28px 0 12px;
    }
    .tabs {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .tab {
        width: 32%;
        height: 36px;
        line-height: 36px;
        background-color: #0c4571;
        text-align: center;
        font-size: 14px;
        margin-bottom: 6px;
        border-radius: 4px;
        cursor: pointer;
      }
      .selectedTab {
        background-color: #1069ae;
      }
    }
    .point_list {
      height: 300px;
      overflow-y: auto;
      margin-top: 10px;
      &::-webkit-scrollbar {
        display: none;
      }
      .item {
        position: relative;
        margin-bottom: 6px;
        cursor: pointer;
        background-color: #305077;
        padding-left: 20px;
        font-size: 13px;
        line-height: 16px;
        height: 48px;
        box-sizing: border-box;
        padding-top: 8px;
        border-radius: 4px;
        .name {
          margin-bottom: 3px;
        }
        .distance {
          position: absolute;
          right: 10px;
          top: 8px;
          span {
            color: #d8ad27;
          }
        }
      }
    }
  }
  .close_icon {
    width: 18px;
    height: 18px;
    background: url(@/assets/icons/close.png) no-repeat;
    background-size: 100% 100%;
    position: absolute;
    cursor: pointer;
    right: 24px;
    top: 28px;
  }
}
</style>
