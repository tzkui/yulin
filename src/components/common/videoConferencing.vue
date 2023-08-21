<script setup>
import { ref } from "vue";
const videoListNum = ref(1); // 展示
const videoList = ref([]);
const toggleLayout = function (num) {
  videoListNum.value = num;
};
</script>

<template>
  <div class="video_conferencing">
    <div class="address_book">
      <div @click="toggleLayout(1)">1</div>
      <div @click="toggleLayout(4)">4</div>
      <div @click="toggleLayout(9)">9</div>
    </div>
    <div class="video_box">
      <div class="video_list" :class="'num' + videoListNum">
        <div v-for="item in videoListNum" class="video_item" :key="item"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.video_conferencing {
  position: fixed;
  left: 50%;
  top: 30%;
  z-index: 99999;
  display: flex;
  .address_book {
    font-size: 32px;
  }
  .video_box {
    padding: 20px;
    width: 200px;
    height: 200px;
    .video_list {
      display: grid;
      width: 778px;
      height: 600px;
      grid-row-gap: 20px;
      grid-column-gap: 20px;
      .video_item {
        background-color: pink;
        border: 1px solid red;
      }
    }
    .num4 {
      grid-template-columns: 1fr 1fr;
    }

    .num9 {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
}
</style>
