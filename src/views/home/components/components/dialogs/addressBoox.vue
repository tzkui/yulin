<script setup>
import { ref } from "vue";
import firDialog from "@/views/natural/components/firDialog.vue";

import { addressBook } from "@/api/addressBook.js";
import { useEventBus } from "@vueuse/core";
const phoneBus = useEventBus("phone");
const emits = defineEmits(["closeDialog"]);
const closeDialog = function () {
  emits("closeDialog");
};
const phone = function(info){
  phoneBus.emit(info)
}
</script>
<template>
  <firDialog name="通讯录" @closeDialog="closeDialog">
    <ul class="list">
      <li v-for="(item, index) in addressBook" :key="index">
        <span>{{ item.name }}</span>
        <img src="@/assets/home/icon_phone.png" alt="" @click="phone(item)" />
      </li>
    </ul>
  </firDialog>
</template>

<style scoped lang="scss">
.list {
  padding-left: 10px;
  li {
    display: flex;
    align-items: center;
    height: 32px;
    padding-left: 10px;
    &:hover {
      background: #0E314B;
    }
    span {
      font-size: 20px;
      margin-right: 16px;
    }
    img {
      width: 24px;
      height: 24px;
      cursor: pointer;
    }
  }
}
</style>
