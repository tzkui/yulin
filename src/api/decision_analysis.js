// 灾情资源分析
export const zqzyfx = [
  {
    markerType: "xx",
    id: "1",
    icon: "/images/marker/mapdot-school.png",
    name: "学校",
    markerList: []
  },
  {
    markerType: "yy",
    id: "2",
    icon: "/images/marker/mapdot-hospital.png",
    name: "医院",
    markerList: [
      {
        markerType: "yy",
        id: "2_1",
        icon: "/images/marker/mapdot-hospital.png",
        lng: '110.41545', lat: "39.21846",
        name: "医院1",
        label: { text: "医院1", font_size: 16 },
        dialogType: "zqzyfx",
        details: {
          name: "人民医院",
          distance: "距4200km",
        }
      },
      {
        markerType: "yy",
        id: "2_2",
        lng: '110.04440', lat: "38.78209",
        name: "医院2",
        phone: "13511117659",
        icon: "/images/marker/mapdot-hospital.png",
        label: { text: "医院2", font_size: 16 },
        dialogType: "zqzyfx",
        details: {
          name: "中心医院",
          distance: "距2500km",
        }
      }
    ]
  },
  {
    markerType: "ggwhcs",
    id: "3",
    icon: "/images/marker/icon-typhoon.png",
    name: "公共文化场所",
    markerList: [
      {
        markerType: "ggwhcs",
        id: "3_1",
        icon: "/images/marker/icon-typhoon.png",
        lng: '109.68321', lat: "38.35923",
        name: "公共文化场所1",
        label: { text: "公共文化场所1", font_size: 16 },
        dialogType: "zqzyfx",
        details: {
          name: "人民公共文化场所",
          distance: "距4200km",
        }
      },
    ]
  },
  {
    markerType: "lyjq",
    id: "4",
    icon: "/images/marker/m7.png",
    name: "旅游景区",
    markerList: [
      {
        markerType: "lyjq",
        id: "4_1",
        icon: "/images/marker/m7.png",
        lng: '110.00527', lat: "37.20415",
        name: "旅游景区1",
        label: { text: "旅游景区1", font_size: 16 },
        dialogType: "zqzyfx",
        details: {
          name: "人民旅游景区",
          distance: "距4200km",
        }
      },
    ]
  },
  {
    markerType: "qy",
    id: "4",
    icon: "/images/marker/mapdot-bank.png",
    name: "企业",
    markerList: [
      {
        markerType: "qy",
        id: "4_1",
        icon: "/images/marker/mapdot-bank.png",
        lng: '108.27240', lat: "36.70368",
        name: "企业1",
        label: { text: "企业1", font_size: 16 },
        dialogType: "zqzyfx",
        details: {
          name: "人民企业",
          distance: "距4200km",
        }
      },
    ]
  },
  {
    markerType: "tyg",
    id: "4",
    icon: "/images/marker/icon_warehouse.png",
    name: "体育馆",
    markerList: [
      {
        markerType: "tyg",
        id: "4_1",
        icon: "/images/marker/icon_warehouse.png",
        lng: '107.11059', lat: "35.86933",
        name: "体育馆1",
        label: { text: "体育馆1", font_size: 16 },
        dialogType: "zqzyfx",
        details: {
          name: "人民体育馆",
          distance: "距4200km",
        }
      },
    ]
  },
  {
    markerType: "cs",
    id: "4",
    icon: "/images/marker/m2.png",
    name: "超市",
    markerList: [
      {
        markerType: "cs",
        id: "4_1",
        icon: "/images/marker/m2.png",
        lng: '107.98863', lat: "35.27941",
        name: "超市1",
        label: { text: "超市1", font_size: 16 },
        dialogType: "zqzyfx",
        details: {
          name: "人民超市",
          distance: "距4200km",
        }
      },
    ]
  },
  {
    markerType: "ltks",
    id: "4",
    icon: "/images/marker/icon_kuangshan.png",
    name: "超市",
    markerList: [
      {
        markerType: "ltks",
        id: "4_1",
        icon: "/images/marker/icon_kuangshan.png",
        lng: '109.70229', lat: "38.26864",
        name: "超市1",
        label: { text: "超市1", font_size: 16 },
        dialogType: "zqzyfx",
        details: {
          name: "人民超市",
          distance: "距4200km",
        }
      },
    ]
  },
]
// 应用对象统计
export const yydxtj = [
  {
    markerType: "zdwz",
    id: "1",
    icon: "/images/marker/mapdot-materia.png",
    name: "重点物资",
    markerList: [
      {
        markerType: "zdwz",
        id: "1_1",
        icon: "/images/marker/mapdot-materia.png",
        lng: '109.70081', lat: "38.28285",
        name: "重点物资",
        label: { text: "重点物资1", font_size: 16 },
        dialogType: "yydxtj",
        details: {
          name: "重点物资1",
          num: '115人',
          distance: "距2500km",
        }
      },
      {
        markerType: "zdwz",
        id: "1_2",
        lng: '109.78777', lat: "38.29434",
        name: "重点物资",
        phone: "13511117659",
        icon: "/images/marker/mapdot-materia.png",
        label: { text: "重点物资2", font_size: 16 },
        dialogType: "yydxtj",
        details: {
          name: "重点物资2",
          num: '25人',
          distance: "距2500km",
        }
      }
    ]
  },
  {
    markerType: "wzck",
    id: "2",
    icon: "/images/marker/icon_warehouse.png",
    name: "物资仓库",
    markerList: [
      {
        markerType: "wzck",
        id: "2_1",
        icon: "/images/marker/icon_warehouse.png",
        lng: '109.75813', lat: "38.30719",
        name: "物资仓库",
        label: { text: "物资仓库1", font_size: 16 },
        dialogType: "yydxtj",
        details: {
          name: "物资仓库1",
          num: '115人',
          distance: "距2500km",
        }
      },
    ]
  },
  {
    markerType: "jydw",
    id: "3",
    icon: "/images/marker/icon_team.png",
    name: "救援队伍",
    markerList: [
      // {
      //   markerType: "jydw",
      //   id: "3_1",
      //   icon: "/images/marker/icon_team.png",
      //   lng: '109.75096', lat: "38.26007",
      //   name: "救援队伍",
      //   label: { text: "救援队伍1", font_size: 16 },
      //   dialogType: "yydxtj",
      //   details: {
      //     name: "救援队伍1",
      //     num: '115人',
      //     distance: "距2500km",
      //   }
      // },
    ]
  },
  {
    markerType: "bncs",
    id: "4",
    icon: "/images/marker/icon-bncs.png",
    name: "避难场所",
    markerList: [
      {
        markerType: "bncs",
        id: "4_1",
        icon: "/images/marker/icon-bncs.png",
        lng: '109.68167', lat: "38.25636",
        name: "避难场所",
        label: { text: "避难场所1", font_size: 16 },
        dialogType: "yydxtj",
        details: {
          name: "避难场所1",
          num: '115人',
          distance: "距2500km",
        }
      },
    ]
  },
  {
    markerType: "dxjx",
    id: "5",
    icon: "/images/marker/mapdot-construction-machinery.png",
    name: "大型机械",
    markerList: [
      {
        markerType: "dxjx",
        id: "5_1",
        icon: "/images/marker/mapdot-construction-machinery.png",
        lng: '109.71230', lat: "38.23824",
        name: "大型机械",
        label: { text: "大型机械1", font_size: 16 },
        dialogType: "yydxtj",
        details: {
          name: "大型机械1",
          num: '115人',
          distance: "距2500km",
        }
      },
    ]
  },
  {
    markerType: "yjgb",
    id: "6",
    icon: "/images/marker/mapdot-volume-up-f.png",
    name: "应急广播",
    markerList: [
      {
        markerType: "yjgb",
        id: "6_1",
        icon: "/images/marker/mapdot-volume-up-f.png",
        lng: '109.64733', lat: "38.24603",
        name: "应急广播",
        label: { text: "应急广播1", font_size: 16 },
        dialogType: "yydxtj",
        details: {
          name: "应急广播1",
          num: '115人',
          distance: "距2500km",
        }
      },
    ]
  },
  {
    markerType: "spjk",
    id: "7",
    icon: "/images/marker/mapdot-scientific.png",
    name: "视频监控",
    markerList: [
      {
        markerType: "spjk",
        id: "7_1",
        icon: "/images/marker/mapdot-scientific.png",
        lng: '109.70637', lat: "38.23220",
        name: "视频监控",
        label: { text: "视频监控1", font_size: 16 },
        dialogType: "yydxtj",
        details: {
          name: "视频监控1",
          num: 1 + '115人',
          distance: "距2500km",
        }
      },
    ]
  },
  {
    markerType: "yjgb",
    id: "7",
    icon: "/images/marker/mapdot-scientific.png",
    name: "应急广播",
    markerList: [
      {
        markerType: "yjgb",
        id: "7_1",
        icon: "/images/marker/mapdot-scientific.png",
        lng: '109.70637', lat: "38.23220",
        name: "应急广播",
        label: { text: "应急广播", font_size: 16 },
        dialogType: "yydxtj",
        details: {
          name: "应急广播",
          num: 1 + '115人',
          distance: "距2500km",
        }
      },
    ]
  },
]

// 自己重新再新建立一个
export const newyydxtj = [
  {
    markerType: "zdwz",
    id: "1",
    icon: "/images/marker/mapdot-materia.png",
    name: "重点物资",
    markerList: [
      {
        markerType: "zdwz",
        id: "1_1",
        icon: "/images/marker/mapdot-materia.png",
        lng: '109.70081', lat: "38.28285",
        name: "重点物资",
        label: { text: "重点物资1", font_size: 16 },
        dialogType: "yydxtj",
        details: {
          name: "重点物资1",
          num: '115人',
          distance: "距2500km",
        }
      },
      {
        markerType: "zdwz",
        id: "1_2",
        lng: '109.78777', lat: "38.29434",
        name: "重点物资",
        phone: "13511117659",
        icon: "/images/marker/mapdot-materia.png",
        label: { text: "重点物资2", font_size: 16 },
        dialogType: "yydxtj",
        details: {
          name: "重点物资2",
          num: '25人',
          distance: "距2500km",
        }
      }
    ]
  },
  {
    markerType: "wzck",
    id: "2",
    icon: "/images/marker/icon_warehouse.png",
    name: "物资仓库",
    markerList: [
      {
        markerType: "wzck",
        id: "2_1",
        icon: "/images/marker/icon_warehouse.png",
        lng: '109.75813', lat: "38.30719",
        name: "物资仓库",
        label: { text: "物资仓库1", font_size: 16 },
        dialogType: "yydxtj",
        details: {
          name: "物资仓库1",
          num: '115人',
          distance: "距2500km",
        }
      },
    ]
  },
  {
    markerType: "jydw",
    id: "3",
    icon: "/images/marker/icon_team.png",
    name: "救援队伍",
    markerList: [
      // {
      //   markerType: "jydw",
      //   id: "3_1",
      //   icon: "/images/marker/icon_team.png",
      //   lng: '109.75096', lat: "38.26007",
      //   name: "救援队伍",
      //   label: { text: "救援队伍1", font_size: 16 },
      //   dialogType: "yydxtj",
      //   details: {
      //     name: "救援队伍1",
      //     num: '115人',
      //     distance: "距2500km",
      //   }
      // },
    ]
  },
  {
    markerType: "bncs",
    id: "4",
    icon: "/images/marker/icon-bncs.png",
    name: "避难场所",
    markerList: [
      {
        markerType: "bncs",
        id: "4_1",
        icon: "/images/marker/icon-bncs.png",
        lng: '109.68167', lat: "38.25636",
        name: "避难场所",
        label: { text: "避难场所1", font_size: 16 },
        dialogType: "yydxtj",
        details: {
          name: "避难场所1",
          num: '115人',
          distance: "距2500km",
        }
      },
    ]
  },
  {
    markerType: "dxjx",
    id: "5",
    icon: "/images/marker/mapdot-construction-machinery.png",
    name: "大型机械",
    markerList: [
      {
        markerType: "dxjx",
        id: "5_1",
        icon: "/images/marker/mapdot-construction-machinery.png",
        lng: '109.71230', lat: "38.23824",
        name: "大型机械",
        label: { text: "大型机械1", font_size: 16 },
        dialogType: "yydxtj",
        details: {
          name: "大型机械1",
          num: '115人',
          distance: "距2500km",
        }
      },
    ]
  },
  {
    markerType: "yjgb",
    id: "6",
    icon: "/images/marker/mapdot-volume-up-f.png",
    name: "应急广播",
    markerList: [
      {
        markerType: "yjgb",
        id: "6_1",
        icon: "/images/marker/mapdot-volume-up-f.png",
        lng: '109.64733', lat: "38.24603",
        name: "应急广播",
        label: { text: "应急广播1", font_size: 16 },
        dialogType: "yydxtj",
        details: {
          name: "应急广播1",
          num: '115人',
          distance: "距2500km",
        }
      },
    ]
  },
  {
    markerType: "spjk",
    id: "7",
    icon: "/images/marker/mapdot-scientific.png",
    name: "视频监控",
    markerList: [
      {
        markerType: "spjk",
        id: "7_1",
        icon: "/images/marker/mapdot-scientific.png",
        lng: '109.70637', lat: "38.23220",
        name: "视频监控",
        label: { text: "视频监控1", font_size: 16 },
        dialogType: "yydxtj",
        details: {
          name: "视频监控1",
          num: 1 + '115人',
          distance: "距2500km",
        }
      },
    ]
  },
  {
    markerType: "yjgb",
    id: "7",
    icon: "/images/marker/mapdot-scientific.png",
    name: "应急广播",
    markerList: [
      {
        markerType: "yjgb",
        id: "7_1",
        icon: "/images/marker/mapdot-scientific.png",
        lng: '109.70637', lat: "38.23220",
        name: "应急广播",
        label: { text: "应急广播", font_size: 16 },
        dialogType: "yydxtj",
        details: {
          name: "应急广播",
          num: 1 + '115人',
          distance: "距2500km",
        }
      },
    ]
  },
]
// 灾情分析
export const zqfx = [
  {
    markerType: "ltkc",
    id: "1",
    icon: "/images/marker/mapdot-materia.png",
    name: "露天矿场",
    markerList: [
      {
        markerType: "ltkc",
        id: "1_1",
        icon: "/images/marker/mapdot-materia.png",
        lng: '109.70081', lat: "38.28285",
        name: "露天矿场",
        label: { text: "露天矿场1", font_size: 16 },
        dialogType: "zqfx",
        details: {
          name: "露天矿场1",
          num: '115人',
          distance: "距2500km",
        }
      },
    ]
  },
  {
    markerType: "xx",
    id: "2",
    icon: "/images/marker/icon_warehouse.png",
    name: "学校",
    markerList: [
      {
        markerType: "xx",
        id: "2_1",
        icon: "/images/marker/icon_warehouse.png",
        lng: '109.75813', lat: "38.30719",
        name: "学校",
        label: { text: "学校1", font_size: 16 },
        dialogType: "zqfx",
        details: {
          name: "学校1",
          num: '115人',
          distance: "距2500km",
        }
      },
    ]
  },
  {
    markerType: "cs",
    id: "3",
    icon: "/images/marker/icon_team.png",
    name: "超市",
    markerList: [
      {
        markerType: "cs",
        id: "3_1",
        icon: "/images/marker/icon_team.png",
        lng: '109.75096', lat: "38.26007",
        name: "超市",
        label: { text: "超市1", font_size: 16 },
        dialogType: "zqfx",
        details: {
          name: "超市1",
          num: '115人',
          distance: "距2500km",
        }
      },
    ]
  },
  {
    markerType: "qy",
    id: "4",
    icon: "/images/marker/icon-bncs.png",
    name: "企业",
    markerList: [
      {
        markerType: "qy",
        id: "4_1",
        icon: "/images/marker/icon-bncs.png",
        lng: '109.68167', lat: "38.25636",
        name: "企业",
        label: { text: "企业", font_size: 16 },
        dialogType: "zqfx",
        details: {
          name: "企业1",
          num: '115人',
          distance: "距2500km",
        }
      },
    ]
  },
  {
    markerType: "lyjq",
    id: "5",
    icon: "/images/marker/mapdot-construction-machinery.png",
    name: "大型机械",
    markerList: [
      {
        markerType: "lyjq",
        id: "5_1",
        icon: "/images/marker/mapdot-construction-machinery.png",
        lng: '109.71230', lat: "38.23824",
        name: "lyjq",
        label: { text: "lyjq", font_size: 16 },
        dialogType: "zqfx",
        details: {
          name: "lyjq",
          num: '115人',
          distance: "距2500km",
        }
      },
    ]
  },
  {
    markerType: "tyg",
    id: "6",
    icon: "/images/marker/mapdot-volume-up-f.png",
    name: "体育馆",
    markerList: [
      {
        markerType: "tyg",
        id: "6_1",
        icon: "/images/marker/mapdot-volume-up-f.png",
        lng: '109.64733', lat: "38.24603",
        name: "体育馆",
        label: { text: "体育馆1", font_size: 16 },
        dialogType: "zqfx",
        details: {
          name: "育馆1",
          num: '115人',
          distance: "距2500km",
        }
      },
    ]
  },
  {
    markerType: "ggwhcs",
    id: "7",
    icon: "/images/marker/mapdot-scientific.png",
    name: "公告文化场所",
    markerList: [
      {
        markerType: "ggwhcs",
        id: "7_1",
        icon: "/images/marker/mapdot-scientific.png",
        lng: '109.70637', lat: "38.23220",
        name: "公告文化场所",
        label: { text: "公告文化场所1", font_size: 16 },
        dialogType: "zqfx",
        details: {
          name: "公告文化场所1",
          num: 1 + '115人',
          distance: "距2500km",
        }
      },
    ]
  },
  {
    markerType: "yy",
    id: "8",
    icon: "/images/marker/mapdot-scientific.png",
    name: "医院",
    markerList: [
      {
        markerType: "yy",
        id: "8_1",
        icon: "/images/marker/mapdot-scientific.png",
        lng: '109.70637', lat: "38.23220",
        name: "医院",
        label: { text: "医院", font_size: 16 },
        dialogType: "zqfx",
        details: {
          name: "医院",
          num: 1 + '115人',
          distance: "距2500km",
        }
      },
    ]
  },
]

import request from './index'

// 灾情分析下拉框
export const getZqfxDropdowndata = data => request.post("/jcfx/zqfx/dropdowndata", data)

// 灾情分析等级与区域
export const getZqfxLeveldata = data => request.post(`/jcfx/zqfx?typeId=${data.typeId}&startTime=${data.startTime}&endTime=${data.endTime}`,{})

// 灾情综合查询
export const getZqzhcx = data => request.post("/jcfx/zqzhcx", data)

// 重点防护目标列表
export const getZdfhmb = data => request.post(`/jcfx/zdfhmb?map_x=${data.map_x}&map_y=${data.map_y}&radius=${data.radius}`, data.typeIds)
// export const getZdfhmb = data => request.post(`/jcfx/zdfhmb`, data)
// 重点防护目标类型
export const getZdfhmbType = data => request.post("/jcfx/zdfhmb/typeid", data)

// 应急保障分析列表
export const getYybzfx = data => request.post(`/jcfx/yybzfx?map_x=${data.map_x}&map_y=${data.map_y}&radius=${data.radius}`, data.typeIds)
// export const getYybzfx = data => request.post("/jcfx/yybzfx", data)
// 应急保障分析类型
export const getYybzfxType = data => request.post("/jcfx/yybzfxtypeid", data)


// 获取案例库列表
export const getAlkList = data => request.post("/jcfx/alk", data)