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
const info = computed(() => {
  if (props.type === 1) {
    return {
      name: "救援队伍信息查看",
      title1: "队伍信息",
      list1: [
        { label: "队伍名称", val: "救援队伍" },
        { label: "队伍类型", val: "自然灾害" },
        { label: "所在区域", val: "榆阳区" },
        { label: "总人数", val: "34" },
        { label: "负责人", val: "杨达" },
        { label: "联系电话", val: "13147212345" },
        { label: "值班电话", val: "18728647059" },
        { label: "集合出发地点", val: "榆林市榆阳区13号" },
      ],
      title2: "队伍成员信息",
      list2Header: ["姓名", "性别", "职务", "联系电话", "特长"],
      list2: [
        { col1: '赵天林', col2: "女", col3: "值班员", col4: "13129887559", col5: "跑步" },
        { col1: '赵天林', col2: "女", col3: "值班员", col4: "13129887559", col5: "跑步" },
        { col1: '赵天林', col2: "女", col3: "值班员", col4: "13129887559", col5: "跑步" },
      ]
    }
  }else{
    return {
      name: "物资仓库信息查看",
      title1: "仓库信息",
      list1: [
        { label: "仓库名称", val: "榆阳区物资仓库" },
        { label: "主管单位", val: "区应急管理局" },
        { label: "仓库级别", val: "区" },
        { label: "管理机构", val: "区应急管理局" },
        { label: "联系人", val: "杨达" },
        { label: "联系电话", val: "13147212345" },
        { label: "仓库地址", val: "榆林市榆阳区13号" },
        { label: "库容", val: "5908" },
      ],
      title2: "仓库物资",
      list2Header: ["区域名称", "物资名称", "数量", "规格", "有效日期"],
      list2: [
        { col1: '榆阳区', col2: "棉被", col3: "213", col4: "中", col5: "2028-07-10" },
        { col1: '榆阳区', col2: "棉被", col3: "213", col4: "中", col5: "2028-07-10" },
        { col1: '榆阳区', col2: "棉被", col3: "213", col4: "中", col5: "2028-07-10" },
      ]
    }
  }
})

</script>
<template>
  <div class="dialog-wid-content">
    <div class="dialog-wid-center">
      <!-- <div class="dialog-wid-center" :style="{...defaultStyle}"> -->
      <div class="dialog_head">
        <h2 class="dialog_title">{{ info.name }}</h2>
        <img @click.self="closeDialog" class="dialog_close" src="@/assets/integratedCommunication/dialog_close.png"
          alt="">
      </div>
      <div class="dialog-wid-info">
        <div class="dialog_main">
          <div class="title">{{ info.title1 }}</div>
          <ul class="table_list">
            <li v-for="(item, index) in info.list1" :key="index">
              <div class="label">{{ item.label }}</div>
              <div class="value">{{ item.val }}</div>
            </li>
          </ul>
          <div class="title">{{ info.title2 }}</div>
          <ul class="table2">
            <li class="header">
              <div v-for="item in info.list2Header" :key="item">{{ item }}</div>
            </li>
            <li v-for="(item, index) in info.list2" :key="index">
              <div v-for="n in info.list2Header.length" :key="n">{{ item['col' + n] }}</div>
            </li>
          </ul>
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

          &:nth-child(2n-1):nth-last-child(2) {
            border-bottom: none;

          }

          &:nth-child(2n) {
            .label {
              border-left: 1px solid rgba(0, 163, 206, 0.15);
            }
          }
        }
      }

      .table2 {
        background: #01283B;
        height: 160px;
        overflow: hidden;
        overflow-y: auto;
        &::-webkit-scrollbar{
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
          justify-content: space-around;
          div{
            min-width: 15%;
            text-align: center;
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

  }
}</style>