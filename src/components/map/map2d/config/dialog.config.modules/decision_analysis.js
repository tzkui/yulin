import { assetsUrl } from '@/components/map/map2d/hook/index';
export default {
  zqzhcx: {
    title: "灾情综合查询",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 color: "xxx"
    rows: [
      { name: '日期', key: 'date' },
      { name: '名称', key: 'name' },
      { name: '地址', key: 'location' },
      { name: '事件', key: 'cont' },
      // { name: '分机号码', key: 'aphone', iconUrl: assetsUrl('/icons/video.png'), funcName:"phone" },
      // { name: '移动号码', key: 'phone', iconUrl: assetsUrl('/icons/phone.png'), funcName:"phone" },

    ],
    // 右下角的按钮
    btns: [
      // {
      //   name: "查看",
      //   funcName: "viewDetail"
      // }
    ],
    // 左下角的列表
    leftBtns: [
      // {
      //   imgUrl: "",
      //   hoverTitle: "",
      //   funcName: "openMap"
      // },
    ]
  },
  zqqyfx: {
    title: "灾情区域分析",
    rows: [
      { name: '名称', key: 'name' },
      { name: '距离', key: 'distance' },
      { name: '地址', key: 'location' },
      { name: '事件', key: 'cont' },

    ],
  },
  zqzyfx: {
    title: "灾情资源分析",
    rows: [
      { name: '名称', key: 'name' },
      { name: '距离', key: 'distance' },

    ],
  },
  yydxtj: {
    title: "应用对象统计",
    rows: [
      { name: '名称', key: 'name' },
      { name: '人数', key: 'num' },
      { name: '距离', key: 'distance' },

    ],
  }
}