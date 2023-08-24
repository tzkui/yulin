import axios from "axios";
import Cookies from "js-cookie";
import { ElMessage, ElMessageBox } from "element-plus";
import { login } from "@/api/modules/login";
// const requetUrl = process.env.NODE_ENV === 'development' ? process.env.VUE_APP_API_DEV_URL : process.env.VUE_APP_API_DEV_WRITE;
const requetUrl = window.baseRequestUrl;
let instance = axios.create({
  baseURL: requetUrl,
  // timeout: 15000
});
instance.interceptors.request.use((config) => {
  const questStatus = config.method;
  config.params = config.params ? config.params : {};
  const access_token = sessionStorage.getItem("token");
  if (access_token) {
    config.headers["Authorization"] = "Bearer " + access_token;
  }
  switch (questStatus) {
    case "get": {
      break;
    }
    case "post": {
      config.data = config.params;
      delete config.params;
      break;
    }
    case "upload": {
      config.data = config.params;
      break;
    }
    case "put": {
      break;
    }
    case "delete": {
      break;
    }
    default: {
      return config;
    }
  }
  return config;
});
// 防止同时调用多个接口时调用多次自动登录
let timer = null;
instance.interceptors.response.use(
  (response) => {
    if (response.data === "") return;
    const res = response.data;
    if (
      response.status === 200 &&
      (res.code === 200 || res.errCode === 200 || res.code === 0)
    ) {
      return res;
    } else {
      if (res.code === 401) {
        // ElMessageBox.confirm('认证失效请重新登录', {
        //   confirmButtonText: '重新登录',
        //   type: 'warning',
        //   showCancelButton: false
        // }).then(() => {
        //   Cookies.remove('GH_TOKEN');
        //   location.reload();
        // });
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          login().then((res) => {
            sessionStorage.setItem("token", res.data.password);
            // window.location.reload()
          });
        }, 50);
      } else {
        // ElMessage({
        //   message: res.msg,
        //   type: 'error',
        //   duration: 1500
        // });
        return Promise.reject(res);
      }
    }
  },
  (error) => {
    if (error.response.status === 405) {
      ElMessage({
        message: "接口类型错误",
        type: "error",
        duration: 1500,
      });
    } else if (error.response.status === 400) {
      ElMessage({
        message: "接口参数错误",
        type: "error",
        duration: 1500,
      });
    } else if (error.response.status === 404) {
      ElMessage({
        message: `${error.response.data.path} 接口不存在`,
        type: "error",
        duration: 1500,
      });
    } else if (error.response.status === 500) {
      ElMessage({
        message: "服务器错误",
        type: "error",
        duration: 1500,
      });
    } else {
      ElMessage({
        message: "网络错误",
        type: "error",
        duration: 1500,
      });
    }
    return Promise.reject(error);
  }
);

export default instance;
