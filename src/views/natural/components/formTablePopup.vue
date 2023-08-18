<script setup>
import { ref } from 'vue'
const emit = defineEmits(['closeHandle'])
const closeDialog = function () {
  emit("closeHandle", false);
}
const props = defineProps({
  name: {
    type: String,
    default: '房屋信息'
  }
})
const originData = [
  { name: '所在区域', val: '榆林市神木市', span: 12 },
  { name: '房屋地址', val: '榆林市神木市东方家园1栋1单元101', span: 12 },
  { name: '户主姓名', val: '李亦新', span: 8 },
  { name: '户主电话', val: '13599367701', span: 8 },
  { name: '身份证号', val: '李亦新', span: 8 },
  { name: '家庭人数', val: '3', span: 8 },
  { name: '经济条件', val: '一般', span: 8 },
  { name: '建成年份', val: '1980', span: 8 },
  { name: '建筑层数', val: '3', span: 8 },
  { name: '建筑面积', val: '360', span: 8 },
  { name: '占地面积', val: '120', span: 8 },
  { name: '使用情况', val: '自住', span: 8 },
  { name: '周边情况', val: '平地', span: 8 },
  { name: '结构类型', val: '混凝土', span: 8 },
  { name: '鉴定等级', val: 'A', span: 8 },
  { name: '登记人', val: '邓明宣', span: 8 },
  { name: '登记时间', val: '2018.04.21', span: 8 },
]
const parseData = function () {
  let oriData = originData;
  let count = 0;
  let res = [[]];
  oriData.forEach(item => {
    if (count + item.span > 24) {
      res.push([item])
      count = item.span;
    } else {
      res[res.length - 1].push(item)
      count += item.span
    }
  })
  return res;
}
const tableDatas = ref(parseData())
console.log(tableDatas)
</script>
<template>
  <div class="dialog-wid-content">
    <div class="dialog-wid-center">
      <!-- <div class="dialog-wid-center" :style="{...defaultStyle}"> -->
      <div class="dialog_head">
        <h2 class="dialog_title">{{name}}</h2>
        <img @click.self="closeDialog" class="dialog_close" src="@/assets/integratedCommunication/dialog_close.png"
          alt="">
      </div>
      <div class="dialog-wid-info">
        <el-row v-for="(row, index) in tableDatas" :key="index">
          <el-col v-for="(item, index) in row" :key="index" :span="item.span">
              <div class="left">{{ item.name }}：</div>
              <div class="right">{{ item.val }}</div>
          </el-col>
        </el-row>
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
    padding: 16px 14px;
    display: flex;
    flex-wrap: wrap;
    margin-left: 12px;

    .el-row {
      font-size: 16px;
      font-family: Source Han Sans SC-Regular, Source Han Sans SC;
      font-weight: 400;
      color: #FFFFFF;
      margin-bottom: 16px;
      height: 40px;
      line-height: 40px;
      width: calc(100% + 12px);
      .el-col{
        display: flex;
        align-items: center;
        .left{
          width: 90px;
        }
        .right{
          border: 1px solid #00A3CE;
          flex: 1;
          padding-left: 16px;
          margin-right: 12px;
        }
      }
    }

  }
}
</style>