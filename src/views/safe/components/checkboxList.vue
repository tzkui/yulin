<script setup>
import { ref, computed, watch, inject, openBlock, onMounted } from "vue";
// import { safeCheckboxPoints } from "@/api/mock_tzk.js";
import { assetsUrl } from "@/components/map/map2d/hook/index";
import { getDtsd } from "@/api/modules/aqsc.js";
import { getQyfbTree } from "@/api/modules/home.js";
import dialogVue from "@/components/common/dialog.vue";
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
      // {
      //   name: "公安监控",
      //   id: "公安监控",
      //   checked: false,
      //   iconUrl: getMarkerUrl("icon_gongan"),
      // },
      // {
      //   name: "住建局监控",
      //   id: "住建监控",
      //   checked: false,
      //   iconUrl: getMarkerUrl("icon_zhujianju"),
      // },
      // {
      //   name: "水利局监控",
      //   id: "水利监控",
      //   checked: false,
      //   iconUrl: getMarkerUrl("icon_shuiliju"),
      // },
      {
        name: "重点地点监控",
        id: "重点地点",
        checked: false,
        iconUrl: getMarkerUrl("icon_ziranzaihai"),
      },
      // {
      //   name: "化工园区监控",
      //   id: "园区监控",
      //   checked: false,
      //   iconUrl: getMarkerUrl("icon_huagongyuanqu"),
      // },
      // {
      //   name: "综合执法局监控",
      //   id: "综合执法局监控",
      //   checked: false,
      //   iconUrl: getMarkerUrl("icon_ziranzaihai"),
      // },
      {
        name: "危化企业监控",
        id: "危化企业监控",
        checked: false,
        iconUrl: getMarkerUrl("icon_whqyjk"),
      },
      // {
      //   name: "交警监控",
      //   id: "交警监控",
      //   checked: false,
      //   iconUrl: getMarkerUrl("icon_jjjk"),
      // },
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
      园区监控: "hgyqjk",
      重点地点: "zdddjk",
      综合执法局监控: "zhzfjjk",
      公安监控: "gajk",
      危化企业监控: "whqyjk",
      住建监控: "zjjjk",
      交警监控: "jjjk",
      水利监控: "sljjk",
    };
    let icons = {
      园区监控: "icon_huagongyuanqu",
      重点地点: "icon_ziranzaihai",
      综合执法局监控: "icon_ziranzaihai",
      公安监控: "icon_gongan",
      危化企业监控: "icon_whqyjk",
      住建监控: "icon_zhujianju",
      交警监控: "icon_jjjk",
      水利监控: "icon_shuiliju",
    };
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
const filters = ref([
  {
    name: "区域",
    id: "area",
    children: [
      { name: "全部", id: "all" },
      { name: "榆阳区", id: "榆阳区" },
      { name: "横山区", id: "横山区" },
      { name: "神木市", id: "神木市" },
      { name: "府谷县", id: "府谷县" },
      { name: "靖边县", id: "靖边县" },
      { name: "定边县", id: "定边县" },
      { name: "绥德县", id: "绥德县" },
      { name: "米脂县", id: "米脂县" },
      { name: "佳县", id: "佳县" },
      { name: "吴堡县", id: "吴堡县" },
      { name: "清涧县", id: "清涧县" },
      { name: "子洲县", id: "子洲县" },
    ],
  },
  {
    name: "企业类型",
    id: "type",
    children: [
      { name: "全部", id: "all" },
      { name: "煤矿", id: "mk" },
      { name: "非煤矿山", id: "fmks" },
      { name: "烟花爆竹企业", id: "yhbzqy" },
      { name: "危化企业", id: "whqy" },
      { name: "尾矿库", id: "wkk" },
      { name: "其他", id: "qt" },
      { name: "粉尘涉爆", id: "fcsb" },
      { name: "涉氨制冷", id: "sazl" },
      { name: "机械制造", id: "jxzz" },
    ],
  },
  {
    name: "企业规模",
    id: "gm",
    children: [
      { name: "全部", id: "all" },
      { name: "大", id: 1 },
      { name: "中", id: 2 },
      { name: "小", id: 3 },
    ],
  },
]);
const showDialog = ref(false)
const filter_Infos = ref({
  area: "all",
  type: "all",
  gm: "all"
})
const closeHandle = function(){
  showDialog.value = false;
}
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
const selectFilter = function(type, info){
  let oldVal = filter_Infos.value[type.id];
  let newVal = info.id;
  if(oldVal !== newVal){
    filter_Infos.value[type.id] = newVal;
  }
}
const filterResult = ref([])
const filterEnt = function(){
  let baseLists = []
  console.log(safeCheckboxPoints)
  const {mk,fmks,yhbzqy,whqy} = safeCheckboxPoints;
  let areaType = filter_Infos.value.type;
  if(areaType==="all"){
    baseLists = [...mk,...fmks,...yhbzqy,...whqy]
  }else{
    baseLists = safeCheckboxPoints[areaType] || []
  }
  if(filter_Infos.value.area==="all"){
    filterResult.value = baseLists;
  }else{
    filterResult.value = baseLists.filter(item=>{
      return item.details.area===filter_Infos.value.area
    })
  }
  console.log(filterResult.value)
}
const addFilterMarker = function(info){
  $mitt.emit("addMarker", info);
  showDialog.value = false
  $mitt.emit("flyTo", info);
  $mitt.emit("openPopup", info);
}
watch(selectedList, (val, old) => {
  let diff = calcArrayDiff(val, old);
  console.log(safeCheckboxPoints, diff);
  for (const id of diff) {
    if (safeCheckboxPoints[id]) {
      console.log(safeCheckboxPoints[id]);
      if (val.length > old.length) {
        if (Array.isArray(safeCheckboxPoints[id])) {
          console.log(2);
          safeCheckboxPoints[id].forEach((item) => {
            console.log(item);
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
      <div class="filter_btn" @click="showDialog=true">筛选</div>
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
  <Teleport to="body">
    <dialogVue
      :dialogValue="showDialog"
      :title="'企业筛选'"
      width="640px"
      height="600px"
      top="500px"
      @closeHandle="closeHandle"
    > 
      <div class="filter_lists">
        <div class="filter_lists_item" v-for="item in filters" :key="item.id">
          <div class="filter_name">{{ item.name }}</div>
          <ul>
            <li 
              v-for="filterItem in item.children" 
              :class="{active_filter: filterItem.id===filter_Infos[item.id]}" 
              :key="filterItem.id"
              @click="selectFilter(item,filterItem)"
            >{{ filterItem.name }}</li>
          </ul>
        </div>
        <div class="submit_btn" @click="filterEnt">确定</div>
      </div>
      <ul class="ent_list">
        <li v-for="item in filterResult" :key="item.id" @click="addFilterMarker(item)">{{ item.details.name }}</li>
      </ul>
    </dialogVue>
  </Teleport>
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
.filter_btn {
  line-height: 24px;
  font-size: 16px;
  border: 2px solid #1d75d6;
  width: 72px;
  border-radius: 2px;
  text-align: center;
  margin-top: 6px;
  margin-bottom: 6px;
  cursor: pointer;
}
.filter_lists{
  font-size: 16px;
  line-height: 24px;
  position: relative;
  &_item{
    display: flex;
    margin-bottom: 16px;
    .filter_name{
      width: 80px;
      color: #fff;
    }
    >ul{
      display: flex;
      align-items: center;
      width: 500px;
      flex-wrap: wrap;
      gap: 8px;
      >li{
        border: 1px solid #fff;
        color: #fff;
        padding: 0 8px;
        // margin-bottom: 16px;
        cursor: pointer;
      }
      >.active_filter{
        border-color: #1976d2;
        background-color: #1976d2;
      }
    }
  }
  .submit_btn{
    width: 60px;
    padding: 0 8px;
    border: 1px solid #1976d2;
    background-color: #1976d2;
    text-align: center;
    border-radius: 3px;
    cursor: pointer;
    color: #fff;
    position: absolute;
    bottom: 0;
    right: 0;
  }
}
.ent_list{
  height: 300px;
  overflow-y: auto;
    margin-left: -10px;
  >li{
    color: #fff;
    font-size: 16px;
    line-height: 24px;
    padding-left: 10px;
    cursor: pointer;
    &:hover{
      background-color: #1976D2;
    }
  }
}
</style>
