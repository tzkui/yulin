<script setup>
import { inject, ref, onMounted } from "vue";

const showDialog = ref(false);
const $mitt = inject("$mitt");

const closeDialog = function () {
  showDialog.value = false;
};

const allDatas = ref([]);
const initDatas = function () {
  let stores = window.STORE_INFO;
  // 应急机构
  const yjjgListData = stores.yjjgListData?.map((item)=>{
    return {
      id: item.id,
      name: item.orgName,
      type: "应急机构",
      markerType: "yjjg",
      dialogType: "yjjg",
      icon: "/images/marker/icon_jigou.png",
      label: { text: "应急机构", font_size: 16 },
      lng: item.mapX,
      lat: item.mapY,
      details: {
        orgName: item.orgName,
        typeName: item.typeName
      }
    }
  }) || [];
  // 救援队伍
  const jydwListData = stores.jydwListData?.map(item=>{
    let info = JSON.parse(item.spare1);
    return {
      id: item.id,
      name: item.title,
      markerType: "jydw",
      dialogType: "jydw",
      icon: "/images/marker/icon_team.png",
      label: { text: "救援队伍", font_size: 16 },
      type: "救援队伍",
      lng: item.mapX,
      lat: item.mapY,
      details: {
        title: item.title,
        type: info.hylx,
        total: info.amount,
        person: info.linkName,
        phone: info.linkPhone
      },
    }
  }) || [];
  // 应急物资库
  const yjwzkListData = stores.yjwzkListData?.map((item)=>{
    let info = JSON.parse(item.spare1);
    return {
      id: item.id,
      name: item.title,
      markerType: "yjwzk",
      dialogType: "yjwzk",
      icon: "/images/marker/icon_material.png",
      label: { text: "应急物资库", font_size: 16 },
      type: "应急物资库",
      lng: item.mapX,
      lat: item.mapY,
      details: {
        title: item.title,
        person: info.linkName,
        phone: info.linkPhone,
        address: info.address,
      },
    }
  }) || []
  // 救援装备
  const jyzbListData = stores.yjzbListData?.map((item)=>{
    let info = JSON.parse(item.spare1);
    return {
      id: item.id,
      name: item.title,
      markerType: "yjzb",
      dialogType: "yjzb",
      icon: "/images/marker/icon-material.png",
      label: { text: "救援装备", font_size: 16 },
      type: "救援装备",
      lng: item.mapX,
      lat: item.mapY,
      details: {
        name: item.title,
        linkName: info.linkName,
        linkPhone: info.linkPhone,
        location: info.address,
      },
    }
  }) || []
  // 隐患地点
  const yhddListData = stores.jsdListData?.map((item)=>{
    return {
      id: item.id,
      name: item.name,
      type: "隐患地点",
      markerType: "jsd",
      dialogType: "jsd",
      icon: "/images/marker/icon_jsd.png",
      label: { text: "隐患地点", font_size: 16 },
      lng: item.mapX,
      lat: item.mapY,
      details: {
        name: item.name,
        info: item.jsyy,
        person: item.person,
        phone: item.lxdh
      }
    }
  }) || [];
  // 防护目标
  const fhmbListData = stores.fhmbListData?.map((item)=>{
    let info = JSON.parse(item.spare1);
    return {
      id: item.id,
      name: item.title,
      markerType: "fhmb",
      dialogType: "fhmb",
      icon: "/images/marker/icon_fhmb.png",
      label: { text: "防护目标", font_size: 16 },
      type: "防护目标",
      lng: item.mapX,
      lat: item.mapY,
      details: {
        name: item.title,
        typeName: info.typeName,
        linkName: info.linkName,
        linkPhone: info.linkPhone,
        location: info.location,
      },
    }
  }) || []
  // 避难场所
  const bncsListData = stores.bncsListData?.map((item)=>{
    let info = JSON.parse(item.spare1);
    return {
      id: item.id,
      name: item.title,
      markerType: "bncs",
      dialogType: "bncs",
      icon: "/images/marker/icon_shelter.png",
      label: { text: "避难场所", font_size: 16 },
      type: "避难场所",
      lng: item.mapX,
      lat: item.mapY,
      details: {
        title: item.title,
        area: info.areaCovered,
        accommodateNum: info.accommodateNum,
        person: info.linkName,
        phone: info.linkPhone,
      },
    }
  }) || []
  // 企业信息
  const qyxxListData = stores.qyxxListData?.map((item) => {
    let info = JSON.parse(item.spare1);
    return {
      id: item.id,
      name: item.title,
      markerType: "qyxx",
      dialogType: "qyxx",
      icon: "/images/marker/mapdot-building-6.png",
      label: { text: "企业信息", font_size: 16 },
      type: "企业信息",
      lng: item.mapX,
      lat: item.mapY,
      details: {
        name: item.title,
        type: info.enterpriseType,
        area: info.xzqhName,
        address: info.address,
      },
    };
  }) || [];
  // 视频监控
  const spjkListData = stores.spjkListData?.map((item)=>{
    return {
      id: item.id,
      name: item.monitorName,
      type: "视频监控",
      markerType: "spjk",
      dialogType: "spjk",
      icon: "/images/marker/mapdot-scientific.png",
      label: { text: "视频监控", font_size: 16 },
      lng: item.mapX,
      lat: item.mapY,
      details: {
        monitorName: item.monitorName,
        typeName: item.typeName,
        location: item.location,
        playerUrl: item.playerUrl
      }
    }
  }) || [];
  allDatas.value = [
    ...yjjgListData,
    ...jydwListData,
    ...yjwzkListData,
    ...jyzbListData,
    ...yhddListData,
    ...fhmbListData,
    ...bncsListData,
    ...qyxxListData,
    ...spjkListData,
  ];
};
const keyword = ref("");
const list = ref([]);
const searchList = function () {
  console.log("搜索了", window.STORE_INFO);
  if(keyword.value){
    list.value = allDatas.value.filter((item) => item.lng&&item.name.includes(keyword.value))
  }else{
    list.value = []
  }
};
const setMarker = function (info){
  $mitt.emit("addMarker", info)
  $mitt.emit("openPopup", info);
  $mitt.emit("flyTo", info)
}
onMounted(() => {
  $mitt.on("openSearchDialog", function () {
    showDialog.value = true;
    initDatas();
  });
});
</script>

<template>
  <div class="map_search_dialog" v-if="showDialog">
    <div class="header">地图搜索</div>
    <div class="content">
      <div class="search_box">
        <input
          type="text"
          v-model="keyword"
          placeholder="搜索"
          @keyup.enter="searchList"
        />
        <img
          class="img"
          src="@/assets/home/icon_search.png"
          @click="searchList"
        />
      </div>
      <div class="scroll_box">
        <ul class="point_list">
          <li v-for="item in list" :key="item.id" @click="setMarker(item)">
            <div class="name" :title="item.name">{{ item.name }}</div>
            <div class="type">{{ item.type }}</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="close_icon" @click="closeDialog"></div>
  </div>
</template>

<style lang="scss" scoped>
.search_box {
  margin-top: 20px;
  display: flex;
  align-items: center;
  width: 100%;
  height: 32px;
  background: rgba(9, 39, 67, 0.7);
  border: 1px solid #1e89fd;
  padding-right: 12px;
  margin-bottom: 10px;
  input {
    width: 300px;
    color: #fff;
    font-size: 16px;
    height: 24px;
    line-height: 24px;
    padding-left: 8px;
    &::placeholder {
      color: #fff;
    }
  }
  :deep(.el-input__inner) {
    &::-webkit-input-placeholder {
      font-size: 16px;
      color: #aacbf6 !important;
    }
  }

  .img {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
}
.map_search_dialog {
  position: absolute;
  right: 455px;
  bottom: 80px;
  color: #fff;
  width: 320px;
  padding: 24px;
  background: url(@/assets/common/dia.png) no-repeat;
  background-size: 100% 100%;
  z-index: 99;
  height: 480px;
  .header {
    text-align: center;
    font-size: 24px;
    font-weight: 600;
  }
  .content {
    .scroll_box {
      width: 280px;
      overflow-y: auto;
      height: 342px;
    }
    .point_list {
      width: 272px;
      > li {
        width: 100%;
        height: 60px;
        position: relative;
        cursor: pointer;
        background: rgba(22, 108, 217, 0.4);
        border: 1px solid #166cd9;
        margin-bottom: 5px;
        box-sizing: border-box;
        padding-left: 5px;
        border-radius: 2px;
        .name {
          color: #76a4e4;
          font-weight: bold;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin: 8px 0;
          font-size: 15px;
        }
        .type {
          font-size: 15px;
          color: #fff;
        }
        &:last-child {
          margin-bottom: 0;
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
