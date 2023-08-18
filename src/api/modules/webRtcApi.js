/*
 * @Author: emma
 * @Date: 2023-06-05 09:52:20
 * @LastEditors: emma
 * @LastEditTime: 2023-06-05 15:40:54
 * @Description: 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
//webrtc请求地址
// import {http} from './Axios';
import { http } from '@/utils/http';
let wrurl = "http://192.168.3.200:8078";   //import.meta.env.VITE_WSURL;
let wbrtcAddUrl=(data,apiUrl)=>http({
    url:(apiUrl?apiUrl:wrurl)+"/stream/addUrl",
    data:data,
    method:"post",
    urltype:"webrtc",
});
let wbrtcCheck=(data,apiUrl)=>http({//判断是否有流
    url:(apiUrl?apiUrl:wrurlurl)+"/stream/check/"+data.suuid || '',
    data:'',
    method:"get",
    urltype:"webrtc",
});
let wbrtcReceiver=(data,apiUrl)=>http({//视频转码播放
    url:(apiUrl?apiUrl:wrurl)+"/stream/receiver/"+data.suuid || '',
    data:data,
    method:"post",
    urltype:"webrtc",
});
let wbrtcCodec=(data,apiUrl)=>http({//获取设备编码信息
    url:(apiUrl?apiUrl:wrurl)+"/stream/codec/"+data.suuid || '',
    data:'',
    method:"get",
    urltype:"webrtc",
});
let wbrtcClose=(data,apiUrl)=>http({//获取设备编码信息
    url:(apiUrl?apiUrl:wrurl)+"/stream/close",
    data:data,
    method:"post",
    urltype:"webrtc",
});
let h256ApiUrl = 'http://192.168.3.200:8071/api'
let wbrtc256pull =(data,apiUrl)=>http({//获取设备编码信息
    url:(apiUrl?apiUrl:h256ApiUrl)+`/rtsp/pull?target=${escape(data.rtsp)}&streamPath=stream/t${data.videoId}`,
    // data:data,
    method:"get",
    urltype:"webrtc",
});
let getH256WsUrl = ()=>{//获取拼接后的ws
    let apiUrl= h256ApiUrl;
    if(h256ApiUrl.indexOf("api")){
        apiUrl= h256ApiUrl.replaceAll('http://','').replaceAll('api','')
    }
    return `ws://${apiUrl}wexplayer/stream/t`
}
export{
    wbrtcAddUrl,
    wbrtcReceiver,
    wbrtcCodec,
    wbrtcClose,
    wbrtc256pull,
    getH256WsUrl
}