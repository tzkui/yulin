<script setup>
import { computed, ref } from 'vue'
const emit = defineEmits(['closeHandle'])
const closeDialog = function () {
  emit("closeHandle", false);
}
const props = defineProps({
  type: {
    type: Number,
    default: 1
  }
})

const showNextDialog = ref(false)
const headers = ref([
  { key: "sort", name: "序号" },
  { key: "area", name: "物资区域" },
  { key: "name", name: "物资名称" },
  { key: "type", name: "物资类型" },
  { key: "num", name: "物资数量" },
  { key: "unit", name: "单位" },
  { key: "gg", name: "规格" },
  { key: "dbsl", name: "调拨数量", type: "input" },
])

const tableDatas = ref([
  { sort: 1, area: "榆阳区", name: "军用雨衣", type: "应急物资", num: 43, unit: "件", gg: "件", dbsl: "" },
  { sort: 2, area: "榆阳区", name: "军用雨衣", type: "应急物资", num: 43, unit: "件", gg: "件", dbsl: "" },
  { sort: 3, area: "榆阳区", name: "军用雨衣", type: "应急物资", num: 43, unit: "件", gg: "件", dbsl: "" },
  { sort: 4, area: "榆阳区", name: "军用雨衣", type: "应急物资", num: 43, unit: "件", gg: "件", dbsl: "" },
  { sort: 5, area: "榆阳区", name: "军用雨衣", type: "应急物资", num: 43, unit: "件", gg: "件", dbsl: "" },
  { sort: 6, area: "榆阳区", name: "军用雨衣", type: "应急物资", num: 43, unit: "件", gg: "件", dbsl: "" },
])
const openNextDialog = function () {
  showNextDialog.value = true;
}
</script>
<template>
  <div class="dialog-wid-content">
    <div class="dialog-wid-center">
      <div class="dialog_head">
        <h2 class="dialog_title">物资调拨</h2>
        <img @click.self="closeDialog" class="dialog_close" src="@/assets/integratedCommunication/dialog_close.png"
          alt="">
      </div>
      <div class="dialog-wid-info">
        <div class="dialog_main">
          <div class="title">物资调拨</div>
          <ul class="table">
            <li class="header">
              <div v-for="item in headers" :key="item.key" :class="item.key">{{ item.name }}</div>
            </li>
            <li v-for="item in tableDatas" :key="item.sort">
              <div v-for="info in headers" :key="info.key" :class="info.key">
                <input v-if="info.type === 'input'" v-model="item[info.key]" :max="item.num" :min="0" type="number">
                <span v-else>{{ item[info.key] }}</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="dialog_footer">
          <button @click.self="closeDialog">取消</button>
          <button @click="openNextDialog">下一步</button>
        </div>
      </div>
    </div>
    <div class="dialog-wid-content inline" v-if="showNextDialog">
      <div class="dialog-wid-center">
        <div class="dialog_head">
          <h2 class="dialog_title">负责人选择</h2>
          <img @click.self="showNextDialog = false" class="dialog_close"
            src="@/assets/integratedCommunication/dialog_close.png" alt="">
        </div>
        <div class="box">
          <div class="left">发送人员</div>
          <div class="right">
            <input type="text">
          </div>
        </div>
        <div class="btns">
          <button @click.self="showNextDialog = false">取消</button>
          <button @click.self="showNextDialog = false">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.dialog-wid-content {
  position: fixed;
  left: 960px;
  top: 540px;
  transform: translate(-50%, -50%);
  z-index: 5;

  .dialog-wid-center {
    width: 960px;
    min-height: 188px;
    background: linear-gradient(180deg, #01283B 0%, #03101A 54%, #01273E 100%);
    border-radius: 8px;
    padding: 0 10px;
    display: flex;
    flex-direction: column;

    .dialog_head {
      height: 54px;
      padding: 0 0 0 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: url("@/assets/common/popup_title_bg.png") 10px bottom/98% 6px no-repeat;
      position: relative;

      &::before {
        position: absolute;
        content: '';
        width: 50px;
        height: 12px;
        left: 20px;
        top: -1px;
        background: url('@/assets/common/dialog_header_bg.png') center/100% no-repeat;
      }

      .dialog_title {
        font-size: 16px;
        font-family: Source Han Sans SC-Medium, Source Han Sans SC;
        font-weight: 500;
        color: #ffffff;
        margin-top: 8px;
      }

      .dialog_close {
        height: 33.65px;
        width: 33.65px;
        cursor: pointer;
      }
    }
  }

  .dialog-wid-info {
    flex: 1;
    overflow: auto;
    padding: 16px 5px;
    display: flex;
    flex-wrap: wrap;
    margin-left: 12px;

    .dialog_main {
      padding-bottom: 16px;
      padding-right: 10px;
      width: 100%;

      .title {
        height: 32px;
        background: rgba(0, 163, 206, 0.15);
        box-shadow: inset 4px 0px 0px 0px #00a3ce;
        padding-left: 10px;
        margin-bottom: 8px;
        margin-top: 8px;
        font-size: 16px;
        font-family: Source Han Sans SC-Regular, Source Han Sans SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 32px;
      }

      .table {
        background: #01283B;
        max-height: 440px;
        overflow: hidden;
        overflow-y: auto;
        border: 1px solid rgba(0, 163, 206, 0.5);

        &::-webkit-scrollbar {
          display: none;
        }

        li {
          display: flex;
          height: 40px;
          line-height: 40px;
          font-size: 16px;
          font-family: Source Han Sans SC-Regular, Source Han Sans SC;
          font-weight: 400;
          color: #FFFFFF;
          border-bottom: 1px solid rgba(0, 163, 206, 0.5);

          >div {
            text-align: center;
            min-width: 12%;
            border-right: 1px solid rgba(0, 163, 206, 0.5);
          }

          .sort {
            width: 60px;
          }

          .area {
            width: 112px;
          }

          .name {
            width: 164px;
          }

          .type {
            flex: 1;
          }

          .num,
          .unit.gg {
            width: 80px;
          }

          .dbsl {
            width: 100px;
            border-right: none;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          input {
            width: 92px;
            height: 28px;
            background: #050F18;
            border: 1px solid rgba(0, 163, 206, 0.5);
            font-size: 16px;
            font-family: Source Han Sans SC-Regular, Source Han Sans SC;
            font-weight: 400;
            color: #FFFFFF;
            padding-left: 6px;
          }

          input[type=number] {
            -moz-appearance: textfield;
          }

          input[type=number]::-webkit-inner-spin-button,
          input[type=number]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
        }

        .header {
          background-color: #1B3F50;
          position: sticky;
          top: 0;
          left: 0;
        }
      }
    }

    .dialog_footer {
      width: 100%;
      text-align: right;

      button {
        height: 28px;
        font-size: 14px;
        font-family: Source Han Sans SC-Regular, Source Han Sans SC;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 28px;
        padding: 0 10px;
        margin-right: 12px;
        background: #0D4F6D;
        border-radius: 4px 4px 4px 4px;
        display: inline;

        &:hover {
          background-color: #014161;
        }
      }
    }
  }
}

.inline {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .dialog-wid-center {
    width: auto;
  }

  .box {
    display: flex;
    font-size: 16px;
    font-family: Source Han Sans SC-Regular, Source Han Sans SC;
    font-weight: 400;
    color: #fff;
    align-items: center;
    margin-top: 16px;
    margin-bottom: 24px;

    .left {
      margin-left: 16px;
    }

    .right {
      width: 320px;
      height: 40px;
      background: #01283B;
      border-radius: 0px 0px 0px 0px;
      opacity: 1;
      border: 1px solid rgba(0, 163, 206, 0.5);
      margin-left: 16px;
      margin-right: 10px;

      input {
        border: none;
        color: #fff;
        font-size: 16px;
        font-family: Source Han Sans SC-Regular, Source Han Sans SC;
        font-weight: 400;
        line-height: 40px;
        padding-left: 10px;
        width: 100%;
      }
    }
  }
  .btns{
    width: 100%;
    text-align: right;
    button {
    height: 28px;
    font-size: 14px;
    font-family: Source Han Sans SC-Regular, Source Han Sans SC;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 28px;
    padding: 0 10px;
    margin-right: 12px;
    background: #0D4F6D;
    border-radius: 4px 4px 4px 4px;
    display: inline;

    &:hover {
      background-color: #014161;
    }
  }
  }
}</style>