<script setup>
import ViewBox from "@/components/common/view-box.vue";
import { ref } from "vue";

const weatherList = ref([
  { id: 1, time: "10月18日", state: 1, weather: "15℃/21℃" },
  { id: 2, time: "10月19日", state: 1, weather: "14℃/22℃" },
  { id: 3, time: "10月20日", state: 1, weather: "16℃/25℃" },
  { id: 4, time: "10月21日", state: 1, weather: "14℃/22℃" },
  { id: 5, time: "10月22日", state: 1, weather: "12℃/17℃" },
  { id: 6, time: "10月23日", state: 1, weather: "14℃/20℃" },
  { id: 7, time: "10月24日", state: 1, weather: "15℃/22℃" },
  { id: 8, time: "10月25日", state: 1, weather: "16℃/25℃" },
  { id: 9, time: "10月26日", state: 1, weather: "18℃/27℃" },
]);
const showList = ref(false)
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
              2
              <span class="unit">级</span>
            </div>
          </div>
        </div>
        <div class="weather_item">
          <img class="img" src="@/assets/home/weather_2.png" alt="" />
          <div class="item_cont">
            <span class="cont_name"> 湿度 </span>
            <div class="cont_num">
              60
              <span class="unit">%</span>
            </div>
          </div>
        </div>
        <div class="weather_item">
          <img class="img" src="@/assets/home/weather_3.png" alt="" />
          <div class="item_cont">
            <span class="cont_name"> 风向 </span>
            <div class="cont_num">东南</div>
          </div>
        </div>
      </div>

      <div class="weather_list">
        <span class="time">10月19日</span>
        <span class="date" @click="showList=!showList" style="cursor: pointer;">今天</span>
        <img
          class="weather"
          src="@/assets/naturalRightimg/taityang.png"
          alt=""
        />
        <span class="centigrade">14℃/22℃</span>
      </div>
    </div>
    <ul class="infoList" v-if="showList">
      <li v-for="(item, index) in weatherList" :key="item.id" :class="index===1?'spac':''">
        <div class="time">{{ item.time }}</div>
        <div class="today" v-if="index === 1">今天</div>
        <div class="icon">
          <img
            class="weather"
            src="@/assets/naturalRightimg/taityang.png"
            v-if="item.state === 1"
          />
        </div>
        <div class="weather">{{ item.weather }}</div>
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
      margin-right: 33px;

      &:last-child {
        margin: 0;
      }

      width: calc((100% - 66px) / 3);

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
          font-size: 23px;
          color: #ffffff;
          line-height: 33px;
          display: flex;
          align-items: center;

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
  background-color: #1D3664;
  color: #d0deee;
  border-radius: 5px;
  >li{
    display: flex;
    position: relative;
    height: 36px;
    line-height: 36px;
    padding-left: 20px;
    background: rgba(13, 50, 90, 1);
    margin-bottom: 10px;
    margin-top: 10px;
    .time{
      flex: 4;
    }
    .today{
      position: absolute;
      left: 120px;
    }
    .icon{
      flex: 2;
      img{
        width: 23px;
        height: 23px;
      }
    }
    .weather{
      flex: 1;
      margin-right: 20px;;
    }
  }
}
.spac{
  font-size: 14px;
  color: #fff;;
}
</style>
