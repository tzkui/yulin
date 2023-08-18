<!-- 监控播放m3u8格式 -->
<template>
  <div class='m3u8page' 
        v-loading="isLoading"
        el-loading-spinner="el-icon-loading"
        element-loading-text="正在加载中...">
    <video :id="myItem.videoId" class="video-js" muted="muted" controls preload="none"
      poster=""
      :options="options" style="width:100%;height:100%;object-fit:fill">
      <source :src="myItem.playUrl" type="application/x-mpegURL" />
    </video>
  </div>
</template>

<script>
import Videojs from "video.js"; // 引入Videojs
export default {
  data () {
    return {
      isLoading:false,
      options: {
        autoplay: true, // 设置自动播放
        controls: true, // 显示播放的控件
        loop: true,//是否循环播放
        fluid: true,//画布自适应
      },
      myPlyer: null,
      myItem: this.item
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
  filter: {},
  methods: {
    initVideo (vid, ops) {
      console.log(vid, ops);
      console.log(this.item.playerUrl);
      let that = this;
      this.myPlyer = Videojs(
        vid,
        ops,
        function onPlayerReady () {
          this.on('ended', function () {
            console.log('播放结束---')
            that.isLoading = false
          });
          this.on("error", function(){
            that.$message({
                message: '加载错误',
                type: 'warning'
              });
            console.log("加载错误")
            that.isLoading = false
            // that.repeat(that.item.playerUrl);
          });
          this.on("stalled",function(){
              console.log("网速异常");
               that.isLoading = false
               that.$message({
                message: '网速异常',
                type: 'warning'
              });
              // that.repeat();
          })
          this.on("waiting", function(){
              console.log("等待数据")
              that.isLoading = true
          });
          this.on("canplaythrough",function(){
            console.log("视频源数据加载完成")
            that.isLoading = false
          })
          this.on("play", function(){
            console.log("视频开始播放")
            that.isLoading = false
          });
        }
      );
      this.$emit('commitmyPlyer', { centent: this.myPlyer, id: this.item.videoId })
    },
    repeat(playUrl){
      if(this.myPlyer && playUrl){
        this.myPlyer.reset();
        this.myPlyer.src(playUrl);
      }else{
        this.initVideo(this.myItem.videoId, this.options)
      }
    }
  },
  watch: {
    item: {
      handler (ndata, oData) {
        if (this.myPlyer) {
          this.myPlyer.pause();
        }
        if (ndata && ndata.playUrl && this.myPlyer) {
          this.myPlyer.reset();
          this.myPlyer.src(ndata.playUrl);
          this.myPlyer.play();
        }
      },
      deep: true
    }
  },
  computed: {},
  mounted () {
    this.initVideo(this.myItem.videoId, this.options)
  },
  created () {
  },
  beforeDestroy () {
    if (this.myPlyer) {
      this.myPlyer.dispose();
    }
    this.myItem = {
      videoId: "",
      playUrl: ''
    }
  },
  destroyed () {

  }
}

</script>
<style lang='scss' scoped>
.m3u8page {
  width: 100%;
  height: 100%;
  position: relative;

  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%
  }
}
</style>