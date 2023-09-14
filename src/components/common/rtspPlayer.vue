<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { wbrtcAddUrl, wbrtcReceiver, wbrtcCodec } from "@/api/rtspApi.js";
const props = defineProps({
  videoSrc: {
    type: String,
    default: "",
  },
});
const rtspPlayerRef = ref();
const getUuid = function () {
  let str = "";
  let arr = ["M", "N", "O", "a", "C", "Y", "U", "W", "P", "l","A","B","D","E","F","G","H","I","a","b"];
  for (let i = 0; i < 6; i++) {
    str += arr[parseInt(Math.random() * arr.length)];
  }
  return str;
};
const uuid = getUuid();
const playWebrtc = function () {
  let stream = new MediaStream();
  let config = {
    iceServers: [
      {
        urls: ["turn:10.112.143.192:1000"],
        username: "user1",
        credential: "wex12345",
      },
      {
        urls: ["stun:10.112.143.192:1000"],
        username: "user1",
        credential: "wex12345",
      },
    ],
  };
  const pc = new RTCPeerConnection(config);
  let pData = JSON.stringify({
    name: uuid,
    stream: { url: props.videoSrc },
  });
  wbrtcAddUrl(pData).then((addUrlRes) => {
    console.log("addUrlRes: ", addUrlRes);
    wbrtcCodec({ suuid: uuid }).then((codecRes) => {
      console.log("codecRes: ", codecRes);
      codecRes.data.forEach((item) => {
        pc.addTransceiver(item.Type, {
          direction: "sendrecv",
        });
      });
      pc.onnegotiationneeded = function () {
        console.log("onnegotiationneeded");
        pc.createOffer().then((offer) => {
          pc.setLocalDescription(offer).then(() => {
            wbrtcReceiver({
              suuid: uuid,
              data: btoa(pc.localDescription.sdp),
            }).then((ReceiverRes) => {
              console.log("到这里1")
              pc.setRemoteDescription(
                new RTCSessionDescription({
                  type: "answer",
                  sdp: atob(ReceiverRes.data),
                })
              ).then(res=>{
                console.log("这里拿到数据：",res)
              }).catch(error=>{
                console.log("这里错误了：",error)
              })
              pc.ontrack = function (e) {
              console.log("到这里2",e.track)
                stream.addTrack(e.track);
                rtspPlayerRef.value.srcObject = stream;
              };
              setTimeout(() => {
              console.log("到这里3")
                rtspPlayerRef.value.play();
              }, 200);
            });
          });
        });
      };
    });
  });
};

onMounted(() => {
  playWebrtc();
});
onUnmounted(() => {});
</script>

<template>
    <video
      style="width: 100%; height: 100%;"
      ref="rtspPlayerRef"
      controls
      muted
      crossOrigin="anonymous"
    ></video>
</template>
