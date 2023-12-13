<script setup>
import { ref, computed, watch, inject } from "vue";
import { yjzyLists } from "@/api/mock_tzk.js";

const getImgUrl = function (url) {
  return new window.URL("../../../assets/" + url, import.meta.url).href;
};

const $mitt = inject("$mitt");
const types = ref()
const selectedItem = function (info) {
  info.checked = !info.checked;
};
const clickAll = function () {
  checkedAll.value = !checkedAll.value;
};
const checkedAll = computed({
  get: () => {
    let arr = types.value.filter((item) => item.checked === false);
    if (arr.length === 0) {
      return true;
    } else {
      return false;
    }
  },
  set: (val) => {
    types.value.forEach((item) => {
      item.checked = val;
    });
  },
});
const selectedList = computed(() => {
  let arr = types.value.filter((item) => item.checked);
  return arr.map((item) => item.id);
});
watch(selectedList, (val, old) => {
  console.log(val);
  if (val.length > old.length) {
    const list = [];
    for (const id of val) {
      if (yjzyLists[id]) {
        list.push(...yjzyLists[id]);
      }
    }
    list.forEach((item) => {
      console.log(item);
      $mitt.emit("addMarker", item);
    });
  } else {
    // 需要删除marker的列表
    const list = [];
    for (const id of old) {
      if (!val.includes(id)) {
        if (yjzyLists[id]) {
          for (const info of yjzyLists[id]) {
            info.markerList.forEach((item) => {
              list.push({
                markerType: item.markerType,
                id: item.id,
                show: false,
              });
            });
          }
        }
      }
    }
    list.forEach((item) => {
      $mitt.emit("changeMarkerState", item);
    });
  }
});
</script>
<template>
  <div class="checkboxs">
    <ul class="checkbox_list">
      <li :class="checkedAll ? 'checked_item' : ''" @click="clickAll">
        <div class="checkbox_box"></div>
        <div class="word">选择全部</div>
      </li>
      <li v-for="item in types" :key="item.id" :class="item.checked ? 'checked_item' : ''" @click="selectedItem(item)" :id="item.id + '_select'">
        <div class="checkbox_box"></div>
        <div class="icon">
          <img :src="item.iconUrl" alt="">
        </div>
        <div class="word">{{ item.name }}</div>
      </li>
    </ul>
  </div>
</template>
<style lang="less" scoped>
.checkboxs {
  position: absolute;
  left: 490px;
  bottom: 30px;
  min-width: 140px;
  background: rgba(7, 20, 28, 0.8);
  box-shadow: inset 0px 0px 12px 1px rgba(87, 229, 255, 0.5);
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  // border: 1px solid;
  // border-image: linear-gradient(
  //     135deg,
  //     rgba(255, 255, 255, 1),
  //     rgba(19, 93, 148, 0.32),
  //     rgba(255, 255, 255, 1)
  //   )
  //   1 1;

  .checkbox_list {
    padding-top: 12px;
    padding-left: 7px;
    padding-right: 7px;

    li {
      display: flex;
      margin-bottom: 12px;
      font-size: 14px;
      font-family: Source Han Sans-Bold, Source Han Sans;
      font-weight: bold;
      color: #c6d1db;
      height: 20px;
      line-height: 20px;
      cursor: pointer;

      .checkbox_box {
        width: 20px;
        height: 20px;
        border: 1px solid #0075a4;
        box-sizing: border-box;
        margin-right: 6px;
      }

      .icon {
        width: 20px;
        height: 20px;
        margin-right: 6px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      &:hover {
        color: #fff;
      }
    }

    .checked_item {
      .checkbox_box {
        background: url(@/assets/common/checked.png) no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}
</style>