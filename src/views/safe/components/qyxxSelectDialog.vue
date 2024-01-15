<script setup>
import { onMounted, ref, inject, watch } from "vue";
import firDialog from "@/views/natural/components/firDialog.vue";
import commonFun from "@/utils/common.js";
const { initTree, calcDiff } = commonFun();
const $mitt = inject("$mitt");

const props = defineProps({
  listData: {
    type: Array,
    default() {
      return [];
    },
  },
  treeConfig: {
    type: Object,
    default() {
      return { children: "children", label: "title" };
    },
  },
});
const emits = defineEmits(["closeDialog"]);
const idInfoDict = Object.create(null);
const treeRef = ref();
const closeDialog = function () {
  emits("closeDialog", "select");
};
const treeData = ref([]);
const originTreeData = ref([]);
const initData = function () {
  console.log("xxxxx,执行initData",props)
  for (const info of props.listData) {
    if (info.dataType === 2) {
      idInfoDict["2--" + info.id] = getMarkerInfoByType(info);
    }
  }
  let arr = initTree(props.listData);
  treeData.value = arr.filter((item) => item.children?.length > 0);
  console.log(treeData.value)
  originTreeData.value = treeData.value;
};
const selectedMarkers = ref([]);
const onCheckedChange = function (data, flag) {
  let checkedList = treeRef.value.getCheckedKeys();
  selectedMarkers.value = checkedList.filter((item) => item.startsWith("2--"));
};
const getMarkerInfoByType = function (info) {
  let detail = info.detail;
  return {
    markerType: "qyxx",
    id: info.id,
    lng: info.mapX,
    lat: info.mapY,
    name: "企业信息",
    icon: "/images/marker/mapdot-building-6.png",
    label: { text: "企业信息", font_size: 16 },
    dialogType: "qyxx",
    details: {
      address: detail.address,
      area: detail.xzqhName,
      name: info.title,
      type: detail.enterpriseType,
    },
  };
};
onMounted(() => {
  initData();
});
watch(selectedMarkers, (val, old) => {
  if (val.length === old.length) return;
  const list = calcDiff(val, old);
  let markerList = [];
  for (const treeId of list) {
    const info = idInfoDict[treeId];
    if (info.lng && info.lat) {
      markerList.push(info);
    }
  }
  if (val.length > old.length) {
    if (markerList.length === 0) return;
    $mitt.emit("addMarker", {
      markerType: "qyxx",
      id: "1000",
      icon: markerList[0].icon,
      name: "企业信息",
      markerList: markerList,
    });
  } else {
    markerList.forEach((item) => {
      $mitt.emit("changeMarkerState", item);
    });
  }
});
const searchValue = ref("");
const flyTo = function (info, node) {
  if (info.dataType === 2 && node.checked) {
    let marker = getMarkerInfoByType(info);
    $mitt.emit("flyTo", marker);
    $mitt.emit("openPopup", marker);
  }
};
const searchTreeData = function () {
  if (!searchValue.value) {
    initData();
  } else {
    let arr = props.listData.filter((item) => {
      return item.dataType === 1 || item.searchInfo.includes(searchValue.value);
    });

    let tree = initTree(arr);
    treeData.value = tree.filter((item) => item.children?.length > 0);
    treeData.value.forEach(item=>{
      for(const info of item.children) {
        if(info.dataType==1){
          info.num = info.children?.length || 0
        }else{
          info.num = 1;
        }
      }
      let num = 0;
      item.children.forEach(info=>{
        num += info.num;
      })
      item.num = num;
    })
  }
};
</script>
<template>
  <firDialog name="辖区企业列表" @closeDialog="closeDialog">
    <div class="search_box">
      <el-input
        v-model="searchValue"
        placeholder="请输入"
        clearable
        @keyup.enter="searchTreeData"
      />
      <img
        class="img"
        @click="searchTreeData"
        src="@/assets/home/icon_search.png"
        alt=""
      />
    </div>
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
            <span @click="flyTo(data, node)">{{ node.label }}</span>
            <span class="yellow" v-if="data.dataType === 1">
              {{ data.num }}
            </span>
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
  .phone {
    display: inline-block;
    margin: 0 5px;
  }
  .phone_icon {
    width: 18px;
    height: 18px;
    margin-top: -2px;
  }
}

.search_box {
  display: flex;
  align-items: center;
  width: 100%;
  height: 32px;
  background: rgba(9, 39, 67, 0.7);
  border: 1px solid #1e89fd;
  padding-right: 12px;
  margin-bottom: 10px;

  :deep(.el-input__inner) {
    line-height: 32px;
    &::-webkit-input-placeholder {
      color: #aacbf6 !important;
    }
  }

  .img {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
}
.checkbox_popup {
  overflow-y: auto;
  height: 430px;
  &::-webkit-scrollbar {
    display: block;
    width: 8px;
  }
}
</style>
