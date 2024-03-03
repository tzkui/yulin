<script setup>
import { onMounted, ref, inject, watch, onUnmounted } from "vue";
import commonFun from "@/utils/common.js";
const { calcDiff } = commonFun();
import firDialog from "@/views/natural/components/firDialog.vue";
const showDialog = ref(false);
const qyList = ref([]);
const openDialog = (list) => {
  showDialog.value = true;
  qyList.value = list.map((item, index) => {
    return {
      title: item.title,
      id: item.id,
      index: index,
    };
  });
  visibleList.value = qyList.value.slice(0, 20);
};
const checkedList = ref([]);
const closeDialog = () => {
  showDialog.value = false;
};
const visibleList = ref([]);
const itemHeight = ref(32);
const pageScroll = (e) => {
  let top = e.target.scrollTop;
  let num = Math.floor(top / itemHeight.value);
  visibleList.value = qyList.value.slice(num, num + 20);
};
watch(checkedList, (val,old)=>{
  console.log(val,old)
  const list = calcDiff(val, old);
  let markerList = []
  if(val.length>old.length){

  }else{
    markerList.forEach((item) => {
      $mitt.emit("changeMarkerState", item);
    });
  }
})
// const
defineExpose({
  openDialog,
});
</script>
<template>
  <firDialog name="企业分布" @closeDialog="closeDialog" v-if="showDialog">
    <div class="scroll_box" @scroll="pageScroll">
      <ul class="list" :style="{ height: qyList.length * itemHeight + 'px' }">
        <el-checkbox-group
          v-model="checkedList"
          text-color="red"
        >
          <li
            v-for="item in visibleList"
            :key="item.id"
            :style="{ top: itemHeight * item.index + 'px' }"
          >
            <el-checkbox :label="item.id">{{ item.title }}</el-checkbox>
          </li>
        </el-checkbox-group>
      </ul>
    </div>
  </firDialog>
</template>

<style lang="scss" scoped>
.scroll_box {
  max-height: 480px;
  width: 420px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: block;
    width: 8px;
  }
}
.list {
  position: relative;
  li {
    position: absolute;
    left: 0;
    top: 0;
  }
}
:deep(.el-checkbox-group) {
  .el-checkbox__label {
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
  .el-checkbox.is-checked .el-checkbox__inner {
    border: none;
    background: url("@/assets/natural/check_Property.png") center/99% 99%
      no-repeat;

    &::after {
      display: none;
    }
  }
}
</style>
