<script setup>
import { ref, inject } from "vue";
import soundRecording from "./soundRecording.vue";
import { assetsUrl } from "@/components/map/map2d/hook/index";

const $mitt = inject("$mitt");
const right_content = ref();
const isHide = ref(false);
const show_right_top_list = ref(true);
const show_right_bottom_list = ref(true);
const tooglePosition = function () {
  isHide.value = !isHide.value;
};
const toggleRightTopList = function () {
  show_right_top_list.value = !show_right_top_list.value;
};
const toggleRightBottomList = function () {
  show_right_bottom_list.value = !show_right_bottom_list.value;
};

const clickWg = function(){
  fetch(assetsUrl("/geoJson/jiedao.json")).then(res=>res.json()).then(res=>{
    console.log("jiedao",res)
  })
  fetch(assetsUrl("/geoJson/yl.json")).then(res=>res.json()).then(res=>{
    console.log("yj",res)
  })
  let mittData = {
    url: assetsUrl("/geoJson/jiedao.json"),
    // url: "http://1.85.55.225:8085/YouMapServer/rest/service/sxwwCGCS2000/VectorTileServer/styles/blue_yj-225.json",
    geoType: "maskGeo",
    mask: true,
    type: "mask",
    style: {
      outlineColor: "#fff",
      outlineWidth: 5, //宽度
    },
  };
  $mitt.emit("drawGeoGraph", mittData);
}

</script>

<template>
  <div
    ref="right_content"
    :class="[
      'right_content animate__animated  animate__fadeInRight',
      isHide ? 'hide_content' : '',
    ]"
  >
    <div class="rightContent">
      <slot></slot>
      <div class="openAudio">
        <soundRecording></soundRecording>
      </div>
      <div class="wg" @click="clickWg"></div>
    </div>

    <div class="right_top_box">
      <!-- 侧边定位悬浮list框  -->
      <div class="list_box" v-if="false">
        <ul
          style="height: 240px"
          :class="['list', show_right_top_list ? '' : 'height0']"
        >
          <li class="list_item">1</li>
          <li class="list_item">1</li>
          <li class="list_item">1</li>
          <li class="list_item">1</li>
        </ul>
        <div @click="toggleRightTopList" class="list_item">
          <div :class="['rotateBox', show_right_top_list ? '' : 'rotate']">
            <el-icon size="32" color="#fff">
              <ArrowUp />
            </el-icon>
          </div>
        </div>
      </div>
    </div>
    <!-- 侧边定位悬浮list框  -->
    <div class="right_bottom_box" v-if="false">
      <div class="list_box">
        <ul
          style="height: 120px"
          :class="['list', show_right_bottom_list ? '' : 'height0']"
        >
          <li class="list_item">1</li>
          <li class="list_item">1</li>
        </ul>
        <div @click="toggleRightBottomList" class="list_item">
          <div :class="['rotateBox', show_right_bottom_list ? '' : 'rotate']">
            <el-icon size="32" color="#fff">
              <ArrowUp />
            </el-icon>
          </div>
        </div>
      </div>
    </div>
    <div @click="tooglePosition" :class="['arrow_box', isHide ? 'rotate' : '']">
      <el-icon size="32" color="#fff">
        <ArrowRight />
      </el-icon>
    </div>
  </div>
</template>

<style lang="less" scoped>
@padding_right: 0; // 内容距离右边的宽度
@boxWidth: 440px; //内容宽度
@margin_top: 69px; //距离上面的宽度

.right_content {
  width: @boxWidth + @padding_right;
  padding-right: @padding_right;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  // background: linear-gradient(
  //   145deg,
  //   rgba(1, 23, 65, 0.9) 0%,
  //   rgba(17, 48, 106, 0.9) 50%,
  //   rgba(1, 23, 65, 0.9) 100%
  // );
  background: url(@/assets/common/right.png) no-repeat;
  background-size: 100% 100%;
  transition: 0.5s linear;
  z-index: 4;
  // background: rgba(0,6,13,0.1);
  .rightContent {
    padding-top: @margin_top;
  }
  .arrow_box {
    position: absolute;
    bottom: 10px;
    right: @padding_right + @boxWidth + 10px;
    cursor: pointer;
    transition: 0.5s linear;
  }

  .rotate {
    transform: rotate(180deg);
  }

  .right_top_box {
    position: absolute;
    right: @padding_right + @boxWidth + 10px;
    top: 50px;

    .list_box {
      .list {
        transition: 0.5s linear;
        overflow-y: hidden;

        &_item {
          width: 48px;
          height: 48px;
          border: 1px solid red;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 10px;

          .rotateBox {
            transition: 0.5s linear;
          }
        }
      }
    }
  }

  .right_bottom_box {
    position: absolute;
    right: @padding_right + @boxWidth + 10px;
    bottom: 50px;

    .list_box {
      .list {
        transition: 0.5s linear;
        overflow-y: hidden;

        &_item {
          width: 48px;
          height: 48px;
          border: 1px solid red;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 10px;

          .rotateBox {
            transition: 0.5s linear;
          }
        }
      }
    }
  }
}

.hide_content {
  right: -(@padding_right + @boxWidth);
}

.height0 {
  height: 0 !important;
}
.wg {
  position: absolute;
  right: 490px;
  bottom: 10px;
  width: 40px;
  height: 40px;
  background: #04417d;
  border-radius: 4px;
  border: 1px solid #1b8ae4;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &::after {
    content: "网";
    font-size: 20px;
    font-family: Source Han Sans-Regular, Source Han Sans;
    font-weight: 400;
    color: #15bce6;
    width: 34px;
    height: 34px;
    text-align: center;
    line-height: 32px;
    border: 1px solid #15bce6;
    border-radius: 50%;
    box-sizing: border-box;
  }
}
.openAudio {
  position: absolute;
  right: 540px;
  bottom: 10px;
  width: 40px;
  height: 40px;
  background: #04417d;
  border-radius: 4px;
  border: 1px solid #1b8ae4;
  cursor: pointer;
}
</style>
