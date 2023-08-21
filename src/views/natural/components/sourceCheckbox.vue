<script setup>
import { ref, computed, watch, inject, onMounted } from "vue";
import { yjzyLists } from "@/api/mock_tzk.js";
import icon1 from "@/assets/images/marker/icon_renyuan.png";
import icon2 from "@/assets/images/marker/icon-expert.png";
import icon3 from "@/assets/images/marker/icon_duiwu.png";
import icon4 from "@/assets/images/marker/icon_material.png";
import icon5 from "@/assets/images/marker/icon_shelter.png";
import icon6 from "@/assets/images/marker/mapdot-scientific.png";

const props = defineProps({
  infos: {
    type: Object,
    default: {},
  },
});
const $mitt = inject("$mitt");
const types = ref([
  {
    name: "应急人员",
    id: "yjry",
    checked: false,
    iconUrl: icon1,
  },
  {
    name: "应急专家",
    id: "yjzj",
    checked: false,
    iconUrl: icon2,
  },
  {
    name: "救援队伍",
    id: "jydw",
    checked: false,
    iconUrl: icon3,
  },
  {
    name: "应急物资库",
    id: "yjwzk",
    checked: false,
    iconUrl: icon4,
  },
  {
    name: "避难场所",
    id: "bncs",
    checked: false,
    iconUrl: icon5,
  },
  {
    name: "视频监控",
    id: "spjk",
    checked: false,
    iconUrl: icon6,
  },
]);
const markerListDict = Object.create(null);
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
const setTypes = function () {
  types.value.forEach((item) => {
    let info = props.infos[item.id];
    const base = JSON.parse(JSON.stringify(yjzyLists[item.id]));
    const list = info.jh.slice(info.jh.length - info.sl).map((v) => {
      let baseChild = JSON.parse(JSON.stringify(base[0].maekerList[0]));
      baseChild.lng = v.mapX;
      baseChild.lat = v.mapY;
      baseChild.id = v.id;
      baseChild.details.name = v.title;
      return baseChild;
    });
    console.log(base);
    base[0].maekerList = list;
    markerListDict[item.id] = base;
  });
};
const calcDiff = function (arr1, arr2) {
  const dict = Object.create(null);
  for (const val of arr1) {
    dict[val] = 1;
  }
  for (const val of arr2) {
    if (dict[val] === 1) {
      delete dict[val];
    } else {
      dict[val] = 1;
    }
  }
  return Object.keys(dict);
};
watch(selectedList, (val, old) => {
  const diff = calcDiff(val, old);
  let list = [];
  for (const id of diff) {
    if (markerListDict[id]) {
      if (markerListDict[id][0].maekerList.length > 0) {
        list.push(...markerListDict[id]);
      }
    }
  }
  console.log("李斯特：", list, markerListDict);
  if (val.length > old.length) {
    list.forEach((item) => {
      item.maekerList.forEach((info) => {
        if (info.lat && info.lng) {
          $mitt.emit("addMarker", info);
        }
      });
    });
    if (list.length > 0) {
      let firstInfo = list[0].maekerList[0];
      if (firstInfo.lat && firstInfo.lng) {
        $mitt.emit("flyTo", firstInfo);
      }
    }
  } else {
    list.forEach((item) => {
      for (const point of item.maekerList) {
        if (point.lat && point.lng) {
          $mitt.emit("changeMarkerState", point);
        }
      }
    });
  }
});
watch(
  () => props.infos,
  (val) => {
    setTypes();
  }
);
const clearAll = function () {
  types.value.forEach((item) => {
    item.checked = false;
  });
};
const isHide = ref(false);
defineExpose({
  clearAll,
});
</script>
<template>
  <div
    class="checkboxs"
    :style="{ transform: isHide ? 'translateY(calc(100% + 30px))' : '' }"
  >
    <div
      class="hideIcon"
      @click="isHide = !isHide"
      :style="{ transform: isHide ? 'rotate(180deg)' : '' }"
    ></div>
    <ul class="checkbox_list">
      <li :class="checkedAll ? 'checked_item' : ''" @click="clickAll">
        <div class="checkbox_box"></div>
        <div class="word">选择全部</div>
      </li>
      <li
        v-for="item in types"
        :key="item.id"
        :class="item.checked ? 'checked_item' : ''"
        @click="selectedItem(item)"
        :id="item.id + '_select'"
      >
        <div class="checkbox_box"></div>
        <div class="icon">
          <img :src="item.iconUrl" alt="" />
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
  background: rgba(1, 23, 65, 0.8);
  box-shadow: inset 0px 0px 12px 1px rgba(87, 229, 255, 0.5);
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  transition: 0.3s linear;

  .hideIcon {
    width: 24px;
    height: 24px;
    position: absolute;
    right: 0;
    top: -24px;
    cursor: pointer;
    transition: 0.3s linear;
    background: url(@/assets/icons/icon_arrow_down.png) no-repeat;
    background-size: 14px 14px;
    background-position: 5px 5px;
    background-color: rgba(4, 14, 21, 0.7);
  }

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
