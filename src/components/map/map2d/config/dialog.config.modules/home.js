import { assetsUrl } from "@/components/map/map2d/hook/index";
import {
  viewDetail,
  viewDetailqilx,
} from "@/utils/funcNames/home";
export default {
  sj: {
    title: "自然灾害事件",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 color: "xxx"
    rows: [
      { name: "事件名称", key: "name" },
      { name: "事件类型", key: "typeName" },
      { name: "事发时间", key: "time" },
      { name: "事发地点", key: "location" },
      { name: "事件描述", key: "cont" },
      // { name: '分机号码', key: 'aphone', iconUrl: assetsUrl('/icons/video.png'), funcName:"phone" },
      // { name: '移动号码', key: 'phone', iconUrl: assetsUrl('/icons/phone.png'), funcName:"phone" },
    ],
    // 右下角的按钮
    btns: [
      {
        name: "核实",
        funcName: "eventVerification",
      },
      {
        name: "指挥调度",
        funcName: "goDispatchPage",
      },
      {
        name: "补录",
        funcName: "eventSupplementaryRecording",
      },
      {
        name: "查看",
        funcName: "checkEventDetail",
      },
    ],
    // 左下角的列表
    leftBtns: [
      // {
      //   imgUrl: "",
      //   hoverTitle: "",
      //   funcName: "openMap"
      // },
    ],
  },
  yjdw: {
    title: "应急队伍",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 colorKey: "xxx"
    rows: [
      { name: "队伍名称:", key: "name" },
      { name: "队伍类型:", key: "type" },
      { name: "总人数:", key: "total" },
      { name: "负责人:", key: "person" },
      {
        name: "联系电话:",
        key: "phone",
        iconUrl: assetsUrl("/icons/phone.png"),
        funcName: "phone",
      },
    ],
    // 右下角的按钮
    btns: [
      {
        name: "调度",
        funcName: "goDispatchPage",
      },
      {
        name: "查看",
        funcName: "checkDetail",
      },
    ],
    // 左下角的列表
    leftBtns: [],
  },
};
