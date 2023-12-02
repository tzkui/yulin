<script setup>
import ViewBox from "@/components/common/view-box.vue";
import { ref, onMounted } from "vue";
import { getZbxx } from "@/api/modules/zrzh.js";
import moment from "moment";
import "moment/locale/zh-cn"; // 引入中文语言文件

const phoneCallRef = ref();
const phone = function (info) {
  phoneCallRef.value.phoneCall(info.phone);
};
const list = ref([]);
const getList = function () {
  getZbxx({sj: moment().format("YYYY-MM-DD")}).then((res) => {
    list.value = res.data.map((item) => {
      return {
        id: item.id,
        name: item.xm,
        job: item.gwmc,
        phone: item.lxdh,
        type: item.gwmc,
      };
    });
    list.value = list.value.slice(0, 3);
  });
};
const getCnTime = function () {
  let time = new Date();
  let year = time.getFullYear();
  let month = time.getMonth() + 1;
  month = month > 9 ? month : "0" + month;
  let day = time.getDate();
  day = day > 9 ? day : "0" + day;
  return `${year}年${month}月${day}日`;
};
const getDialogTime = function () {
  let time1 = new Date();
  let time2 = new Date(time1.getTime() + 24 * 60 * 60 * 1000);
  function parseTime(time) {
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    month = month > 9 ? month : "0" + month;
    let day = time.getDate();
    day = day > 9 ? day : "0" + day;
    return `${year}-${month}-${day} 08:00:00`;
  }
  return parseTime(time1) + " ~ " + parseTime(time2);
};
const showDutyDialog = ref(false)
const openDutyDialog = function(){
  showDutyDialog.value = true;
}
const closeDutyDialog = function(){
  showDutyDialog.value = false
}
const viewTitle = ref(getCnTime() + " 值班安排");
onMounted(() => {
  getList();
  getDialogTime();
});
</script>
<template>
  <ViewBox :title="viewTitle">
    <div class="onduty_information">
      <!-- <div class="btn"></div> -->
      <div class="onduty_box">
        <div class="onduty_item" v-for="item in list" :key="item.id" @click="openDutyDialog">
          <div class="duty">{{ item.job }}</div>
          <div>
            <span class="name"> {{ item.name }} </span>
            <img
              class="img"
              src="@/assets/home/icon_phone.png"
              @click.stop="phone(item)"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  </ViewBox>
  <PhoneCall ref="phoneCallRef"></PhoneCall>
  <Teleport to="body" v-if="showDutyDialog">
    <div class="duty_detail_dialog">
      <div class="dialog_title">值班安排</div>
      <div class="close_box">
        <el-icon 
        size="20" 
        color="#fff" 
        style="cursor: pointer"
        >
          <Close @click="closeDutyDialog" />
        </el-icon>
      </div>
      <el-descriptions :column="1" border>
        <el-descriptions-item
          label="值班时间"
          label-align="right"
          align="center"
        >
          {{ getDialogTime() }}
        </el-descriptions-item>
        <el-descriptions-item
          v-for="item in list"
          :key="item.id"
          :label="item.job"
          label-align="right"
          align="left"
        >
          <div class="duty_content">
            <div class="name">{{ item.name }}</div>
            <div class="phone">{{ item.phone }}</div>
            <div class="type">{{ item.type }}</div>
          </div>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </Teleport>
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
        cursor: pointer;
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
.duty_detail_dialog {
  position: absolute;
  left: 460px;
  top: 100px;
  width: 500px;
  height: 270px;
  background-color: #172a52;
  z-index: 9999;
  color: #fff;
  box-sizing: border-box;
  padding: 0 20px 40px;
  overflow-y: auto;
  border-radius: 10px;
  .dialog_title {
    height: 56px;
    line-height: 56px;
    font-size: 20px;
  }
  .close_box{
    position: absolute;
    right: 20px;
    top: 18px;
  }
  .duty_content {
    display: flex;
    width: 100%;
    padding: 0 10px;
    .name {
      width: 80px;
    }
    .phone {
      flex: 1;
      text-align: center;
    }
    .type {
      width: 80px;
      text-align: right;
    }
  }
  :deep(.el-descriptions__body) {
    background: unset;
    .el-descriptions__content.el-descriptions__cell.is-bordered-content {
      color: #fff;
    }
    .el-descriptions__label.el-descriptions__cell.is-bordered-label {
      color: #fff;
      background: unset;
    }
  }
}
</style>
