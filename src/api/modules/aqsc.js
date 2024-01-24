import request from '../index'


// 获取事故等级分析
export const getSgdjfx = data => request.post(`/aqsc/sgdjfx?type=${data}`)

// 获取事故类型分析
export const getSglxfx = data => request.post(`/aqsc/sglxfx?type=${data}`)

// 获取危化企业监测预警
export const getWhqyjcyj = data => request.post("/aqsc/whqyjcyj", data)

// 获取辖区企业统计分析
export const getXqqytjfx = data => request.post("/aqsc/xqqytjfx", data)

// 获取预警信息统计分析
export const getYjxxtjfx = data => request.post("/aqsc/yjxxtjfx?type="+data.type, {})

// 获取重点地点视频监控
export const getZdddspjk = data => request.post("/aqsc/zdddspjk", data)

// 获取错测选择框的数据
export const getDtsd = data => request.post("/aqsc/dtsd", data)

