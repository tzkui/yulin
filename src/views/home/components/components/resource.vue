<script setup>
import ViewBox from "@/components/common/view-box.vue";
import { onMounted, ref, nextTick, inject } from "vue";
import { bg_config } from "../../config";

import { useEventBus } from "@vueuse/core";
import selectDialogVue from "@/views/natural/components/selectDialog.vue";
import addressBoox from "./dialogs/addressBoox.vue";
import { getYjjy, getRhtx, getSpjk, getTxl } from "@/api/modules/home.js";
const imgefileUrl = (url) => {
  return new URL(url, import.meta.url).href;
};
const mockData = function () {
  markerDatas.zj = {
    lx: "list",
    sl: 1,
    jh: [
      {
        id: "zjmock",
        monitorName: "住建监控1-1",
        typeName: "住建监控",
        location: "榆林市横山区郭家沟西南约40米",
        mapX: 109.93561,
        mapY: 37.57452,
      },
    ],
  };
  markerDatas.zhzf = {
    lx: "list",
    sl: 1,
    jh: [
      {
        id: "zhzfmock",
        monitorName: "综合执法监控1",
        typeName: "综合执法监控",
        location: "榆林市郭家沟西南约4000米",
        mapX: 109.43561,
        mapY: 37.57452,
      },
    ],
  };
};
const $mitt = inject("$mitt");
const openVideoConferencingBus = useEventBus("openVideoConferencing");
const emit = defineEmits(["openDialog", "closeAllDialog"]);
let currentResources = ref("yjzy");
let resources_list_all = ref([
  [
    { name: "救援队伍", num: 453, type: "jydw", icon: "yjdw" },
    // { name: "应急人员", num: 453, type: "yjry", icon: "yjry" },
    { name: "应急专家", num: 453, type: "yjzj", icon: "yjzj" },
    { name: "物资仓库", num: 453, type: "yjwzk", icon: "yjck" },
    { name: "避难场所", num: 453, type: "bncs", icon: "bncs" },
    { name: "救援装备", num: 453, type: "yjzb", icon: "yjzb" },
    { name: "防护目标", num: 453, type: "fhmb", icon: "fhmb" },
  ],
  [
    { name: "应急单兵", num: 5, type: "yjdb", icon: "yjdb" },
    { name: "无人机", num: 3, type: "wrj", icon: "wrj" },
    { name: "卫星电话", num: 2, type: "wxdh", icon: "wxdh" },
    { name: "窄带通信", num: 10, type: "zdtx", icon: "zdtx" },
    { name: "通讯录", num: 10, type: "txl", icon: "txl" },
    { name: "视频会商", num: 16, type: "sphs", icon: "sphs" },
  ],
  [
    { name: "华为", type: "hw", icon: "sphs" },
    { name: "科达", type: "kd", icon: "sphs" },
  ],
  [
    { name: "危化企业", num: 453, type: "whqy", icon: "spjk" },
    { name: "公安", num: 0, type: "ga", icon: "spjk" },
    { name: "交警", num: 0, type: "jj", icon: "spjk" },
    { name: "水利", num: 0, type: "sl", icon: "spjk" },
    { name: "住建", num: 0, type: "zj", icon: "spjk" },
    { name: "综合执法", num: 0, type: "zhzf", icon: "spjk" },
  ],
]);
let resources_list = ref([]);
// 应急资源
const resources_tab = ref([
  {
    name: "应急救援",
    icon: "../../../../assets/home/resources_tab1.png",
    type: "yjzy",
  },
  {
    name: "融合通信",
    icon: "../../../../assets/home/resources_tab2.png",
    type: "rhtx",
  },
  {
    name: "视频会商",
    icon: "../../../../assets/home/resources_tab3.png",
    type: "sphs",
  },
  {
    name: "视频监控",
    icon: "../../../../assets/home/resources_tab4.png",
    type: "spjk",
  },
]);
const markerDatas = Object.create(null);
const search_value = ref();

const showSelect = ref(false);
const selectDatas = ref({});
const getYjjyList = function () {
  getYjjy().then((res) => {
    for (let key in res.data) {
      markerDatas[key] = res.data[key];
      // 向右下侧选择框传值
      let info = res.data[key];
      if (info.lx === "list") {
        window.STORE_INFO[key + "ListData"] = info.jh
        // sessionStorage.setItem(key + "ListData", JSON.stringify(info.jh));
      } else {
        let arr = info.jh.filter((item) => item.dataType === 2);
        window.STORE_INFO[key + "ListData"] = arr
        // sessionStorage.setItem(key + "ListData", JSON.stringify(arr));
      }
    }
    resources_list_all.value[0].forEach((item) => {
      item.num = markerDatas[item.type]?.sl;
    });
    changeResources(currentResources.value, 0);
  });
};

const getRhtxList = function () {
  getRhtx().then((res) => {
    console.log("融合通信：", res);
    let wxdhList = res.data[0].jh.map((item) => {
      return {
        ...item,
        name: item.bgrlxdh,
      };
    });
    markerDatas.wxdh = {
      type: "list",
      sl: res.data[0].sz,
      jh: wxdhList,
    };
    sessionStorage.setItem("wxdhListData", JSON.stringify(wxdhList));

    let wrjList = [
      { name: "无人机1", mapX: 109.488, mapY: 38.013, id: "112345" },
      { name: "无人机2", mapX: 108.888, mapY: 37.413, id: "1212112" },
      { name: "无人机3", mapX: 110.188, mapY: 38.713, id: "9988" },
    ];
    markerDatas.wrj = {
      type: "list",
      sl: 3,
      jh: wrjList,
    };
    window.STORE_INFO.wrjListData = wrjList
    // sessionStorage.setItem("wrjListData", JSON.stringify(wrjList));
  });
};
const getTxlList = function(){
  getTxl().then(res=>{
    let list = res.data.map(item=>{
      if(item.dataType == 1){
        return {
          ...item,
          name: item.title
        }
      }else{
        try {
          return {
            ...item,
            name: item.personalName,
            linkPhone: JSON.parse(item.spare1)?.linkPhone
          }
          
        } catch (error) {
          return {
            ...item,
            name: item.personalName,

          }
        }
      }
    })
    resources_list_all.value[1][4].num=list.length - 13
    markerDatas.txl = {
      lx: "tree",
      sl: list.length-13,
      jh: list,
    };
    window.STORE_INFO.txlList = list
  })
}
const getSpjkList = function () {
  getSpjk().then((res) => {
    const list = resources_list_all.value[3];
    for (const info of list) {
      for (const data of res.data) {
        if (data.mc.startsWith(info.name)) {
          info.num = data.sz;
          markerDatas[info.type] = { ...data, lx: "list", sl: data.sz };
        }
      }
    }
    let arr = [];
    res.data.forEach((item) => {
      arr = [...arr, ...item.jh];
    });
    window.STORE_INFO["spjkListData"] = arr;
    // sessionStorage.setItem("spjkListData", JSON.stringify(arr));
  });
};
// 切换应急资源
const changeResources = (type, index) => {
  closeDialog();
  emit("closeAllDialog");
  currentResources.value = type;
  resources_list.value = resources_list_all.value[index];
  resources_list.value.map((item) => {
    item.url = bg_config[item.icon].url;
    return;
  });
};
const showTxl = ref(false);
const openDialog = (item, index) => {
  console.log(item, index,selectDatas)
  if(item.num===0) return ;
  $mitt.emit("hideAllMarker");
  // if (item.type === "txl") {
  //   showSelect.value = false;
  //   emit("closeAllDialog");
  //   showTxl.value = true;
  //   return;
  // }
  // showTxl.value = false;
  if (markerDatas[item.type]) {
    let info = markerDatas[item.type];
    let dialogType = item.type;
    if (currentResources.value === "spjk") {
      dialogType = "spjk";
    }
    selectDatas.value = {
      name: item.name,
      listData: info.jh.map((item) => {
        let treeId = item.id;
        if (item.dataType) {
          treeId = item.dataType + "--" + item.id;
        }
        return {
          ...item,
          label: item.title || item.monitorName || item.expertName,
          num: item.count,
          treeId: treeId,
        };
      }),
      listType: info.lx,
      dialogType: dialogType,
    };
    showSelect.value = false;
    nextTick(() => {
      showSelect.value = true;
    });
  } else if (item.type === "sphs") {
    openVideoConferencingBus.emit();
  } else {
    emit("openDialog", item, index);
  }
};
const closeDialog = function () {
  $mitt.emit("hideAllMarker");
  showSelect.value = false;
};
onMounted(() => {
  getYjjyList();
  getRhtxList();
  getSpjkList();
  getTxlList();
  mockData();
});
</script>
<template>
  <ViewBox title="应急资源">
    <div class="emergency_resources">
      <div class="resources_tab">
        <div
          class="tab_item"
          v-for="(item, index) in resources_tab"
          :key="index"
          :class="item.type == currentResources ? 'active' : ''"
          @click="changeResources(item.type, index)"
        >
          <img :src="imgefileUrl(item.icon)" class="img" alt="" />
          {{ item.name }}
        </div>
      </div>
      <!-- 内容 -->
      <div class="resources_list" :class="currentResources">
        <div
          class="list_item"
          v-for="(item, index) in resources_list"
          :key="index"
          @click="openDialog(item, index)"
        >
          <img class="img" :src="item.url" alt="" />
          <div class="item_cont">
            <span class="cont_name">{{ item.name }}</span>
            <span class="cont_num" :data-num="item.num || 0"></span>
          </div>
        </div>
      </div>
    </div>
  </ViewBox>
  <selectDialogVue
    :name="selectDatas.name"
    :listData="selectDatas.listData"
    :listType="selectDatas.listType"
    @closeDialog="closeDialog"
    :dialogType="selectDatas.dialogType"
    v-if="showSelect"
  >
  </selectDialogVue>
  <addressBoox v-if="showTxl" @close-dialog="showTxl = false"></addressBoox>
</template>
<style lang="scss" scoped>
.emergency_resources {
  height: 250px;
  padding: 11px 20px 11px 6px;
  position: relative;

  .search_box {
    position: absolute;
    right: 24px;
    top: -42px;
    display: flex;
    align-items: center;
    width: 161px;
    height: 32px;
    background: rgba(9, 39, 67, 0.7);
    border: 1px solid #1e89fd;
    padding-right: 12px;

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

  .resources_tab {
    display: flex;
    // justify-content: space-between;
    padding: 0px 0 12px;
    border-bottom: 1px solid #a1d0db;

    .tab_item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 74px;
      margin-right: 32px;
      cursor: pointer;

      &:last-child {
        margin: 0;
      }

      width: calc((100% - 96px) / 4);

      &.active {
        background: rgba(95, 209, 236, 0.1);
        border-radius: 4px 4px 4px 4px;
        border: 1px solid;
        border-image: linear-gradient(
            180deg,
            rgba(95, 209, 236, 1),
            rgba(95, 209, 236, 0)
          )
          1 1;
        clip-path: inset(0 0 round 5px);
      }

      font-size: 16px;
      font-family: Source Han Sans SC-Medium, Source Han Sans SC;
      font-weight: 500;
      color: #ffffff;
      line-height: 23px;
    }

    .img {
      width: 40px;
      height: 40px;
      margin-bottom: 4px;
    }
  }

  .resources_list {
    display: flex;
    flex-wrap: wrap;
    padding-top: 12px;

    .list_item {
      margin: 0 12px 16px 0;
      cursor: pointer;

      &:nth-child(3n) {
        margin: 0;
      }

      width: calc((100% - 24px) / 3);
      display: flex;
      font-family: Source Han Sans SC-Regular, Source Han Sans SC;
      font-weight: 400;

      .img {
        width: 56px;
        height: 56px;
        margin-right: 7px;
      }

      .item_cont {
        flex: 1;
        display: flex;
        flex-direction: column;

        .cont_name {
          font-size: 16px;
          color: #ffffff;
          line-height: 23px;
          margin-bottom: 6px;
        }

        .cont_num {
          display: inline-block;
          height: 30px;
          background: rgba(69, 120, 167, 0.27);
          text-align: center;

          &::after {
            content: attr(data-num);
            font-size: 18px;
            font-weight: bold;
            line-height: 30px;
            background: linear-gradient(180deg, #ffdf53 0%, #ffffff 100%);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
      }
    }

    &.sphs {
      .list_item {
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .img {
          margin: 0 0 7px 0;
        }

        .cont_num {
          display: none;
        }
      }
    }
  }
}
</style>
