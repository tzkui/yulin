export const baseMarkerInfo = {
  ylzd: {
    markerType: "ylzd",
    id: "11",
    icon: "/images/marker/icon_ylzd.png",
    name: "雨量监测站",
    maekerList: [
      {
        markerType: "ylzd",
        id: "11_1",
        icon: "/images/marker/icon_ylzd.png",
        lng: "109.684485",
        lat: "38.297187",
        name: "雨量监测站",
        label: { text: "雨量监测站", font_size: 16 },
        dialogType: "ylzd",
        details: {
          name: "xxx村1号雨量监测站",
          time: "2023-07-09\t16:20:00",
          h1: "0mm",
          h2: "0mm",
          h3: "0mm",
          h4: "0mm",
          h5: "0mm",
        },
      },
    ],
  },
  swzd: {
    markerType: "swzd",
    id: "12",
    icon: "/images/marker/icon_swzd.png",
    name: "水位站点",
    maekerList: [
      {
        markerType: "swzd",
        id: "12_1",
        icon: "/images/marker/icon_swzd.png",
        lng: "109.784485",
        lat: "38.997187",
        name: "水位站点",
        label: { text: "水位站点", font_size: 16 },
        dialogType: "swzd",
        details: {
          name: "白玉山水位测量站",
          type: "雨量站",
          sxmc: "黄河",
          address: "白云山",
        },
      },
    ],
  },
  sk: {
    markerType: "sk",
    id: "13",
    icon: "/images/marker/icon_sk.png",
    name: "水库",
    maekerList: [
      {
        markerType: "sk",
        id: "13_1",
        icon: "/images/marker/icon_sk.png",
        lng: "109.774485",
        lat: "38.267187",
        name: "水库",
        label: { text: "水库", font_size: 16 },
        dialogType: "sk",
        details: {
          dqsw: "123",
          xxsw: "123",
          gsw: "123",
          address: "0mm",
          status: "#25E3D8",
        },
      },
    ],
  },
  jsd: {
    markerType: "jsd",
    id: "14",
    icon: "/images/marker/icon_jsd.png",
    name: "积水点信息",
    maekerList: [
      {
        markerType: "jsd",
        id: "14_1",
        icon: "/images/marker/icon_jsd.png",
        lng: "109.184485",
        lat: "38.397187",
        name: "积水点信息",
        label: { text: "积水点信息", font_size: 16 },
        dialogType: "jsd",
        details: {
          name: "榆林市神木市尔林兔镇贾家梁村",
          info: "0.95米深度",
          person: "王厅夏",
          phone: "17323215510",
        },
      },
    ],
  },
  hdzd: {
    markerType: "hdzd",
    id: "15",
    icon: "/images/marker/icon_hdzd.png",
    name: "河道站点",
    maekerList: [
      {
        markerType: "hdzd",
        id: "15_1",
        icon: "/images/marker/icon_hdzd.png",
        lng: "109.784485",
        lat: "38.597187",
        name: "河道站点",
        label: { text: "河道站点", font_size: 16 },
        dialogType: "hdzd",
        details: {
          name: "无定河一号监测站",
          type: "河道水位站",
          sxmc: "无定河",
          address: "波罗镇人民政府北侧约240米",
        },
      },
    ],
  },
  yjry: {
    markerType: "yjry",
    id: "100",
    icon: "/images/marker/icon_renyuan.png",
    name: "应急人员",
    maekerList: [
      {
        markerType: "yjry",
        id: "100_1",
        icon: "/images/marker/icon_renyuan.png",
        lng: '109.85485',
        lat: "38.27187",
        name: "防汛责任人1",
        label: { text: "防汛责任人1", font_size: 16 },
        dialogType: "yjry",
        details: {
          name: "赵翠梅",
          job: "应急人员",
          compony: "青山路街道办事处",
          aphone: "36563",
          phone: "17323215510",
          duty: "日常巡逻发现隐患"
        }
      },
    ]
  },
  yjzj: {
    markerType: "yjzj",
    id: "101",
    icon: "/images/marker/icon-expert.png",
    name: "应急专家",
    maekerList: [
      {
        markerType: "yjzj",
        id: "101_1",
        icon: "/images/marker/icon-expert.png",
        lng: '109.94785',
        lat: "38.07187",
        name: "专家一",
        label: { text: "专家一", font_size: 16 },
        dialogType: "yjzj",
        details: {
          name: "赵翠梅",
          job: "大学教授",
          compony: "陕西XX大学XX系",
          dir: "山体滑坡",
          phone: "17323215510",
        }
      }
    ]
  }
};
