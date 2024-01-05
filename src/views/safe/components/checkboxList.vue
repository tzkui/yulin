<script setup>
import { ref, computed, watch, inject, openBlock, onMounted } from "vue";
// import { safeCheckboxPoints } from "@/api/mock_tzk.js";
import { assetsUrl } from "@/components/map/map2d/hook/index";
import { getDtsd } from "@/api/modules/aqsc.js";
import { getQyfbTree } from "@/api/modules/home.js";
const $mitt = inject("$mitt");
const getMarkerUrl = function (name) {
  return assetsUrl("/images/marker/" + name + ".png");
};
const safeCheckboxPoints = {
  mk: [],
  fmks: [],
  yhbzqy: [],
  whqy: [],
};
const treeData = ref([
  {
    name: "企业",
    id: "qy",
    children: [
      {
        name: "煤矿",
        id: "mk",
        checked: false,
        iconUrl: getMarkerUrl("icon_meikuang"),
      },
      {
        name: "非煤矿山",
        id: "fmks",
        checked: false,
        iconUrl: getMarkerUrl("icon_kuangshan"),
      },
      {
        name: "烟花爆竹企业",
        id: "yhbzqy",
        checked: false,
        iconUrl: getMarkerUrl("icon_yanhua"),
      },
      {
        name: "危化企业",
        id: "whqy",
        checked: false,
        iconUrl: getMarkerUrl("mapdot-dangerous-chemicals"),
      },
      {
        name: "尾矿库",
        id: "wkk",
        checked: false,
        iconUrl: getMarkerUrl("icon_weikuang"),
      },
      {
        name: "其他",
        id: "gmqy",
        checked: false,
        iconUrl: getMarkerUrl("icon_gongmao"),
      },
      {
        name: "粉尘涉爆",
        id: "jsjgy",
        checked: false,
        iconUrl: getMarkerUrl("icon_jinshu"),
      },
      {
        name: "涉氨制冷",
        id: "fjsjgy",
        checked: false,
        iconUrl: getMarkerUrl("icon_feijinshu"),
      },
      {
        name: "机械制造",
        id: "yqt",
        checked: false,
        iconUrl: getMarkerUrl("icon_youqitian"),
      },
    ],
  },
  {
    name: "视频监控 ",
    id: "spjk",
    children: [
      {
        name: "公安监控",
        id: "公安监控",
        checked: false,
        iconUrl: getMarkerUrl("icon_gongan"),
      },
      {
        name: "住建局监控",
        id: "住建监控",
        checked: false,
        iconUrl: getMarkerUrl("icon_zhujianju"),
      },
      {
        name: "水利局监控",
        id: "水利监控",
        checked: false,
        iconUrl: getMarkerUrl("icon_shuiliju"),
      },
      {
        name: "重点地点监控",
        id: "重点地点",
        checked: false,
        iconUrl: getMarkerUrl("icon_ziranzaihai"),
      },
      {
        name: "化工园区监控",
        id: "园区监控",
        checked: false,
        iconUrl: getMarkerUrl("icon_huagongyuanqu"),
      },
      {
        name: "综合执法局监控",
        id: "综合执法局监控",
        checked: false,
        iconUrl: getMarkerUrl("icon_ziranzaihai"),
      },
      {
        name: "危化企业监控",
        id: "危化企业监控",
        checked: false,
        iconUrl: getMarkerUrl("icon_whqyjk"),
      },
      {
        name: "交警监控",
        id: "交警监控",
        checked: false,
        iconUrl: getMarkerUrl("icon_jjjk"),
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
const getListData = function () {
  getDtsd().then((res) => {
    let spjk = res.data.spjk;
    let dict = {
      "园区监控": "hgyqjk",
      "重点地点": "zdddjk",
      "综合执法局监控": "zhzfjjk",
      "公安监控": "gajk",
      "危化企业监控": "whqyjk",
      "住建监控": "zjjjk",
      "交警监控": "jjjk",
      "水利监控": "sljjk",
    }
    let icons={
      "园区监控": "icon_huagongyuanqu",
      "重点地点": "icon_ziranzaihai",
      "综合执法局监控": "icon_ziranzaihai",
      "公安监控": "icon_gongan",
      "危化企业监控": "icon_whqyjk",
      "住建监控": "icon_zhujianju",
      "交警监控": "icon_jjjk",
      "水利监控": "icon_shuiliju",
    }
    spjk.forEach((item) => {
      item.jh = item.jh || [];
      safeCheckboxPoints[item.mc] = item.jh.map((info) => {
        return {
          markerType: dict[item.mc],
          id: info.id,
          lng: info.mapX + "",
          lat: info.mapY + "",
          name: info.typeName,
          icon: `/images/marker/${icons[item.mc]}.png`,
          label: { text: item.mc, font_size: 16 },
          dialogType: dict[item.mc],
          details: {
            monitorName: info.monitorName,
            typeName: info.typeName,
            location: info.location,
          },
        };
      });
    });
  });
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
const isHide = ref(false);
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
onMounted(() => {
  getListData();
  getEnDatas();
});
const getEnDatas = function () {
  getQyfbTree().then((res) => {
    res.data.forEach((item) => {
      if (item.dataType == 2 && typeof item.spare1 === "string") {
        let info = JSON.parse(item.spare1);
        if (info.longitude && info.latitude) {
          let type = info.enterpriseType;
          if (type === "烟花爆竹") {
            safeCheckboxPoints.yhbzqy.push({
              markerType: "yhbzqy",
              id: item.id,
              lng: info.longitude,
              lat: info.latitude,
              name: "烟花爆竹企业",
              icon: "/images/marker/icon_yanhua.png",
              label: { text: "烟花爆竹企业", font_size: 16 },
              dialogType: "yhbzqy",
              details: {
                name: item.title,
                type: info.enterpriseType,
                area: info.xzqhName,
                address: info.address,
              },
            });
          } else if (type === "非煤矿山") {
            safeCheckboxPoints.fmks.push({
              markerType: "fmks",
              id: item.id,
              lng: info.longitude,
              lat: info.latitude,
              name: "非煤矿山",
              icon: "/images/marker/icon_kuangshan.png",
              label: { text: "非煤矿山", font_size: 16 },
              dialogType: "fmks",
              details: {
                name: item.title,
                type: info.enterpriseType,
                area: info.xzqhName,
                address: info.address,
              },
            });
          } else if (type === "煤矿") {
            safeCheckboxPoints.mk.push({
              markerType: "mk",
              id: item.id,
              lng: info.longitude,
              lat: info.latitude,
              name: "煤矿",
              icon: "/images/marker/icon_meikuang.png",
              label: { text: "煤矿", font_size: 16 },
              dialogType: "mk",
              details: {
                name: item.title,
                type: info.enterpriseType,
                area: info.xzqhName,
                address: info.address,
              },
            });
          } else if (type === "危化") {
            safeCheckboxPoints.whqy.push({
              markerType: "qyxx",
              id: item.id,
              lng: info.longitude,
              lat: info.latitude,
              name: "危化企业",
              icon: "/images/marker/mapdot-dangerous-chemicals.png",
              label: { text: "危化企业", font_size: 16 },
              dialogType: "qyxx",
              details: {
                name: item.title,
                type: info.enterpriseType,
                area: info.xzqhName,
                address: info.address,
              },
            });
          }
        }
      }
    });
  });
};

watch(selectedList, (val, old) => {
  let diff = calcArrayDiff(val, old);
  console.log(safeCheckboxPoints, diff)
  for (const id of diff) {
    if (safeCheckboxPoints[id]) {
      console.log(safeCheckboxPoints[id]);
      if (val.length > old.length) {
        if (Array.isArray(safeCheckboxPoints[id])) {
          console.log(2)
          safeCheckboxPoints[id].forEach((item) => {
            console.log(item)
            $mitt.emit("addMarker", item);
          });
        }
      } else {
        if (Array.isArray(safeCheckboxPoints[id])) {
          safeCheckboxPoints[id].forEach((item) => {
            $mitt.emit("changeMarkerState", item);
          });
        }
      }
    }
  }
});
</script>
<template>
  <div class="checkboxs">
    <div
      :class="isHide ? 'hideIcon hideIconActive' : 'hideIcon'"
      @click="isHide = !isHide"
    ></div>
    <ul class="checkbox_list" :style="{ maxHeight: isHide ? '0' : '800px' }">
      <li v-for="types in treeData">
        <div
          class="parent"
          :class="allSelecteds[types.id] ? 'checked_item' : ''"
          @click="showLists[types.id] = !showLists[types.id]"
        >
          <div class="checkbox_box" @click.stop="checkAll(types.id)"></div>
          <div class="word">{{ types.name }}</div>
          <div class="icon">
            <el-icon
              :style="{
                transform: showLists[types.id] ? '' : 'rotate(180deg)',
              }"
            >
              <ArrowDownBold></ArrowDownBold>
            </el-icon>
          </div>
        </div>
        <ul
          class="childList"
          :style="{
            height: showLists[types.id] ? types.children.length * 32 + 'px' : 0,
          }"
        >
          <li
            v-for="item in types.children"
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
      </li>
    </ul>
  </div>
</template>
<style lang="less" scoped>
.checkboxs {
  position: absolute;
  left: 460px;
  top: 190px;
  min-width: 180px;
  background: rgba(1, 23, 65, 0.8);
  box-shadow: inset 0px 0px 12px 1px rgba(87, 229, 255, 0.5);
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  .hideIcon {
    width: 30px;
    height: 30px;
    position: absolute;
    left: 0;
    top: -30px;
    cursor: pointer;
    transition: 0.3s linear;
    background: url(@/assets/safe/hide_icon.png) no-repeat;
    background-size: 30px 30px;
    background-color: rgba(4, 14, 21, 0.7);
  }
  .hideIconActive {
    background-image: url(@/assets/safe/hide_icon_active.png);
  }
  .checkbox_list {
    padding-left: 7px;
    padding-right: 7px;
    overflow: hidden;
    transition: 0.4s linear;
    > li:first-child {
      margin-top: 12px;
    }
    > li {
      margin-bottom: 12px;
      font-size: 14px;
      font-family: Source Han Sans-Bold, Source Han Sans;
      font-weight: bold;
      color: #c6d1db;
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
