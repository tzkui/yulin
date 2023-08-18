<script setup>
import { ref, computed, watch, inject, openBlock } from "vue";
import { safeCheckboxPoints } from "@/api/mock_tzk.js";
import { assetsUrl } from "@/components/map/map2d/hook/index";

const $mitt = inject("$mitt");
const getMarkerUrl = function (name) {
  return assetsUrl("/images/marker/" + name + ".png");
};
const treeData = ref([
  {
    name: "危化企业",
    id: "whqy",
    children: [
      {
        name: "非煤矿山",
        id: "fmks",
        checked: false,
        iconUrl: getMarkerUrl("icon_kuangshan"),
      },
      {
        name: "工贸企业",
        id: "gmqy",
        checked: false,
        iconUrl: getMarkerUrl("icon_gongmao"),
      },
      {
        name: "烟花爆竹企业",
        id: "yhbzqy",
        checked: false,
        iconUrl: getMarkerUrl("icon_yanhua"),
      },
      {
        name: "煤矿",
        id: "mk",
        checked: false,
        iconUrl: getMarkerUrl("icon_meikuang"),
      },
      {
        name: "尾矿库",
        id: "wkk",
        checked: false,
        iconUrl: getMarkerUrl("icon_weikuang"),
      },
      {
        name: "金属加工业",
        id: "jsjgy",
        checked: false,
        iconUrl: getMarkerUrl("icon_jinshu"),
      },
      {
        name: "非金属加工业",
        id: "fjsjgy",
        checked: false,
        iconUrl: getMarkerUrl("icon_feijinshu"),
      },
      {
        name: "油气田",
        id: "yqt",
        checked: false,
        iconUrl: getMarkerUrl("icon_youqitian"),
      },
      {
        name: "采石场",
        id: "csc",
        checked: false,
        iconUrl: getMarkerUrl("icon_caishichang"),
      },
      {
        name: "露天矿场",
        id: "ltkc",
        checked: false,
        iconUrl: getMarkerUrl("icon_lutian"),
      },
    ],
  },
  {
    name: "企业重大危险源",
    id: "qyzdwxy",
    children: [
      {
        name: "一级危险源",
        id: "wxy1",
        checked: false,
        iconUrl: getMarkerUrl("icon_weixianyuan1"),
      },
      {
        name: "二级危险源",
        id: "wxy2",
        checked: false,
        iconUrl: getMarkerUrl("icon_weixianyuan2"),
      },
      {
        name: "三级危险源",
        id: "wxy3",
        checked: false,
        iconUrl: getMarkerUrl("icon_weixianyuan3"),
      },
      {
        name: "四级危险源",
        id: "wxy4",
        checked: false,
        iconUrl: getMarkerUrl("icon_zhongda_weixian"),
      },
    ],
  },
  {
    name: "视频监控 ",
    id: "spjk",
    children: [
      {
        name: "公安监控",
        id: "gajk",
        checked: false,
        iconUrl: getMarkerUrl("icon_gongan"),
      },
      {
        name: "住建局监控",
        id: "zjjjk",
        checked: false,
        iconUrl: getMarkerUrl("icon_zhujianju"),
      },
      {
        name: "水利局监控",
        id: "sljjk",
        checked: false,
        iconUrl: getMarkerUrl("icon_shuiliju"),
      },
      {
        name: "自然灾害监控",
        id: "zrzhjk",
        checked: false,
        iconUrl: getMarkerUrl("icon_ziranzaihai"),
      },
      {
        name: "化工园区监控",
        id: "hgyqjk",
        checked: false,
        iconUrl: getMarkerUrl("icon_huagongyuanqu"),
      },
    ],
  },
]);
const checkAll = function (id) {
  for (const types of treeData.value) {
    if (types.id === id) {
      if (allSelecteds.value[id]) {
        types.checked = false;
        types.children.forEach((item) => {
          item.checked = false;
        });
      } else {
        types.checked = true;
        types.children.forEach((item) => {
          item.checked = true;
        });
      }
    }
  }
};
const selectedItem = function (info) {
  info.checked = !info.checked;
};
const allSelecteds = computed(() => {
  const res = {};
  for (const types of treeData.value) {
    res[types.id] = true;
    for (const item of types.children) {
      if (!item.checked) {
        res[types.id] = false;
        break;
      }
    }
  }
  return res;
});
const obj = {};
treeData.value.forEach((item) => {
  obj[item.id] = true;
});
const showLists = ref(obj);

const selectedList = computed(() => {
  const res = [];
  treeData.value.forEach((item) => {
    item.children.forEach(({ checked, id }) => {
      if (checked) {
        res.push(id);
      }
    });
  });
  return res;
});
// 计算数组的差别项,这两个数组应该是包含关系
const calcArrayDiff = function (arr1, arr2) {
  const nums = {};
  for (const id of arr1) {
    nums[id] = true;
  }
  for (const id of arr2) {
    if (nums[id]) {
      delete nums[id];
    } else {
      nums[id] = true;
    }
  }
  return Object.keys(nums);
};
watch(selectedList, (val, old) => {
  let diff = calcArrayDiff(val, old);
  for (const id of diff) {
    if (safeCheckboxPoints[id]) {
      if (val.length > old.length) {
        $mitt.emit("addMarker", safeCheckboxPoints[id]);
      } else {
        $mitt.emit("changeMarkerState", safeCheckboxPoints[id]);
      }
    }
  }
});
</script>
<template>
  <div class="checkboxs">
    <ul class="checkbox_list">
      <li v-for="types in treeData">
        <div class="parent" :class="allSelecteds[types.id] ? 'checked_item' : ''" @click="showLists[types.id] = !showLists[types.id]">
          <div class="checkbox_box" @click.stop="checkAll(types.id)"></div>
          <div class="word">{{ types.name }}</div>
          <div class="icon">
            <el-icon :style="{ transform: showLists[types.id] ? '' : 'rotate(180deg)' }">
              <ArrowDownBold></ArrowDownBold>
            </el-icon>
          </div>
        </div>
        <ul class="childList" :style="{ height: showLists[types.id] ? types.children.length * 32 + 'px' : 0 }">
          <li v-for="item in types.children" :key="item.id" :class="item.checked ? 'checked_item' : ''" @click="selectedItem(item)" :id="item.id + '_select'">
            <div class="checkbox_box"></div>
            <div class="icon">
              <img :src="item.iconUrl" alt="">
            </div>
            <div class="word">{{ item.name }}</div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<style lang="less" scoped>
.checkboxs {
  position: absolute;
  left: 460px;
  top: 180px;
  min-width: 180px;
  background: rgba(1, 23, 65, 0.8);
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

    > li {
      margin-bottom: 12px;
      font-size: 14px;
      font-family: Source Han Sans-Bold, Source Han Sans;
      font-weight: bold;
      color: #c6d1db;
      // height: 20px;
      line-height: 20px;
      cursor: pointer;

      .parent {
        display: flex;
        margin-bottom: 12px;
        position: relative;

        .icon {
          position: absolute;
          top: 1px;
          right: 0;
          .el-icon {
            transition: 0.3s linear;
          }
        }

        &:hover {
          color: #fff;
        }
      }

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

      .childList {
        margin-left: 12px;
        transition: 0.3s linear;
        overflow: hidden;

        > li {
          margin-bottom: 12px;
          font-size: 14px;
          font-family: Source Han Sans-Bold, Source Han Sans;
          font-weight: bold;
          color: #c6d1db;
          line-height: 20px;
          cursor: pointer;
          display: flex;

          &:hover {
            color: #fff;
          }
        }
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