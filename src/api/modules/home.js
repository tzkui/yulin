import request from '../index'

// 企业分布
export const getQyfb = () => request.post("/home/qyfb", {})

// 企业分布打点树形的一个数据
export const getQyfbTree = () => request.post("/home/qyfb_tree", {})

// 融合通讯
export const getRhtx = () => request.post("/home/rhtx", {})

// 视频监控
export const getSpjk = () => request.post("/home/spjk", {})

// 灾情区域分析
export const getZqqxfx = (sj,lx) => request.post(`/home/zqqyfx?sj=${sj}${lx?'&lx='+lx:''}`)

// 安全事故分析
export const getaqscsgfx = () => request.post("/home/aqscsgfx", {})

// 应急救援
export const getYjjy = () => request.post("/home/yjjy", {})

// 预警监测信息
export const getYjjcxx = () => request.post("/home/yjjcxx", {})

// 获取这个发布人员列表的数据
// export const getpersonalList = (data) => request.post("/home/personalList", {data})
export const getpersonalList = (page,limit,personalName) => request.post(`/home/personalList?page=${page}&limit=${limit}&personalName=${personalName}`)

// 获取应急机构
export const getYjjg = () => request.get("/home/yjjg",{})


// 获取事件信息
export const getSjxx = (data) => request.post("/home/sjxx", data);


// 获取资源分析列表
export const getZyfxList = (data) => request.post("/home/zyfx", data);

// 获取气象信息
export const getWeatherInfo = (data) => {
  console.log(data.startTime,data.endTime)
  return request.post("/home/qxyb?startTime="+data.startTime+"&endTime="+data.endTime,{});
} 

// 获取队伍详情
export const getTeamDetail = (id) => {
  return request.post("/home/dwxq?id="+id,{});
} 

// 获取仓库详情
export const getStorageDetail = (id) => {
  return request.post("/home/ckxq?id="+id,{});
} 

// 获取气象预警
export const getQxyj = () => {
  return request.post("/home/qxyj?startTime=2023-11-01",{});
}