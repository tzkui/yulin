<script setup>
import ViewBox from "@/components/common/view-box.vue";
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";
import { icon_config } from "@/config/common.js";
import { ref, inject, onMounted, nextTick, onUnmounted } from "vue";
import { getSjxx } from "@/api/modules/home.js";
import moment from "moment";
const $mitt = inject("$mitt");

const originList = ref([]);
const event_list = ref([]);
const getEventList = function (id) {
  getSjxx().then((res) => {
    let today = moment().format("YYYY-MM-DD");
    let todayLen = res.data.filter(
      (item) => item.eventDate.slice(0, 10) === today
    ).length;
    boxTitle.value = `今日事件<span style='font-size: 28px;color: #EFAD2C;'> ${todayLen} </span>起`;
    originList.value = res.data.map((item) => {
      return {
        typeName: item.typeName,
        time: item.reportDate?.slice(5),
        cont: item.eventContent,
        state: item.stateName,
        type: "sj",
        icon: "sj",
        location: item.eventAddress,
        name: item.eventName,
        id: item.id,
        lng: item.mapX,
        lat: item.mapY,
      };
    });
    event_list.value = originList.value.slice(0, 50);
    if (id) {
      nextTick(() => {
        $mitt.emit("hideAllMarker");
        document.getElementById("event_" + id).click();
      });
    }
  });
};
const isScroll = ref(true);
const search_value = ref("");
onMounted(() => {
  getEventList();
  $mitt.on("changeEventState", function (info) {
    let id = info.id;
    getEventList(id);
  });
});
let currentMarkerTypeData = ref({});
const setMarker = (data) => {
  // console.log(data);
  $mitt.emit("hideAllMarker");
  let position = [110.00449, 37.95844];

  let item = currentMarkerTypeData.value.item || {}; //撒点信息
  if (!data.icon) {
    item = { ...item, ...data };
  } else {
    item = { ...data };
  }
  let obj = item; //展示字段
  // 处理空格 避免撒点弹框转换json字符串报错
  for (const key in obj) {
    obj[key] = (obj[key] + "").replace(" ", "&nbsp;");
  }
  const l1 = ["待处理", "属实"];
  const l2 = ["属实", "已启动响应"];
  obj = {
    ...obj,
    // hideEventSupplementaryRecording:!l1.includes(item.state),
    hideDispatch: !l2.includes(item.state),
    hideEventVerification: item.state !== "待处理",
  };
  let markerData = {
    markerType: item.type,
    id: item.id,
    lng: item.lng,
    lat: item.lat,
    name: item.typeName + item.id,
    icon: item.icon && icon_config[item.icon].icon,
    label: { text: item.typeName + (item.name || item.id), font_size: 16 },
    dialogType: item.type,
    details: obj,
  };
  $mitt.emit("addMarker", markerData);
  $mitt.emit("openPopup", markerData);
  $mitt.emit("flyTo", markerData);
};
const searchData = function () {
  let keyWord = search_value.value || "";
  if (keyWord) {
    event_list.value = originList.value
      .filter((item) => {
        return item.cont?.includes(keyWord) || item.name?.includes(keyWord);
      })
      .slice(0, 50);
    isScroll.value = false;
  } else {
    event_list.value = originList.value.slice(0, 50);
    isScroll.value = true;
  }
};
const boxTitle = ref("");
onUnmounted(() => {
  $mitt.all.delete("changeEventState");
});
const a = ref(false);
</script>

<template>
  <ViewBox :title="boxTitle">
    <div class="search_box">
      <el-input v-model="search_value" placeholder="请输入关键字" clearable />
      <img
        class="img"
        @click="searchData"
        src="@/assets/home/icon_search.png"
        alt=""
      />
    </div>
    <div class="event_information">
      <ul class="event_list">
        <li class="list_head list">
          <span class="item_type">类型</span>
          <span class="item_time">时间</span>
          <span class="item_cont">事件内容</span>
          <span class="item_state">状态</span>
        </li>
        <div class="cont">
          <vue3-seamless-scroll
            class="scroll_box"
            :list="event_list"
            hover
            :step="0.5"
            v-model="isScroll"
          >
            <li
              class="list_item list"
              v-for="(item, index) in event_list"
              :key="index"
              :id="'event_' + item.id"
              @click="setMarker(item)"
            >
              <span class="item_type">{{ item.typeName }}</span>
              <span class="item_time">{{ item.time }}</span>
              <span class="item_cont">{{ item.cont }}</span>
              <span
                class="item_state"
                :class="item.state == '已结案' ? 'green' : ''"
                :title="item.state"
                >{{ item.state }}</span
              >
            </li>
          </vue3-seamless-scroll>
        </div>
      </ul>
    </div>
  </ViewBox>
</template>
<style lang="scss" scoped>
.event_information {
  height: 135px;
  padding: 8px 20px 0 10px;

  .event_list {
    height: 100%;

    .list {
      font-size: 14px;
      font-family: Source Han Sans SC-Regular, Source Han Sans SC;
      font-weight: 400;
      line-height: 38px;
      height: 38px;
      color: #c3edff;
      background: url("@/assets/home/bg_2.png") center/100% 100% no-repeat;
      margin-bottom: 4px;
      display: flex;

      > span {
        margin-left: 15px;
        display: inline-block;
      }
    }

    .cont {
      height: calc(100% - 42px);
      overflow: auto;
    }

    .list_item {
      color: #ffffff;
      background: transparent;
      border-radius: 4px 4px 4px 4px;
      border: 1px solid;
      border-image: linear-gradient(
          180deg,
          rgba(0, 96, 128, 0.56),
          rgba(0, 96, 128, 0.23)
        )
        1 1;

      &:hover {
        background: rgba(9, 65, 93, 0.61);
        border-image: linear-gradient(
            90deg,
            rgba(0, 96, 128, 1),
            rgba(0, 96, 128, 0),
            rgba(0, 96, 128, 0.34)
          )
          1 1;
      }

      .item_state {
        color: #efad2c;

        &.green {
          color: #20e6a4;
        }
      }
    }

    .item_type {
      width: 70px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .item_time {
      width: 110px;
    }

    .item_cont {
      flex: 1;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .item_state {
      width: 60px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
.search_box {
  display: flex;
  align-items: center;
  width: 161px;
  height: 32px;
  background: rgba(9, 39, 67, 0.7);
  border: 1px solid #1e89fd;
  padding-right: 12px;
  margin-bottom: 10px;
  position: absolute;
  right: 30px;
  top: -40px;
  :deep(.el-input__inner) {
    &::-webkit-input-placeholder {
      font-size: 16px;
      color: #aacbf6 !important;
    }
  }

  .img {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
}
</style>
