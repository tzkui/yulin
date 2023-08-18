<script setup>
import ViewBox from "@/components/common/view-box.vue";
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
        <span class="date">今天</span>
        <img
          class="weather"
          src="@/assets/naturalRightimg/taityang.png"
          alt=""
        />
        <span class="centigrade">14℃/22℃</span>
      </div>
    </div>
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
</style>
