<script setup>
import ViewBox from "@/components/common/view-box.vue";
import { ref, onMounted } from "vue";
import { getZbxx, getFxyh, getFxgz, getYjzy } from "@/api/modules/zrzh.js";
const list = ref([]);
const getList = function () {
  getZbxx().then((res) => {
    list.value = res.data.map((item) => {
      return {
        id: item.id,
        name: item.personalName,
        job: item.roleName,
        phone: item.personalPhone,
      };
    });
    list.value = list.value.slice(0,3)
  });
};
onMounted(() => {
  getList();
});
</script>
<template>
  <ViewBox title="值班信息">
    <div class="onduty_information">
      <div class="btn"></div>
      <div class="onduty_box">
        <div class="onduty_item" v-for="item in list" :key="item.id">
          <div class="duty">{{ item.job }}</div>
          <div>
            <span class="name"> {{ item.name }} </span>
            <img class="img" src="@/assets/home/icon_phone.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </ViewBox>
</template>
<style lang="scss" scoped>
.onduty_information {
  height: 72px;
  padding: 4px 15px 0 5px;
  position: relative;

  .btn {
    position: absolute;
    width: 58px;
    height: 23px;
    top: -38px;
    right: 30px;
    background: url("@/assets/home/img_more.png") center/100% 100% no-repeat;
    cursor: pointer;
  }

  .onduty_box {
    display: flex;

    .onduty_item {
      margin: 0px 7px 0 0;
      flex: 1;
      height: 68px;
      padding-left: 50px;
      background: url("@/assets/home/bg_1.png") center/100% 100% no-repeat;
      display: flex;
      flex-direction: column;
      justify-content: center;

      &:last-child {
        margin-right: 0;
      }

      .img {
        width: 19px;
        height: 19px;
        margin-left: 6px;
        vertical-align: top;
      }

      .duty {
        font-size: 16px;
        font-family: Alibaba PuHuiTi-Regular, Alibaba PuHuiTi;
        font-weight: 400;
        color: #c6d1db;
        line-height: 22px;
        margin-bottom: 6px;
      }

      .name {
        font-size: 14px;
        font-family: Alibaba PuHuiTi-Regular, Alibaba PuHuiTi;
        font-weight: 400;
        color: #ffffff;
        line-height: 19px;
      }
    }
  }
}
</style>
