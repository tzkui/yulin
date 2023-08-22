import request from '../index';

// 获取通讯录跟节点
export const getOrgRoot = () => request.post("/home/masterNode");

// 获取通讯录
export const getOrgById = (data) => request.postForm("/home/childNodes",data);