<template>
  <div class="dialog-wid-content " v-show="dialogType" :class="className" @click.self="clocseDialog">
    <div class="dialog-wid-center" :style="{ ...defaultStyle, ...styleOption }">
      <!-- <div class="dialog-wid-center" :style="{...defaultStyle}"> -->
      <div class="dialog_head">
        <h2 class="dialog_title">{{ title }}</h2>
        <img @click.self="closeDialog" class="dialog_close" src="@/assets/integratedCommunication/dialog_close.png" alt="">
      </div>
      <div class="dialog-wid-info">
        <!-- 列表样式 -->
        <div v-if="type == 'list'" class="list">
          <div v-for="(item, index) in data" :key="index" :class="{ 'cont_list': true, [item.row]: true }">
            <span class="label">{{ item.label }}</span>
            <div class="value_box">
              {{ item.value }}
            </div>
          </div>
        </div>
        <!-- 表格样式 -->
        <div v-if="type == 'table'" class="table">
          <el-table :data="data" border style="width: 100%">
            <el-table-column v-for="(item, index) in tableHead" :key="index" :prop="item.prop" :label="item.label" :width="item.width" show-overflow-tooltip>
              <template v-slot="scope">
                <div :style="item.style && item.style[scope.row[item.prop]]">
                  {{ scope.row[item.prop] }}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
  
<script>
import { reactive, toRefs, watch } from "vue";
export default {
  props: {
    width: {
      type: String,
      default: "800px",
    },
    height: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "弹框标题",
    },
    dialogValue: {
      type: Boolean,
      default: false,
    },
    styleOption: {
      //特殊样式
      type: Object,
      default: {},
    },
    type: {
      type: String,
      default: "list",
    },
    data: {
      type: Array,
      default: [
        {
          label: "积水位置",
          value: "马溪路保通驾校门口",
          row: "row_1", //row_2 row_3  决定一行排几个, 不传默认一行一个
        },
        {
          label: "整改措施",
          value: "对该段积水道路进行整体提升改造。",
        },
        {
          label: "积水原因",
          value:
            "马溪路为南北向道路，武肃街以北段无雨水主管，此段道路武肃街路口地势高，北侧为山体，地势也较高，形成了两头高中间低（低洼处在偏北段）这一局面，且北面山体来水较多。排水方式原交警大队北侧为散排形式，后沿路不断有建房，散排也被基本阻断；保通驾校东侧原有地下管沟汇集雨水排入马溪，后因拆迁该处地下管沟也被阻断，最终导致该段道路雨水汇集后无处排放。",
        },
        {
          label: "责任单位",
          value: "城投集团、城市管理局、交警大队",
        },
        {
          label: "联系人员",
          value: "王振文、章吉、郑世伟",
        },
        {
          label: "联系电话",
          value: "13634136073、13758293931、13868038828",
        },
        {
          label: "措施",
          value: "单体泵排水、打开雨水篦子",
        },
      ],

      // default: [
      //   {
      //     label: '所在区域：',
      //     value: '榆林市神木市',
      //     row: 'row_2'
      //   },
      //   {
      //     label: '房屋地址：',
      //     value: '榆林市神木市东方家园1栋1单元101',
      //     row: 'row_2'
      //   },
      //   {
      //     label: '户主姓名：',
      //     value: '李亦新',
      //     row: 'row_3'
      //   },
      //   {
      //     label: '户主电话：',
      //     value: '13599367701',
      //     row: 'row_3'
      //   },
      //   {
      //     label: '身份证号：',
      //     value: '429006199105154125',
      //     row: 'row_3'
      //   },
      //   {
      //     label: '家庭人数：',
      //     value: '3',
      //     row: 'row_3'
      //   },
      //   {
      //     label: '经济条件：',
      //     value: '一般',
      //     row: 'row_3'
      //   },
      //   {
      //     label: '建成年份：',
      //     value: '1980',
      //     row: 'row_3'
      //   },
      //   {
      //     label: '建筑层数：',
      //     value: '2',
      //     row: 'row_3'
      //   },
      //   {
      //     label: '建筑层数：',
      //     value: '123.26',
      //     row: 'row_3'
      //   },
      //   {
      //     label: '占地面积：',
      //     value: '154.4',
      //     row: 'row_3'
      //   },
      //   {
      //     label: '使用情况：',
      //     value: '自住',
      //     row: 'row_3'
      //   },
      //   {
      //     label: '周边情况：',
      //     value: '平地',
      //     row: 'row_3'
      //   },
      //   {
      //     label: '结构类型：',
      //     value: '混凝土',
      //     row: 'row_3'
      //   },
      //   {
      //     label: '鉴定等级：',
      //     value: 'A',
      //     row: 'row_3'
      //   },
      //   {
      //     label: '登记人：',
      //     value: '邓明宣',
      //     row: 'row_3'
      //   },
      //   {
      //     label: '登记时间：',
      //     value: '2018.04.21',
      //     row: 'row_3'
      //   },

      // ]

      // default: [
      //   {
      //     name: 'XXX村1号泥石流',
      //     state: '已处置',
      //     level: '蓝色预警',
      //     warn_time: '2023-05-02 15:12:22',
      //     cont: '地表转移',
      //     deal_time: '2023-05-02 18:12:22',
      //     person: '王XX'
      //   },
      //   {
      //     name: 'XXX村1号泥石流',
      //     state: '已处置',
      //     level: '蓝色预警',
      //     warn_time: '2023-05-02 15:12:22',
      //     cont: '地表转移',
      //     deal_time: '2023-05-02 18:12:22',
      //     person: '王XX'
      //   },
      //   {
      //     name: 'XXX村1号泥石流',
      //     state: '已处置',
      //     level: '黄色预警',
      //     warn_time: '2023-05-02 15:12:22',
      //     cont: '地表转移',
      //     deal_time: '2023-05-02 18:12:22',
      //     person: '王XX'
      //   },
      //   {
      //     name: 'XXX村1号泥石流',
      //     state: '已处置',
      //     level: '蓝色预警',
      //     warn_time: '2023-05-02 15:12:22',
      //     cont: '地表转移',
      //     deal_time: '2023-05-02 18:12:22',
      //     person: '王XX'
      //   },
      //   {
      //     name: 'XXX村1号泥石流',
      //     state: '已处置',
      //     level: '蓝色预警',
      //     warn_time: '2023-05-02 15:12:22',
      //     cont: '地表转移',
      //     deal_time: '2023-05-02 18:12:22',
      //     person: '王XX'
      //   },
      // ]
    },
    // 表格类型时传
    tableHead: {
      type: Array,
      default: [
        {
          prop: "name",
          label: "监测点名称",
          width: "130",
        },
        {
          prop: "state",
          label: "处置状态",
          width: "",
        },
        {
          prop: "level",
          label: "预警等级",
          style: {
            黄色预警: { color: "#EAD80E" },
            蓝色预警: { color: "#1B7EF2" },
          },
          width: "",
        },
        {
          prop: "warn_time",
          label: "预警时间",
          width: "150",
        },
        {
          prop: "cont",
          label: "预警内容",
          width: "",
        },
        {
          prop: "deal_time",
          label: "处置时间",
          width: "150",
        },
        {
          prop: "person",
          label: "处置人",
          width: "",
        },
      ],
    },
  },
  setup(props, { emit }) {
    watch(
      () => props.dialogValue,
      (val) => {
        data.dialogType = val;
        if (val) {
          data.className = "show-open";
        }
      }
    );
    const data = reactive({
      dialogType: props.dialogValue,
      title: props.title,
      width: props.width,
      className: "",
    }); // page data
    function closeDialog() {
      data.className = "show-close";
      const timer = setTimeout(() => {
        clearTimeout(timer);
        emit("closeHandle", false);
      }, 10);
    }
    return {
      ...toRefs(data),
      closeDialog,
    };
  },
  data() {
    return {
      defaultStyle: {
        width: this.width,
        maxHeight: this.height,
        left: (this.width / 2) * -1 + "px",
      },
    };
  },
};
</script>
  
<style lang="less" scoped>
.dialog-wid-content {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 1080px;
  display: flex;
  align-items: center;
  justify-content: center;
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
    padding: 16px 14px;
    display: flex;
    flex-wrap: wrap;

    .cont_list {
      width: 100%;
      font-size: 16px;
      font-family: Source Han Sans SC-Regular, Source Han Sans SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 20px;
      display: flex;
      align-items: center;
      margin-bottom: 8px;

      &.row_2 {
        width: calc(50% - 6px);
        margin-bottom: 12px;

        &:first-child {
          margin-right: 12px;
        }

        .label {
          margin: 0;
        }
      }

      &.row_3 {
        width: calc((100% - 24px) / 3);
        margin-bottom: 12px;
        margin-right: 12px;

        &:nth-child(3n + 2) {
          margin-right: 0px;
        }

        .label {
          margin: 0;
        }

        .value_box {
          padding: 8px 10px;
        }
      }

      .label {
        width: 80px;
        margin-right: 6px;
      }

      .value_box {
        flex: 1;
        overflow: hidden;
        background: #01283b;
        border: 1px solid #00a3ce;
        padding: 8px 15px;
      }
    }

    .list,
    .table {
      width: 100%;
    }

    .table {
      padding: 20px;
    }

    :deep(.el-table) {
      color: #fff;
      background: transparent;
      border-radius: 10px;
      border: 1px solid rgba(0, 137, 175, 1);

      thead {
        color: #fff;
      }

      th.el-table__cell {
        background: transparent;
      }

      tr {
        background-color: transparent;
      }

      .cell {
        font-size: 14px;
        padding: 6px 0 6px 6px;
      }

      .el-table__cell {
        border-bottom: 1px solid rgba(0, 137, 175, 1);
        border-right: 1px solid rgba(0, 137, 175, 1);
      }

      .el-table__border-left-patch,
      .el-table__inner-wrapper::before,
      &.el-table--border::after,
      &.el-table--border .el-table__inner-wrapper::after {
        background-color: rgba(0, 137, 175, 1);
      }

      &.el-table--enable-row-hover
        .el-table__body
        tr:hover
        > td.el-table__cell {
        background-color: rgb(0, 58, 84);
      }
    }
  }
}
</style>