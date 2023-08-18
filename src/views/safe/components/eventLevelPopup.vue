<template>
  <!-- <threePopup class="qxxx_dialog" :dialogValue="showThreePopup" :title="nowPopupInfo.title" width="850px" height="482px"
    @closeHandle="showThreePopup = false" :data="nowPopupInfo.data">
  </threePopup> -->
  <div class="dialog-wid-content " v-show="dialogType" :class="className" @click.self="clocseDialog">
    <div class="dialog-wid-center" :style="{ ...defaultStyle, ...styleOption }">
      <!-- <div class="dialog-wid-center" :style="{...defaultStyle}"> -->
      <div class="dialog_head">
        <h2 class="dialog_title">{{ title }}</h2>
        <img @click.self="closeDialog" class="dialog_close" src="@/assets/integratedCommunication/dialog_close.png" alt="">
      </div>
      <div class="dialog-wid-info">
        <slot></slot>
        <!-- 列表样式 -->
        <div class="event_list" v-for="(item, index) in data" :key="index" @click="clickEventLevel">
          <div class="event_title">
            事故发生单位：{{ item.title }}
          </div>
          <div class="event_cont_box">
            <div :class="{ 'event_cont': true, [child.inline]: true }" v-for="(child, cindex) in item.rows" :key="cindex">
              <div class="list">
                <span class="label">{{ child.label }}</span>
                <div class="value">{{ child.value }}</div>
              </div>
            </div>
          </div>
        </div>

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
          title: "XXX化工厂",
          rows: [
            {
              label: "具体地点:",
              value: "榆林市 陕西省榆林市榆阳区肤施路",
            },
            {
              label: "详细描述:",
              value: "化工厂未达到检测标准，排放工业污水",
            },
            {
              label: "事件类型:",
              value: "污水排放",
              inline: "inline_3",
            },
            {
              label: "事发区域:",
              value: "榆林市",
              inline: "inline_3",
            },
            {
              label: "上报时间:",
              value: "2023-07-11 18:23:39",
              inline: "inline_3",
            },
          ],
        },
        {
          title: "XXX化工厂",
          rows: [
            {
              label: "具体地点:",
              value: "榆林市 陕西省榆林市榆阳区肤施路",
            },
            {
              label: "详细描述:",
              value: "化工厂未达到检测标准，排放工业污水",
            },
            {
              label: "事件类型:",
              value: "污水排放",
              inline: "inline_3",
            },
            {
              label: "事发区域:",
              value: "榆林市",
              inline: "inline_3",
            },
            {
              label: "上报时间:",
              value: "2023-07-11 18:23:39",
              inline: "inline_3",
            },
          ],
        },
        {
          title: "XXX化工厂",
          rows: [
            {
              label: "具体地点:",
              value: "榆林市 陕西省榆林市榆阳区肤施路",
            },
            {
              label: "详细描述:",
              value: "化工厂未达到检测标准，排放工业污水",
            },
            {
              label: "事件类型:",
              value: "污水排放",
              inline: "inline_3",
            },
            {
              label: "事发区域:",
              value: "榆林市",
              inline: "inline_3",
            },
            {
              label: "上报时间:",
              value: "2023-07-11 18:23:39",
              inline: "inline_3",
            },
          ],
        },
        {
          title: "XXX化工厂",
          rows: [
            {
              label: "具体地点:",
              value: "榆林市 陕西省榆林市榆阳区肤施路",
            },
            {
              label: "详细描述:",
              value: "化工厂未达到检测标准，排放工业污水",
            },
            {
              label: "事件类型:",
              value: "污水排放",
              inline: "inline_3",
            },
            {
              label: "事发区域:",
              value: "榆林市",
              inline: "inline_3",
            },
            {
              label: "上报时间:",
              value: "2023-07-11 18:23:39",
              inline: "inline_3",
            },
          ],
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
    console.log(props);
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
    const clickEventLevel = () => {
      emit("closeHandle", false);
    };
    return {
      ...toRefs(data),
      closeDialog,
      clickEventLevel,
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
      height: 108px;
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
        font-size: 20px;
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
    margin: 16px 10px;

    .event_list {
      margin-bottom: 10px;
      cursor: pointer;

      .event_title {
        height: 32px;
        background: rgba(0, 163, 206, 0.15);
        box-shadow: inset 4px 0px 0px 0px #00a3ce;

        font-size: 16px;
        font-family: Source Han Sans SC-Regular, Source Han Sans SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 32px;
        text-indent: 10px;
        margin-bottom: 8px;
      }

      .event_cont_box {
        display: flex;
        flex-wrap: wrap;

        .event_cont {
          width: 100%;

          &.inline_3 {
            width: calc((100% - 16px) / 3);
            margin-right: 8px;

            &:last-child {
              margin: 0;
            }
          }

          .list {
            display: flex;
            font-size: 16px;
            font-family: Source Han Sans SC-Regular, Source Han Sans SC;
            font-weight: 400;
            color: #ffffff;
            line-height: 24px;
            margin-bottom: 8px;

            .label {
              width: 70px;
              margin-right: 20px;
            }
          }
        }
      }
    }
  }
}
</style>