<template>
  <div
    class="count-box fl-coc"
    :style="nodeData"
    :class="[isCheck ? 'ischeck-style' : '']"
  >
    <img class="jiao-top-style" src="../../images/jiao_top.png" />
    <div class="left-top-box"></div>
    <div class="right-bottom-box"></div>
    <img class="jiao-bottom-style" src="../../images/jiao_bottom.png" />
    <div class="fc-fff">
      <span class="fz-10">{{ count }}</span>
      <span class="fz-6">{{ unit }}</span>
    </div>
    <span class="fz-6-5" :class="[isCheck ? 'fc-fff' : '']">{{ title }}</span>
  </div>
</template>
<script>
import { reactive, toRefs } from "vue";
export default {
  props: {
    width: {
      type: String,
      default: function () {
        return "134";
      },
    }, // 宽
    height: {
      type: String,
      default: function () {
        return "80";
      },
    }, // 高
    title: {
      type: String,
      default: function () {
        return "标题";
      },
    },
    unit: {
      type: String,
      default: function () {
        return "次";
      },
    },
    count: {
      type: Number,
      default: function () {
        return 0;
      },
    },
    isCheck: {
      type: Boolean,
      default: function () {
        return false;
      },
    },
  },
  setup(props) {
    const data = reactive({
      nodeData: {
        width: props.width + "px",
        height: props.height + "px",
      },
    });
    return {
      ...toRefs(data),
    };
  },
};
</script>
<style scoped>
.count-box {
  position: relative;
  border: 1px solid #00c4d5;
  box-shadow: inset 0px 0px 6px 0px #00c4d5;
}
.jiao-top-style {
  position: absolute;
  left: 0;
  top: 0;
  width: 14px;
  height: 14px;
  z-index: 9;
}
.jiao-bottom-style {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 8px;
  height: 8px;
  z-index: 9;
}
.fz-6-5 {
  margin-top: 8px;
  font-size: 13px;
  color: #75cdff;
}
.ischeck-style {
  background: linear-gradient(90deg, #0180db, #00f0ff);
}
.ischeck-style::before {
  position: absolute;
  left: 50%;
  bottom: -8px;
  margin-left: -9px;
  content: "";
  width: 0;
  height: 0;
  border-top: 9px solid #00baed;
  border-right: 9px solid transparent;
  border-left: 9px solid transparent;
}
.left-top-box {
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  border-top: 14px solid #000443;
  border-right: 14px solid transparent;
  z-index: 7;
}
.right-bottom-box {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 0;
  height: 0;
  border-bottom: 9px solid #000443;
  border-left: 9px solid transparent;
  z-index: 7;
}
.left-top-box::after {
  content: "";
  width: 1px;
  height: 4px;
  background-color: #000443;
  position: absolute;
  left: -1px;
  top: -4px;
}
.left-top-box::before {
  content: "";
  width: 4px;
  height: 1px;
  background-color: #000443;
  position: absolute;
  left: 10px;
  top: -15px;
}
.right-bottom-box::after {
  content: "";
  width: 1px;
  height: 5px;
  background-color: #000443;
  position: absolute;
  right: -1px;
  bottom: -4px;
}
.right-bottom-box::before {
  content: "";
  width: 5px;
  height: 1px;
  background-color: #000443;
  position: absolute;
  right: 4px;
  bottom: -10px;
}
</style>