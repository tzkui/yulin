<template>
  <div class="data-box-1" :style="nodeData">
    <div class="data-box-title fl-al">
      <span class="box-title-text" v-html="title"></span>
    </div>
    <div class="box-center">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
export default {
  props: {
    width: String, // 宽
    height: String, // 高
    left: String,
    top: String,
    right: String,
    bottom: String,
    title: {
      type: String,
      default: function () {
        return "标题";
      },
    },
  },
  setup(props) {
    const data = reactive({
      nodeData: {
        width: props.width + "px",
        height: props.height + "px",
        left: props.left + "px",
        top: props.top + "px",
        right: props.right + "px",
        bottom: props.bottom + "px",
      },
    });
    return {
      ...toRefs(data),
    };
  },
};
</script>

<style>
.leftbig{
  padding-left: 0px !important;
}
.data-box-1 {
  position: relative;
}
.data-box-title {
  width: 412px;
  height: 56px;
  background: url(@/assets/common/box_title.png) no-repeat;
  background-size: 100% 100%;
  margin-left: 8px;
  margin-top: 8px;
}
.box-title-text {
  font-size: 18px;
  margin-left: 8px;
}
.box-center {
  padding: 10px;
  position: relative;
}
</style>