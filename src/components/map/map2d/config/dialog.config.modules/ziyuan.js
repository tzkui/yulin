import { assetsUrl } from '@/components/map/map2d/hook/index';

export default {
  yuqing: {
    title: "雨情监测站",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 color: "xxx"
    rows: [
      { name: '监测点名称', key: 'name' },
      { name: '检测内容', key: 'content' },
      { name: '当前状态', key: 'status' },
      { name: '责任人', key: 'people' },
      { name: '联系电话', key: 'phone', iconUrl: assetsUrl('/icons/phone.png'), funcName: "phone" },

    ],
    // 右下角的按钮
    btns: [
      {
        name: "查看",
        funcName: "viewDetail"
      },
      // {
      //   name: "调度",
      //   funcName: "viewDetail"
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
  qixiang: {
    title: "气象监测站",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 color: "xxx"
    rows: [
      { name: '监测点名称', key: 'name' },
      { name: '检测内容', key: 'content' },
      { name: '当前状态', key: 'status' },
      { name: '责任人', key: 'people' },
      { name: '联系电话', key: 'phone', iconUrl: assetsUrl('/icons/phone.png'), funcName: "phone" },

    ],
    // 右下角的按钮
    btns: [
      {
        name: "查看",
        funcName: "viewDetail"
      },
    ],
    // 左下角的列表
    leftBtns: []
  },
  shuiwei: {
    title: "水位监测站",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 color: "xxx"
    rows: [
      { name: '监测点名称', key: 'name' },
      { name: '检测内容', key: 'content' },
      { name: '当前状态', key: 'status' },
      { name: '责任人', key: 'people' },
      { name: '联系电话', key: 'phone', iconUrl: assetsUrl('/icons/phone.png'), funcName: "phone" },

    ],
    // 右下角的按钮
    btns: [
      {
        name: "查看",
        funcName: "viewDetail"
      },
    ],
    // 左下角的列表
    leftBtns: []
  },

  weihua: {
    title: "危化企业分布",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 color: "xxx"
    rows: [
      { name: '监测点名称', key: 'name' },
      { name: '检测内容', key: 'content' },
      { name: '当前状态', key: 'status' },
      { name: '责任人', key: 'people' },
      { name: '联系电话', key: 'phone', iconUrl: assetsUrl('/icons/phone.png'), funcName: "phone" },

    ],
    // 右下角的按钮
    btns: [
      {
        name: "查看",
        funcName: "viewDetail"
      },
      // {
      //   name: "调度",
      //   funcName: "viewDetail"
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
  zhongdian_gongyi: {
    title: "重点监管工艺",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 color: "xxx"
    rows: [
      { name: '监测点名称', key: 'name' },
      { name: '检测内容', key: 'content' },
      { name: '当前状态', key: 'status' },
      { name: '责任人', key: 'people' },
      { name: '联系电话', key: 'phone', iconUrl: assetsUrl('/icons/phone.png'), funcName: "phone" },

    ],
    // 右下角的按钮
    btns: [
      {
        name: "查看",
        funcName: "viewDetail"
      },
    ],
    // 左下角的列表
    leftBtns: []
  },
  zhongdian_huaxue: {
    title: "重点监管化学品",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 color: "xxx"
    rows: [
      { name: '监测点名称', key: 'name' },
      { name: '检测内容', key: 'content' },
      { name: '当前状态', key: 'status' },
      { name: '责任人', key: 'people' },
      { name: '联系电话', key: 'phone', iconUrl: assetsUrl('/icons/phone.png'), funcName: "phone" },

    ],
    // 右下角的按钮
    btns: [
      {
        name: "查看",
        funcName: "viewDetail"
      },
    ],
    // 左下角的列表
    leftBtns: []
  },


  duiwu: {
    title: "救援队伍",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 color: "xxx"
    rows: [
      { name: '监测点名称', key: 'name' },
      { name: '检测内容', key: 'content' },
      { name: '当前状态', key: 'status' },
      { name: '责任人', key: 'people' },
      { name: '联系电话', key: 'phone', iconUrl: assetsUrl('/icons/phone.png'), funcName: "phone" },

    ],
    // 右下角的按钮
    btns: [
      {
        name: "查看",
        funcName: "viewDetail"
      },
      // {
      //   name: "调度",
      //   funcName: "viewDetail"
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
  jigou: {
    title: "应急机构",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 color: "xxx"
    rows: [
      { name: '监测点名称', key: 'name' },
      { name: '检测内容', key: 'content' },
      { name: '当前状态', key: 'status' },
      { name: '责任人', key: 'people' },
      { name: '联系电话', key: 'phone', iconUrl: assetsUrl('/icons/phone.png'), funcName: "phone" },

    ],
    // 右下角的按钮
    btns: [
      {
        name: "查看",
        funcName: "viewDetail"
      },
    ],
    // 左下角的列表
    leftBtns: []
  },
  renyuan: {
    title: "应急人员",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 color: "xxx"
    rows: [
      { name: '监测点名称', key: 'name' },
      { name: '检测内容', key: 'content' },
      { name: '当前状态', key: 'status' },
      { name: '责任人', key: 'people' },
      { name: '联系电话', key: 'phone', iconUrl: assetsUrl('/icons/phone.png'), funcName: "phone" },

    ],
    // 右下角的按钮
    btns: [
      {
        name: "查看",
        funcName: "viewDetail"
      },
    ],
    // 左下角的列表
    leftBtns: []
  },

  gongan: {
    title: "公安视频监控",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 color: "xxx"
    rows: [
      { name: '监测点名称', key: 'name' },
      { name: '检测内容', key: 'content' },
      { name: '当前状态', key: 'status' },
      { name: '责任人', key: 'people' },
      { name: '联系电话', key: 'phone', iconUrl: assetsUrl('/icons/phone.png'), funcName: "phone" },

    ],
    // 右下角的按钮
    btns: [
      {
        name: "查看",
        funcName: "viewDetail"
      },
      // {
      //   name: "调度",
      //   funcName: "viewDetail"
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
  zhujianju: {
    title: "住建局监控",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 color: "xxx"
    rows: [
      { name: '监测点名称', key: 'name' },
      { name: '检测内容', key: 'content' },
      { name: '当前状态', key: 'status' },
      { name: '责任人', key: 'people' },
      { name: '联系电话', key: 'phone', iconUrl: assetsUrl('/icons/phone.png'), funcName: "phone" },

    ],
    // 右下角的按钮
    btns: [
      {
        name: "查看",
        funcName: "viewDetail"
      },
    ],
    // 左下角的列表
    leftBtns: []
  },
  shuiliju: {
    title: "水利局监控",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 color: "xxx"
    rows: [
      { name: '监测点名称', key: 'name' },
      { name: '检测内容', key: 'content' },
      { name: '当前状态', key: 'status' },
      { name: '责任人', key: 'people' },
      { name: '联系电话', key: 'phone', iconUrl: assetsUrl('/icons/phone.png'), funcName: "phone" },

    ],
    // 右下角的按钮
    btns: [
      {
        name: "查看",
        funcName: "viewDetail"
      },
    ],
    // 左下角的列表
    leftBtns: []
  },

}