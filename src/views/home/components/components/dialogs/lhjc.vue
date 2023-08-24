<script setup>
import { inject } from "vue";
import firDialog from "@/views/natural/components/firDialog.vue";

const $mitt = inject("$mitt");
const props = defineProps({
  list: {
    type: Array,
    default() {
      return [];
    },
  },
});

const emits = defineEmits(["closeDialog"]);
const closeDialog = function () {
  emits("closeDialog");
};
const setMarker = function (info) {
  $mitt.emit("addMarker", info);
  $mitt.emit("openPopup", info);
  $mitt.emit("flyTo", info)
};
</script>
<template>
  <firDialog name="林火监测" @closeDialog="closeDialog">
    <div class="firDialog_main">
      <div class="list_content">
        <div class="list_header">
          <div class="line1">名称</div>
          <div class="line2">面积</div>
          <div class="line2">林场类型</div>
        </div>
        <ul class="list">
          <li
            class="list_item"
            v-for="item in list"
            :key="item.id"
            @click="setMarker(item.markerInfo)"
          >
            <div class="line1">{{ item.areaName }}</div>
            <div class="line2">{{ item.areaMeasue }}</div>
            <div class="line2">{{ item.typeName }}</div>
          </li>
        </ul>
      </div>
    </div>
  </firDialog>
</template>
<style lang="scss" scoped>
.list_content {
  border: 1px solid rgba(6, 152, 215, 0.5);
  font-size: 16px;
  font-family: Source Han Sans SC-Regular, Source Han Sans SC;
  font-weight: 400;
  color: #ffffff;
  padding-bottom: 4px;
  text-align: center;
  line-height: 24px;

  .list_header {
    display: flex;
    text-align: center;
    margin-top: 12px;
    margin-bottom: 8px;
  }

  .list {
    &_item {
      margin-top: 8px;
      display: flex;
      margin-top: 8px;
      text-align: center;
      cursor: pointer;
      .sort {
        width: 32px;
        font-family: Source Han Sans SC-Regular, Source Han Sans SC;
        font-weight: 400;
        color: #ffdf53;
      }
    }
  }

  .line1 {
    margin-left: 10px;
    min-width: 160px;
    text-align: center;
  }

  .line2{
    width: 100px;
    text-align: center;
  }
}
</style>
