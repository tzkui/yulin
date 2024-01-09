<script setup>
import { inject } from "vue";
import firDialog from "../firDialog.vue";

const $mitt = inject("$mitt");
const props = defineProps({
  list: {
    type: Array,
    default() {
      return [];
    },
  },
});

const emits = defineEmits(["closeDialog"]);
const closeDialog = function () {
  emits("closeDialog", "ylzd");
};
const setMarker = function (info) {
  $mitt.emit("addMarker", info);
  $mitt.emit("openPopup", info);
  $mitt.emit("flyTo", info)
};
</script>
<template>
  <firDialog name="雨量站点" @closeDialog="closeDialog">
    <div class="firDialog_main">
      <div class="btns">
        <!-- <div class="btn btn1">站点雨量排名</div>
        <div class="btn btn2">乡镇雨量排名</div> -->
        <select>
          <option value="1">1小时</option>
          <option value="2">2小时</option>
        </select>
      </div>
      <div class="yl_list_box">
        <div class="yl_list_header">
          <div class="line1">排名</div>
          <div class="line2">名称</div>
          <div class="line3">雨量</div>
        </div>
        <ul class="yl_list">
          <li
            class="yl_list_item"
            v-for="(item, index) in list"
            :key="item.id"
            @click="setMarker(item.markerInfo)"
          >
            <div class="line1">{{ index + 1 }}</div>
            <div class="line2">{{ item.name }}</div>
            <div class="line3 red" v-if="item.num > 120">{{ item.num }}</div>
            <div class="line3 yellow" v-else-if="item.num > 70">
              {{ item.num }}
            </div>
            <div class="line3 blue" v-else-if="item.num > 40">
              {{ item.num }}
            </div>
            <div class="line3 green" v-else>{{ item.num }}</div>
          </li>
        </ul>
      </div>
    </div>
  </firDialog>
</template>

<style lang="scss" scoped>
.btns {
  display: flex;
  justify-content: space-between;

  .btn {
    width: 115px;
    height: 36px;
    border-radius: 4px;
    text-align: center;
    line-height: 36px;

    &1 {
      background-color: #038cfa;
      cursor: pointer;
    }

    &2 {
      background: linear-gradient(90deg, #0698d7 0%, #1e89fd 100%);
      color: #d0deee;
      cursor: pointer;
    }
  }

  select {
    width: 177px;
    height: 36px;
    padding: 0 10px;
    background: #006688;
    border-radius: 4px;
    font-size: 16px;
    font-family: Alibaba PuHuiTi-Regular, Alibaba PuHuiTi;
    font-weight: 400;
    color: #ffffff;
  }
}
.yl_list_box {
  margin-top: 24px;
  text-align: center;
  font-size: 16px;
  font-family: Source Han Sans SC-Regular, Source Han Sans SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 19px;

  .yl_list_header {
    display: flex;
    margin-bottom: 8px;
    text-align: center;

    .line1 {
      margin-left: 10px;
      width: 40px;
    }

    .line2 {
      flex: 1;
    }

    .line3 {
      margin-right: 10px;
      width: 50px;
    }
  }

  .yl_list {
    max-height: 290px;

    &::-webkit-scrollbar {
      display: none;
    }

    &_item {
      display: flex;
      margin-top: 8px;
      cursor: pointer;
      .line1 {
        width: 40px;
        margin-left: 10px;
      }

      .line2 {
        flex: 1;
      }

      .line3 {
        width: 50px;
        margin-right: 10px;
      }
    }
  }
}
</style>
