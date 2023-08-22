import request from '../index'

// 企业分布
export const getQyfb = () => request.post("/home/qyfb", {})

// 融合通讯
export const getRhtx = () => request.post("/home/rhtx", {})

// 视频监控
export const getSpjk = () => request.post("/home/spjk", {})

// 灾情区域分析
export const getZqqxfx = () => request.post("/home/zqqyfx", {})