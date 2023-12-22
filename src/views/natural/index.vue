
<script setup>
import pageLeftContent from "@/components/common/pageLeftContent.vue";
import pageRightContent from "@/components/common/pageRightContent.vue";
import scrollBanner from '@/components/common/scrollBanner.vue'
import right from "../../views/natural/right.vue";
import { ref, onMounted, reactive, inject } from "vue";
import left from "./left.vue";
import {getQxyj} from '@/api/modules/home.js'

const $mitt = inject("$mitt");
let yjInfo = {}
onMounted(() => {
  getQxyj().then((res) => {
    yjInfo = res.data[0]
    bannerContent.value = res.data[0]?.alarmContent
  });
})

const bannerContent = ref("")
// 决定这些框线是否需要隐藏的东东
const showDialog = ref({
  ck: false,
  bl: false,
  zh: false,
  hs: false,
});

// 下面就是接收子组件的数据
const getValue = (value) => {
  showDialog.value = value
}
const openYjxx = function(){
  $mitt.emit("openWarningDetailDialog", yjInfo)
}
</script>

<template>
  <div class="bigScreen" ref="bigScreen">
    <!-- 无缝滚动 -->
    <div class="scollBox" @click="openYjxx">
      <img src="../../assets/natural/tongzhi.png" class="tz">
      
      <scrollBanner :content="bannerContent"></scrollBanner>
    </div>
    <!-- 左侧内容 -->
    <pageLeftContent>
      <left></left>
    </pageLeftContent>
    <!-- 右侧内容 -->
    <pageRightContent>
      <right @getValue="getValue"></right>
    </pageRightContent>
  </div>
</template>



<style scoped lang="less">
.mapBox {
  width: 1920px;
  height: 1080px;
}

.scollBox {
  width: 527px;
  height: 39px;
  padding: 0 20px;
  // background: rgba(6, 152, 215, 0.2);
  background: url(@/assets/common/warn_bg.png) no-repeat;
  background-size: 100% 100%;
  position: absolute;
  left: 50%;
  margin-left: -263px;
  top: 98px;
  cursor: pointer;
  z-index: 9999;
  display: flex;
  align-items: center;

  .tz {
    width: 24px;
    height: 19px;
    padding-right: 10px;
  }

  .tz-num {
    padding-left: 5px;
    font-size: 14px;
    color: #20e6a4;
    padding-right: 10px;
  }

  .seamless-warp2 {
    overflow: hidden;
    height: 39px;
    width: 517px;
    line-height: 39px;
    padding-left: 20px;

    ul.item {
      width: 520px;

      li {
        float: left;
        margin-right: 10px;
        font-size: 16px;
        font-weight: 500;
        color: #FFFFFF;
        padding-left: 10px;
      }
    }
  }
}

.webRtc {
  position: absolute;
  left: 0;
  top: 0;
  width: 300px;
  height: 200px;
}

.layoutAuto {
  position: fixed;
  top: 0;
  left: 0;
  width: 500px;
  height: 400px;
}


// 多选框 弹框内容样式
.checkbox_popup {
  padding: 0 10px;

  .search_bar {
    display: flex;

    :deep(.el-input) {
      flex: 1;
      height: 36px;
      background: linear-gradient(90deg, #0698D7 0%, #1E89FD 100%);
      border-radius: 4px 4px 4px 4px;
      border: 1px solid !important;
      border-image: linear-gradient(90deg, rgba(6, 152, 215, 1), rgba(30, 137, 253, 1)) 1 1 !important;
      margin-right: 3px;
      font-size: 16px;
    }

    .button {
      width: 97px;
      height: 36px;
      background: linear-gradient(90deg, #0698D7 0%, #1E89FD 100%) !important;
      border-radius: 4px 4px 4px 4px;
      font-size: 16px;
    }
  }

  :deep(.el-tree) {
    margin-top: 10px;
    background: transparent;

    // 隐藏 展开收起icon
    .el-tree-node__expand-icon {
      display: none;
    }

    .el-checkbox__inner {
      width: 20px;
      height: 20px;
      border: 1px solid #0075A4;
      border-radius: 0;
      background: transparent;
    }

    .el-checkbox__input.is-checked .el-checkbox__inner {
      border: none;
      background: url('@/assets/natural/check_Property.png') center/99% 99% no-repeat;

      &::after {
        display: none;
      }
    }

    .el-tree-node {
      font-size: 16px;
      font-family: Source Han Sans SC-Regular, Source Han Sans SC;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 19px;

      .yellow {
        color: #FFDF53;
        margin-left: 10px;
      }
    }

    .el-tree-node__content {
      margin: 4px 0;
    }

    .el-tree-node:focus>.el-tree-node__content,
    .el-tree-node__content:hover {
      background-color: RGBA(10, 91, 131, .3);
    }
  }
}
</style>