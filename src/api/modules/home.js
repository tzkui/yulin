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