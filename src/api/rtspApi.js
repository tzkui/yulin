import axios from 'axios'

// const rtcUrl = "http://192.168.1.172:8078"
const rtcUrl = window.baseWebrtcUrl
const wsUrl = "http://10.112.143.192:1000"

const getFormData = function(data){
  let formData = new FormData();
  for(let key in data){
    formData.append(key,data[key])
  }
  return formData
}
export const wbrtcAddUrl=(data,apiUrl)=>axios({
  url:(apiUrl?apiUrl:rtcUrl)+"/stream/addUrl",
  data:data,
  method:"post",
  urltype:"webrtc",
});
export const wbrtcReceiver=(data,apiUrl)=>axios({//视频转码播放
  url:(apiUrl?apiUrl:rtcUrl)+"/stream/receiver/"+data.suuid || '',
  data:getFormData(data),
  method:"post",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  urltype:"webrtc",
});

export const wbrtcCodec=(data,apiUrl)=>axios({//获取设备编码信息
  url:(apiUrl?apiUrl:rtcUrl)+"/stream/codec/"+data.suuid || '',
  data:'',
  method:"get",
  urltype:"webrtc",
});

export const wbrtc256pull =(data,apiUrl)=>axios({//获取设备编码信息
  url:(apiUrl?apiUrl:rtcUrl)+`/api/rtsp/pull?target=${data.rtsp}&streamPath=stream/t${data.videoId}`,
  // data:data,
  method:"get",
  urltype:"webrtc",
});

export const getH256WsUrl = ()=>{//获取拼接后的ws
  let apiUrl= rtcUrl.replace("http://","");
  return `ws://${apiUrl}/wexplayer/stream/t`
}