<script setup>
const props = defineProps({
  title: String,
  showDialog: false,
})

const emits = defineEmits(['closeDialog'])
const closeDialog = function(){
  emits("closeDialog")
}

</script>

<template>
  <div class="dialog" v-if="showDialog">
    <div class="header">
      <div class="title">{{ title }}</div>
      <div class="close" @click="closeDialog()">
        <img src="@/assets/icons/close.png" style="width: 16px;height: 16px;" alt="">
        <!-- <el-icon color="#00A3CE" :size="20">
          <Close></Close>
        </el-icon> -->
      </div>
    </div>
    <div class="icons">
      <div class="icon1"></div>
      <div class="icon2"></div>
      <div class="icon3"></div>
      <div class="icon4"></div>
    </div>
    <div class="main">
      <slot></slot>
    </div>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style lang="less">
.dialog {
  min-width: 300px;
  box-sizing: border-box;
  z-index: 999;
  background: #050E18;
  border-radius: 12px;

  .header {
    display: flex;
    justify-content: space-between;
    height: 51px;
    background: url(@/assets/common/dialog_header_bg.png) no-repeat;
    background-size: 47px 12px;
    background-position: 21px 0;
    padding: 0 16px;

    .title {
      font-size: 18px;
      font-family: Source Han Sans SC-Bold, Source Han Sans SC;
      font-weight: bold;
      color: #FFFFFF;
      line-height: 21px;
      margin-top: 17px;
    }

    .close {
      margin-top: 20px;
      cursor: pointer;
    }

  }

  .icons {
    display: flex;
    padding: 0 16px;

    .icon1 {
      width: 6px;
      height: 5px;
      background: #00A3CE;
      transform: skewX(-20deg);
      margin-right: 6px;
    }

    .icon2 {
      width: 6px;
      height: 4px;
      background: #00A3CE;
      transform: skewX(-40deg);
      margin-right: 6px;
      opacity: .8;
    }

    .icon3 {
      width: 6px;
      height: 3px;
      background: #00A3CE;
      transform: skewX(-60deg);
      margin-right: 8px;
      opacity: .6;
    }

    .icon4 {
      flex: 1;
      height: 1px;
      background: #00A3CE;
    }
  }

  .main {
    padding: 16px;
    font-size: 16px;
    font-family: Alibaba PuHuiTi-Regular, Alibaba PuHuiTi;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 20px;
  }
}
</style>