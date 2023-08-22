import request from "@/utils/request";
export default {
  post (url, params = {}) {
    return request({
      url: url,
      method: "post",
      params
    });
  },
  get (url, params) {
    return request({
      url: url,
      method: "get",
      params
    });
  },
  delete (url, params) {
    return request({
      url: url,
      method: "delete",
      params
    });
  },
  put (url, params) {
    return request({
      url: url,
      method: "put",
      params
    });
  },
  upload (url, params) {
    return request({
      url: url,
      method: "upload",
      params
    });
  },
  postForm (url, params = {}) {
    let formData = new FormData();
    for(let key in params){
      formData.append(key,params[key])
    }
    return request({
      url: url,
      method: "post",
      params: formData
    });
  },
}