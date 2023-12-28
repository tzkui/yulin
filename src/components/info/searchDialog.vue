<script setup>
import { computed, inject, ref, nextTick, onMounted } from "vue";

const showDialog = ref(false);
const $mitt = inject("$mitt");

const closeDialog = function(){
  showDialog.value = false
}

onMounted(()=>{
  $mitt.on("openSearchDialog",function(){
    showDialog.value = true;
  })
})
</script>

<template>
  <div class="map_search_dialog" v-if="showDialog">
    <div class="header">地图搜索</div> 
    <div class="content">
      <div class="search_box">
        <input />
        <img src="@/assets/home/icon_search.png" />
      </div>
      <ul class="point_list">
      </ul>
    </div>
    <div class="close_icon" @click="closeDialog"></div>
  </div>
</template>

<style lang="scss" scoped>
.map_search_dialog {
  position: absolute;
  right: 455px;
  bottom: 80px;
  color: #fff;
  width: 320px;
  padding: 24px;
  background: url(@/assets/common/dia.png) no-repeat;
  background-size: 100% 100%;
  z-index: 9999;
  height: 480px;
  .header {
    text-align: center;
    font-size: 24px;
    font-weight: 600;
  }
  .content {
    .area {
      font-size: 14px;
      text-align: center;
      margin: 28px 0 12px;
    }
    .point_list {
      height: 300px;
      overflow-y: auto;
      margin-top: 10px;
      .item {
        position: relative;
        margin-bottom: 6px;
        cursor: pointer;
        background-color: #305077;
        padding-left: 20px;
        font-size: 13px;
        line-height: 20px;
        // height: 48px;
        box-sizing: border-box;
        padding-top: 8px;
        padding-bottom: 8px;
        border-radius: 4px;
        .name {
          margin-bottom: 3px;
        }
        .distance {
          position: absolute;
          right: 10px;
          top: 8px;
          span {
            color: #d8ad27;
          }
        }
      }
    }
  }
  .close_icon {
    width: 18px;
    height: 18px;
    background: url(@/assets/icons/close.png) no-repeat;
    background-size: 100% 100%;
    position: absolute;
    cursor: pointer;
    right: 24px;
    top: 28px;
  }
}
</style>
