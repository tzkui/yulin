<script setup>
import { ref } from 'vue';
const props = defineProps({
  data: {
    type: Object,
    default() {
      return {}
    }
  },
  // name: "雨量监测站",
  // list: {
  //   type: Array,
  //   default() {
  //     return []
  //   }
  // },
  // showSelect: true,
  // selectItems: {
  //   type: Array,
  //   default() {
  //     return [
  //       { val: 1, name: "1小时" },
  //       { val: 2, name: "2小时" },
  //       { val: 3, name: "3小时" },
  //       { val: 4, name: "4小时" },
  //     ]
  //   }
  // },
  // headers: {
  //   type: Array,
  //   default: []
  // }
})
const emits = defineEmits(['closeDialog'])
const selectVal = ref("1")
const closeDialog = function () {
  emits("closeDialog")
}
</script>
<template>
  <div class="syqxxThreePopup">
    <div class="header">
      <div class="title">{{ data.name }}</div>
      <div class="close" @click="closeDialog()">
        <el-icon color="#00A3CE" :size="20">
          <Close></Close>
        </el-icon>
      </div>
    </div>
    <div class="icons">
      <div class="icon1"></div>
      <div class="icon2"></div>
      <div class="icon3"></div>
      <div class="icon4"></div>
    </div>
    <div class="main">
      <select v-if="data.showSelect" @change="selecctRainTime" class="time_select" v-model="selectVal" placeholder="请选择">
        <option v-for="item in data.selectItems" :key="item.val" :value="item.val">{{ item.name }}</option>
      </select>
      <div class="list_header">
        <div class="col1">{{ data.headers[0] }}</div>
        <div class="col2">{{ data.headers[1] }}</div>
      </div>
      <ul class="list">
        <li class="list_item" v-for="item in data.list" :key="item.id">
          <div class="col1">{{ item.line1 }}</div>
          <div class="col2">{{ item.line2 }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="less" scope>
.syqxxThreePopup {

  position: fixed;
  right: 600px;
  top: 400px;
  min-width: 300px;
  box-sizing: border-box;
  z-index: 999;
  // background: #003A54;
  background: linear-gradient(180deg, #01283B 0%, #03101A 54%, #01273E 100%);
  border-radius: 12px;

  .header {
    display: flex;
    justify-content: space-between;
    height: 51px;
    padding: 0 16px;

    .title {
      font-size: 18px;
      font-family: Source Han Sans SC-Bold, Source Han Sans SC;
      font-weight: bold;
      color: #FFFFFF;
      line-height: 21px;
      margin-top: 17px;
    }

    .close {
      margin-top: 16px;
      cursor: pointer;
    }

  }

  .icons {
    display: flex;
    padding: 0 16px;

    .icon1 {
      width: 6px;
      height: 5px;
      background: #00A3CE;
      transform: skewX(-20deg);
      margin-right: 6px;
    }

    .icon2 {
      width: 6px;
      height: 4px;
      background: #00A3CE;
      transform: skewX(-40deg);
      margin-right: 6px;
      opacity: .8;
    }

    .icon3 {
      width: 6px;
      height: 3px;
      background: #00A3CE;
      transform: skewX(-60deg);
      margin-right: 8px;
      opacity: .6;
    }

    .icon4 {
      flex: 1;
      height: 1px;
      background: #00A3CE;
    }
  }

  .main {
    padding: 0 16px 16px;
    font-size: 12px;
    font-family: Alibaba PuHuiTi-Regular, Alibaba PuHuiTi;
    font-weight: 400;
    color: #FFFFFF;

    select {
      width: 77px;
      height: 36px;
      background: #006688;
      border-radius: 4px;
      font-size: 16px;
      font-family: Alibaba PuHuiTi-Regular, Alibaba PuHuiTi;
      font-weight: 400;
      color: #FFFFFF;
      padding-left: 8px;
    }

    .list {
      border-radius: 6px;
      overflow: hidden;

      li {
        display: flex;
        align-items: center;
        text-align: center;

        .col1 {
          flex: 1;

        }

        .col2 {
          flex: 1;
        }
      }

      &_header {
        display: flex;
        text-align: center;
        align-items: center;
        font-size: 16px;
        font-family: Source Han Sans SC-Regular, Source Han Sans SC;
        font-weight: 400;
        color: #fff;
        height: 50px;
        line-height: 50px;

        .col1,
        .col2 {
          flex: 1;
        }
      }

      &_item {
        font-size: 16px;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #D0DEEE;
        height: 36px;
        line-height: 36px;
        background-color: #006688;

        .col1,
        .col2 {
          border-right: 1px solid #00688A;
          box-sizing: border-box;
        }

        &:nth-child(2n) {
          background-color: #004764;
        }
      }
    }
  }
}
</style>