<template>
  <div class="dialog-wid-content animate__animated animate__zoomIn" v-show="dialogType" :class="className"
    @click.self="closeDialog">
    <div class="dialog-wid-center" :style="{
      width: width,
      height: height
    }">
      <div class="dialog_head">
        <h2 class="dialog_title">{{ title }}</h2>
        <img @click.self="closeDialog" class="dialog_close" src="@/assets/integratedCommunication/dialog_close.png"
          alt="">
      </div>
      <div class="dialog-wid-info">
        <div v-for="item in dialogList" :key="item.id" @click="windowOpen(item)" class="vfor"
          :style="{ width: dialogList.length > 1 ? '49%' : '1900px' }">
          <div class="name">{{ item.name }}</div>
          <img v-if="item.type==='img'" :src="item.imgUrl" alt="" class="img" :style="{ height: dialogList.length > 1 ? '480px' : '950px' }">
          <video v-else :src="item.videoUrl" class="video" style="{ height: dialogList.length > 1 ? '480px' : '950px' }"></video>
          <!-- <iframe :src="item.paths" frameborder="0" class="img"
            :style="{ height: dialogList.length > 3 ? '480px' : '950px' }"></iframe> -->
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
      default: "1920px",
    },
    height: {
      type: String,
      default: "",
    },
    top: {
      type: Number,
      default: '',
    },
    title: {
      type: String,
      default: "弹框标题",
    },
    dialogValue: {
      type: Boolean,
      default: false,
    },
    dialogList: {
      type: Array,
      default: []
    }
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
    const windowOpen = (item) => {
      window.open(item.paths, "_blank");
    }
    return {
      ...toRefs(data),
      closeDialog,
      windowOpen
    };
  },
};
</script>

<style lang="less" scoped>
.dialog-wid-content {
  position: relative;
  // width: 100%;
  height: 1080px;
  z-index: 99999999;

  .dialog-wid-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    // width: 1500px;
    height: 1080px;
    background: #051e3a;
    z-index: 99999999;

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
      background: url("@/assets/integratedCommunication/dialog_head_bg.png") no-repeat;
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
    display: flex;
    flex-wrap: wrap;

    .vfor {
      width: 49%;
      height: 480px;
      margin-right: 10px;
      margin-bottom: 10px;
      text-align: center;

      .name {
        font-size: 15px;
        margin-bottom: 10px;
        // border-bottom: 1px solid #ccc;
      }

      .img {
        width: 100%;
        // height: 100%;
        height: 480px;
      }
      .video{
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>