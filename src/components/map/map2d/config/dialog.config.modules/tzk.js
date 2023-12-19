import { assetsUrl } from "@/components/map/map2d/hook/index";
import { viewDetail } from "@/utils/funcNames/tzk";
export default {
  yjry: {
    title: "应急人员",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 colorKey: "xxx",如果是行内布局，加上inline: true
    rows: [
      { name: "姓名", key: "personalName" },
      { name: "职务", key: "job" },
      { name: "所属机构", key: "orgName" },
      {
        name: "移动号码",
        key: "linkPhone",
        iconUrl: assetsUrl("/icons/phone.png"),
        funcName: "phone",
      },
      { name: "主要职责", key: "duties" },
    ],
    // 右下角的按钮
    btns: [
      {
        name: "轨迹",
        funcName: "trajectory",
      },
      {
        name: "调度",
        funcName: "goDispatchPage",
      },
    ],
    // 左下角的列表
    leftBtns: [
      // {
      //   imgUrl: assetsUrl("/icons/leftBtn1.png"),
      //   hoverTitle: "",
      //   funcName: "",
      // },
      // {
      //   imgUrl: assetsUrl("/icons/leftBtn2.png"),
      //   hoverTitle: "",
      //   funcName: "",
      // },
      // {
      //   imgUrl: assetsUrl("/icons/leftBtn3.png"),
      //   hoverTitle: "",
      //   funcName: "",
      // },
    ],
  },
  yjzj: {
    title: "应急专家",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 colorKey: "xxx"
    rows: [
      { name: "姓名", key: "expertName" },
      { name: "职务", key: "zc" },
      { name: "研究方向", key: "domain" },
      {
        name: "移动号码",
        key: "linkPhone",
        iconUrl: assetsUrl("/icons/phone.png"),
        funcName: "phone",
      },
      { name: "所属机构", key: "workUnit" },
    ],
    // 右下角的按钮
    btns: [
      {
        name: "调度",
        funcName: "goDispatchPage",
      },
    ],
    // 左下角的列表
    leftBtns: [
      {
        imgUrl: assetsUrl("/icons/leftBtn1.png"),
        hoverTitle: "",
        funcName: viewDetail,
      },
      {
        imgUrl: assetsUrl("/icons/leftBtn2.png"),
        hoverTitle: "",
        funcName: viewDetail,
      },
      {
        imgUrl: assetsUrl("/icons/leftBtn3.png"),
        hoverTitle: "",
        funcName: viewDetail,
      },
    ],
  },
  jydw: {
    title: "救援队伍",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 colorKey: "xxx"
    rows: [
      { name: "队伍名称", key: "title" },
      { name: "队伍类型", key: "type" },
      { name: "总人数", key: "total" },
      { name: "负责人", key: "person" },
      {
        name: "联系电话",
        key: "phone",
        iconUrl: assetsUrl("/icons/phone.png"),
        funcName: "phone",
      },
    ],
    // 右下角的按钮
    btns: [
      // {
      //   name: "调度",
      //   funcName: "goDispatchPage"
      // },
      {
        name: "查看 ",
        funcName: viewDetail,
      },
    ],
    // 左下角的列表
    leftBtns: [],
  },
  yjwzk: {
    title: "应急物资库",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 colorKey: "xxx"
    rows: [
      { name: "物资库", key: "title" },
      { name: "负责人", key: "person" },
      {
        name: "联系电话:",
        key: "phone",
        iconUrl: assetsUrl("/icons/phone.png"),
        funcName: "phone",
      },
      { name: "地址", key: "address" },
    ],
    // 右下角的按钮
    btns: [
      // {
      //   name: "物资调拨",
      //   funcName: "wzdb",
      // },
      {
        name: "查看 ",
        funcName: viewDetail,
      },
    ],
    // 左下角的列表
    leftBtns: [],
  },
  bncs: {
    title: "避难场所",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 colorKey: "xxx"
    rows: [
      { name: "名称", key: "title" },
      { name: "面积", key: "area" },
      { name: "可容纳人数", key: "accommodateNum" },
      { name: "负责人", key: "person" },
      {
        name: "联系电话",
        key: "phone",
        iconUrl: assetsUrl("/icons/phone.png"),
        funcName: "phone",
      },
    ],
    // 右下角的按钮
    btns: [
      // {
      //   name: "监控",
      //   funcName: viewDetail,
      // },
    ],
  },
  spjk: {
    title: "视频监控",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 colorKey: "xxx",然后在传输数据的时候传入相应的key
    rows: [
      { name: "监控名称", key: "monitorName" },
      { name: "监控类型", key: "typeName" },
      { name: "地址", key: "location" },
    ],
    // 右下角的按钮
    btns: [
      {
        name: "查看 ",
        funcName: "openVideoMonitoring",
      },
    ],
  },
  ylzd: {
    title: "雨量监测站",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 colorKey: "xxx"
    rows: [
      { name: "测站名称", key: "name" },
      { name: "更新时间", key: "time" },
      { name: "1小时雨量", key: "h1" },
      { name: "3小时雨量", key: "h2" },
      { name: "6小时雨量", key: "h3" },
      { name: "12小时雨量", key: "h4" },
      { name: "24小时雨量", key: "h5" },
    ],
    // 右下角的按钮
    btns: [
      {
        name: "查 看",
        funcName: "rainfallThreePopup",
      },
    ],
  },
  swzd: {
    title: "水位站点",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 colorKey: "xxx"
    rows: [
      { name: "测站名称", key: "name" },
      { name: "站类", key: "type" },
      { name: "水系名称", key: "sxmc" },
      { name: "站址", key: "address" },
    ],
    // 右下角的按钮
    btns: [
      {
        name: "查 看",
        funcName: "rainfallThreePopup",
      },
    ],
  },
  sk: {
    title: "水库水情",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 colorKey: "xxx"
    rows: [
      { name: "当前水位", key: "dqsw", colorKey: "status" },
      { name: "汛限水位", key: "xxsw" },
      { name: "高水位", key: "gsw" },
      { name: "站址", key: "address" },
    ],
    // 右下角的按钮
    btns: [
      {
        name: "查 看",
        funcName: "rainfallThreePopup",
      },
    ],
  },
  jsd: {
    title: "积水点信息",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 colorKey: "xxx"
    rows: [
      { name: "积水点名称", key: "name" },
      { name: "积水点信息", key: "info" },
      { name: "责任人", key: "person" },
      {
        name: "联系电话",
        key: "phone",
        iconUrl: assetsUrl("/icons/phone.png"),
        funcName: "phone",
      },
    ],
    // 右下角的按钮
    btns: [
      {
        name: "查 看",
        funcName: "rainfallThreePopup",
      },
    ],
  },
  hdzd: {
    title: "河道水位站信息",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 colorKey: "xxx"
    rows: [
      { name: "监测站名称", key: "name" },
      { name: "站类", key: "type" },
      { name: "水系名称", key: "sxmc" },
      { name: "站址", key: "address" },
    ],
    // 右下角的按钮
    btns: [
      {
        name: "查 看",
        funcName: "rainfallThreePopup",
      },
    ],
  },
  dzyhd: {
    title: "地质灾害点信息",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 colorKey: "xxx"
    rows: [
      { name: "灾害名称", key: "title" },
      { name: "灾害类型", key: "type" },
      { name: "影响户数", key: "houseNum" },
      { name: "影响人数", key: "personNum" },
      { name: "责任人员", key: "person" },
      {
        name: "联系电话",
        key: "phone",
        iconUrl: assetsUrl("/icons/phone.png"),
        funcName: "phone",
      },
      { name: "地址", key: "address" },
    ],
    // 右下角的按钮
    btns: [
      {
        name: "查看",
        funcName: viewDetail,
      },
    ],
  },
  lswjf: {
    title: "房屋信息",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 colorKey: "xxx"
    rows: [
      { name: "所属区域", key: "title" },
      { name: "户主姓名", key: "person" },
      { name: "家庭人数", key: "houseNum" },
      { name: "鉴定等级:", key: "level" },
      // { name: '户主电话', key: 'phone', iconUrl: assetsUrl('/icons/phone.png'), funcName: "phone" },
      // { name: '农户经济条件', key: 'type' },
      { name: "房屋地址", key: "address" },
    ],
    // 右下角的按钮
    btns: [
      {
        name: "查看",
        funcName: viewDetail,
      },
    ],
  },
  dzyfq: {
    title: "地灾易发区",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 colorKey: "xxx"
    rows: [
      { name: "灾害名称", key: "name" },
      { name: "地址", key: "address" },
      { name: "联系人", key: "linkName" },
      {
        name: "联系电话",
        key: "linkPhone",
        iconUrl: assetsUrl("/icons/phone.png"),
        funcName: "phone",
      },
    ],
    // 右下角的按钮
    btns: [
      {
        name: "查看",
        funcName: viewDetail,
      },
    ],
  },
  shyhd: {
    title: "森火隐患点",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 colorKey: "xxx"
    rows: [
      { name: "名称", key: "name" },
      { name: "影响范围", key: "yxfw" },
      { name: "防范措施", key: "ffcs" },
    ],
    // 右下角的按钮
    btns: [
      {
        name: "查看",
        funcName: viewDetail,
      },
    ],
  },
  shzh: {
    title: "山洪灾害",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 colorKey: "xxx"
    rows: [
      { name: "风险地址", key: "address" },
      { name: "影响户数", key: "houseNum" },
      { name: "影响人数", key: "personNum" },
      { name: "责任人员", key: "person" },
      {
        name: "联系电话",
        key: "phone",
        iconUrl: assetsUrl("/icons/phone.png"),
        funcName: "phone",
      },
      { name: "防范措施", key: "do" },
    ],
    // 右下角的按钮
    btns: [
      {
        name: "查看",
        funcName: viewDetail,
      },
    ],
  },
  csyld: {
    title: "城市易涝点",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 colorKey: "xxx"
    rows: [
      { name: "名称", key: "jswz" },
      { name: "易涝原因", key: "jsyy" },
      { name: "责任单位", key: "zrdw" },
      { name: "责任人", key: "zrr" },
    ],
    // 右下角的按钮
    btns: [
      {
        name: "查看",
        funcName: viewDetail,
      },
    ],
  },
  // 企业信息
  qyxx: {
    title: "企业信息",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 colorKey: "xxx"
    rows: [
      { name: "企业名称", key: "name" },
      { name: "企业类型", key: "type" },
      { name: "所属区域", key: "area" },
      { name: "企业地址", key: "address" },
    ],
    // 右下角的按钮
    btns: [
      // {
      //   name: "查看",
      //   funcName: viewDetail,
      // },
    ],
  },
  fmks: {
    title: "非煤矿山",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 colorKey: "xxx"
    rows: [
      { name: "企业名称", key: "name" },
      { name: "企业类型", key: "type" },
      { name: "所属区域", key: "area" },
      { name: "企业地址", key: "address" },
    ],
    // 右下角的按钮
    btns: [
      // {
      //   name: "查看",
      //   funcName: viewDetail
      // }
    ],
  },
  gmqy: {
    title: "工贸企业",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 colorKey: "xxx"
    rows: [
      { name: "企业名称", key: "name" },
      { name: "企业地址", key: "address" },
      { name: "联系人", key: "person" },
      {
        name: "联系电话",
        key: "phone",
        iconUrl: assetsUrl("/icons/phone.png"),
        funcName: "phone",
      },
    ],
    // 右下角的按钮
    btns: [
      // {
      //   name: "查看",
      //   funcName: viewDetail
      // }
    ],
  },
  yhbzqy: {
    title: "烟花爆竹企业",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 colorKey: "xxx"
    rows: [
      { name: "企业名称", key: "name" },
      { name: "企业类型", key: "type" },
      { name: "所属区域", key: "area" },
      { name: "企业地址", key: "address" },
    ],
    // 右下角的按钮
    btns: [
      // {
      //   name: "查看",
      //   funcName: viewDetail
      // }
    ],
  },
  mk: {
    title: "煤矿",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 colorKey: "xxx"
    rows: [
      { name: "企业名称", key: "name" },
      { name: "企业类型", key: "type" },
      { name: "所属区域", key: "area" },
      { name: "企业地址", key: "address" },
    ],
    // 右下角的按钮
    btns: [
      // {
      //   name: "查看",
      //   funcName: viewDetail
      // }
    ],
  },
  wkk: {
    title: "尾矿库",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 colorKey: "xxx"
    rows: [
      { name: "企业名称", key: "name" },
      { name: "企业类型", key: "type" },
      { name: "所属区域", key: "area" },
      { name: "企业地址", key: "address" },
    ],
    // 右下角的按钮
    btns: [
      // {
      //   name: "查看",
      //   funcName: viewDetail
      // }
    ],
  },
  jsjgy: {
    title: "金属加工业",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 colorKey: "xxx"
    rows: [
      { name: "企业名称", key: "name" },
      { name: "企业地址", key: "address" },
      { name: "联系人", key: "person" },
      {
        name: "联系电话",
        key: "phone",
        iconUrl: assetsUrl("/icons/phone.png"),
        funcName: "phone",
      },
    ],
    // 右下角的按钮
    btns: [
      // {
      //   name: "查看",
      //   funcName: viewDetail
      // }
    ],
  },
  fjsjgy: {
    title: "非金属加工业",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 colorKey: "xxx"
    rows: [
      { name: "企业名称", key: "name" },
      { name: "企业地址", key: "address" },
      { name: "联系人", key: "person" },
      {
        name: "联系电话",
        key: "phone",
        iconUrl: assetsUrl("/icons/phone.png"),
        funcName: "phone",
      },
    ],
    // 右下角的按钮
    btns: [
      // {
      //   name: "查看",
      //   funcName: viewDetail
      // }
    ],
  },
  yqt: {
    title: "油气田",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 colorKey: "xxx"
    rows: [
      { name: "企业名称", key: "name" },
      { name: "企业地址", key: "address" },
      { name: "联系人", key: "person" },
      {
        name: "联系电话",
        key: "phone",
        iconUrl: assetsUrl("/icons/phone.png"),
        funcName: "phone",
      },
    ],
    // 右下角的按钮
    btns: [
      // {
      //   name: "查看",
      //   funcName: viewDetail
      // }
    ],
  },
  csc: {
    title: "采石场",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 colorKey: "xxx"
    rows: [
      { name: "企业名称", key: "name" },
      { name: "企业地址", key: "address" },
      { name: "联系人", key: "person" },
      {
        name: "联系电话",
        key: "phone",
        iconUrl: assetsUrl("/icons/phone.png"),
        funcName: "phone",
      },
    ],
    // 右下角的按钮
    btns: [
      // {
      //   name: "查看",
      //   funcName: viewDetail
      // }
    ],
  },
  ltkc: {
    title: "露天矿场",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 colorKey: "xxx"
    rows: [
      { name: "企业名称", key: "name" },
      { name: "企业地址", key: "address" },
      { name: "联系人", key: "person" },
      {
        name: "联系电话",
        key: "phone",
        iconUrl: assetsUrl("/icons/phone.png"),
        funcName: "phone",
      },
    ],
    // 右下角的按钮
    btns: [
      // {
      //   name: "查看",
      //   funcName: viewDetail
      // }
    ],
  },
  wxy1: {
    title: "一级危险源",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 colorKey: "xxx"
    rows: [
      { name: "企业名称", key: "name" },
      { name: "企业地址", key: "address" },
      { name: "联系人", key: "person" },
      {
        name: "联系电话",
        key: "phone",
        iconUrl: assetsUrl("/icons/phone.png"),
        funcName: "phone",
      },
    ],
    // 右下角的按钮
    btns: [
      // {
      //   name: "查看",
      //   funcName: viewDetail
      // }
    ],
  },
  wxy2: {
    title: "二级危险源",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 colorKey: "xxx"
    rows: [
      { name: "企业名称", key: "name" },
      { name: "企业地址", key: "address" },
      { name: "联系人", key: "person" },
      {
        name: "联系电话",
        key: "phone",
        iconUrl: assetsUrl("/icons/phone.png"),
        funcName: "phone",
      },
    ],
    // 右下角的按钮
    btns: [
      // {
      //   name: "查看",
      //   funcName: viewDetail
      // }
    ],
  },
  wxy3: {
    title: "三级危险源",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 colorKey: "xxx"
    rows: [
      { name: "企业名称", key: "name" },
      { name: "企业地址", key: "address" },
      { name: "联系人", key: "person" },
      {
        name: "联系电话",
        key: "phone",
        iconUrl: assetsUrl("/icons/phone.png"),
        funcName: "phone",
      },
    ],
    // 右下角的按钮
    btns: [
      // {
      //   name: "查看",
      //   funcName: viewDetail
      // }
    ],
  },
  wxy4: {
    title: "四级危险源",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 colorKey: "xxx"
    rows: [
      { name: "企业名称", key: "name" },
      { name: "企业地址", key: "address" },
      { name: "联系人", key: "person" },
      {
        name: "联系电话",
        key: "phone",
        iconUrl: assetsUrl("/icons/phone.png"),
        funcName: "phone",
      },
    ],
    // 右下角的按钮
    btns: [
      // {
      //   name: "查看",
      //   funcName: viewDetail
      // }
    ],
  },
  gajk: {
    title: "公安监控",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 colorKey: "xxx"
    rows: [
      { name: "监控名称", key: "monitorName" },
      { name: "监控类型", key: "typeName" },
      { name: "监控地址", key: "location" },
    ],
    // 右下角的按钮
    btns: [
      // {
      //   name: "查看",
      //   funcName: viewDetail
      // }
    ],
  },
  zjjjk: {
    title: "住建局监控",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 colorKey: "xxx"
    rows: [
      { name: "监控名称", key: "monitorName" },
      { name: "监控类型", key: "typeName" },
      { name: "监控地址", key: "location" },
    ],
    // 右下角的按钮
    btns: [
      // {
      //   name: "查看",
      //   funcName: viewDetail
      // }
    ],
  },
  sljjk: {
    title: "水利局监控",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 colorKey: "xxx"
    rows: [
      { name: "监控名称", key: "monitorName" },
      { name: "监控类型", key: "typeName" },
      { name: "监控地址", key: "location" },
    ],
    // 右下角的按钮
    btns: [
      // {
      //   name: "查看",
      //   funcName: viewDetail
      // }
    ],
  },
  zrzhjk: {
    title: "自然灾害监控",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 colorKey: "xxx"
    rows: [
      { name: "监控名称", key: "monitorName" },
      { name: "监控类型", key: "typeName" },
      { name: "监控地址", key: "location" },
    ],
    // 右下角的按钮
    btns: [
      // {
      //   name: "查看",
      //   funcName: viewDetail
      // }
    ],
  },
  hgyqjk: {
    title: "化工园区监控",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 colorKey: "xxx"
    rows: [
      { name: "监控名称", key: "monitorName" },
      { name: "监控类型", key: "typeName" },
      { name: "监控地址", key: "location" },
    ],
    // 右下角的按钮
    btns: [
      // {
      //   name: "查看",
      //   funcName: viewDetail
      // }
    ],
  },
  zdddjk: {
    title: "重点地点监控",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 colorKey: "xxx"
    rows: [
      { name: "监控名称", key: "monitorName" },
      { name: "监控类型", key: "typeName" },
      { name: "监控地址", key: "location" },
    ],
    // 右下角的按钮
    btns: [
      // {
      //   name: "查看",
      //   funcName: viewDetail
      // }
    ],
  },
  zhzfjjk: {
    title: "综合执法局监控",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 colorKey: "xxx"
    rows: [
      { name: "监控名称", key: "monitorName" },
      { name: "监控类型", key: "typeName" },
      { name: "监控地址", key: "location" },
    ],
    // 右下角的按钮
    btns: [
      // {
      //   name: "查看",
      //   funcName: viewDetail
      // }
    ],
  },
  whqyjk: {
    title: "危化企业监控",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 colorKey: "xxx"
    rows: [
      { name: "监控名称", key: "monitorName" },
      { name: "监控类型", key: "typeName" },
      { name: "监控地址", key: "location" },
    ],
    // 右下角的按钮
    btns: [
      // {
      //   name: "查看",
      //   funcName: viewDetail
      // }
    ],
  },
  jjjk: {
    title: "交警监控",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 colorKey: "xxx"
    rows: [
      { name: "监控名称", key: "monitorName" },
      { name: "监控类型", key: "typeName" },
      { name: "监控地址", key: "location" },
    ],
    // 右下角的按钮
    btns: [
      // {
      //   name: "查看",
      //   funcName: viewDetail
      // }
    ],
  },
  dzjc: {
    title: "地质监测",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 colorKey: "xxx"
    rows: [
      { name: "名称", key: "yhdmc" },
      { name: "类型", key: "yhdlx" },
      { name: "地点", key: "dd" },
      { name: "责任人", key: "jcfzr" },
      {
        name: "联系电话",
        key: "jcfzrlxdh",
        iconUrl: assetsUrl("/icons/phone.png"),
        funcName: "phone",
      },
    ],
    // 右下角的按钮
    btns: [],
    // 左下角的列表
    leftBtns: [],
  },
  aqscjc: {
    title: "安全生产监测",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 colorKey: "xxx"
    rows: [
      { name: "名称", key: "equipmentName" },
      { name: "监测单位", key: "orgName" },
      { name: "监测对象", key: "surveyObject" },
      { name: "地址", key: "location" },
    ],
    // 右下角的按钮
    btns: [],
    // 左下角的列表
    leftBtns: [],
  },
  lhjc: {
    title: "林火监测",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 colorKey: "xxx"
    rows: [
      { name: "名称", key: "areaName" },
      { name: "面积", key: "areaMeasue" },
      { name: "林场类型", key: "typeName" },
      { name: "地址", key: "areaAddr" },
      { name: "联系人", key: "areaPerson" },
      {
        name: "联系电话",
        key: "phone",
        iconUrl: assetsUrl("/icons/phone.png"),
        funcName: "phone",
      },
    ],
    // 右下角的按钮
    btns: [],
    // 左下角的列表
    leftBtns: [],
  },
  yjzb: {
    title: "救援装备",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 colorKey: "xxx"
    rows: [
      { name: "名称", key: "name" },
      { name: "位置", key: "location" },
      { name: "联系人", key: "linkName" },
      {
        name: "联系方式",
        key: "linkPhone",
        iconUrl: assetsUrl("/icons/phone.png"),
        funcName: "phone",
      },
    ],
    // 右下角的按钮
    btns: [],
    // 左下角的列表
    leftBtns: [],
  },
  fhmb: {
    title: "防护目标",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 colorKey: "xxx"
    rows: [
      { name: "名称", key: "name" },
      { name: "类型", key: "typeName" },
      { name: "位置", key: "location" },
      { name: "联系人", key: "linkName" },
      {
        name: "联系方式",
        key: "linkPhone",
        iconUrl: assetsUrl("/icons/phone.png"),
        funcName: "phone",
      },
    ],
    // 右下角的按钮
    btns: [],
    // 左下角的列表
    leftBtns: [],
  },
  yjjg: {
    title: "应急机构",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 colorKey: "xxx"
    rows: [
      { name: "机构名称", key: "orgName" },
      { name: "机构类型", key: "typeName" },
    ],
    // 右下角的按钮
    btns: [],
    // 左下角的列表
    leftBtns: [],
  },
  wrj: {
    title: "无人机",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 colorKey: "xxx"
    rows: [{ name: "名称", key: "name" }],
    // 右下角的按钮
    btns: [],
    // 左下角的列表
    leftBtns: [],
  },
  wxdh: {
    title: "卫星电话",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 colorKey: "xxx"
    rows: [
      { name: "单位", key: "sydw" },
      { name: "联系人", key: "lxr" },
      { name: "号码", key: "bgrlxdh" },
    ],
    // 右下角的按钮
    btns: [],
    // 左下角的列表
    leftBtns: [],
  },

  dxjx: {
    title: "大型机械",
    // 每一行的信息， name和key必填，如果有icon，加上iconUrl: 'xxx',如果字有颜色，加上 colorKey: "xxx"
    rows: [
      { name: "所属组织", key: "ssqy" },
      { name: "车牌号", key: "cph" },
      { name: "车辆类型", key: "cllx" },
      { name: "车主姓名", key: "czxm" },
      { name: "联系电话", key: "lxdh" },
    ],
    // 右下角的按钮
    btns: [],
    // 左下角的列表
    leftBtns: [],
  },
};
