<template>
  <transition name="fade">
    <div ref="fullScreen" class="videoLayoutMain">
      <div class="moreTitle">
        <template v-if="$slots.moreMonitorTitle">
          <slot name="moreMonitorTitle"></slot>
        </template>
        <template v-else>
          <span>监控查看</span>
          <span class="moreclose" @click="closeMoreDia"
            ><img src="../../assets/layout/call_close.png" alt=""
          /></span>
        </template>
      </div>
      <!-- :style="gridBoxStyle" :class="videoHasMax?'hasMaxBox':''" -->
      <div class="videoLayoutMain-content" id="listBox">
        <!-- <div class="videoList" :row="i" :id="'wap'+item.videoId" v-for="(item, i) in videoData" :key="i">
            <div class="toolbar" @click="barClick(item,i)">
              <span class="name">{{item.name}}</span>
              <span class="btngroup">
                <span class="btn close" @click.stop="videoClose(item,i)">关闭</span>
              </span>
              <div class="videoDiv" v-if="item.playUrl">
                <webrtcPlay :item="item" ref="webrtcPlayDom"></webrtcPlay>
              </div>
            </div>
          </div> -->
      </div>
      <webrtcPlay v-show="false" :item="{}" ref="webrtcPlayDom"></webrtcPlay>
      <h265Play v-show="false" ref="h265PlayDom"></h265Play>
      <div class="videoLayoutMain-btnGroup">
        <span
          class="btn"
          v-for="(item, i) in layoutList"
          :key="i"
          @click="layoutClick(item)"
        >
          <img :src="imgefileUrl('../../assets/layout/' + item.url + '.png')" />
          <!-- {{item.num}} -->
        </span>
      </div>
    </div>
  </transition>
</template>
<script>
import webrtcPlay from "./webRtc.vue";
import h265Play from "./h265.vue";
import {nanoid} from 'nanoid';
// import {getAssetsFile} from '../../until/index.js'
export default {
  props: {
    // videoList: {
    //     type: Array,
    //     default: [],
    // }
  },
  name: "moreAuto",
  data() {
    return {
      delData: {},
      layoutList: [
        {
          url: "fenp1",
          num: "1",
        },
        {
          url: "fenp2",
          num: "2",
        },
        {
          url: "fenp4",
          num: "4",
        },
        {
          url: "fenp6",
          num: "6",
        },
        {
          url: "fenp8",
          num: "8",
        },
        {
          url: "fenp9",
          num: "9",
        },
        {
          url: "fenp10",
          num: "10",
        },
        {
          url: "fenp16",
          num: "16",
        },
      ],
    };
  },
  components: {
    webrtcPlay,
    h265Play,
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    imgefileUrl(url) {
      return new URL(url, import.meta.url).href;
    },
    binarySearch(ary, num) {
      var left = 0;
      var right = ary.length;
      while (left <= right) {
        var center = Math.floor((left + right) / 2);
        if (num < this[center]) {
          right = center - 1;
        } else {
          left = center + 1;
        }
      }
      return right;
    },
    toggleFullScreen() {
      if (document.fullscreenElement) {
        console.log("退出全屏");
        document.exitFullscreen();
      } else {
        const elem = this.$refs.fullScreen;
        console.log(elem);
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) {
          elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
          elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
          elem.msRequestFullscreen();
        } else {
          console.log("Fullscreen API is not supported.");
        }
      }
    },
    changeBoxNumber(n) {},
    getAssetsFile(url) {
      //图片路径
      return getAssetsFile(url);
    },
    closeMoreDia() {
      //关闭弹窗
      let isvideo = document.querySelectorAll(".isvideo");
      console.log(isvideo);
      isvideo.forEach((dome, inx) => {
        let wapdome = document.querySelector("#wap" + dome.id + "");
        console.log(wapdome);
        if (wapdome) {
          wapdome.remove();
        }
      });
      let nlen = document.querySelectorAll(".videoList").length;
      this.boxLeng(nlen);
      this.$emit("closeAll");
      this.delData = {};
    },
    barClick(len, fdomeId, ldomeId) {
      //监控点击切换主屏
      // let len =document.querySelectorAll('.videoList').length;
      // if(len<5){
      //   this.$message('无主屏,不进行切换');
      //   return
      // }
      let fDom = document.querySelector("#" + fdomeId + "");
      let lDom = document.querySelector("#" + ldomeId);
      if (!fDom || !lDom) {
        this.$message("无法获取到视频流，不能进行切换");
        return;
      }
      console.log(fDom.srcObject, lDom.srcObject);
      if (!fDom.srcObject || !lDom.srcObject) {
        this.$message("无法获取到视频流，不能进行切换");
        return;
      }
      this.fristStream = fDom.srcObject;
      this.clickStream = lDom.srcObject;
      fDom.srcObject = null;
      lDom.srcObject = null;
      fDom.srcObject = this.clickStream;
      lDom.srcObject = this.fristStream;
      lDom.play();
      fDom.play();
    },
    boxLeng(len, checkName) {
      //盒子长度用来做排版处理
      let num = Math.ceil(Math.sqrt(len)); //取平方再向上取整
      let fr = [];
      for (let i = 0; i < num; i++) {
        fr.push("1fr");
      }
      if (len > 4) {
        listBox.classList.add("hasMaxBox");
      } else {
        listBox.classList.remove("hasMaxBox");
      }
      listBox.style = "grid-template-columns:" + fr.join(" ") + "";
      if (checkName) {
        listBox.classList.remove("hasMaxBox");
        listBox.classList = checkName;
      }
    },
    addH265(videoId, rtsp, name) {
      //添加h265
      console.log("addH265--->", videoId, rtsp, name);
      let that = this;
      let str = `<div class="videoList" id=wap${videoId}>
            <div class="toolbar">
              <span class="name">${name}</span>
              <span class="btngroup">
                <span class="btn close" data-item=${videoId} onclick=videoClose(${videoId})>注销</span>
              </span>
              <div class="videoDiv" id=${videoId} controls muted crossOrigin=anonymous onclick=videoClick(${videoId})>
              </div>
            </div>
            <div class='${videoId + "_videoLoading"} videoLoading'>
              <span class='loadingIocn'></span>
              <div class=${videoId + "_videoTxt"}>正在加载中...</div>
            </div>
          </div>`;
      let listBox = document.getElementById("listBox");
      listBox.insertAdjacentHTML("beforeend", str);
      let len = document.querySelectorAll(".videoList").length;
      console.log("len-->", len);
      this.boxLeng(len);
      window["videoClose"] = function (data) {
        document.querySelector("#wap" + data.id + "").remove();
        let nlen = document.querySelectorAll(".videoList").length;
        console.log("nlen-->", nlen);
        that.boxLeng(nlen);
        console.log("delObj-->", that.delData);
        that.$emit("singleClose", that.delData[data.id]);
        delete that.delData[data.id];
      };
      this.$refs.h265PlayDom.initPlayer(rtsp, videoId);
      let videoDemo = document.getElementById(videoId);
      this.videoDomeAddEvent(videoDemo);
    },
    addH264(videoId, rtsp, name) {
      //添加h264
      console.log("addH264--->", videoId, rtsp, name);
      let that = this;
      let str = `<div class="videoList" id=wap${videoId}>
            <div class="toolbar">
              <span class="name">${name}</span>
              <span class="btngroup">
                <span class="btn close" data-item=${videoId} onclick=videoClose(${videoId})>关闭</span>
              </span>
              <div class="videoDiv" controls muted crossOrigin=anonymous onclick=videoClick(${videoId})>
               <video class=isvideo id=${videoId}></video>
              </div>
            </div>
            <div class='${videoId + "_videoLoading"} videoLoading'>
              <span class='loadingIocn'></span>
              <div class=${videoId + "_videoTxt"}>正在加载中...</div>
            </div>
          </div>`;
      let listBox = document.getElementById("listBox");
      listBox.insertAdjacentHTML("beforeend", str);
      let len = document.querySelectorAll(".videoList").length;
      console.log("len-->", len);
      this.boxLeng(len);

      this.delData[videoId] = {
        videoId: videoId,
        rtsp: rtsp,
        name: name,
      };
      window["videoClose"] = function (data) {
        document.querySelector("#wap" + data.id + "").remove();
        let nlen = document.querySelectorAll(".videoList").length;
        console.log("nlen-->", nlen);
        that.boxLeng(nlen);
        console.log("delObj-->", that.delData);
        that.$emit("singleClose", that.delData[data.id]);
        delete that.delData[data.id];
      };
      window["videoClick"] = function (data) {
        console.log("videoClick--->");
        let allList = document.querySelectorAll(".videoList");
        console.log(allList);
        that.barClick(
          allList.length,
          allList[0].id.replace("wap", ""),
          data.id
        );
      };
      let uuid = nanoid(6); //生成6位数的编码
      console.log(this.$refs.webrtcPlayDom);
      this.$refs.webrtcPlayDom.webRtcPlay(uuid, rtsp, videoId);
      let videoDemo = document.getElementById(videoId);
      this.videoDomeAddEvent(videoDemo);
    },
    videoDomeAddEvent(videoDemo) {
      videoDemo.addEventListener("loadstart", function (e) {
        let vIid = e.target.id;
        console.log(vIid);
        let load = document.querySelector("." + vIid + "_videoLoading");
        console.log(load);

        load.style.display = "block";
        console.log("loadstart-->", e);
      });
      videoDemo.addEventListener("canplay", function (e) {
        //开始播放
        console.log("canplay-->", e);
        let vIid = e.target.id;
        let load = document.querySelector("." + vIid + "_videoLoading");
        load.style.display = "none";
      });
      videoDemo.addEventListener("play", function (e) {
        //开始播放
        console.log("play-->", e);
        let vIid = e.target.id;
        let load = document.querySelector("." + vIid + "_videoLoading");
        // load.style.display='none';
      });
      videoDemo.addEventListener("loadedmetadata", function (e) {
        //加载完成
        let vIid = e.target.id;
        let load = document.querySelector("." + vIid + "_videoLoading");
        console.log("loadedmetadata-->", e);
        // load.style.display='none';
      });
      videoDemo.addEventListener("waiting", function (e) {
        //视频加载等待
        console.log("waiting-->", e);
        let vIid = e.target.id;
        let load = document.querySelector("." + vIid + "_videoLoading");
      });
      videoDemo.addEventListener("error", function (e) {
        //播放错误
        console.log("error-->", e);
        let vIid = e.target.id;
        let load = document.querySelector("." + vIid + "_videoLoading");
        let videoTxt = document.querySelector("." + vIid + "_videoTxt");
        videoTxt.innerText = "加载错误...";
      });
      videoDemo.addEventListener("stalled", function (e) {
        //媒体数据不可用
        console.log("stalled-->", e);
        let vIid = e.target.id;
        let load = document.querySelector("." + vIid + "_videoLoading");
        let videoTxt = document.querySelector("." + vIid + "_videoTxt");
        videoTxt.innerText = "媒体资源不可用";
      });
    },
    addVideo(videoId, rtsp, name, type) {
      if (type == "h265") {
        this.addH265(videoId, rtsp, name);
      } else {
        this.addH264(videoId, rtsp, name);
      }
    },
    delVideo(data) {
      //单个删除
      let that = this;
      console.log(
        data.videoId,
        document.querySelector("#wap" + data.videoId + "")
      );
      if (!document.querySelector("#wap" + data.videoId + "")) return;
      document.querySelector("#wap" + data.videoId + "").remove();
      let nlen = document.querySelectorAll(".videoList").length;
      console.log("nlen-->", nlen);
      this.boxLeng(nlen);
      console.log("delObj-->", that.delData);
      delete that.delData[data.id];
    },
    layoutClick(data) {
      //布局切换
      console.log(data);
      this.boxLeng(data.num, "checkClass_" + data.num);
    },
  },
  beforeDestroy() {
    // let isDel= this.delData;
    // Object.keys(isDel).forEach((item,inx)=>{
    //   let dem= document.querySelector("#"+isDel[item].videoId+"");
    //   dem.removeEventListener('loadstart',function(){},false);
    //   dem.removeEventListener('play',function(){},false)
    //   dem.removeEventListener('loadedmetadata',function(){},false)
    //   dem.removeEventListener('waiting',function(){},false)
    //   dem.removeEventListener('error',function(){},false)
    //   dem.removeEventListener('stalled',function(){},false)
    // })
  },
};
</script>
<!-- scoped -->
<style lang="less">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.videoLayoutMain {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  .moreTitle {
    height: 46px;
    background: #1a2133;
    color: rgba(25, 209, 244, 0.8);
    margin-bottom: 1px;
    // border-bottom: 1px #fff solid;
    line-height: 46px;
    box-sizing: border-box;
    padding: 0 10px;
    padding-right: 50px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    letter-spacing: 2px;
    font-size: 17px;
    font-weight: 600;
    position: relative;
    .moreclose {
      position: absolute;
      width: 40px;
      height: 40px;
      // border: 1px #fff solid;
      right: 0px;
      top: 1px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 50%;
      }
    }
  }
  .videoLayoutMain-content {
    flex: 1;
    // height: 300px;
    display: grid;
    grid-gap: 1px;
    overflow: auto;
    height: calc(100% - 48px);
    background-color: rgba(0, 0, 0, 0.8);
    // border: 1px red solid;
    .toolbar {
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;
      .name {
        font-size: 15px;
        color: #d6e7ff;
        position: absolute;
        top: 0px;
        padding: 10px;
        width: 100%;
        z-index: 4;
        left: 0px;
        text-align: left;
        box-sizing: border-box;
        padding: 5px;
      }
      .btngroup {
        position: absolute;
        bottom: 0px;
        padding: 10px;
        width: 100%;
        z-index: 4;
        font-size: 15px;
        color: #d6e7ff;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        .btn {
          // border: 1px #eee solid;
          padding: 8px 20px;
          padding-top: 12px;
          letter-spacing: 1px;
          margin: 0 5px;
          border-radius: 4px;
          background-image: url("@/assets/layout/mailBtnBg.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
      }
      .videoDiv {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0px;
        z-index: 3;
        video {
          width: 100%;
          height: 100%;
          object-fit: fill;
        }
      }
    }
    .videoList {
      width: 100%;
      height: 100%;
      // min-height: 200px;
      box-sizing: border-box;
      background: #1a2133;
      overflow: hidden;
      position: relative;
      font-size: 16px;
      color: rgba(25, 209, 244, 0.8);
      text-align: center;
      .videoLoading {
        position: absolute;
        width: 300px;
        height: 300px;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        z-index: 10;
        @-webkit-keyframes rotation {
          from {
            -webkit-transform: rotate(0deg);
          }
          to {
            -webkit-transform: rotate(360deg);
          }
        }
        .loadingIocn {
          background-image: url("@/assets/layout/loading.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          background-position: center;
          width: 30px;
          height: 30px;
          display: inline-block;
          margin-bottom: 10px;
          animation: rotation 3s linear infinite;
          -moz-animation: rotation 3s linear infinite;
          -webkit-animation: rotation 3s linear infinite;
          -o-animation: rotation 3s linear infinite;
        }
      }
    }
  }
  .hasMaxBox {
    .videoList:first-child {
      grid-column-start: 1;
      grid-column-end: 3;
      grid-row-start: 1;
      grid-row-end: 3;
    }
  }
  .videoLayoutMain-btnGroup {
    width: 100%;
    height: 54px;
    display: flex;
    padding: 0 16px;
    box-sizing: border-box;
    align-items: center;

    .btn {
      width: 38px;
      height: 38px;
      background: #002979;
      border-radius: 50%;
      border: 1px solid #002051;
      margin-right: 24px;
      position: relative;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 50%;
      }
    }
  }
}
</style>
