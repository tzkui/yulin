<script setup>
import { onUnmounted, ref } from "vue";
import map2d from "@/components/map/map2d/map.vue";
import { useEventBus } from "@vueuse/core";

const bus = useEventBus("selectLocation");
const listener = function(e){
  showDialog.value = true;
}
bus.on(listener)
const showDialog = ref("false")
onUnmounted(()=>{
  bus.off(listener)
})
</script>
<template>
  <Teleport to="body">
    <div class="model" v-show="showDialog">
      <div class="select_location">
        <div class="title">地图定位</div>
        <div class="select_location_map_box">
          <map2d></map2d>
        </div>
        <div class="footer">
          <button class="save">保存</button>
          <button class="cancel" @click="showDialog=false">取消</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.model {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba($color: 0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  .select_location {
    width: 80%;
    height: 90%;
    .title {
      color: #fff;
      background-color: #005171;
      padding-left: 20px;
      height: 50px;
      line-height: 50px;
    }
    .select_location_map_box {
      width: 100%;
      height: calc(100% - 110px);
    }
    .footer {
      text-align: right;
      button {
        width: 60px;
        height: 36px;
        box-sizing: border-box;
        margin-right: 15px;
        font-size: 14px;
      }
      .save {
        color: #fff;
        background-color: #007ea1;
        &:hover{
          opacity: .9;
        }
      }
      .cancel {
        border: 1px solid #dedede;
        color: #333;
      }
    }
  }
}
</style>
