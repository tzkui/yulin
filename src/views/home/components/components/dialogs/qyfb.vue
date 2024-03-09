<script setup>
import { onMounted, ref, inject, watch, onUnmounted } from "vue";
import commonFun from "@/utils/common.js";
const { calcDiff, initTree } = commonFun();
import firDialog from "@/views/natural/components/firDialog.vue";

const $mitt = inject("$mitt");
const showDialog = ref(false);
const qyTreeData = ref([]);
const idInfoDict = Object.create(null);
const openDialog = (data) => {
  showDialog.value = true;
  let list = data.map((item) => {
    if (item.dataType === 2) {
      let info = JSON.parse(item.spare1);
      let data = {
        id: item.id,
        treeId: "2--" + item.id,
        pid: item.pid,
        title: item.title,
        label: item.title,
        mapX: info.longitude || "",
        mapY: info.latitude || "",
        address: info.address,
        area: info.xzqhName,
        type: info.enterpriseType,
      };
      idInfoDict[item.id] = { ...data };
      return data;
    } else {
      return {
        count: item.count,
        id: item.id,
        pid: item.pid,
        title: item.title,
        label: item.title,
        treeId: "1--" + item.id,
      };
    }
  });
  qyTreeData.value = initTree(list);
};
const treeRef = ref();
const checkedList = ref([]);
const closeDialog = () => {
  showDialog.value = false;
};
const checkedChange = () => {
  checkedList.value = treeRef.value
    .getCheckedKeys()
    .filter((item) => item.startsWith("2--"))
    .map((item) => item.split("--")[1]);
  console.log(checkedList.value);
};
watch(checkedList, (val, old) => {
  console.log(val, old);
  const list = calcDiff(val, old);
  let markerList = []
  for (const id of list) {
    const info = idInfoDict[id];
    markerList.push({
      markerType: "qyxx",
      id: info.id,
      lng: info.mapX,
      lat: info.mapY,
      name: "企业信息",
      icon: "/images/marker/mapdot-building-6.png",
      label: { text: "企业信息", font_size: 16 },
      dialogType: "qyxx",
      details: {
        address: info.address,
        area: info.area,
        name: info.title,
        type: info.type,
      },
    });
  }
  if (val.length > old.length) {
    if (markerList.length === 0) return;
    $mitt.emit("addMarker", {
      markerType: "qyxx",
      id: "qyxx",
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
// const
defineExpose({
  openDialog,
});
</script>
<template>
  <firDialog name="企业分布" @closeDialog="closeDialog" v-if="showDialog">
    <div class="scroll_box">
      <el-tree-v2
        style="max-width: 600px"
        :data="qyTreeData"
        :props="{ value: 'treeId' }"
        show-checkbox
        @check-change="checkedChange"
        :height="208"
        ref="treeRef"
      />
    </div>
  </firDialog>
</template>

<style lang="scss" scoped>
.scroll_box {
  height: 480px;
  width: 420px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: block;
    width: 8px;
  }
}
:deep(.el-tree) {
  background-color: transparent;
  .el-tree-node__label {
    color: #fff;
    font-size: 16px;
  }
  .el-checkbox__inner {
    width: 20px;
    height: 20px;
    border: 1px solid #0075a4;
    border-radius: 0;
    background: transparent;
  }
  .el-tree-node__content:hover, .is-current {
    background-color: transparent;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner {
    border: none;
    background: url("@/assets/natural/check_Property.png") center/99% 99%
      no-repeat;

    &::after {
      display: none;

    }
  }
}
</style>
