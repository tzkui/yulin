<script setup>
import ViewBox from "@/components/common/view-box.vue";
import { getWeatherInfo } from "@/api/modules/home.js";
import { onMounted, ref } from "vue";
import moment from "moment";

const weatherList = ref([
  { id: 1, time: "10月18日", state: 1, weather: "15℃/21℃" },
  { id: 2, time: "10月19日", state: 1, weather: "14℃/22℃" },
]);
const weatherInfo = ref({
  zdwd1: "-4.0",
  zgwd: "5.0",
  fl: "<3级",
  ybrq: "2023-11-13 00:00:00",
  tq: "小雪",
  fx2: "东北风",
});
const showList = ref(false);
onMounted(() => {
  const param = {
    startTime: moment().subtract(1, "days").format("YYYY-MM-DD"),
    endTime: moment().format("YYYY-MM-DD"),
  };
  getWeatherInfo(param).then((res) => {
    weatherList.value = res.data;
    weatherInfo.value = res.data[1] || {}
  });
});
</script>
<template>
  <ViewBox title="气象信息">
    <div class="meteorological_information">
      <div class="weather_box">
        <div class="weather_item">
          <img class="img" src="@/assets/home/weather_1.png" alt="" />
          <div class="item_cont">
            <span class="cont_name"> 风速 </span>
            <div class="cont_num">
              {{weatherInfo.fl}}
              <!-- <span class="unit">级</span> -->
            </div>
          </div>
        </div>
        <div class="weather_item">
          <img class="img" src="@/assets/home/weather_2.png" alt="" />
          <div class="item_cont">
            <span class="cont_name"> 温度 </span>
            <div class="cont_num">
              {{weatherInfo.zgwd}}
            </div>
          </div>
        </div>
        <div class="weather_item">
          <img class="img" src="@/assets/home/weather_3.png" alt="" />
          <div class="item_cont">
            <span class="cont_name"> 风向 </span>
            <div class="cont_num">{{weatherInfo.fx2}}</div>
          </div>
        </div>
      </div>

      <div class="weather_list">
        <span class="time">{{ moment().format("MM月DD日") }}</span>
        <span class="date" @click="showList = !showList" style="cursor: pointer"
          >今天</span
        >
        <!-- <img
          class="weather"
          src="@/assets/naturalRightimg/taityang.png"
          alt=""
        /> -->
        <span>{{ weatherInfo.tq }}</span>
        <span class="centigrade">{{weatherInfo.zdwd1}}℃/{{weatherInfo.zgwd}}℃</span>
      </div>
    </div>
    <ul class="infoList" v-if="showList">
      <li
        v-for="(item, index) in weatherList"
        :key="item.id"
        :class="index === 1 ? 'spac' : ''"
      >
        <div class="time">{{ moment(item.ybrq).format("MM月DD日") }}</div>
        <div class="today" v-if="index === 1">今天</div>
        <div class="icon">
          <!-- <img
            class="weather"
            src="@/assets/naturalRightimg/taityang.png"
            v-if="item.state === 1"
          /> -->
          <span>{{ item.tq }}</span>
        </div>
        <div class="weather">{{item.zdwd1}}℃/{{item.zgwd}}℃</div>
      </li>
    </ul>
  </ViewBox>
</template>

<style lang="scss" scoped>
.meteorological_information {
  height: 106px;
  padding: 4px 5px 0 14px;

  .weather_box {
    display: flex;
    margin-bottom: 8px;

    .weather_item {
      display: flex;
      margin-right: 20px;

      &:last-child {
        margin: 0;
      }

      width: calc((100% - 40px) / 3);

      .img {
        width: 56px;
        height: 56px;
        margin-right: 15px;
      }

      .item_cont {
        font-family: Source Han Sans SC-Medium, Source Han Sans SC;
        font-weight: 500;

        .cont_name {
          font-size: 16px;
          color: #d0deee;
          line-height: 23px;
        }

        .cont_num {
          font-size: 18px;
          color: #ffffff;
          line-height: 33px;
          display: flex;
          align-items: center;
          flex-wrap: nowrap;
          .unit {
            font-size: 12px;
            line-height: 14px;
            color: rgba(63, 79, 110, 1);
            margin-left: 10px;
          }
        }
      }
    }
  }

  .weather_list {
    height: 36px;
    background: rgba(13, 50, 90, 1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 12px;
    font-size: 16px;
    font-family: Source Han Sans SC-Regular, Source Han Sans SC;
    font-weight: 400;
    color: #d0deee;

    .weather {
      width: 23px;
      height: 23px;
    }
  }
}

.infoList {
  position: absolute;
  right: 460px;
  top: 40px;
  width: 80%;
  background-color: #1d3664;
  color: #d0deee;
  border-radius: 5px;
  > li {
    display: flex;
    position: relative;
    height: 36px;
    line-height: 36px;
    padding-left: 20px;
    background: rgba(13, 50, 90, 1);
    margin-bottom: 10px;
    margin-top: 10px;
    .time {
      flex: 4;
    }
    .today {
      position: absolute;
      left: 120px;
    }
    .icon {
      flex: 2;
      img {
        width: 23px;
        height: 23px;
      }
    }
    .weather {
      flex: 1;
      margin-right: 20px;
    }
  }
}
.spac {
  font-size: 14px;
  color: #fff;
}
</style>
