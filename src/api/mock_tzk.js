import { assetsUrl } from '@/components/map/map2d/hook/index';
import { viewDetail } from '@/utils/funcNames/tzk';

export const yjsjDetails = {
  4: {
    address: "榆林市 陕西省榆林市榆阳区肤施路1号",
    detail: "化工厂未达到检测标准，排放工业污水vvv",
    type: "污水排放",
    area: "榆林市",
    time: "2023-05-11 18:23:39"
  },
  1: {
    address: "陕西省榆林市榆阳区肤施路xxx",
    detail: "化工厂未达到检测标准，排放工业污水bbb",
    type: "污水排放",
    area: "榆林市",
    time: "2023-06-11 18:23:39"
  },
  22: {
    address: "榆林市 陕西省榆林市榆阳区肤施路zzz",
    detail: "化工厂未达到检测标准，排放工业污水fff",
    type: "污水排放",
    area: "榆林市",
    time: "2023-05-11 18:23:39"
  },
  3: {
    address: "榆林市 陕西省榆林市榆阳区肤施路tttt",
    detail: "化工厂未达到检测标准，排放工业污水zzzz",
    type: "污水排放",
    area: "榆林市",
    time: "2023-04-11 18:23:39"
  },
}

export const enterpriseLists = [
  { id: 1, name: "XXXX企业", type: '主管单位', link: '王城', phone: "14598912341", phone1: "02888881234", address: "" },
  { id: 2, name: "XXXX企业", type: '主管单位', link: '王城1', phone: "14598912341", phone1: "02888881234", address: "" },
  { id: 3, name: "XXXX企业", type: '成员单位', link: '王城2', phone: "14598912341", phone1: "02888881234", address: "" },
  { id: 4, name: "XXXX企业", type: '成员单位', link: '王城3', phone: "14598912341", phone1: "02888881234", address: "" },
  { id: 5, name: "XXXX企业", type: '成员单位', link: '王城4', phone: "14598912341", phone1: "02888881234", address: "" },
  { id: 6, name: "XXXX企业", type: '成员单位', link: '王城5', phone: "14598912341", phone1: "02888881234", address: "" },
  { id: 71, name: "XXXX企业", type: '成员单位', link: '王城6', phone: "14598912341", phone1: "02888881234", address: "" },
]

export const syqxxLists = {
  ylzd: {
    markerType: "ylzd",
    id: "11",
    icon: "/images/marker/icon_ylzd.png",
    name: "雨量监测站",
    markerList: [
      {
        markerType: "ylzd",
        id: "11_1",
        icon: "/images/marker/icon_ylzd.png",
        lng: '109.684485',
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
        }
      },
    ]
  },
  swzd: {
    markerType: "swzd",
    id: "12",
    icon: "/images/marker/icon_swzd.png",
    name: "水位站点",
    markerList: [
      {
        markerType: "swzd",
        id: "12_1",
        icon: "/images/marker/icon_swzd.png",
        lng: '109.784485',
        lat: "38.997187",
        name: "水位站点",
        label: { text: "水位站点", font_size: 16 },
        dialogType: "swzd",
        details: {
          name: "白玉山水位测量站",
          type: "雨量站",
          sxmc: "黄河",
          address: "白云山",
        }
      },
    ]
  },
  sk: {
    markerType: "sk",
    id: "13",
    icon: "/images/marker/icon_sk.png",
    name: "水库",
    markerList: [
      {
        markerType: "sk",
        id: "13_1",
        icon: "/images/marker/icon_sk.png",
        lng: '109.774485',
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
          name: ""
        }
      },
    ]
  },
  jsd: {
    markerType: "jsd",
    id: "14",
    icon: "/images/marker/icon_jsd.png",
    name: "积水点信息",
    markerList: [
      {
        markerType: "jsd",
        id: "14_1",
        icon: "/images/marker/icon_jsd.png",
        lng: '109.184485',
        lat: "38.397187",
        name: "积水点信息",
        label: { text: "积水点信息", font_size: 16 },
        dialogType: "jsd",
        details: {
          name: "榆林市神木市尔林兔镇贾家梁村",
          info: "0.95米深度",
          person: "王厅夏",
          phone: "17323215510",
        }
      },
    ]
  },
  hdzd: {
    markerType: "hdzd",
    id: "11",
    icon: "/images/marker/icon_hdzd.png",
    name: "河道站点",
    markerList: [
      {
        markerType: "hdzd",
        id: "15_1",
        icon: "/images/marker/icon_hdzd.png",
        lng: '109.784485',
        lat: "38.597187",
        name: "河道站点",
        label: { text: "河道站点", font_size: 16 },
        dialogType: "hdzd",
        details: {
          name: "无定河一号监测站",
          type: "河道水位站",
          sxmc: "无定河",
          address: "波罗镇人民政府北侧约240米",
        }
      },
    ]
  },
}

export const yjzyLists = {
  yjry: [
    {
      markerType: "yjry",
      id: "100",
      icon: "/images/marker/icon_renyuan.png",
      name: "物资标记",
      markerList: [
        {
          markerType: "yjry",
          id: "100_1",
          icon: "/images/marker/icon_renyuan.png",
          lng: '109.85485',
          lat: "38.27187",
          name: "应急人员",
          label: { text: "应急人员", font_size: 16 },
          dialogType: "yjry",
          details: {
            personalName: "赵翠梅",
            job: "应急人员",
            orgName: "青山路街道办事处",
            linkPhone: "17323215510",
            duties: "日常巡逻发现隐患"
          }
        },
      ]
    }
  ],
  yjzj: [
    {
      markerType: "yjzj",
      id: "101",
      icon: "/images/marker/icon-expert.png",
      name: "应急专家",
      markerList: [
        {
          markerType: "yjzj",
          id: "101_1",
          icon: "/images/marker/icon-expert.png",
          lng: '109.94785',
          lat: "38.07187",
          name: "专家",
          label: { text: "专家", font_size: 16 },
          dialogType: "yjzj",
          details: {
            expertName: "",
            zc: "",
            domain: "",
            linkPhone: "",
            workUnit: "",
          }
        }
      ]
    }
  ],
  jydw: [
    {
      markerType: "jydw",
      id: "102",
      icon: "/images/marker/icon_team.png",
      name: "物资标记",
      markerList: [
        {
          markerType: "jydw",
          id: "102_1",
          icon: "/images/marker/icon_team.png",
          lng: '109.7485',
          lat: "37.2718",
          name: "救援队伍",
          label: { text: "救援队伍", font_size: 16 },
          dialogType: "jydw",
          details: {
            title: "神木市应急救援队",
            type: "地质灾害应急指挥部",
            total: "45",
            person: "于国平",
            phone: "17323215510",
          }
        },
        {
          markerType: "jydw",
          id: "102_2",
          lng: '109.9580',
          lat: "38.2910",
          name: "队伍三",
          phone: "13511117659",
          icon: "/images/marker/icon_team.png",
          label: { text: "队伍三", font_size: 16 },
          dialogType: "jydw",
          details: {
            name: "神木市应急救援队11",
            type: "地质灾害应急指挥部22",
            total: "4533",
            person: "于国平",
            phone: "17323215510",
          }
        }
      ]
    }
  ],
  yjwzk: [
    {
      markerType: "yjwzk",
      id: "103",
      icon: "/images/marker/icon_material.png",
      name: "物资标记",
      markerList: [
        {
          markerType: "yjwzk",
          id: "103_1",
          icon: "/images/marker/icon_material.png",
          lng: '109.485',
          lat: "38.2717",
          name: "仓库",
          label: { text: "仓库", font_size: 16 },
          dialogType: "yjwzk",
          details: {
            title: "榆阳区应急物资库",
            person: "于国平",
            address: "上郡中路龙沙绿园小区西南侧",
            phone: "17323215510",
          }
        },
        // {
        //   markerType: "yjwzk",
        //   id: "103_2",
        //   lng: '109.8450',
        //   lat: "38.2780",
        //   name: "仓库二",
        //   phone: "13511117659",
        //   icon: "/images/marker/icon_material.png",
        //   label: { text: "仓库二", font_size: 16 },
        //   dialogType: "yjwzk",
        //   details: {
        //     name: "榆阳区应急物资库11",
        //     person: "于国平22",
        //     address: "上郡中路龙沙绿园小区西南侧33",
        //     phone: "17323215510",
        //   }
        // }
      ]
    }
  ],
  bncs: [
    {
      markerType: "bncs",
      id: "104",
      icon: "/images/marker/icon_shelter.png",
      name: "避难场所",
      markerList: [
        {
          markerType: "bncs",
          id: "104_1",
          icon: "/images/marker/icon_shelter.png",
          lng: '109.74485',
          lat: "38.97187",
          name: "避难场所",
          label: { text: "避难场所", font_size: 16 },
          dialogType: "bncs",
          details: {
            title: "榆阳区避灾场所",
            area: "2000㎡",
            person: "1332",
            address: "长兴路榆林人民大厦",
          }
        },
      ]
    }
  ],
  spjk: [
    {
      markerType: "spjk",
      id: "105",
      icon: "/images/marker/mapdot-scientific.png",
      name: "物资标记",
      markerList: [
        {
          markerType: "spjk",
          id: "105_2",
          lng: '109.7840',
          lat: "38.9180",
          name: "监控",
          phone: "13511117659",
          icon: "/images/marker/mapdot-scientific.png",
          label: { text: "监控", font_size: 16 },
          dialogType: "spjk",
          details: {
            monitorName: "榆阳区",
            typeName: "自然灾害",
            location: "长兴路榆林人民大厦",
            playerUrl: ""
          }
        }
      ]
    }
  ],
  yjzb: [
    {
      markerType: "yjzb",
      id: "105",
      icon: "/images/marker/icon-material.png",
      name: "救援装备",
      markerList: [
        {
          markerType: "yjzb",
          id: "105_2",
          lng: '109.7840',
          lat: "38.9180",
          name: "救援装备",
          phone: "13511117659",
          icon: "/images/marker/icon-material.png",
          label: { text: "救援装备", font_size: 16 },
          dialogType: "yjzb",
          details: {
            title: "",
            address: "",
          }
        }
      ]
    }
  ],
  qyxx: [
    {
      markerType: "qyxx",
      id: "105",
      icon: "/images/marker/mapdot-building-6.png",
      name: "企业信息",
      markerList: [
        {
          markerType: "qyxx",
          id: "105_2",
          lng: '109.7840',
          lat: "38.9180",
          name: "企业信息",
          phone: "13511117659",
          icon: "/images/marker/mapdot-building-6.png",
          label: { text: "企业信息", font_size: 16 },
          dialogType: "qyxx",
          details: {
            title: "",
            address: "",
          }
        }
      ]
    }
  ],
  fhmb:[
    {
      markerType: "fhmb",
      id: "1051",
      icon: "/images/marker/icon_fhmb.png",
      name: "防护目标",
      markerList: [
        {
          markerType: "fhmb",
          id: "10500",
          lng: '109.7840',
          lat: "38.9180",
          name: "防护目标",
          phone: "13511117659",
          icon: "/images/marker/icon_fhmb.png",
          label: { text: "防护目标", font_size: 16 },
          dialogType: "fhmb",
          details: {
          }
        }
      ]
    }
  ],
  yjjg: [
    {
      markerType: "yjjg",
      id: "10025",
      icon: "/images/marker/icon_jigou.png",
      name: "应急机构",
      markerList: [
        {
          markerType: "yjjg",
          id: "10025_2",
          lng: '109.793327',
          lat: "38.286501",
          name: "应急机构",
          phone: "13511117659",
          icon: "/images/marker/icon_jigou.png",
          label: { text: "应急机构", font_size: 16 },
          dialogType: "yjjg",
          details: {
            orgName: "",
            typeName: '',
          }
        }
      ]
    }
  ],
  wrj: [
    {
      markerType: "wrj",
      id: "10025q",
      icon: "/images/marker/icon_wrj.png",
      name: "无人机",
      markerList: [
        {
          markerType: "wrj",
          id: "10025q_2",
          lng: '109.793327',
          lat: "38.286501",
          name: "无人机",
          phone: "13511117659",
          icon: "/images/marker/icon_wrj.png",
          label: { text: "无人机", font_size: 16 },
          dialogType: "wrj",
          details: {
            name: "无人机1",
          }
        }
      ]
    }
  ],
  wxdh: [
    {
      markerType: "wxdh",
      id: "100125q",
      icon: "/images/marker/icon_wxdh.png",
      name: "卫星电话",
      markerList: [
        {
          markerType: "wxdh",
          id: "100215q_2",
          lng: '109.793327',
          lat: "38.286501",
          name: "卫星电话",
          phone: "13511117659",
          icon: "/images/marker/icon_wxdh.png",
          label: { text: "卫星电话", font_size: 16 },
          dialogType: "wxdh",
          details: {
            sydw: "卫星电话1",
            lxr: "",
            bgrlxdh: ""
          }
        }
      ]
    }
  ],
}

export const fxyhLists = {
  dzyhd: [
    {
      markerType: "dzyhd",
      id: "1000",
      icon: "/images/marker/icon_dzycd.png",
      name: "地灾隐患点",
      markerList: [
        {
          markerType: "dzyhd",
          id: "1000_2",
          lng: '109.7840',
          lat: "38.9180",
          name: "地灾隐患点",
          phone: "13511117659",
          icon: "/images/marker/icon_dzycd.png",
          label: { text: "地灾隐患点", font_size: 16 },
          dialogType: "dzyhd",
          details: {
            title: "榆林市横山区胡石窑村",
            type: "泥石流",
            houseNum: "13",
            personNum: "34",
            person: "张雅宇",
            phone: "18900493799",
            address: "陕西省榆林市横山区",
          }
        }
      ]
    }
  ],
  lswjf: [
    {
      markerType: "lswjf",
      id: "1001",
      icon: "/images/marker/icon_lswjf.png",
      name: "历史危旧房",
      markerList: [
        {
          markerType: "lswjf",
          id: "1001_2",
          lng: '109.751442',
          lat: "38.307652",
          name: "历史危旧房",
          phone: "13511117659",
          icon: "/images/marker/icon_lswjf.png",
          label: { text: "历史危旧房", font_size: 16 },
          dialogType: "lswjf",
          details: {
            title: "庙沟门镇",
            person: "张达芳",
            houseNum: "3",
            level: "A",
            phone: "18900493799",
            type: "低保户",
            address: "边府线府谷农商银行西北侧约70米",
          }
        }
      ]
    }
  ],
  dzyfq: [
    {
      markerType: "dzyfq",
      id: "1002",
      icon: "/images/marker/icon_dzyfq.png",
      name: "地灾易发区",
      markerList: [
        {
          markerType: "dzyfq",
          id: "1002_2",
          lng: '109.726551',
          lat: "38.304554",
          name: "地灾易发区",
          phone: "13511117659",
          icon: "/images/marker/icon_dzyfq.png",
          label: { text: "地灾易发区", font_size: 16 },
          dialogType: "dzyfq",
          details: {
            name: "榆林市横山区胡石窑村",
            address: "Ⅰ级响应",
            linkName: "34",
            linkPhone: "13",
          }
        }
      ]
    }
  ],
  shyhd: [
    {
      markerType: "shyhd",
      id: "1000",
      icon: "/images/marker/icon_shyhd.png",
      name: "森火隐患点",
      markerList: [
        {
          markerType: "shyhd",
          id: "1000_2",
          lng: '109.796245',
          lat: "38.389572",
          name: "森火隐患点",
          phone: "13511117659",
          icon: "/images/marker/icon_shyhd.png",
          label: { text: "森火隐患点", font_size: 16 },
          dialogType: "shyhd",
          details: {
            name: "榆阳区",
            yxfw: "自然灾害",
            ffcs: "正常",
          }
        }
      ]
    }
  ],
  shzh: [
    {
      markerType: "shzh",
      id: "1004",
      icon: "/images/marker/icon_shzh.png",
      name: "山洪灾害",
      markerList: [
        {
          markerType: "shzh",
          id: "1004_2",
          lng: '109.798134',
          lat: "38.30186",
          name: "山洪灾害",
          phone: "13511117659",
          icon: "/images/marker/icon_shzh.png",
          label: { text: "山洪灾害", font_size: 16 },
          dialogType: "shzh",
          details: {
            title: "洪水灾害特别危险区",
            address: "榆林市横山区胡石窑村",
            houseNum: "13",
            personNum: "34",
            person: "李梓博",
            phone: "18900493799",
            do: "预警、人员转移",
          }
        }
      ]
    }
  ],
  csyld: [
    {
      markerType: "csyld",
      id: "1005",
      icon: "/images/marker/icon_csyl.png",
      name: "城市易涝点",
      markerList: [
        {
          markerType: "csyld",
          id: "1005_2",
          lng: '109.793327',
          lat: "38.286501",
          name: "城市易涝点",
          phone: "13511117659",
          icon: "/images/marker/icon_csyl.png",
          label: { text: "城市易涝点", font_size: 16 },
          dialogType: "csyld",
          details: {
            jswz: "",
            jsyy: '',
            zrdw: '',
            zrr: '',
          }
        }
      ]
    }
  ],
}

export const threePopupData1 = {
  ylzd: {
    name: '雨量监测站',
    list: [
      { id: 1, line1: "00：00", line2: "1.9" },
      { id: 2, line1: "03：00", line2: "0.0" },
      { id: 3, line1: "06：00", line2: "1.9" },
      { id: 4, line1: "09：00", line2: "0.0" },
      { id: 5, line1: "12：00", line2: "1.9" },
      { id: 6, line1: "15：00", line2: "10.0" },
    ],
    showSelect: false,
    headers: ['时间', '雨量mm']
  },
  swzd: {
    name: '水位监测站',
    list: [
      { id: 1, line1: "00：00", line2: "1.9" },
      { id: 2, line1: "03：00", line2: "0.0" },
      { id: 3, line1: "06：00", line2: "1.9" },
      { id: 4, line1: "09：00", line2: "0.0" },
      { id: 5, line1: "12：00", line2: "1.9" },
      { id: 6, line1: "15：00", line2: "10.0" },
    ],
    showSelect: true,
    headers: ['时间', '雨量mm']
  },
  sk: {
    name: '水库监测站',
    list: [
      { id: 1, line1: "00：00", line2: "123" },
      { id: 2, line1: "03：00", line2: "121" },
      { id: 3, line1: "06：00", line2: "125" },
      { id: 4, line1: "09：00", line2: "124" },
      { id: 5, line1: "12：00", line2: "123" },
      { id: 6, line1: "15：00", line2: "121" },
    ],
    showSelect: false,
    headers: ['时间', '水位高度']
  },
  hdzd: {
    name: '河道监测站',
    list: [
      { id: 1, line1: "水位", line2: "5.2m" },
      { id: 2, line1: "流量", line2: "1.8m/s" },
      { id: 3, line1: "流速", line2: "2.1m/s" },
      { id: 4, line1: "流向", line2: "从南向北" },
      { id: 5, line1: "水温", line2: "21.2℃" },
    ],
    showSelect: false,
    headers: ['类型', '监测指标']
  },
  qxzd: {
    name: '气象监测站',
    list: [
      { id: 1, line1: "温度", line2: "1.9" },
      { id: 2, line1: "湿度", line2: "0.0" },
      { id: 3, line1: "风向", line2: "1.9" },
      { id: 4, line1: "风速", line2: "0.0" },
      { id: 5, line1: "气压", line2: "1.9" },
      { id: 6, line1: "空气质量", line2: "10.0" },
    ],
    showSelect: true,
    headers: ['类型', '监测指标']
  },
}

export const popupData = {
  jsd: {
    title: "地灾隐患点信息",
    type: "list",
    data: [
      {
        label: '积水位置',
        value: '马溪路保通驾校门口',
        row: 'row_1'//row_2 row_3  决定一行排几个, 不传默认一行一个 
      },
      {
        label: '整改措施',
        value: '对该段积水道路进行整体提升改造。',
      },
      {
        label: '积水原因',
        value: '马溪路为南北向道路，武肃街以北段无雨水主管，此段道路武肃街路口地势高，北侧为山体，地势也较高，形成了两头高中间低（低洼处在偏北段）这一局面，且北面山体来水较多。排水方式原交警大队北侧为散排形式，后沿路不断有建房，散排也被基本阻断；保通驾校东侧原有地下管沟汇集雨水排入马溪，后因拆迁该处地下管沟也被阻断，最终导致该段道路雨水汇集后无处排放。',
      },
      {
        label: '责任单位',
        value: '城投集团、城市管理局、交警大队',
      },
      {
        label: '联系人员',
        value: '王振文、章吉、郑世伟',
      },
      {
        label: '联系电话',
        value: '13634136073、13758293931、13868038828',
      },
      {
        label: '措施',
        value: '单体泵排水、打开雨水篦子',
      },
    ]
  },

  dzyhd: {
    title: "泥石流",
    type: "table",
    data: [
      {
        name: 'XXX村1号泥石流',
        state: '已处置',
        level: '蓝色预警',
        warn_time: '2023-05-02 15:12:22',
        cont: '地表转移',
        deal_time: '2023-05-02 18:12:22',
        person: '王XX'
      },
      {
        name: 'XXX村1号泥石流',
        state: '已处置',
        level: '蓝色预警',
        warn_time: '2023-05-02 15:12:22',
        cont: '地表转移',
        deal_time: '2023-05-02 18:12:22',
        person: '王XX'
      },
      {
        name: 'XXX村1号泥石流',
        state: '已处置',
        level: '黄色预警',
        warn_time: '2023-05-02 15:12:22',
        cont: '地表转移',
        deal_time: '2023-05-02 18:12:22',
        person: '王XX'
      },
      {
        name: 'XXX村1号泥石流',
        state: '已处置',
        level: '蓝色预警',
        warn_time: '2023-05-02 15:12:22',
        cont: '地表转移',
        deal_time: '2023-05-02 18:12:22',
        person: '王XX'
      },
      {
        name: 'XXX村1号泥石流',
        state: '已处置',
        level: '蓝色预警',
        warn_time: '2023-05-02 15:12:22',
        cont: '地表转移',
        deal_time: '2023-05-02 18:12:22',
        person: '王XX'
      },
    ],
    tableHead: [
      {
        prop: 'name',
        label: '监测点名称',
        width: '130',
      },
      {
        prop: 'state',
        label: '处置状态',
        width: '',
      },
      {
        prop: 'level',
        label: '预警等级',
        style: {
          '黄色预警': { color: '#EAD80E' },
          '蓝色预警': { color: '#1B7EF2' },
        },
        width: '',
      },
      {
        prop: 'warn_time',
        label: '预警时间',
        width: '150',
      },
      {
        prop: 'cont',
        label: '预警内容',
        width: '',
      },
      {
        prop: 'deal_time',
        label: '处置时间',
        width: '150',
      },
      {
        prop: 'person',
        label: '处置人',
        width: '',
      },
    ]
  },
}

export const checkboxDatas = [
  {
    type: 'checkbox_popup',
    hasSerachBar: true,
    inputData: { label: '搜索地点名称', value: '' },
    buttonData: { name: '地图清除' },
    treeData: [
      {
        label: '地质灾害',
        num: '411'
      },
      {
        label: '泥石流',
        num: '415',
        children: [
          {
            label: '榆阳区',
            num: '41'
          },
          {
            label: '横山区',
            num: '11'
          },
          {
            label: '神木县',
            num: '31'
          },
          {
            label: '府谷县',
            num: '34'
          },
          {
            label: '靖边县',
            num: '34'
          },
          {
            label: '定边县',
            num: '34'
          },
          {
            label: '绥德县',
            num: '34'
          },
          {
            label: '米脂县',
            num: '34'
          },
          {
            label: '佳县',
            num: '34'
          },
          {
            label: '吴堡县',
            num: '34'
          },
          {
            label: '清涧县',
            num: '34'
          },
          {
            label: '子洲县',
            num: '34'
          },
        ]
      },
      {
        label: '滑坡',
        num: '105'
      },
      {
        label: '山体崩塌',
        num: '105'
      },
      {
        label: '地面塌陷',
        num: '105'
      },
      {
        label: '地裂缝',
        num: '105'
      },
      {
        label: '地面沉降',
        num: '105'
      },
      {
        label: '不稳定斜坡',
        num: '105'
      },
    ]
  },
  {
    type: 'checkbox_popup',
    hasSerachBar: true,
    inputData: { label: '搜索地点名称', value: '' },
    buttonData: { name: '地图清除' },
    treeData: [
      {
        label: '榆林市',
        num: '415',
        children: [
          {
            label: '榆阳区',
            num: '41'
          },
          {
            label: '横山区',
            num: '34'
          },
          {
            label: '神木县',
            num: '34'
          },
          {
            label: '府谷县',
            num: '34'
          },
          {
            label: '靖边县',
            num: '34'
          },
          {
            label: '定边县',
            num: '34'
          },
          {
            label: '绥德县',
            num: '34'
          },
          {
            label: '米脂县',
            num: '34'
          },
          {
            label: '佳县',
            num: '34'
          },
          {
            label: '吴堡县',
            num: '34'
          },
          {
            label: '清涧县',
            num: '34'
          },
          {
            label: '子洲县',
            num: '34'
          },
        ]
      },
    ]
  },
]

export const qyxxData = [
  {
    id: 1, name: '榆阳区', num: '248', pointInfo: {
      markerType: "qyxx",
      id: "1004_2",
      lng: '109.798134',
      lat: "38.30186",
      name: "企业信息",
      phone: "13511117659",
      icon: "/images/marker/mapdot-building-6.png",
      label: { text: "企业信息", font_size: 16 },
      dialogType: "qyxx",
      details: {
        name: "渔阳渔业有限责任公司",
        address: "榆阳区123号",
        person: "白国雨",
        phone: "18900493799",
        type: "农业",
        area: "榆阳区"
      }
    }
  },
  {
    id: 2, name: '横山区', num: '300', pointInfo: {
      markerType: "qyxx",
      id: "1004_2",
      lng: '109.798134',
      lat: "38.30186",
      name: "企业信息",
      phone: "13511117659",
      icon: "/images/marker/mapdot-building-6.png",
      label: { text: "企业信息", font_size: 16 },
      dialogType: "qyxx",
      details: {
        name: "渔阳渔业有限责任公司",
        address: "榆阳区123号",
        person: "白国雨",
        phone: "18900493799",
        type: "农业",
        area: "榆阳区"
      }
    }
  },
  {
    id: 3, name: '神木县', num: '320', pointInfo: {
      markerType: "qyxx",
      id: "1004_2",
      lng: '109.798134',
      lat: "38.30186",
      name: "企业信息",
      phone: "13511117659",
      icon: "/images/marker/mapdot-building-6.png",
      label: { text: "企业信息", font_size: 16 },
      dialogType: "qyxx",
      details: {
        name: "渔阳渔业有限责任公司",
        address: "榆阳区123号",
        person: "白国雨",
        phone: "18900493799",
        type: "农业",
        area: "榆阳区"
      }
    }
  },
  {
    id: 4, name: '府谷县', num: '200', pointInfo: {
      markerType: "qyxx",
      id: "1004_2",
      lng: '109.798134',
      lat: "38.30186",
      name: "企业信息",
      phone: "13511117659",
      icon: "/images/marker/mapdot-building-6.png",
      label: { text: "企业信息", font_size: 16 },
      dialogType: "qyxx",
      details: {
        name: "渔阳渔业有限责任公司",
        address: "榆阳区123号",
        person: "白国雨",
        phone: "18900493799",
        type: "农业",
        area: "榆阳区"
      }
    }
  },
  {
    id: 5, name: '佳县', num: '330', pointInfo: {
      markerType: "qyxx",
      id: "1004_2",
      lng: '109.798134',
      lat: "38.30186",
      name: "企业信息",
      phone: "13511117659",
      icon: "/images/marker/mapdot-building-6.png",
      label: { text: "企业信息", font_size: 16 },
      dialogType: "qyxx",
      details: {
        name: "渔阳渔业有限责任公司",
        address: "榆阳区123号",
        person: "白国雨",
        phone: "18900493799",
        type: "农业",
        area: "榆阳区"
      }
    }
  },
  {
    id: 6, name: '定边县', num: '230', pointInfo: {
      markerType: "qyxx",
      id: "1004_2",
      lng: '109.798134',
      lat: "38.30186",
      name: "企业信息",
      phone: "13511117659",
      icon: "/images/marker/mapdot-building-6.png",
      label: { text: "企业信息", font_size: 16 },
      dialogType: "qyxx",
      details: {
        name: "渔阳渔业有限责任公司",
        address: "榆阳区123号",
        person: "白国雨",
        phone: "18900493799",
        type: "农业",
        area: "榆阳区"
      }
    }
  },
  {
    id: 7, name: '子洲县', num: '180', pointInfo: {
      markerType: "qyxx",
      id: "1004_2",
      lng: '109.798134',
      lat: "38.30186",
      name: "企业信息",
      phone: "13511117659",
      icon: "/images/marker/mapdot-building-6.png",
      label: { text: "企业信息", font_size: 16 },
      dialogType: "qyxx",
      details: {
        name: "渔阳渔业有限责任公司",
        address: "榆阳区123号",
        person: "白国雨",
        phone: "18900493799",
        type: "农业",
        area: "榆阳区"
      }
    }
  },
]

export const safeCheckboxPoints = {
  fmks: {
    markerType: "fmks",
    id: "1",
    lng: '109.7840',
    lat: "38.9180",
    name: "非煤矿山",
    phone: "13511117659",
    icon: "/images/marker/icon_kuangshan.png",
    label: { text: "非煤矿山", font_size: 16 },
    dialogType: "fmks",
    details: {
      name: "非煤矿山",
      person: "张雅宇",
      phone: "18900493799",
      address: "陕西省榆林市横山区",
    }
  },
  gmqy: {
    markerType: "gmqy",
    id: "2",
    lng: '109.7840',
    lat: "37.9180",
    name: "工贸企业",
    phone: "13511117659",
    icon: "/images/marker/icon_gongmao.png",
    label: { text: "工贸企业", font_size: 16 },
    dialogType: "gmqy",
    details: {
      name: "工贸企业1",
      person: "张雅宇",
      phone: "18900493799",
      address: "陕西省榆林市横山区",
    }
  },
  yhbzqy: {
    markerType: "yhbzqy",
    id: "3",
    lng: '109.7840',
    lat: "37.6180",
    name: "烟花爆竹企业",
    phone: "13511117659",
    icon: "/images/marker/icon_yanhua.png",
    label: { text: "烟花爆竹企业", font_size: 16 },
    dialogType: "yhbzqy",
    details: {
      name: "烟花爆竹企业1",
      person: "张雅宇",
      phone: "18900493799",
      address: "陕西省榆林市横山区",
    }
  },
  mk: {
    markerType: "mk",
    id: "4",
    lng: '108.7840',
    lat: "37.6180",
    name: "煤矿",
    phone: "13511117659",
    icon: "/images/marker/icon_meikuang.png",
    label: { text: "煤矿", font_size: 16 },
    dialogType: "mk",
    details: {
      name: "煤矿1",
      person: "张雅宇",
      phone: "18900493799",
      address: "陕西省榆林市横山区",
    }
  },
  wkk: {
    markerType: "wkk",
    id: "5",
    lng: '107.7840',
    lat: "37.6180",
    name: "尾矿库",
    phone: "13511117659",
    icon: "/images/marker/icon_weikuang.png",
    label: { text: "尾矿库", font_size: 16 },
    dialogType: "wkk",
    details: {
      name: "尾矿库1",
      person: "张雅宇",
      phone: "18900493799",
      address: "陕西省榆林市横山区",
    }
  },
  jsjgy: {
    markerType: "jsjgy",
    id: "6",
    lng: '108.4840',
    lat: "37.6180",
    name: "金属加工业",
    phone: "13511117659",
    icon: "/images/marker/icon_jinshu.png",
    label: { text: "金属加工业", font_size: 16 },
    dialogType: "jsjgy",
    details: {
      name: "金属加工业1",
      person: "张雅宇",
      phone: "18900493799",
      address: "陕西省榆林市横山区",
    }
  },
  fjsjgy: {
    markerType: "fjsjgy",
    id: "7",
    lng: '110.2840',
    lat: "37.1980",
    name: "非金属加工业",
    phone: "13511117659",
    icon: "/images/marker/icon_feijinshu.png",
    label: { text: "非金属加工业", font_size: 16 },
    dialogType: "fjsjgy",
    details: {
      name: "非金属加工业1",
      person: "张雅宇",
      phone: "18900493799",
      address: "陕西省榆林市横山区",
    }
  },
  yqt: {
    markerType: "yqt",
    id: "8",
    lng: '110.2840',
    lat: "37.5",
    name: "油气田",
    phone: "13511117659",
    icon: "/images/marker/icon_youqitian.png",
    label: { text: "油气田", font_size: 16 },
    dialogType: "yqt",
    details: {
      name: "油气田1",
      person: "张雅宇",
      phone: "18900493799",
      address: "陕西省榆林市横山区",
    }
  },
  csc: {
    markerType: "csc",
    id: "9",
    lng: '110.2840',
    lat: "37.9180",
    name: "采石场",
    phone: "13511117659",
    icon: "/images/marker/icon_caishichang.png",
    label: { text: "采石场", font_size: 16 },
    dialogType: "csc",
    details: {
      name: "采石场1",
      person: "张雅宇",
      phone: "18900493799",
      address: "陕西省榆林市横山区",
    }
  },
  ltkc: {
    markerType: "ltkc",
    id: "10",
    lng: '110.2840',
    lat: "38.3180",
    name: "露天矿场",
    phone: "13511117659",
    icon: "/images/marker/icon_lutian.png",
    label: { text: "露天矿场", font_size: 16 },
    dialogType: "ltkc",
    details: {
      name: "露天矿场1",
      person: "张雅宇",
      phone: "18900493799",
      address: "陕西省榆林市横山区",
    }
  },
  wxy1: {
    markerType: "wxy1",
    id: "11",
    lng: '110.2840',
    lat: "38.6180",
    name: "一级危险源",
    phone: "13511117659",
    icon: "/images/marker/icon_weixianyuan1.png",
    label: { text: "一级危险源", font_size: 16 },
    dialogType: "wxy1",
    details: {
      name: "一级危险源1",
      person: "张雅宇",
      phone: "18900493799",
      address: "陕西省榆林市横山区",
    }
  },
  wxy2: {
    markerType: "wxy2",
    id: "12",
    lng: '110.2840',
    lat: "38.9180",
    name: "二级危险源",
    phone: "13511117659",
    icon: "/images/marker/icon_weixianyuan2.png",
    label: { text: "二级危险源", font_size: 16 },
    dialogType: "wxy2",
    details: {
      name: "二级危险源1",
      person: "张雅宇",
      phone: "18900493799",
      address: "陕西省榆林市横山区",
    }
  },
  wxy3: {
    markerType: "wxy3",
    id: "13",
    lng: '110.2840',
    lat: "39.2180",
    name: "三级危险源",
    phone: "13511117659",
    icon: "/images/marker/icon_weixianyuan3.png",
    label: { text: "三级危险源", font_size: 16 },
    dialogType: "wxy3",
    details: {
      name: "三级危险源1",
      person: "张雅宇",
      phone: "18900493799",
      address: "陕西省榆林市横山区",
    }
  },
  wxy4: {
    markerType: "wxy4",
    id: "14",
    lng: '110.7840',
    lat: "39.2180",
    name: "四级危险源",
    phone: "13511117659",
    icon: "/images/marker/icon_zhongda_weixian.png",
    label: { text: "四级危险源", font_size: 16 },
    dialogType: "wxy4",
    details: {
      name: "四级危险源1",
      person: "张雅宇",
      phone: "18900493799",
      address: "陕西省榆林市横山区",
    }
  },
  gajk: {
    markerType: "gajk",
    id: "15",
    lng: '110.5840',
    lat: "39.0180",
    name: "公安监控",
    phone: "13511117659",
    icon: "/images/marker/icon_gongan.png",
    label: { text: "公安监控", font_size: 16 },
    dialogType: "gajk",
    details: {
      name: "公安监控1",
      person: "张雅宇",
      phone: "18900493799",
      address: "陕西省榆林市横山区",
    }
  },
  zjjjk: {
    markerType: "zjjjk",
    id: "16",
    lng: '110.5840',
    lat: "38.7180",
    name: "住建局监控",
    phone: "13511117659",
    icon: "/images/marker/icon_zhujianju.png",
    label: { text: "住建局监控", font_size: 16 },
    dialogType: "zjjjk",
    details: {
      name: "住建局监控1",
      person: "张雅宇",
      phone: "18900493799",
      address: "陕西省榆林市横山区",
    }
  },
  sljjk: {
    markerType: "sljjk",
    id: "17",
    lng: '110.5840',
    lat: "38.4180",
    name: "水利局监控",
    phone: "13511117659",
    icon: "/images/marker/icon_shuiliju.png",
    label: { text: "水利局监控", font_size: 16 },
    dialogType: "sljjk",
    details: {
      name: "水利局监控1",
      person: "张雅宇",
      phone: "18900493799",
      address: "陕西省榆林市横山区",
    }
  },
  zrzhjk: {
    markerType: "zrzhjk",
    id: "18",
    lng: '109.7840',
    lat: "38.4180",
    name: "自然灾害监控",
    phone: "13511117659",
    icon: "/images/marker/icon_ziranzaihai.png",
    label: { text: "自然灾害监控", font_size: 16 },
    dialogType: "zrzhjk",
    details: {
      name: "自然灾害监控1",
      person: "张雅宇",
      phone: "18900493799",
      address: "陕西省榆林市横山区",
    }
  },
  hgyqjk: {
    markerType: "hgyqjk",
    id: "19",
    lng: '109.2840',
    lat: "38.4180",
    name: "化工园区监控",
    phone: "13511117659",
    icon: "/images/marker/icon_huagongyuanqu.png",
    label: { text: "化工园区监控", font_size: 16 },
    dialogType: "hgyqjk",
    details: {
      name: "化工园区监控1",
      person: "张雅宇",
      phone: "18900493799",
      address: "陕西省榆林市横山区",
    }
  },
}

export const spjkLists = {
  spjk:{
    markerType: "spjk",
    id: "100_111",
    icon: "/images/marker/mapdot-scientific.png",
    lng: '109.85485',
    lat: "38.27187",
    name: "视频监控",
    label: { text: "视频监控", font_size: 16 },
    dialogType: "spjk",
    details: {
      title: "监控1",
      address: "xxx",
    }
  }
}