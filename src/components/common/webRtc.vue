<!-- rtsp使用webrtc播放插件 -->
<template>
  <div class='webrtcPage'>
    <video :id="item.videoId" controls @play="videoplay" @loadedmetadata="loadedmetadata" muted crossOrigin="anonymous" @error="error"></video>
  </div>
</template>

<script>
import {
  wbrtcAddUrl,
  wbrtcReceiver,
  wbrtcCodec,
  wbrtcClose,
} from "@/api/modules/webRtcApi.js";
import _ from "lodash";
import { nanoid } from "nanoid";
// import {webrtcMixins} from '../../untils/mixin';
export default {
  data() {
    return {
      uuidList: [],
      stream: null,
      streamList: [],
    };
  },
  // mixins: [webrtcMixins],
  props: {
    item: {
      type: Object,
      default: {
        videoId: "",
        playUrl: "",
      },
    },
  },
  components: {},
  filter: {},
  methods: {
    aryFiler(ary, id, key) {
      //根据id查找uuid
      return ary.find((item, inx) => {
        console.log(item);
        return item[key] == id;
      });
    },
    playWebrtc(rtsp, id, item) {
      let uuid = nanoid(6); //生成6位数的编码
      this.uuidList.push({ key: id, uuid: uuid });
      this.webRtcPlay(uuid, rtsp, id);
    },
    async webRtcPlay(suuid, rtsp, videoId) {
      //公共方法wbrtc注册播放视频
      let that = this;
      let apiurl = ""; //that.testData.url//单独进行配置的访问地址
      let stream = new MediaStream(); //获取浏览器的MediaStream
      let config = {
        iceServers: [
          {
            urls: ["turn:115.28.186.199:3478"],
            username: "user1",
            credential: "wex12345",
          },
          {
            urls: ["stun:115.28.186.199:3478"],
            username: "user1",
            credential: "wex12345",
          },
        ],
      };
      const pc = new RTCPeerConnection(config);

      let pData = JSON.stringify({
        name: suuid,
        stream: { url: rtsp },
      });
      let addUrlRes = await wbrtcAddUrl(pData, apiurl); //添加地址
      console.log("addUrlRes----", addUrlRes);
      if (!addUrlRes || addUrlRes.statue != "success") {
        console.log("wbrtcAddUrl---注册失败", addUrlRes);
        let videoTxt = document.querySelector("." + videoId + "_videoTxt");
        if (videoTxt) {
          videoTxt.innerText = "媒体资源无法注册";
        }
        return;
      }
      let codecRes = await wbrtcCodec({ suuid: suuid }, apiurl); //获取类型
      if (Object.prototype.toString.call(codecRes) === "[object Array]") {
        // let data = JSON.parse(codecRes);
        let data = codecRes;
        console.log("codecRes----", data);
        data.forEach((item, inx) => {
          pc.addTransceiver(item.Type, {
            direction: "sendrecv",
          });
        });
      } else if (codecRes.statue != "success") {
        console.log("codecRes---获取编码信息失败", codecRes);
        let videoTxt = document.querySelector("." + videoId + "_videoTxt");
        if (videoTxt) {
          videoTxt.innerText = "编码信息失败媒体资源不可用";
        }
        return;
      }
      // if(!)
      pc.onnegotiationneeded = async function handleNegotiationNeededEvent() {
        //进入执行方法
        console.log("onnegotiationneeded");
        let offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        // setTimeout(()=>{

        let ReceiverRes = await wbrtcReceiver(
          { suuid: suuid, data: btoa(pc.localDescription.sdp) },
          apiurl
        ); //获取流
        // let sdpStr = decodeURIComponent(escape(atob(ReceiverRes)))
        /* pc.setRemoteDescription(new RTCSessionDescription({
                type: 'answer',
                 sdp: atob(ReceiverRes)
              }))*/
        pc.setRemoteDescription(
          new RTCSessionDescription({
            type: "answer",
            sdp: atob(ReceiverRes),
          })
        )
          .then((data) => {
            console.log();
          })
          .catch((err) => {
            let videoTxt = document.querySelector("." + videoId + "_videoTxt");
            if (videoTxt) {
              videoTxt.innerText = "无法建立稳定连接或设备不支持";
            }
            return;
          });
        let video = document.getElementById(videoId); //找到播放的video
        // let stream = new MediaStream();
        pc.ontrack = function (event) {
          //添加视频流
          stream.addTrack(event.track);
          video.srcObject = stream;
        };
        setTimeout(() => {
          video.play();
        }, 200);
        that.RTCP = pc;
      };
    },
    stop(id) {
      //video暂停
      let video = document.getElementById(id);
      video.pause();
    },
    play(id) {
      //播放
      console.log("play");
      let video = document.getElementById(id);
      video.play();
    },
    videoplay(event) {
      console.log("开始播放");
    },
    loadedmetadata(evn) {
      console.log("加载完成---》", evn.target);
      let dome = evn.target;
      dome.play();
    },
    error(data) {
      console.log("error--->", data);
    },
    async clear(rtsp, id) {
      //清除流
      // let apiurl= this.testData.url;
      let item = this.aryFiler(this.uuidList, id, "key");
      // let suuid= item.uuid;
      if (id) {
        document.querySelector("#" + id + "").srcObj = null;
        document.querySelector("#" + id + "").src = null;
      }
    },
  },
  watch: {
    item: {
      handler(val, ndata) {
        if (val.playUrl) {
          let playUrl = _.clone(val.playUrl);
          console.log("handler--->", val.playUrl);
          this.$nextTick(() => {
            let video = document.querySelector("#" + val.videoId + "");

            if (video.playing) {
              video.pause();
            }
            this.playWebrtc(playUrl, val.videoId);
          });
        }
      },
      immediate: true,
      deep: true,
    },
  },
  computed: {},
  mounted() {
    let uuid = nanoid(6);
  },
  created() {},
  destroyed() {
    this.clear(this.item.playUrl, this.item.videoId);
  },
};
</script>
<style >
video::-webkit-media-controls.sizing-small
  div[pseudo="-webkit-media-controls-panel" i] {
  display: none;
}
video::-webkit-media-controls-panel {
  display: none;
}
</style>
<style lang='scss' scoped>
.webrtcPage {
  width: 100%;
  height: 100%;
  video {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
}
</style>