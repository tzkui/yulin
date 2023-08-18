import icon1 from "@/assets/images/marker/icon-fxyh.png";
import icon2 from "@/assets/images/marker/icon-disaster.png";
import icon3 from "@/assets/images/marker/icon_nsl.png";
import icon4 from "@/assets/images/marker/icon_dzzh.png";
import icon5 from "@/assets/images/marker/icon_lf.png";
import icon6 from "@/assets/images/marker/icon_disaste.png";
import icon7 from "@/assets/images/marker/icon_bt.png";

//自然灾害
import zricon1 from "@/assets/images/marker/icon_yuqing.png";
import zricon2 from "@/assets/images/marker/icon_qixiang.png";
import zricon3 from "@/assets/images/marker/icon_shuiwei.png";
import zricon4 from "@/assets/images/marker/icon_dizhen.png";
import zricon5 from "@/assets/images/marker/icon_hedao.png";
import zricon6 from "@/assets/images/marker/icon_shuiku.png";
import zricon7 from "@/assets/images/marker/icon_dizhi_yinhuan.png";
import zricon8 from "@/assets/images/marker/icon_dizhi_yifa.png";
import zricon9 from "@/assets/images/marker/icon_dizhi_fangzhi.png";
import zricon10 from "@/assets/images/marker/icon_chengshi.png";
//安全生产
import safeicon1 from "@/assets/images/marker/icon_weihua.png";
import safeicon2 from "@/assets/images/marker/icon_zhongdian_gongyi.png";
import safeicon3 from "@/assets/images/marker/icon_zhongdian_huaxue.png";

import safeicon4 from "@/assets/images/marker/icon_huaxue.png";
import safeicon5 from "@/assets/images/marker/icon_zhongda_weixian.png";
import safeicon6 from "@/assets/images/marker/icon_fei_meikuang.png";
import safeicon7 from "@/assets/images/marker/icon_gongmao.png";
import safeicon8 from "@/assets/images/marker/icon_yanhua.png";
import safeicon9 from "@/assets/images/marker/icon_meikuang.png";
import safeicon10 from "@/assets/images/marker/icon_weikuang.png";
import safeicon11 from "@/assets/images/marker/icon_jinshu.png";
import safeicon12 from "@/assets/images/marker/icon_feijinshu.png";
import safeicon13 from "@/assets/images/marker/icon_youqitian.png";
import safeicon14 from "@/assets/images/marker/icon_caishichang.png";
import safeicon15 from "@/assets/images/marker/icon_lutian.png";
//指挥调度
import zhihuiicon1 from "@/assets/images/marker/icon_duiwu.png";
import zhihuiicon2 from "@/assets/images/marker/icon_jigou.png";
import zhihuiicon3 from "@/assets/images/marker/icon_renyuan.png";

import zhihuiicon4 from "@/assets/images/marker/icon_zhuangbei.png";
import zhihuiicon5 from "@/assets/images/marker/icon_zhuanjia.png";
import zhihuiicon6 from "@/assets/images/marker/icon_wuzhiku.png";
import zhihuiicon7 from "@/assets/images/marker/icon_binan_changsuo.png";
import zhihuiicon8 from "@/assets/images/marker/icon_fanghu.png";
import zhihuiicon9 from "@/assets/images/marker/icon_jiaotong_yunshu.png";
//视频监控
import spicon1 from "@/assets/images/marker/icon_gongan.png";
import spicon2 from "@/assets/images/marker/icon_zhujianju.png";
import spicon3 from "@/assets/images/marker/icon_shuiliju.png";
import spicon4 from "@/assets/images/marker/icon_ziranzaihai.png";
import spicon5 from "@/assets/images/marker/icon_huagongyuanqu.png";
export default {
  //自然灾害
  ziranzaihaiList: [
    {
      name: "雨情监测站",
      num: 10,
      value: 0,
      type: "yuqing",
      icon: zricon1,
    },
    {
      name: "气象监测站",
      num: 5,
      value: 1,
      type: "qixiang",
      icon: zricon2,
    },
    {
      name: "水位监测站",
      num: 3,
      value: 2,
      type: "shuiwei",
      icon: zricon3,
    },
    {
      name: "地震监测站",
      num: 0,
      value: 3,
      type: "dizhen",
      icon: zricon4
    },
    {
      name: "河道监测站",
      num: 0,
      value: 4,
      type: "hedao",
      icon: zricon5
    },
    {
      name: "水库监测站",
      num: 0,
      value: 5,
      type: "shuiku",
      icon: zricon6
    },
    {
      name: "地质灾害隐患点",
      num: 0,
      value: 6,
      type: "dizhi_yinhuan",
      icon: zricon7
    },
    {
      name: "地址灾害易发区",
      num: 0,
      value: 7,
      type: "dizhi_yifa",
      icon: zricon8
    },
    {
      name: "地址灾害防治规划区",
      num: 0,
      value: 8,
      type: "dizhi_fangzhi",
      icon: zricon9
    },
    {
      name: "城区内涝",
      num: 0,
      value: 9,
      type: "chengshi",
      icon: zricon10
    },
  ],
  //安全生产
  safeList: [
    {
      name: "危化企业分布",
      num: 12,
      value: 0,
      type: "weihua",
      icon: safeicon1,
    },
    {
      name: "重点监管工艺",
      num: 8,
      value: 1,
      type: "zhongdian_gongyi",
      icon: safeicon2,
    },
    {
      name: "重点监管化学品",
      num: 5,
      value: 2,
      type: "zhongdian_huaxue",
      icon: safeicon3,
    },
    {
      name: "化学品仓库",
      num: 0,
      value: 3,
      type: "huaxue",
      icon: safeicon4,
    },
    {
      name: "重大危险源",
      num: 0,
      value: 4,
      type: "zhongda_weixian",
      icon: safeicon5,
    },
    {
      name: "非煤矿山分布",
      num: 0,
      value: 5,
      type: "fei_meikuang",
      icon: safeicon6,
    },
    {
      name: "工贸企业分布",
      num: 0,
      value: 6,
      type: "gongmao",
      icon: safeicon7,
    },
    {
      name: "烟花爆竹企业分布",
      num: 0,
      value: 7,
      type: "yanhua",
      icon: safeicon8,
    },
    {
      name: "煤矿分布",
      num: 0,
      value: 8,
      type: "meikuang",
      icon: safeicon9,
    },
    {
      name: "尾矿库",
      num: 0,
      value: 9,
      type: "weikuang",
      icon: safeicon10,
    },
    {
      name: "金属加工企业",
      num: 0,
      value: 10,
      type: "jinshu",
      icon: safeicon11,
    },
    {
      name: "非金属加工企业",
      num: 0,
      value: 11,
      type: "feijinshu",
      icon: safeicon12,
    },
    {
      name: "油气田分布",
      num: 0,
      value: 12,
      type: "youqitian",
      icon: safeicon13,
    },
    {
      name: "采石场",
      num: 0,
      value: 13,
      type: "caishichang",
      icon: safeicon14,
    },
    {
      name: "露天矿厂",
      num: 0,
      value: 14,
      type: "lutian",
      icon: safeicon15,
    },
  ],
  //指挥调度
  zhihuiList: [
    {
      name: "应急队伍",
      num: 12,
      value: 0,
      type: "duiwu",
      icon: zhihuiicon1
    },
    {
      name: "应急机构",
      num: 5,
      value: 1,
      type: "jigou",
      icon: zhihuiicon2
    },
    {
      name: "应急人员",
      num: 2,
      value: 2,
      type: "renyuan",
      icon: zhihuiicon3
    },
    {
      name: "应急装备",
      num: 0,
      value: 3,
      type: "zhuangbei",
      icon: zhihuiicon4
    },
    {
      name: "应急专家",
      num: 0,
      value: 4,
      type: "zhuanjia",
      icon: zhihuiicon5
    },
    {
      name: "应急物资库",
      num: 0,
      value: 5,
      type: "wuzhiku",
      icon: zhihuiicon6
    },
    {
      name: "避难场所",
      num: 0,
      value: 6,
      type: "binan_changsuo",
      icon: zhihuiicon7
    },
    {
      name: "防护目标",
      num: 0,
      value: 7,
      type: "fanghu",
      icon: zhihuiicon8
    },
    {
      name: "应急交通运输",
      num: 0,
      value: 8,
      type: "jiaotong_yunshu",
      icon: zhihuiicon9
    },
  ],
  //视频监控
  shipList: [
    {
      name: "公安视频监控",
      num: 18,
      value: 0,
      type: "gongan",
      icon: spicon1
    },
    {
      name: "住建局监控",
      num: 10,
      value: 1,
      type: "zhujianju",
      icon: spicon2
    },
    {
      name: "水利局监控",
      num: 5,
      value: 2,
      type: "shuiliju",
      icon: spicon3
    },
    {
      name: "自然灾害监控",
      num: 0,
      value: 3,
      type: "ziranzaihai",
      icon: spicon4
    },
    {
      name: "化工园区监控",
      num: 0,
      value: 4,
      type: "huagongyuanqu",
      icon: spicon5
    },

  ],
  //地址灾害隐患点
  cities: [
    {
      markerType: "hp",
      id: "2",
      icon: "/images/marker/icon-fxyh.png",
      img: icon1,
      name: "滑坡",
      maekerList: [
        {
          markerType: "hp",
          id: "2_7",
          icon: "/images/marker/icon-fxyh.png",
          lng: "109.754936",
          lat: "38.308786",
          name: "滑坡1",
          label: { text: "滑坡1", font_size: 16 },
        },
        {
          markerType: "hp",
          id: "2_8",
          icon: "/images/marker/icon-fxyh.png",
          lng: "109.783432",
          lat: "38.256235",

          name: "滑坡2",
          label: { text: "滑坡2", font_size: 16 },
        },
      ],
    },
    {
      markerType: "nsl",
      id: "3",
      icon: "/images/marker/icon-disaster.png",
      name: "泥石流",
      img: icon2,
      maekerList: [
        {
          markerType: "nsl",
          id: "3_1",
          icon: "/images/marker/icon-disaster.png",
          lng: "109.754936",
          lat: "38.308786",
          name: "泥石流",
          label: { text: "泥石流", font_size: 16 },
        },
      ],
    },

    {
      markerType: "stbt",
      id: "4",
      name: "山体崩塌",
      img: icon3,
      maekerList: [
        {
          markerType: "stbt",
          id: "4_1",
          icon: "/images/marker/icon-disaster.png",
          lng: "109.745667",
          lat: "38.336529",
          name: "山体崩塌",
          label: { text: "山体崩塌", font_size: 16 },
        },
      ],
    },

    {
      markerType: "dmtx",
      id: "5",
      icon: "/images/marker/icon-disaster.png",
      name: "地面塌陷",
      img: icon4,
      maekerList: [
        {
          markerType: "dmtx",
          id: "5_1",
          icon: "/images/marker/icon-disaster.png",
          lng: "109.785835",
          lat: "38.283728",
          name: "地面塌陷",
          label: { text: "地面塌陷", font_size: 16 },
        },
      ],
    },
    {
      markerType: "dlf",
      id: "6",
      icon: "/images/marker/icon-disaster.png",
      name: "地裂缝",
      img: icon5,
      maekerList: [
        {
          markerType: "dlf",
          id: "6_1",
          icon: "/images/marker/icon-disaster.png",
          lng: "109.773132",
          lat: "38.213356",
          name: "地裂缝",
          label: { text: "地裂缝", font_size: 16 },
        },
      ],
    },

    {
      markerType: "dmcj",
      id: "7",
      icon: "/images/marker/icon-disaster.png",
      name: "地面沉降",
      img: icon6,
      maekerList: [
        {
          markerType: "dmcj",
          id: "7_1",
          icon: "/images/marker/icon-disaster.png",
          lng: "109.732964",
          lat: "38.28292",
          name: "地面沉降",
          label: { text: "地面沉降", font_size: 16 },
        },
      ],
    },

    {
      markerType: "xp",
      id: "8",
      icon: "/images/marker/icon-disaster.png",
      name: "不稳定斜坡",
      img: icon7,
      maekerList: [
        {
          markerType: "xp",
          id: "8_1",
          icon: "/images/marker/icon-disaster.png",
          lng: "109.727814",
          lat: "38.294776",
          name: "不稳定斜坡",
          label: { text: "不稳定斜坡", font_size: 16 },
        },
      ],
    },
  ],
}

/**
 * 获取点列表
 * @param {*} id childTab的id
 * @param {*} type 类型
 * @param {*} name 名称
 * @param {*} count 生成点的数量
 * @returns 
 */
export function getMarkerData (id, value, type, name, count) {
  let arr = [];

  const oneIcon = "/images/marker/icon_personal1.png";


  const lngBasic = 109.754936;
  const latBasic = 38.308786;

  if (count) {
    for (let i = 0; i < count; i++) {
      arr.push({
        markerType: type,
        dialogType: type,
        id: `${id}_${i}`,
        // icon: i % 2 ? oneIcon : twoIcon,
        icon: value <= 2 ? `/images/marker/icon_${type}.png` : oneIcon,
        lng: lngBasic + Math.random() + (i + 1) / 100,
        lat: latBasic + Math.random() + (i + 1) / 100,
        name: `${name}_${i}`,
        label: { text: `${name}_${i}`, font_size: 16 },
        details: {
          name: `${name}_${i}`,
          job: "应急人员",
          compony: "青山路街道办事处",
          aphone: "36563",
          phone: "14590909876",
          duty: "日常巡逻发现隐患",
          id: id
        },
      })
    }
  }

  return arr;
}