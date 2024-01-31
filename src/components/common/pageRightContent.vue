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

// javascript 转换
function mercatorTolonlat(mercator){
  var lonlat=[0,0]
  var x = mercator[0]/20037508.34*180;
  var y = mercator[1]/20037508.34*180;
  y= 180/Math.PI*(2*Math.atan(Math.exp(y*Math.PI/180))-Math.PI/2);
  lonlat[0] = x;
  lonlat[1] = y;
  return lonlat;
}

sessionStorage.setItem("isWg", 0)
let jiedaoWgFeature = null,shequWgFeature = null;
fetch(assetsUrl("/geoJson/jiedao.json")).then(res=>res.json()).then(res=>{
  jiedaoWgFeature = res.features;
})
fetch(assetsUrl("/geoJson/shequ.json")).then(res=>res.json()).then(res=>{
  shequWgFeature = res.features;
})
const drawJiedaoWg = function(){
  drawWg(jiedaoWgFeature, "wgLayer")
}
const drawShequWg = function(){
  drawWg(shequWgFeature, "wgShequLayer")
}
let drawWg = function(features, layerName){
  for(const obj of features){
    let lnglatArray = obj.geometry.rings[0].map(item=>mercatorTolonlat(item));
    const latlngs = mars2d.PointTrans.coords2latlngs(lnglatArray)
    let poly = new mars2d.graphic.Polygon({
      latlngs,
      style: {
        fill: false,
        fillColor: "transparent",
        fillOpacity: 0.3,
        outline: true,
        outlineWidth: 2,
        outlineColor: "#42FFFF",
        outlineOpacity: 0.5
      },
      attr: { remark: "示例1" }
    })
    window[layerName].addGraphic(poly);
    let label = new mars2d.graphic.Label({
      id: obj.attributes.commuid || obj.attributes.streetid,
      latlng: [poly.center.lat, poly.center.lng],
      style: {
        color: "#fff"
      },
    });
    label.text = obj.attributes["所属街道办"] || obj.attributes.streetname;
    window[layerName].addGraphic(label)
    label.bindPopup(null, {
      className: "myPopup",
      closeButton: true,
      maxWidth: 500,
    });
    label.on(mars2d.EventType.click, e=>{
      let json = JSON.stringify({
        id: obj.attributes.commuid || obj.attributes.streetid,
        text: label.text,
        isLabel: true,
        markerType: "wgxx",
        dialogType: "wgxx",
        details: {
          text: label.text,
        }
      })
      label.setPopupContent(`<map-popup data=${json}></map-popup>`)
      label.openPopup()
    })
  }
  sessionStorage.setItem("isWg", 1)
}

const clickWg = function(){
  if(sessionStorage.getItem("isWg")==="1"){
    window.wgLayer.clear();
    sessionStorage.setItem("isWg", 0)
    return ;
  }
  drawJiedaoWg()
  drawShequWg()
  window.map.flyTo([38.06,109.75],12)
}

const resetZoom = function(){
  $mitt.emit("flyHome")
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
      <div class="resetZoom" @click="resetZoom">
        <img src="@/assets/common/reset.png" alt="">
      </div>
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
.resetZoom{
  position: absolute;
  right: 590px;
  bottom: 10px;
  width: 40px;
  height: 40px;
  background: #04417d;
  border-radius: 4px;
  border: 1px solid #1b8ae4;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  >img{
    width: 36px;
    height: 36px;
  }

}
</style>
