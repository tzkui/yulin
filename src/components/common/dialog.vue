<template>
  <div class="dialog-wid-content animate__animated animate__zoomIn" v-show="dialogType" :class="className" @click.self="clocseDialog">
    <div class="dialog-wid-center" :style="{
        width: width,
        height: height,
        left: (width / 2) * -1 + 'px',
        top: top + 'px',
      }">
      <div class="dialog_head">
        <h2 class="dialog_title">{{title}}</h2>
        <img @click.self="closeDialog" class="dialog_close" src="@/assets/integratedCommunication/dialog_close.png" alt="">
      </div>
      <div class="dialog-wid-info">
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
    top: {
      type: Number,
      default: -40,
    },
    title: {
      type: String,
      default: "弹框标题",
    },
    dialogValue: {
      type: Boolean,
      default: false,
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
  z-index: 15;
  .dialog-wid-center {
    width: 960px;
    height: 440px;
    background: #051e3a;
    // background: linear-gradient(
    //   to top,
    //   rgba(1, 40, 59, 1) 0%,
    //   rgba(3, 16, 26, 1) 50%,
    //   rgba(1, 39, 62, 1) 100%
    // );
    border-radius: 10px;
    border: 2px solid #072031;
    padding: 0 10px;
    .dialog_head {
      height: 51px;
      padding: 0 0 0 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: url("@/assets/integratedCommunication/dialog_head_bg.png")
        no-repeat;
      background-size: 100% 100%;
      .dialog_title {
        font-size: 16px;
        font-family: Source Han Sans SC-Medium, Source Han Sans SC;
        font-weight: 500;
        color: #ffffff;
      }

      .dialog_close {
        height: 33.65px;
        width: 33.65px;
        cursor: pointer;
      }
    }
  }
  .dialog-wid-info {
    padding: 10px;
  }
}
</style>