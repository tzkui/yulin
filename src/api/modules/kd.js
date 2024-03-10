import axios from 'axios';

export function getDeviceTree(){
  return axios({
    url: "http://10.112.143.193/kiop-gateway-core/cdevice-manage/device/group/tree?apikey="+kdApiKey,
    method: 'GET',
  })
}

export function getDeviceList(data){
  return axios({
    url: "http://10.112.143.193/kiop-gateway-core/cdevice-manage/device/group/device-list?apikey="+kdApiKey,
    method: 'post',
    data
  })
}

export function initMeeting(data){
  return axios({
    url: "https://10.112.143.193/dispatch-micoservice/meeting/multi/init",
    method: 'post',
    data,
    headers: {
      apiKey: kdApiKey
    }
  })
}

export function deleteMeeting(groupId="MS8d11f0dd0f45aa9bbc5154e09c8d84"){
  return axios({
    url: "https://10.112.143.193/dispatch-micoservice/meeting/destroy/"+groupId,
    method: 'delete',
    data: {},
    headers: {
      apiKey: kdApiKey
    }
  })
}

export function getMeetingMember(groupId){
  return axios({
    url: "https://10.112.143.193/dispatch-micoservice/meeting/meetingMember/"+groupId,
    method: 'get',
    headers: {
      apiKey: kdApiKey
    }
  })
}

export function getResourceLiveUrl(data){
  return axios({
    url: "https://10.112.143.193/dispatch-micoservice/meeting/getResourceLiveUrl",
    method: 'get',
    params: data,
    headers: {
      apiKey: kdApiKey,
    }
  })
}
// 呼叫单个会议成员
export function callSingleMember(data){
  return axios({
    url: "https://10.112.143.193/dispatch-micoservice/meeting/device/callMember",
    method: 'post',
    data: data,
    headers: {
      apiKey: kdApiKey,
    }
  })
}

// 添加多个会议成员
export function callGroupMember(data){
  return axios({
    url: "https://10.112.143.193/dispatch-micoservice/meeting/meetingMember/batch",
    method: 'post',
    data: data,
    headers: {
      apiKey: kdApiKey,
    }
  })
}
// 挂断单个会议成员
export function hangUpGroupMember(data){
  return axios({
    url: "https://10.112.143.193/dispatch-micoservice/meeting/device/hangUp",
    method: 'post',
    data: data,
    headers: {
      apiKey: kdApiKey,
    }
  })
}

// 获取通讯录数据
export function getAllTxls(data){
  return axios({
    url: "http://10.112.143.193/kiop-gateway-core/tongxunlu/dept/getDeptContactAllTree",
    method: 'post',
    data: data,
    headers: {
      apiKey: kdApiKey,
    }
  })
}