<script setup>
import { ref } from "vue";

const openDialog = function () {
  showDialog.value = true;
};
const showDialog = ref(false);
const closeDialog = function () {
  showDialog.value = false;
};
const recordList = ref([
  { id: 1, label: "语音1：", content: "需要打开自然灾害监测专题页面" },
  { id: 2, label: "语音2：", content: "打开自然灾害监测专题页面" },
  { id: 3, label: "语音3：", content: "打开自然灾害监测专题页面" },
  { id: 4, label: "语音4：", content: "打开自然灾害监测专题页面" },
  { id: 5, label: "语音5：", content: "打开自然灾害监测专题页面" },
  { id: 6, label: "语音6：", content: "打开自然灾害监测专题页面" },
]);
</script>
<template>
  <div @click="openDialog" class="word">
    <img class="bg" src="@/assets/common/record.png" alt="" />
    <div class="recordDialog" v-if="showDialog">
      <img
        class="close"
        src="@/assets/common/icon_close.png"
        @click.stop="closeDialog"
        alt=""
      />
      <div class="record_content">
        <ul class="record_list">
          <li v-for="item in recordList" :key="item.id">
            <div class="label">{{ item.label }}</div>
            <div class="value">{{ item.content }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.word {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  .bg {
    width: 34px;
    height: 34px;
  }
}
.recordDialog {
  position: absolute;
  right: -80px;
  bottom: 50px;
  width: 320px;
  height: 260px;
  background-color: #fff;
  text-align: center;
  border-radius: 5px;
  background: url(@/assets/common/record_box-bg.png) no-repeat;
  background-size: 100% 100%;
  .close {
    position: absolute;
    right: 10px;
    top: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .record_content {
    .record_list {
      height: 192px;
      overflow-y: auto;
      margin-top: 50px;
      > li {
        display: flex;
        font-size: 16px;
        font-family: Source Han Sans SC-Regular, Source Han Sans SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 18px;
        letter-spacing: 1px;
        padding: 0 16px;
        .label {
          flex-shrink: 0;
        }
        .value{
          text-align: left;
        }
        &:not(:last-child){
          margin-bottom: 8px;
        }
      }
    }
  }
}
</style>
