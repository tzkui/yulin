<template>
  <div v-drag class="mapGeomtryWrap">
    <div class="mapGeomtryGroup" :class="[toggleGeomtryGroup ? '' : 'active']">
      <div class="childBtnGroup" :class="[toggleGeomtryGroup ? '' : 'active']">
        <span class="btn search" @click="mapSearch"><span class="txt">搜索</span></span>
        <span class="btn clear-b" @click="mapDrawClear"><span class="txt">清空</span></span>
        <span class="btn analysis" @click="mapAanlysis"><span class="txt">圈选</span></span>
        <span class="btn camera" @click="mapToPic"><span class="txt">截图</span></span>
        <span class="btn ruler" @click="mapDrawLine()"><span class="txt">测量</span></span>
        <span class="btn plot" @click="mapDrawPic"><span class="txt">标绘</span></span>
        <span class="btn layer" @click="mapLayer"><span class="txt">会商</span></span>
      </div>
      <span class="btnMain"><span class="icon" @click="toggleGeomtryGroupFn()"></span></span>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, inject } from "vue";
import { useEventBus } from "@vueuse/core";
const $mitt = inject("$mitt");
const toggleGeomtryGroup = ref(false);

const toggleGeomtryGroupFn = () => {
  toggleGeomtryGroup.value = !toggleGeomtryGroup.value;
};

const mapDrawLine = () => {
  console.log("测量");
  $mitt.emit("drawGraph", { type: "polyline" });
};

const mapDrawClear = () => {
  console.log("清空");
  $mitt.emit("clearAll", { ignore: ["geo绘制图层"] });
};
const mapAanlysis = () => {
  console.log("圈选");
  $mitt.emit("hideAllMarker")
  $mitt.emit("drawGraph", { type: "circle" });
};
const mapDrawPic = () => {
  console.log("标绘");
  $mitt.emit("drawGraph", { type: "polygon" });
};
const mapToPic = function(){
  $mitt.emit("mapToPic")
}
const mapSearch = function(){
  $mitt.emit("openSearchDialog")
}

const videoConferencingBus = useEventBus("openVideoConferencing")
const mapLayer = function(){
  videoConferencingBus.emit({id:1})
}
</script>
<style lang="scss" scoped>
.mapGeomtryWrap {
  position: absolute;
  // left: 50%;
  // transform: translateX(-80%);
  top: 100px;
  left: calc(100% - 535px);
  z-index: 999;

  .mapGeomtryGroup {
    position: relative;
    // height: 216px;
    // width: 216px;
    // top: 131px;
    // right: 552px;
    // z-index: 999;
    &::before {
      content: "";
      background: url("../../assets/geo/base_circle@2x.png") no-repeat;
      position: absolute;
      width: 205px;
      height: 205px;
      background-size: 100% 100%;
      background-position: center;
      top: -72px;
      left: -72px;
      //旋转运动
      animation: roundMove 2s linear infinite;

      @keyframes roundMove {
        0% {
          transform: rotate(0deg);
        }

        100% {
          transform: rotate(360deg);
        }
      }
    }

    .searchGroup {
      position: absolute;
      height: 40px;
      width: 230px;
      display: flex;
      top: -40px;
      left: 0;
      background-color: rgb(9, 49, 90);
      border-radius: 4px;
      input {
        flex: 1;
        width: calc(100% - 56px);
        outline: none;
        border: solid 1px rgba(0, 148, 255, 0.65);
        color: #c1dcf8;
        padding: 6px 12px;
        box-sizing: border-box;
        // border: none;
        background: none;
        &::placeholder {
          color: #c1dcf8;
        }
      }

      .btn {
        width: 56px;
        height: 40px;
        // background: url("@/assets/images/earthquake/ear-search1-true.png")
        //   no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
      }
    }
    .childBtnGroup {
      position: relative;
      background: url("../../assets/geo/base@2x.png") no-repeat;
      background-size: 216px 216px;
      &::before {
        content: "";
        background: url("../../assets/geo/base@2x.png") no-repeat;
        position: absolute;
        width: 205px;
        height: 205px;
        background-size: 100% 100%;
        background-position: center;
        top: -72px;
        left: -72px;
      }
      .btn {
        transition: all 0.3s ease-in-out;
        display: flex;
        flex-direction: column;
        // justify-content: center;
        padding-top: 5px;
        opacity: 1;
        position: absolute;
        cursor: pointer;
        letter-spacing: 2px;
        // height: 70px;
        width: 75px;
        font-size: 12px;
        text-align: center;
        box-sizing: border-box;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        color: #e6f0ff;
        align-items: center;

        .txt {
          padding-top: 32px;
          box-sizing: border-box;
          font-size: 16px;
          font-family: Source Han Sans SC-Regular, Source Han Sans SC;
          font-weight: 400;
          color: #c1dcf8;
          line-height: 22px;
        }

        &:hover {
          &::before {
            content: "";
            position: absolute;
            background: url("../../assets/geo/base_hover@2x.png") no-repeat;
            background-size: 100% 100%;
            height: 65px;
            width: 100%;
          }

          .txt {
            background: linear-gradient(180deg, #ffffff 0%, #26ffef 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }

        @mixin iconStyle($src) {
          &::after {
            content: "";
            height: 28px;
            width: 28px;
            // margin-bottom: 4px;
            background: url($src) no-repeat;
            background-size: 100% 100%;
            background-position: center;
            position: absolute;
            // left: 0;
            top: 10px;
          }
        }

        &.search {
          top: -66px;
          left: calc(50% - 37px);
          @include iconStyle("../../assets/geo/icon_search.svg");
          &:hover {
            @include iconStyle("../../assets/geo/icon_search_active.svg");
            &::before {
              transform: rotate(0);
            }
          }
        }

        &.clear-b {
          top: -42px;
          right: -57px;

          // @include iconStyle('../../assets/geo/icon_clear.svg');
          @include iconStyle("../../assets/geo/icon_clear.svg");

          &:hover {
            @include iconStyle("../../assets/geo/icon_clear_active.svg");
            &::before {
              transform: rotate(56deg);
            }
          }
        }

        &.layer {
          top: -40px;
          left: -56px;
          @include iconStyle("../../assets/geo/icon_layer.svg");

          &:hover {
            @include iconStyle("../../assets/geo/icon_layer_active.svg");
            &::before {
              transform: rotate(-54deg);
            }
          }
        }

        &.plot {
          left: -65px;
          top: 11px;
          @include iconStyle("../../assets/geo/icon_plot.svg");

          &:hover {
            @include iconStyle("../../assets/geo/icon_plot_active.svg");
            &::before {
              transform: rotate(-106deg);
            }
          }
        }

        &.camera {
          right: -67px;
          top: 8px;
          @include iconStyle("../../assets/geo/icon_camera.svg");
          &:hover {
            @include iconStyle("../../assets/geo/icon_camera_active.svg");
            &::before {
              transform: rotate(-255deg);
            }
          }
        }

        &.ruler {
          top: 50px;
          left: -30px;
          @include iconStyle("../../assets/geo/icon_ruler.svg");
          &:hover {
            @include iconStyle("../../assets/geo/icon_ruler_active.svg");
            &::before {
              transform: rotate(-157deg);
            }
          }
        }

        &.analysis {
          right: -36px;
          top: 47px;
          @include iconStyle("../../assets/geo/icon_analysis.svg");
          &:hover {
            @include iconStyle("../../assets/geo/icon_analysis_active.svg");
            &::before {
              transform: rotate(153deg);
            }
          }
        }
      }

      &.active {
        // .btnMain {
        //   width: 56px;
        //   height: 56px;
        // }
        // .btnMain::before {
        //   border-radius: 50%;
        //   width: 56px;
        //   height: 56px;
        //   transition: all 0.3s ease-in-out;
        // }
        &::before {
          width: 0;
          left: 0;
        }
        .btn {
          // opacity: 0;
          width: 0;
          height: 0;
          overflow: hidden;
          padding: 0;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.3s linear;
          z-index: -1;
        }
      }
    }
    .btnMain {
      cursor: pointer;
      border-radius: 50%;
      display: flex;
      //本身上下左右居中
      justify-content: center;
      align-items: center;
      height: 60px;
      width: 60px;
      position: relative;
      transition: all 0.5s ease-in-out;
      left: calc(50% - 30px);
      top: calc(50% - 30px);
      &::before {
        content: "";
        display: block;
        height: 100%;
        width: 100%;
        border-radius: 50%;
        background: url("../../assets/geo/base@2x.png") no-repeat;
        background-size: 216px 216px;
        background-position: center;
      }

      .icon {
        position: absolute;
        top: calc(50% - 14px);
        left: calc(50% - 14px);
        height: 28px;
        width: 28px;
        background: url("../../assets/geo/icon_settings2x.png") no-repeat;
        background-size: 100% 100%;
        background-position: center;
      }
    }
    &.active {
      &::before {
        // opacity: 0;
        width: 60px;
        height: 60px;
        left: 0;
        top: 0;
      }
      // width: 56px;
      // height: 56px;
      // overflow: hidden;
    }
  }
}
</style>
