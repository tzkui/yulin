<script setup>
import { computed, ref } from "vue";
import { getTeamDetail, getStorageDetail } from "@/api/modules/home.js";

const closeDialog = function () {
  showDialog.value = false;
};
const showDialog = ref(false);
const props = defineProps({
  type: {
    type: Number,
    default: 1,
  },
});
const getJydwDetail = function (id) {
  getTeamDetail(id).then((res) => {
    console.log("救援队伍详情：", res);
    let data = res.data;
    list1.value = [
      { label: "队伍名称", val: data.name },
      { label: "队伍类型", val: data.typeName },
      { label: "所在区域", val: data.xzqhName },
      { label: "总人数", val: data.amount },
      { label: "负责人", val: data.linkName },
      { label: "联系电话", val: data.linkPhone },
      { label: "值班电话", val: data.zhdh },
      { label: "集合出发地点", val: data.becity },
    ];
    let personList = data.personalList || []
    list2.value = personList.map(item=>{
      return {
          col1: item.xm,
          col2: item.xb,
          col3: item.zw,
          col4: item.lxdh,
          col5: item.tc,
        }
    })
  });
};
const getWzckDetail = function (id) {
  getStorageDetail(id).then((res) => {
    console.log("仓库详情：", res);
    let data = res.data;
    list1.value = [
      { label: "仓库名称", val: data.storageName },
      { label: "主管单位", val: data.orgName },
      { label: "仓库级别", val: data.storageGrade },
      { label: "管理机构", val: data.orgName },
      { label: "联系人", val: data.linkName },
      { label: "联系电话", val: data.linkPhone },
      { label: "仓库地址", val: data.address },
      { label: "库容", val: data.storageCapacity },
    ];
    let storageList = data.infoList || [];
    list2.value = storageList.map(item=>{
      return {
          col1: item.areaName,
          col2: item.materialName,
          col3: item.amount,
          col4: item.specs,
          col5: item.effectiveDate,
        }
    })
  });
};
const dialogType = ref(0);
const list1 = ref([]);
const list2 = ref([]);
const openDialog = function (info) {
  console.log("zzzz: ", info);
  showDialog.value = true;
  if (info.dialogType === "jydw") {
    getJydwDetail(info.id);
    dialogType.value = 0;
  } else if (info.dialogType === "yjwzk") {
    getWzckDetail(info.id);
    dialogType.value = 1;
  }
};
const names = ["救援队伍信息查看", "物资仓库信息查看"];
const title1s = ["队伍信息", "仓库信息"];
const title2s = ["队伍成员信息", "仓库物资"];
const list2Headers = [
  ["姓名", "性别", "职务", "联系电话", "特长"],
  ["区域名称", "物资名称", "数量", "规格", "有效日期"],
]
defineExpose({
  openDialog,
});
const info = computed(() => {
  if (dialogType.value === 1) {
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
        {
          col1: "赵天林",
          col2: "女",
          col3: "值班员",
          col4: "13129887559",
          col5: "跑步",
        },
        {
          col1: "赵天林",
          col2: "女",
          col3: "值班员",
          col4: "13129887559",
          col5: "跑步",
        },
        {
          col1: "赵天林",
          col2: "女",
          col3: "值班员",
          col4: "13129887559",
          col5: "跑步",
        },
      ],
    };
  } else {
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
        {
          col1: "榆阳区",
          col2: "棉被",
          col3: "213",
          col4: "中",
          col5: "2028-07-10",
        },
        {
          col1: "榆阳区",
          col2: "棉被",
          col3: "213",
          col4: "中",
          col5: "2028-07-10",
        },
        {
          col1: "榆阳区",
          col2: "棉被",
          col3: "213",
          col4: "中",
          col5: "2028-07-10",
        },
      ],
    };
  }
});
</script>
<template>
  <div class="dialog-wid-content" v-if="showDialog">
    <div class="dialog-wid-center">
      <!-- <div class="dialog-wid-center" :style="{...defaultStyle}"> -->
      <div class="dialog_head">
        <h2 class="dialog_title">{{ names[dialogType] }}</h2>
        <img
          @click.self="closeDialog"
          class="dialog_close"
          src="@/assets/integratedCommunication/dialog_close.png"
          alt=""
        />
      </div>
      <div class="dialog-wid-info">
        <div class="dialog_main">
          <div class="title">{{ title1s[dialogType] }}</div>
          <ul class="table_list">
            <li v-for="(item, index) in list1" :key="index">
              <div class="label">{{ item.label }}</div>
              <div class="value">{{ item.val }}</div>
            </li>
          </ul>
          <div class="title">{{ title2s[dialogType] }}</div>
          <ul class="table2">
            <li class="header">
              <div v-for="item in list2Headers[[dialogType]]" :key="item">{{ item }}</div>
            </li>
            <li v-for="(item, index) in list2" :key="index">
              <div v-for="n in list2Headers[dialogType].length" :key="n">
                {{ item["col" + n] }}
              </div>
            </li>
            <li class="empty" v-if="list2.length===0">暂无数据</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.empty{
  text-align: center;
  font-size: 28px;
  line-height: 42px;
}
.dialog-wid-content {
  position: fixed;
  left: 960px;
  top: 540px;
  transform: translate(-50%, -50%);
  z-index: 5;

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
        background: #01283b;
        height: 160px;
        overflow: hidden;
        overflow-y: auto;
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
          color: #ffffff;
          justify-content: space-around;
          div {
            min-width: 15%;
            text-align: center;
          }
        }

        .header {
          background-color: #1b3f50;
          position: sticky;
          top: 0;
          left: 0;
        }
      }
    }
  }
}
</style>
