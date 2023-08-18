<script setup>
import { ref } from "vue";

const isHide = ref(false);
const tooglePosition = function () {
  isHide.value = !isHide.value;
};
</script>

<template>
  <div :class="['pageFooter', isHide ? 'hide' : '']">
    <div class="footerContent">
      <slot></slot>
    </div>
    <div @click="tooglePosition" :class="['arrow_box', isHide ? 'rotate' : '']">
      <el-icon size="32" color="#fff">
        <ArrowDown />
      </el-icon>
    </div>

  </div>
</template>

<style lang="less" scoped>
@boxHeight: 80px;
.pageFooter {
  height: @boxHeight;
  min-width: 200px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: red;
  transition: 0.5s linear;
  .arrow_box {
    position: absolute;
    bottom: 5px + @boxHeight;
    cursor: pointer;
    transition: 0.5s linear;
    left: 50%;
    transform: translateX(-50%);
  }
  .rotate {
    transform: rotate(180deg);
  }
}
.hide {
  bottom: -@boxHeight;
}
</style>