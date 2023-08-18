<script setup>
import { inject } from "vue";
import firDialog from "../firDialog.vue";

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
  emits("closeDialog", "swzd");
};
const setMarker = function (info) {
  console.log(info);
  $mitt.emit("addMarker", info);
  $mitt.emit("openPopup", info);
  $mitt.emit("flyTo", info)
};
</script>
<template>
  <firDialog name="水位站点" @closeDialog="closeDialog">
    <div class="firDialog_main">
      <div class="list_content">
        <div class="list_header">
          <div class="line1">名称</div>
          <div class="line2">当前水位</div>
          <div class="line3">警戒水位</div>
          <div class="line4">保证水位</div>
        </div>
        <ul class="list">
          <li
            class="list_item"
            v-for="item in list"
            :key="item.id"
            @click="setMarker(item.markerInfo)"
          >
            <div class="line1">{{ item.name }}</div>
            <div class="line2">{{ item.num1 }}</div>
            <div class="line3">{{ item.num2 }}</div>
            <div class="line4">{{ item.num3 }}</div>
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
  padding: 10px;
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
    min-width: 160px;
    text-align: center;
  }

  .line2,
  .line3,
  .line4 {
    width: 80px;
    text-align: center;
  }
}
</style>
