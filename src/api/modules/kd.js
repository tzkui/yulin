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
    url: "https://10.112.143.193/dispatch-micoservice/meeting/multi/init?apikey="+kdApiKey,
    method: 'post',
    data
  })
}