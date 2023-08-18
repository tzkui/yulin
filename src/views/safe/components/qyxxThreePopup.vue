<script setup>
import { ref } from "vue";
const tableData = ref([
  { name: "企业名称", val: "渔阳渔业有限责任公司" },
  { name: "全国统一社会代码", val: "12108402101215B12" },
  { name: "联系人", val: "白国雨" },
  { name: "联系电话", val: "13778193829" },
  { name: "法人", val: "白国雨" },
  { name: "联系电话", val: "联系电话" },
  { name: "开业成立时间", val: "2012-10-12" },
  { name: "是否位于工业区", val: "是" },
  { name: "建设状态", val: "完成" },
  { name: "最大当班人数", val: "241" },
  { name: "企业类型", val: "农业" },
  { name: "所属区域", val: "榆阳区" },
  { name: "安全生产标准化", val: "A" },
  { name: "危险工艺类型", val: "无" },
  { name: "经度", val: "10°50′" },
  { name: "维度", val: "10°50′" },
  { name: "详细地址", val: "榆阳区123号" },
]);
const emits = defineEmits(["closeDialog"]);
const closeDialog = function () {
  emits("closeDialog");
};
</script>

<template>
  <div class="dialog-wid-content">
    <div class="dialog-wid-center">
      <!-- <div class="dialog-wid-center" :style="{...defaultStyle}"> -->
      <div class="dialog_head">
        <h2 class="dialog_title">企业信息</h2>
        <img @click.self="closeDialog" class="dialog_close" src="@/assets/integratedCommunication/dialog_close.png" alt="">
      </div>
      <div class="dialog_main">
        <div class="title">企业信息</div>
        <ul class="table_list">
          <li v-for="(item, index) in tableData" :key="index">
            <div class="label">{{ item.name }}</div>
            <div class="value">{{ item.val }}</div>
          </li>
        </ul>
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
  z-index: 500000;

  .dialog-wid-center {
    width: 960px;
    min-height: 188px;
    background: linear-gradient(180deg, #01283b 0%, #03101a 54%, #01273e 100%);
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
      background: url("@/assets/common/popup_title_bg.png") 10px bottom/98% 6px
        no-repeat;
      position: relative;

      &::before {
        position: absolute;
        content: "";
        width: 50px;
        height: 12px;
        left: 20px;
        top: -1px;
        background: url("@/assets/common/dialog_header_bg.png") center/100%
          no-repeat;
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

    .dialog_main {
      padding: 0 10px 16px;

      .title {
        height: 32px;
        background: rgba(0, 163, 206, 0.15);
        box-shadow: inset 4px 0px 0px 0px #00a3ce;
        padding-left: 10px;
        margin-top: 16px;
        margin-bottom: 8px;
        font-size: 16px;
        font-family: Source Han Sans SC-Regular, Source Han Sans SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 32px;
      }

      .table_list {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        border: 1px solid rgba(0, 163, 206, 0.15);
        background: #01283b;
        font-size: 16px;
        font-family: Source Han Sans SC-Regular, Source Han Sans SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 40px;

        li {
          width: 50%;
          display: flex;
          border-bottom: 1px solid rgba(0, 163, 206, 0.15);

          .label {
            width: 128px;
            padding-left: 8px;
            box-sizing: border-box;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            border-right: 1px solid rgba(0, 163, 206, 0.15);
            margin-right: 8px;
          }

          .val {
            padding-left: 8px;
          }
          &:last-child {
            border-bottom: none;
          }
          &:nth-child(2n-1):nth-last-child(2){
            border-bottom: none;

          }
          &:nth-child(2n) {
            .label {
              border-left: 1px solid rgba(0, 163, 206, 0.15);
            }
          }
        }
      }
    }
  }
}
</style>