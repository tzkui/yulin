<script setup>
import { onMounted, ref, inject, watch, onUnmounted } from "vue";
import firDialog from "./firDialog.vue";
import commonFun from "@/utils/common.js";
const { initTree, calcDiff } = commonFun();
import { fxyhLists, yjzyLists, spjkLists } from "@/api/mock_tzk.js";
import entityDict from "@/utils/entityDict.js";

import { useEventBus } from "@vueuse/core";
const $mitt = inject("$mitt");

const props = defineProps({
  name: {
    type: String,
    default: "",
  },
  listData: {
    type: Array,
    default() {
      return [];
    },
  },
  treeConfig: {
    type: Object,
    default() {
      return { children: "children", label: "label" };
    },
  },
  listType: {
    type: String,
    default: "",
  },
  dialogType: {
    type: String,
    default: "",
  },
});
const emits = defineEmits(["closeDialog"]);
const idInfoDict = Object.create(null);
const treeRef = ref();
const closeDialog = function () {
  emits("closeDialog", "select");
};
const treeData = ref([]);
const phoneList = ref(["应急专家","通讯录","应急人员"]);
let timer = null;
const initData = function () {
  if (props.listType === "tree") {
    for (const info of props.listData) {
      if (info.dataType === 2) {
        idInfoDict["2--" + info.id] = info;
        if(phoneList.value.includes(props.name)){
          try {
            let a = JSON.parse(info.spare1)
            info.linkPhone = a?.linkPhone;
            info.typeName = a?.typeName;
            info.zc = a?.zc
          } catch (error) {
            console.log("解析json报错了：", info)
          }
        }
      }
    }
    let arr = initTree(props.listData);
    // treeData.value = arr;
    treeData.value = arr.filter((item) => item.children?.length > 0);
    console.log("获取到的treeData: ", treeData.value)
    if(props.name==='通讯录'){
      treeData.value.forEach(item=>{
        item.children = item.children?.filter(info=>{
          return info.children?.length>0
        })
      })
    }
  } else {
    if(props.listData.length> 500){
      treeData.value = [];
      let i=0;
      timer = setInterval(()=>{
        if((i+500)<props.listData.length){
          let arr = props.listData.slice(i,i+500);
          arr = arr.map(item=>{
            idInfoDict[item.id] = item;
            return {
              ...item,
              label:
                item.label ||
                item.name ||
                item.jswz ||
                item.monitorName ||
                item.personalName,
            }
          })
          treeData.value.push(...arr)
          i+=500;
        }else{
          clearInterval(timer);
        }
      },100)
    }
    // treeData.value = props.listData.map((item) => {
    //   idInfoDict[item.id] = item;
    //   return {
    //     ...item,
    //     label:
    //       item.label ||
    //       item.name ||
    //       item.jswz ||
    //       item.monitorName ||
    //       item.personalName,
    //   };
    // });
  }
};
console.log(props.dialogType);
const selectedMarkers = ref([]);
const selectedListMarkers = ref([]);
const onCheckedChange = function (data, flag) {
  let checkedList = treeRef.value.getCheckedKeys();
  // 树的情况
  if (props.listType === "tree") {
    selectedMarkers.value = checkedList.filter((item) =>
      item.startsWith("2--")
    );
  } else {
    console.log(selectedListMarkers, idInfoDict);
    selectedMarkers.value = treeRef.value.getCheckedKeys();
  }
};
const getMarkerInfoByType = function (info) {
  const model = fxyhLists[props.dialogType] || yjzyLists[props.dialogType];
  if (model) {
    let base = JSON.parse(JSON.stringify(model[0].markerList[0]));
    base.id = info.id;
    base.lng = info.mapX;
    base.lat = info.mapY;
    // base.details.name = info.title;
    if (info.spare1) {
      try {
        let details = JSON.parse(info.spare1);
        let dict = entityDict[props.dialogType];
        base.details = {};
        for (let key in dict) {
          base.details[key] = details[dict[key]];
        }
      } catch (error) {
        console.log("解析JSON出错了--->", info);
      }
    } else {
      for (let key in base.details) {
        base.details[key] = info[key] || "-";
      }
    }
    return base;
  }
};
onUnmounted(()=>{
  if(timer){
    clearInterval(timer)
  }
})
const phoneBus = useEventBus("phone");
const phone = function(info){
  phoneBus.emit(info)
}
onMounted(() => {
  initData();
});
watch(selectedMarkers, (val, old) => {
  if (val.length === old.length) return;
  const list = calcDiff(val, old);
  let markerList = [];
  for (const treeId of list) {
    const info = idInfoDict[treeId];
    if (info.mapX && info.mapY) {
      let marker = getMarkerInfoByType(info);
      if (marker) {
        markerList.push(marker);
      }
    }
  }
  if (val.length > old.length) {
    if (markerList.length === 0) return;
    $mitt.emit("addMarker", {
      markerType: props.dialogType,
      id: "1000",
      icon: markerList[0].icon,
      name: "地灾隐患点",
      markerList: markerList,
    });
    $mitt.emit("flyTo", markerList[0]);
    $mitt.emit("openPopup", markerList[0]);
  } else {
    markerList.forEach((item) => {
      $mitt.emit("changeMarkerState", item);
    });
  }
});
</script>
<template>
  <firDialog :name="name" @closeDialog="closeDialog">
    <div class="checkbox_popup">
      <el-tree
        :data="treeData"
        :props="treeConfig"
        show-checkbox
        ref="treeRef"
        @check-change="onCheckedChange"
        node-key="treeId"
      >
        <template #default="{ node, data }">
          <span class="custom-tree-node">
            <span>{{ node.label }}</span>
            <span class="yellow" v-if="data.dataType === 1&&!['通讯录','应急人员'].includes(name)">
              {{ data.num }}
            </span>
            <span v-if="phoneList.includes(name)" class="phone">{{ data.typeName }}</span>
            <span v-if="phoneList.includes(name)" class="phone">{{ data.zc }}</span>
            <img 
              src="@/assets/home/icon_phone.png" 
              v-if="phoneList.includes(name) && data.linkPhone"
              alt="" 
              @click="phone(data)" 
              class="phone_icon"
            />
          </span>
        </template>
      </el-tree>
    </div>
  </firDialog>
</template>

<style lang="scss" scoped>
.checkbox_popup {
  padding: 0 10px;

  :deep(.el-tree) {
    margin-top: 10px;
    background: transparent;

    // 隐藏 展开收起icon
    .el-tree-node__expand-icon {
      display: none;
    }

    .el-checkbox__inner {
      width: 20px;
      height: 20px;
      border: 1px solid #0075a4;
      border-radius: 0;
      background: transparent;
    }

    .el-checkbox__input.is-checked .el-checkbox__inner {
      border: none;
      background: url("@/assets/natural/check_Property.png") center/99% 99%
        no-repeat;

      &::after {
        display: none;
      }
    }

    .el-tree-node {
      font-size: 16px;
      font-family: Source Han Sans SC-Regular, Source Han Sans SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 19px;

      .yellow {
        color: #ffdf53;
        margin-left: 10px;
      }
    }

    .el-tree-node__content {
      margin: 4px 0;
    }

    .el-tree-node:focus > .el-tree-node__content,
    .el-tree-node__content:hover {
      background-color: RGBA(10, 91, 131, 0.3);
    }
  }
  .phone{
    display: inline-block;
    margin: 0 5px;

  }
  .phone_icon{
    width: 18px;
    height: 18px;
    margin-top: -2px;
  }
}
</style>
