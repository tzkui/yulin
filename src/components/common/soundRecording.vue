<script setup>
import { ref } from "vue";

// 预先设置一个变量来存MediaRecorder实例
let mediaRecorder = null;
const startRecord = function () {};
const openDialog = function () {
  showDialog.value = true;
  startRecord();
};
const endRecord = function (flag) {
  // 录音结束事件，在需要结束录音时调用，录音结束后的操作请在 mediaRecorder.onstop 里面写
  mediaRecorder && mediaRecorder.stop();
  if (flag) {
  }
  // if(text)
};
const showDialog = ref(false);
const closeDialog = function (flag) {
  showDialog.value = false;
  endRecord(flag);
};
</script>
<template>
  <div @click="openDialog" class="word">
    <div class="recordDialog" v-if="showDialog">
      <img src="@/assets/home/microphone.png" alt="" />

      <div class="icon">
        <el-icon size="24"><Loading /></el-icon>
        <div>识别中</div>
      </div>

      <div class="close" @click="closeDialog(false)">
        <el-icon size="24"><Close /></el-icon>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.word {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  &::after {
    content: "录";
    font-size: 20px;
    font-family: Source Han Sans-Regular, Source Han Sans;
    font-weight: 400;
    color: #15bce6;
    width: 34px;
    height: 34px;
    text-align: center;
    line-height: 32px;
    border: 1px solid #15bce6;
    border-radius: 50%;
    box-sizing: border-box;
  }
}
.recordDialog {
  position: absolute;
  right: 50px;
  bottom: 0;
  width: 120px;
  height: 200px;
  background-color: #fff;
  text-align: center;
  border-radius: 5px;
  img {
    margin: 40px auto;
  }
  @keyframes rotateAn {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .icon {
    display: flex;
    margin: 0 auto;
    width: 80%;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    > i {
      animation: rotateAn 1s infinite linear;
      margin-right: 10px;
    }
  }
  .close {
    position: absolute;
    right: 5px;
    top: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
