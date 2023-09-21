<script setup>
import { onMounted, ref } from "vue";
import WexDemoPlayer from "@/components/h265/WexDemoPlayer.js";
import { wbrtc256pull, getH256WsUrl } from "@/api/rtspApi.js";

const playerRef = ref();
const props = defineProps({
  playerUrl: {
    type: String,
    default: "rtsp://10.112.143.192:554/tel:2011",
  },
});
const getRandomId = function () {
  let a = parseInt(Math.random() * 20) + 100;
  let b = parseInt(Math.random() * 1000);
  let str = String.fromCharCode(a) + b;
  let store = sessionStorage.getItem("h265Ids");
  console.log(str,a,b)
  if (store?.includes("," + str + ",")) {
    return getRandomId();
  } else {
    if (store === null) {
      store = ",";
    }
    sessionStorage.setItem("h265Ids", store + str + ",");
    return str;
  }
};
const videoId = ref(getRandomId());
const videoConfig = {
  showBand: false, //网速显示
  fullscreen: false,
  screenshot: false,
  play: false, //播放暂停
  audio: false, //声音调整
  useMSE: true,
};
const videoPlayer = ref({});
const initPlayer = function () {
  const doceUrl = "../lib/h265/decoder-pro.js";
  videoPlayer.value = new WexDemoPlayer({
    container: playerRef.value,
    decoder: doceUrl,
    videoBuffer: 0.2,
    isResize: false,
    text: "文字",
    loadingText: "加载中",
    debug: false,
    showBandwidth: videoConfig.showBand,
    operateBtns: {
      fullscreen: videoConfig.fullscreen,
      screenshot: videoConfig.screenshot,
      play: videoConfig.play,
      audio: videoConfig.audio,
    },
    useMSE: videoConfig.useMSE,
    watermarkConfig: {
      text: {
        content: "",
      },
      right: 10,
      top: 10,
    },
  });
  videoPlayer.value.onLog = (msg) => console.error(msg);
  videoPlayer.value.onRecord = (status) => console.log("onRecord", status);
  videoPlayer.value.onPause = () => console.log("onPause");
  videoPlayer.value.onPlay = () => console.log("onPlay");
  videoPlayer.value.onMute = (msg) => console.log("onMute", msg);
  videoPlayer.value.on("fullscreen", function (flag) {
    console.log("is fullscreen", id, flag);
  });
  pullRtsp();
};
const pullRtsp = function () {
  console.log("开始拉流");
  wbrtc256pull({ rtsp: props.playerUrl, videoId: videoId.value }).then(
    (res) => {
      console.log(res);
      if (res.data && res.data.code === 0) {
        const url = getH256WsUrl() + videoId.value;
        console.log("url---->", url);
        setTimeout(() => {
          videoPlayer.value
            .play(url)
            .then((data) => {
              console.log("播放成功 data--->", data);
            })
            .catch((err) => {
              console.log("播放失败：", err);
            });
        }, 100);
      }
    }
  );
};
const destroy = function () {
  videoPlayer.value.destroy();
};
onMounted(() => {
  initPlayer();
});
</script>

<template>
  <div class="h265">
    <div class="playBox" ref="playerRef"></div>
    <!-- <div @click="destroy">注销</div> -->
  </div>
</template>
<style lang="scss" scoped>
.h265 {
  width: 100%;
  height: 100%;
  // border: 1px #eee solid;
  .playBox {
    width: 100%;
    height: 100%;
    background: rgba(13, 14, 27, 0.7);
  }
}
</style>
