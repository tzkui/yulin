<script setup>
import { computed, inject, ref, nextTick, onMounted } from "vue";
import { getZyfxList } from "@/api/modules/home.js";

const showDialog = ref(false);
const $mitt = inject("$mitt");
const drawEnd = function (info) {
  console.log(info);
  if (info.radius) {
    queryParams.value.map_x = info.center.lng + "";
    queryParams.value.map_y = info.center.lat + "";
    queryParams.value.radius = info.radius + "";
    showDialog.value = true;
    getAllList();
  }
};
// 将度数转换为弧度
function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

// 计算两个经纬度点之间的距离（单位：千米）
function calculateDistance(lat1, lon1, lat2, lon2) {
  const earthRadiusKm = 6371; // 地球半径（千米）

  const dLat = degreesToRadians(lat2 - lat1);
  const dLon = degreesToRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degreesToRadians(lat1)) *
      Math.cos(degreesToRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = earthRadiusKm * c * 1000;

  return parseInt(distance);
}
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

const getPointInfos = {
  ry(item) {
    return {
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
    };
  },
  wzk(item) {
    return {
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
    };
  },
  jydw(item) {
    return {
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
    };
  },
  spjk(item) {
    return {
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
    };
  },
  dxjx(item) {
    return {
      markerType: "dxjx",
      id: item.id,
      icon: "/images/marker/icon_dxjx.png",
      lng: item.mapX,
      lat: item.mapY,
      name: "大型机械",
      label: { text: "大型机械", font_size: 16 },
      dialogType: "dxjx",
      details: {
        ...item,
      },
    };
  },
  bncs(item) {
    return {
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
    };
  },
};

const markRyPoint = function () {
  let list = allListData.value.ry;
  list.forEach((item) => {
    $mitt.emit("addMarker", getPointInfos.ry(item));
  });
};
const markWzkPoint = function () {
  let list = allListData.value.wzk;
  list.forEach((item) => {
    $mitt.emit("addMarker", getPointInfos.wzk(item));
  });
};
const markJydwPoint = function () {
  let list = allListData.value.jydw;
  list.forEach((item) => {
    $mitt.emit("addMarker", getPointInfos.jydw(item));
  });
};
const markSpjkPoint = function () {
  let list = allListData.value.spjk;
  list.forEach((item) => {
    $mitt.emit("addMarker", getPointInfos.spjk(item));
  });
};
const markDxjxPoint = function () {
  let list = allListData.value.dxjx;
  list.forEach((item) => {
    $mitt.emit("addMarker", getPointInfos.dxjx(item));
  });
};
const markBncsPoint = function () {
  let list = allListData.value.bncs;
  list.forEach((item) => {
    $mitt.emit("addMarker", getPointInfos.bncs(item));
  });
};
const showPopup = function (info) {
  $mitt.emit("flyTo", { lng: info.mapX, lat: info.mapY, zoom: 18 });
  let dict = { ry: "yjry", wzk: "yjwzk" };
  let type = dict[selectedTab.value] || selectedTab.value;
  // 判断有dom了再弹popup
  let timer = setInterval(() => {
    let dom = document.getElementById(`icon_${type}_${info.id}`);
    if (dom) {
      $mitt.emit("openPopup", getPointInfos[selectedTab.value](info));
      clearInterval(timer);
    }
  }, 500);
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
    <div class="header">资源分析</div>
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
        <li
          class="item"
          v-for="item in nowList"
          :key="item.id"
          @click="showPopup(item)"
        >
          <div class="name">
            {{
              item.name ||
              item.monitorName ||
              item.storageName ||
              item.title ||
              item.personalName
            }}
          </div>
          <template v-if="selectedTab === 'ry'">
            <div>职务：{{ item.job }}</div>
            <div>所属单位：{{ item.orgName }}</div>
          </template>
          <template v-else-if="selectedTab === 'wzk'">
            <div>地址： {{ item.address }}</div>
          </template>
          <template v-else-if="selectedTab === 'jydw'">
            <div>
              <span style="margin-right: 20px"
                >总人数：{{ item.amount }}人</span
              >
              <span>负责人：{{ item.linkName }}</span>
            </div>
          </template>
          <template v-else-if="selectedTab === 'spjk'">
            <div>位置：{{ item.location }}</div>
          </template>
          <template v-else-if="selectedTab === 'dxjx'">
            <div>所属组织：{{ item.ssqy }}</div>
          </template>
          <template v-else>
            <div>
              <span style="margin-right: 20px"
                >面积：{{ item.areaCovered }}㎡</span
              >
              <span>可容纳人数：{{ item.accommodateNum }}人</span>
            </div>
          </template>
          <div class="distance">
            约<span>{{
              calculateDistance(
                queryParams.map_x,
                queryParams.map_y,
                item.mapX,
                item.mapY
              )
            }}</span
            >米
          </div>
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
        line-height: 20px;
        // height: 48px;
        box-sizing: border-box;
        padding-top: 8px;
        padding-bottom: 8px;
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
