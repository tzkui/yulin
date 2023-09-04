import { assetsUrl } from '@/components/map/map2d/hook/index';
import { viewDetail,viewDetailqilx } from '@/utils/funcNames/ys';
export default {
  yjjsj: {
    title: "自然灾害事件",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 color: "xxx"
    rows: [
      { name: '事件名称', key: 'name' },
      { name: '事件类型', key: 'type' },
      { name: '事件时间', key: 'time' },
      // { name: '事发地点', key: 'aphone', iconUrl: assetsUrl('/icons/video.png'), funcName: "phone" },
      // { name: '事件描述', key: 'phone', iconUrl: assetsUrl('/icons/phone.png'), funcName: "phone" },
      { name: '事发地点', key: 'address' },
      { name: '事件描述', key: 'des' },
      // { name: '主要职责', key: 'duty', },

    ],
    // 右下角的按钮
    btns: [
      {
        name: "查看 ",
        funcName: "eventView",
      },
      {
        name: "补录",
        funcName: "eventSupplementaryRecording",
        hideKey: "hideEventSupplementaryRecording"
      },
      {
        name: "指挥调度",
        funcName: "goDispatchPage",
        hideKey: "hideDispatch"
      },
      {
        name: "核实",
        funcName: "eventVerification",
        hideKey: "hideEventVerification"
      }
    ],
    // 左下角的列表
    leftBtns: [
      //   {
      //     imgUrl: "",
      //     hoverTitle: "",
      //     funcName: "openMap"
      //   },
      //   {
      //     imgUrl: "",
      //     hoverTitle: "",
      //     funcName: "openMap"
      //   },
      //   {
      //     imgUrl: "",
      //     hoverTitle: "",
      //     funcName: "openMap"
      //   }
    ]
  },
  whqyxx: {
    title: "危化企业预警信息",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 color: "xxx"
    rows: [
      { name: '企业名称', key: 'compony' },
      { name: '预警等级', key: 'name' },
      { name: '预警时间', key: 'job' },
      // { name: '事发地点', key: 'aphone', iconUrl: assetsUrl('/icons/video.png'), funcName: "phone" },
      // { name: '事件描述', key: 'phone', iconUrl: assetsUrl('/icons/phone.png'), funcName: "phone" },
      { name: '预警描述', key: 'aphone' },
      // { name: '事件描述', key: 'phone'},
      // { name: '主要职责', key: 'duty', },

    ],
    // 右下角的按钮
    btns: [
      {
        name: "查看",
        funcName: "eventView"
      },
      {
        name: "补录",
        funcName: "eventSupplementaryRecording"
      },
      {
        name: "指挥调度",
        funcName: "goDispatchPage"
      },
      {
        name: "核实",
        funcName: "eventVerification"
      }
    ],
    // 左下角的列表
    leftBtns: [
      //   {
      //     imgUrl: "",
      //     hoverTitle: "",
      //     funcName: "openMap"
      //   },
      //   {
      //     imgUrl: "",
      //     hoverTitle: "",
      //     funcName: "openMap"
      //   },
      //   {
      //     imgUrl: "",
      //     hoverTitle: "",
      //     funcName: "openMap"
      //   }
    ]
  },
  // 下面这个就是企业类型的打点的东西的了
  qylxxx: {
    title: "企业信息",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 color: "xxx"
    rows: [
      { name: '企业名称', key: 'name' },
      { name: '企业地址', key: 'job' },
      { name: '联系人', key: 'compony' },
      // { name: '事发地点', key: 'aphone', iconUrl: assetsUrl('/icons/video.png'), funcName: "phone" },
      // { name: '事件描述', key: 'phone', iconUrl: assetsUrl('/icons/phone.png'), funcName: "phone" },
      { name: '联系电话', key: 'aphone', iconUrl: assetsUrl('/icons/phone.png'), funcName: "phone" },
      { name: '企业类型', key: 'phone' },
      { name: '所属区域', key: 'duty', },
    ],
    // 右下角的按钮
    btns: [
      {
        name: "查看",
        funcName: viewDetailqilx
      },
      // {
      //   name: "补录",
      //   funcName: "eventSupplementaryRecording"
      // },
      // {
      //   name: "指挥调度",
      //   funcName: "goDispatchPage"
      // },
      // {
      //   name: "核实",
      //   funcName: "eventVerification"
      // }
    ],
    // 左下角的列表
    leftBtns: [
      //   {
      //     imgUrl: "",
      //     hoverTitle: "",
      //     funcName: "openMap"
      //   },
      //   {
      //     imgUrl: "",
      //     hoverTitle: "",
      //     funcName: "openMap"
      //   },
      //   {
      //     imgUrl: "",
      //     hoverTitle: "",
      //     funcName: "openMap"
      //   }
    ]
  },
  // 下面这个就是企业类型的打点的东西的了
  sgxx: {
    title: "事故信息",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 color: "xxx"
    rows: [
      { name: '事故名称', key: 'eventName' },
      { name: '事故地址', key: 'eventAddress' },
      { name: '事故类型', key: 'typeName' },
      { name: '事故等级', key: 'eventLevelName' },
      { name: '所属区域', key: 'xzqhName', },
    ],
    // 右下角的按钮
    btns: [
      {
        name: "查看",
        funcName: viewDetailqilx
      },
    ],
    // 左下角的列表
    leftBtns: [
    ]
  }

  // 下面配置其他需要的一些东西的了
}