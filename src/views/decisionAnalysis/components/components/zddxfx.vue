<script setup>
import { onMounted, ref, computed, inject } from "vue";
import ViewBox from "@/components/common/view-box.vue";
import { getZdfhmb, getZdfhmbType } from '@/api/decision_analysis.js'
import {getMarkerInfo} from './getMarkerInfo.js'
import {ElMessage} from 'element-plus'

const props = defineProps({
  center: {
    type: Array,
    default: [],
  },
});

const $mitt = inject("$mitt")
const radius = ref(3000)
let timer = null;
const changeRadius = function(radius){
    if(props.center.length!==2){
      console.log("zzzzz")
      ElMessage.warning("请先选择事件")
      return 
    }
  if(timer){
    clearTimeout(timer);
  }
  timer = setTimeout(()=>{
    console.log('xxxx',props.center)
    getAllDisasters()
  },500)
}
const showNum = ref(false)
// 灾情影响 统计内容
const effect_cont = ref([
  {
    num: 0,
    unit: "㎡",
    type: "影响面积",
  },
  {
    num: 0,
    unit: "个",
    type: "防护目标",
  },
]);
const placeList = ref([])
const selectedPlace = ref("")
const selectZddx = function (info) {
  selectedPlace.value = info.value;
};
const dxzhtData = ref({
  name: "大型综合体",
  num: 0,
  value: "大型综合体"
})
let allDisasters = ref({});
const zddxList = computed(() => {
  return allDisasters.value[selectedPlace.value] || [];
});
const getAllDisasters = function () {
  console.log(placeList.value)
  const params = {
    map_x: props.center[0],
    map_y: props.center[1],
    radius: radius.value / 1000,
    typeIds: placeList.value.map((item) => item.value),
  };
  console.log("xxx",params)
  getZdfhmb(params).then((res) => {
    showNum.value = true;
    effect_cont.value[0].num = Math.floor(res.data.totalArea);
    effect_cont.value[1].num = Math.floor(res.data.total);
    res.data.data.forEach((item) => {
      for (const info of placeList.value) {
        if (info.value === item.typeId) {
          info.num = item.count;
        }
      }
      allDisasters.value[item.typeId] = item.defenceAims.map((info) => {
        return {
          name: info.name || info.enterpriseName,
          id: info.id,
          markerInfo: getMarkerInfo(item.typeId, info),
        };
      });
    });
  });
};
const initType = function(){
  getZdfhmbType().then((res) => {
    placeList.value = res.data;
    // getAllDisasters();
  });
}
onMounted(()=>{
  initType();
})

const flyTo = function (info) {
  $mitt.emit("openPopup", info.markerInfo);
  $mitt.emit("flyTo", info.markerInfo);
};
</script>

<template>
  <ViewBox title="重点对象分析">
    <div class="resources">
      <div class="effect_radius">
        影响半径<span class="blue">{{radius}}米</span>
        <el-slider
          v-model="radius"
          :max="100000"
          @input="changeRadius"
          :show-tooltip="true"
          :disabled = "center.length<2"
        ></el-slider>
        <!-- 受灾内容 -->
        <div class="effect_cont_lists">
          <div
            class="effect_cont_list"
            v-for="(item, index) in effect_cont"
            :key="index"
          >
            <div class="cont_num">
              <span class="num">{{ item.num.toFixed(0) }}</span
              >{{ item.unit }}
            </div>
            <div class="cont_type">
              {{ item.type }}
            </div>
          </div>
        </div>
        <div class="checkboxs">
          <div
            v-for="(item, index) in placeList"
            :key="index"
            :class="{
              check_item: true,
              active: selectedPlace === item.value,
            }"
            @click="selectZddx(item)"
          >
            <span>{{ item.name }}&nbsp;</span>
            <span style="color: #e6964f">{{item.num}}</span>
          </div>
          <div
            :class="{
              check_item: true,
              active: selectedPlace === dxzhtData.value,
            }"
            @click="selectZddx(dxzhtData)"
          >
            <span>{{ dxzhtData.name }}&nbsp;</span>
            <span style="color: #e6964f" v-if="showNum">{{dxzhtData.num}}</span>
          </div>
        </div>
        <!-- 列表 -->
        <div class="cont_lists">
          <div
            class="cont_list"
            v-for="(item, index) in zddxList"
            :key="index"
            @click="flyTo(item)"
          >
            <div class="label">{{ item.name }}</div>
            <div class="value_1">
              {{ item.distance }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </ViewBox>
</template>

<style lang="less" scoped>
.resources {
  height: 520px;

  .effect_cont_lists {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;

    .effect_cont_list {
      height: 95px;
      flex: 1;
      margin-right: 10px;
      background: url("@/assets/decisionAnalysis/effect_box_bg.png") center/100%
        100% no-repeat;
      text-align: center;

      &:last-child {
        margin: 0;
      }

      .cont_num {
        line-height: 60px;
        color: #ccc;

        .num {
          font-size: 22px;
          font-weight: bold;
          margin-right: 5px;
          -webkit-text-fill-color: transparent;
          background-image: -webkit-linear-gradient(left, #e6964f, #d16537 80%);
          background-clip: text;
          -webkit-background-clip: text;
        }
      }

      .cont_type {
        line-height: 26px;
        font-size: 14px;
        color: #ccc;
        letter-spacing: 1px;
      }
    }
  }

  .effect_radius {
    .effect_radius {
      margin-top: 10px;
      font-size: 15px;

      .blue {
        margin-left: 8px;
        color: #59d4d1;
        font-weight: bold;
      }

      .cont_lists {
        overflow: auto;

        // margin-top: 8px;
        .cont_list {
          display: flex;
          line-height: 38px;
          margin: 4px 0;
          padding: 0 10px;
          position: relative;

          &:nth-child(even) {
            background: #081c25;
          }

          &:hover {
            background: #092a33;

            &::before {
              position: absolute;
              content: "";
              height: 16px;
              width: 2px;
              left: 0;
              top: 10px;
              background: #56cecc;
            }
          }

          .label {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }

    :deep(.el-slider) {
      margin-top: 5px;

      .el-slider__runway {
        background-color: #062f41;
        border: 1px solid #1b4257;
      }

      .el-slider__bar {
        background: linear-gradient(90deg, #1a678b 0%, #1b9dbf 100%);
      }

      .el-slider__button {
        background: radial-gradient(circle, #a9eefa, #4eb3cd);
        box-shadow: 0 0 12px 5px #1393bf;
        border: none;
        height: 10px;
        width: 10px;

        &:hover {
          transform: scale(1.01);
        }
      }
    }

    .checkboxs {
      margin-top: 20px;
      display: flex;
      flex-wrap: wrap;

      .check_item {
        height: 45px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        width: calc((100% - 15px) / 4);
        font-size: 14px;
        background: url("@/assets/decisionAnalysis/tab.png") center/99% 100%
          no-repeat;
        margin-bottom: 8px;
        margin-right: 5px;

        &:nth-child(4n) {
          margin: 0;
        }

        &.active {
          background: url("@/assets/decisionAnalysis/tab_active.png") center/99%
            100% no-repeat;
        }
      }
    }
    .cont_lists {
      height: 145px;

      .cont_list {
        .label {
          width: 80%;
        }
      }
    }
  }
}
</style>
