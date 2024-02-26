import request from "../index";

// 获取值班信息
export const getZbxx = (data) => {
  let str = ""
  if(data.sj){
    str = "?sj=" + data.sj
  }
  return request.post("/home/zbxx"+str, );
}

// 获取风险隐患信息
export const getFxyh = (data) => request.post("/zrzh/fxyh", data);

// 获取风险感知信息
export const getFxgz = (data) => request.post("/zrzh/fxgz", data);

// 获取事件信息
export const getSjxx = (data) => request.post("/zrzh/sjxx", data);

// 获取预警信息
export const getYjxx = (data) => request.post("/zrzh/yjxx", data);

// 获取应急资源信息
export const getYjzy = (data) => request.post("/zrzh/yjzy", data);

// 根据id获取事件信息
export const getEventInfoById = (id) => request.post("/zrzh/sjxq?id=" + id, {});


// 获取事件类型列表
export const getEventTypeList = () => request.post("/zrzh/type_tree?tag=1");


// 获取事件类型列表
export const eventVerify = (data) => request.postForm("/zrzh/event_verify",data);

// 补录
export const eventUpdata = (data) => request.postForm("/zrzh/event_update",data)

// 上传文件
export const uploadFile = (data) => request.postForm("/zrzh/eventfile_upload",data)

// 地震速报
export const getDzsb = (data) => request.post("/zrzh/dzsb",data)
