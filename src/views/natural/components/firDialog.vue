<script setup>
const props = defineProps({
  name: String,
  type: String
})
const emits = defineEmits(["closeDialog"]);
const closeDialog = function(){
  emits("closeDialog",props.type)
}
</script>
<template>
  <div class="firDialog">
    <div class="header">
      <div class="title">
        <div class="line mr"></div>
        <div class="square"></div>
        <div class="name">{{ name }}</div>
        <div class="square"></div>
        <div class="line ml"></div>
      </div>
      <div class="close" @click="closeDialog">
        <img src="@/assets/natural/icon_close.png" alt="">
      </div>
    </div>
    <div class="main">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
.firDialog {
  min-width: 360px;
  position: absolute;
  left: 460px;
  top: 194px;
  background-color: rgba(1,23,65,0.8);
  border-radius: 8px;
  border: 1px solid;
  border-image: linear-gradient(90deg, rgba(6, 152, 215, 1), rgba(30, 137, 253, 1)) 1 1;
  z-index: 3;
  .header {
    border-bottom: 1px solid #0698D7;
    height: 45px;
    position: relative;
    .title {
      height: 41px;
      line-height: 41px;
      display: flex;
      width: 280px;
      margin: 0 auto;
      align-items: center;

      .line {
        flex: 1;
        height: 1px;
        background: linear-gradient(90deg, #0698D7 0%, #1E89FD 100%);
        border-radius: 0px 0px 0px 0px;
        opacity: 0.5;
      }

      .mr {
        margin-right: 4px;
      }

      .ml {
        margin-left: 4px;
      }

      .square {
        width: 5px;
        height: 5px;
        background: linear-gradient(90deg, #0698D7 0%, #1E89FD 100%);
        transform: rotate(45deg);
      }

      .name {
        padding: 0 12px;
        text-align: center;
        font-size: 18px;
        font-family: Alibaba PuHuiTi-Medium, Alibaba PuHuiTi;
        font-weight: 500;
        color: #FFFFFF;
      }
    }
    .close{
      width: 24px;
      height: 24px;
      cursor: pointer;
      position: absolute;
      right: 3px;
      top: 9px;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
  .main{
    padding: 10px;
    min-height: 100px;
    max-height: 500px;
    overflow-y: auto;
    &::-webkit-scrollbar{
      display: block;
      width: 10px;
    }
  }
}</style>