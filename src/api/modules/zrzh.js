import request from "../index";

// 获取值班信息
export const getZbxx = (data) => request.post("/zrzh/zbxx", data);

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
