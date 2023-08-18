/*
 * @Author: emma
 * @Date: 2023-06-05 13:51:24
 * @LastEditors: emma
 * @LastEditTime: 2023-06-14 14:10:48
 * @Description: 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import axios from "axios";
// import qs from 'qs';

const instance = axios.create({
  baseURL: "",
  timeout: 5000,
});
let typeConfig = (url, type) => {//适配不同类型的接口地址
  switch (type) {
    case 'api':
      return type + url
    case 'webrtc':
      return url
    default:
      return url
  }
}
let headerConfig = (type) => {
  switch (type) {
    case '':
      break;
  }
}
// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    /**
     * 在这里一般会携带前台的参数发送给后台，比如下面这段代码：
     * const token = getToken()
     * if (token) {
     *  config.headers.token = token
     * }
     */
    config.url = typeConfig(config.url, config.type)
    Object.assign(config.headers, { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    /**
     * 根据你的项目实际情况来对 response 和 error 做处理
     * 这里对 response 和 error 不做任何处理，直接返回
     */
    if (response.status === 200 || response.status === 0) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    const { response } = error;
    if (response && response.data) {
      return Promise.reject(error);
    }
    const { message } = error;
    console.error(message);
    return Promise.reject(error);
  }
);

/**
 * axios二次封装
 */
export const http = (Obj = { url, data, method, type }) => {
  Obj.method = Obj.method || "post" //没有传请求方式默认post 请求
  let parm = {};
  let Method = Obj.method.toLocaleLowerCase()//字符串转小写；
  if (Method == 'get' || Method == 'delete') {
    parm['params'] = Obj.data;
  } else {
    if (Obj.url.indexOf('addUrl') > -1 || Obj.url.indexOf('close') > -1) {
      parm['data'] = Obj.data;
    } else if (Obj.urltype === 'webrtc') {
      parm['data'] = qs.stringify(Obj.data);
    } else {
      parm['data'] = Obj.data;
    }

  };
  parm.url = Obj.url;
  parm.method = Method;
  parm.urltype = Obj.urltype
  return new Promise((resolve, reject) => {
    instance(parm).then((res) => {
      if (res) {
        resolve(res.data)
      } else {
        resolve()
      }

    }).catch((err) => {
      reject(err)
    })
  })
}
export default instance
