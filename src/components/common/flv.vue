<!-- flv格式播放 -->
<template>
  <div class='flvPage'>
    <video class="flvVideo" :id="item.videoId" muted="muted" controls></video>
    <div class="videoErr" v-if="imgError"></div>
  </div>
</template>

<script>
import flvjs from "flv.js";
export default {
  data () {
    return {
        flvPlayer:'',
        imgError: false,
    };
  },
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          videoId: "",
          playUrl: ''
        }
      }
    }
  },
  components: {},
  filter:{},
  methods: {
    init(source) {
        if (flvjs.isSupported()) {
            this.flvPlayer = flvjs.createPlayer(
            {
                type: "flv",
                url: source,
            },
            {
                enableWorker: false, //不启用分离线程
                enableStashBuffer: false, //关闭IO隐藏缓冲区
                reuseRedirectedURL: true, //重用301/302重定向url，用于随后的请求，如查找、重新连接等。
                autoCleanupSourceBuffer: true, //自动清除缓存
            }
            );
            let video = document.getElementById(this.item.videoId)
            this.flvPlayer.attachMediaElement(video);
            this.flvPlayer.load();
            this.flvPlayer.play();

            // 加载完成
            this.flvPlayer.on(flvjs.Events.LOADING_COMPLETE, () => {
                this.imgError = false;
            });

            // 加载失败
            this.flvPlayer.on(
                flvjs.Events.ERROR,
            () => {
                this.imgError = true;
            },
            (error) => {
                console.log(error);
            }
            );
        } else {
            this.imgError = true;
        }
    },
    detachMediaElement() {//销毁的时候清除
      this.flvPlayer.pause();
      this.flvPlayer.unload();
      this.flvPlayer.detachMediaElement();
      this.flvPlayer.destroy();
      this.flvPlayer = "";
      this.imgError = false
    },
  },
  watch:{
    'item':{
        handler (ndata, oData) {
            this.flvPlayer == "" ? "" : this.detachMediaElement();
            // 初始化
            this.init(ndata.playUrl);
      },
      deep:true,
      immediate:true
    }
  },
  computed: {},
  mounted(){
    // 页面加载完成后，初始化
    this.$nextTick(() => {
      this.init(this.item.playUrl);
    });
  },
  created(){},
  destroyed(){
    this.detachMediaElement();
  }
}

</script>
<style lang='scss' scoped>
.flvPage{
    width: 100%;
    height: 100%;
    position: relative;
    .flvVideo{
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 1;
    }
    .videoErr{
        position: absolute;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        z-index: 2;
    }
}
</style>