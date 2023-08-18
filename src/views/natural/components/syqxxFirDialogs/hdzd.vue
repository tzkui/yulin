<script setup>
import { inject } from "vue";
import firDialog from "../firDialog.vue";

const $mitt = inject("$mitt");
const props = defineProps({
  list: {
    type: Array,
    default(){
      return []
    }
  }
})

const emits = defineEmits(["closeDialog"]);
const closeDialog = function () {
  emits("closeDialog", 'hdzd');
};
const setMarker = function(info){
  console.log(info)
  $mitt.emit("addMarker", info)
  $mitt.emit("openPopup", info);
  $mitt.emit("flyTo", info)
}
</script>
<template>
  <firDialog name="河道水位" @closeDialog="closeDialog">
    <div class="firDialog_main">
      <ul class="card_list">
        <li
          class="card"
          v-for="item in list"
          :key="item.id"
          @click="setMarker(item.markerInfo)"
        >
          <div class="name">{{ item.name }}</div>
          <div class="address">站址：{{ item.address }}</div>
        </li>
      </ul>
    </div>
  </firDialog>
</template>

<style lang="scss">
.card_list {
  .card {
    height: 60px;
    background: #305077;
    border-radius: 4px;
    margin-top: 10px;
    font-size: 16px;
    font-family: Source Han Sans SC-Regular, Source Han Sans SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 20px;
    padding-left: 16px;
    padding-top: 4px;
    cursor: pointer;

    .name {
      margin-bottom: 8px;
    }
  }
}
</style>
