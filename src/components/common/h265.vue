<!-- h256播放 -->
<template>
  <div class='h256'>
    <div class="playBox" :id="videoId"></div>
    <div class="" @click="destroy">注销</div>
  </div>
</template>

<script>
import WexDemoPlayer from '../h265/WexDemoPlayer.js'
import{wbrtc256pull,getH256WsUrl}from '@/api/modules/webRtcApi.js'
export default {
  data () {
    return {
      videoConfig:{
        showBand:true,//网速显示
        fullscreen:true,
        screenshot:true,
        play:true,//播放暂停
        audio:true,//声音调整
        useMSE:false
      },
      playList:{},
      videoId: "p65",
      playUrl: 'rtsp://admin:w12345678@192.168.3.244:554'
    };
  },

  props:{
    // item: {
    //   type: Object,
    //   default: () => {
    //     return {
    //       videoId: "p23",
    //       playUrl: 'rtsp://admin:w12345678@192.168.3.242:554'
    //     }
    //   }
    // }
  },
  components: {},
  filter:{},
  methods: {
    initPlayer(rtsp,id){
      console.log(rtsp,id)
      let that = this;
      let dome = document.getElementById(id)
      let doceUrl = new URL('./h265/decoder-pro.js',import.meta.url).href;
      let wexDemoPlayer = new WexDemoPlayer({
                container: dome,
                decoder: doceUrl,
                videoBuffer: 0.2, // 缓存时长
                isResize: false,
                text: "文字",
                loadingText: "加载中",
                debug: false,
                showBandwidth: that.videoConfig.showBand, // 显示网速
                operateBtns: {
                    fullscreen: that.videoConfig.fullscreen,
                    screenshot: that.videoConfig.screenshot,
                    play: that.videoConfig.play,
                    audio: that.videoConfig.audio,
                },
                useMSE: that.videoConfig.useMSE,
                watermarkConfig: {
                    text: {
                        content: ''
                    },
                    right: 10,
                    top: 10
                },
        });

        wexDemoPlayer.onLog = msg => console.error(msg);
        wexDemoPlayer.onRecord = (status) => console.log('onRecord', status);
        wexDemoPlayer.onPause = () => console.log('onPause');
        wexDemoPlayer.onPlay = () => console.log('onPlay');
        wexDemoPlayer.onMute = msg => console.log('onMute', msg);
        wexDemoPlayer.on("fullscreen", function (flag) {
            console.log('is fullscreen', id, flag)
        })
       
        this.playList[id]= wexDemoPlayer;
        this.pullRtsp({'rtsp':rtsp,'videoId':id})
    },
    async pullRtsp(data){
      let res = await wbrtc256pull(data)
      if(res && res.code === 0){
        let url = getH256WsUrl()+data.videoId
        console.log('url-->',url)
        let player = this.playList[data.videoId]
        setTimeout(()=>{
          player.play(url).then((data)=>{
            console.log('then-->',data)
          }).catch((err)=>{
            console.log('播放错误')
            console.log(err)
          })
        },100)
      }else{
        console.log("编码错误--->",res.msg)
      }
    },
    destroy(){
      let player = this.playList[this.videoId];
      player.destroy()
      document.querySelector("#"+this.videoId+"").remove();
      
    }
  },
  watch:{},
  computed: {},
  mounted(){
   
   this.$nextTick(()=>{
    this.initPlayer(this.playUrl,this.videoId)
   })
  },
  created(){},
  destroyed(){}
}

</script>
<style lang='scss' scoped>
.h256{
  width: 100%;
  height:100%;
  // border: 1px #eee solid;
  .playBox{
    width: 100%;
    height: 100%;
    background: rgba(13, 14, 27, 0.7);
  }
}
</style>