let doceProUrl = "decoder-pro.js"; // 项目中decoder-pro.js 的相对路径
let videoConfig = {
  showBand: true, //网速显示
  fullscreen: true, //是否展示全屏按钮
  screenshot: true,
  play: true, //播放暂停按钮
  audio: true, //静音小喇叭
  useMSE: false, //是否使用mse
};
let play265Obj = {}; //播放器集合
let serveUrl = "http://xxxx:8081"; //服务地址根据部署的实际情况来
let inith265 = (rtsp, id) => {
  let dome = document.getElementById(id);
  let doceUrl = doceProUrl;
  let wexDemoPlayer = new WexDemoPlayer({
    container: dome,
    decoder: doceUrl,
    videoBuffer: 0.2, // 缓存时长
    isResize: false,
    text: "文字", //监控中的文字
    loadingText: "加载中",
    debug: false,
    showBandwidth: videoConfig.showBand, // 显示网速
    operateBtns: {
      fullscreen: videoConfig.fullscreen, //全屏按钮
      screenshot: videoConfig.screenshot, //
      play: videoConfig.play, //播放按钮
      audio: videoConfig.audio, //音频按钮
    },
    useMSE: videoConfig.useMSE, //是否使用mse
    watermarkConfig: {
      text: {
        content: "我是头部文字",
      },
      right: 10,
      top: 10,
    },
  });
  wexDemoPlayer.onLog = (msg) => console.error(msg);
  wexDemoPlayer.onRecord = (status) => console.log("onRecord", status);
  wexDemoPlayer.onPause = () => console.log("onPause");
  wexDemoPlayer.onPlay = () => console.log("onPlay");
  wexDemoPlayer.onMute = (msg) => console.log("onMute", msg);
  wexDemoPlayer.on("fullscreen", function (flag) {});
  play265Obj[id] = wexDemoPlayer;
  pullRtsp(serveUrl, { rtsp: rtsp, videoId: id });
};
let wbrtc256pull = (url, parames) => {
  let rtspAry = parames.rtsp.split(".");
  let rtspId = rtspAry[rtspAry.length - 1];
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest() || new ActiveXObject("Microsoft.XMLHTTP");
    xhr.timeout = 1000 * 30;
    let pUrl =
      url + `/api/rtsp/pull?target=${escape(parames.rtsp)}&streamPath=stream/`;
    xhr.open("get", pUrl);
    xhr.send(null);
    xhr.onerror = function () {
      console.log("请求失败");
      reject();
    };
    xhr.onprogress = function () {
      console.log("上传中...");
    };
    xhr.ontimeout = function () {
      reject();
      console.log("请求超时");
    };
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status == "200") {
        resolve(xhr.responseText);
      }
    };
  });
};
let pullRtsp = async (url, data) => {
  let res = await wbrtc256pull(url, data);
  let pUrl = url.replaceAll("http", "ws");
  let rtspAry = data.rtsp.split(".");
  let rtspId = rtspAry[rtspAry.length - 1];
  pUrl = pUrl + "/wexplayer/stream/t" + rtspId;
  let player = play265Obj[data.videoId];
  setTimeout(() => {
    player
      .play(pUrl)
      .then((data) => {
        console.log("then-->", data);
      })
      .catch((err) => {
        console.log("播放错误");
        console.log(err);
      });
  }, 100);
};
