
export const getMarkerInfo = function (typeId, data) {
  if (typeId == "4dc072310d1310c95dd3d1d5349cdf9c") {
    // 汽车站
    return {
      markerType: "qcz",
      id: data.id,
      icon: "/images/marker/icon_fei_meikuang.png",
      lng: data.mapX || "",
      lat: data.mapY || "",
      name: "汽车站",
      label: { text: "汽车站", font_size: 16 },
      dialogType: "zqfx",
      details: {
        name: data.name,
        areaCovered: data.areaCovered + " ㎡",
        linkName: data.linkName,
        linkPhone: data.linkPhone,
      },
    };
  } else if (typeId == "5dfd1e89da99722490da9839145ab498") {
    // 学校
    return {
      markerType: "xx",
      id: data.id,
      icon: "/images/marker//mapdot-school.png",
      lng: data.mapX || "",
      lat: data.mapY || "",
      name: "学校",
      label: { text: "学校", font_size: 16 },
      dialogType: "zqfx_xx",
      details: {
        name: data.name,
        area: data.areaCovered + " ㎡",
        linkName: data.linkName,
        linkPhone: data.linkPhone,
        location: data.location,
      },
    };
  } else if (typeId == "60f10175641c56360bf2c24d81a6f31c") {
    // 加气站
    return {
      markerType: "cs",
      id: data.id,
      icon: "/images/marker/m2.png",
      lng: data.mapX || "",
      lat: data.mapY || "",
      name: "加气站",
      label: { text: "加气站", font_size: 16 },
      dialogType: "jqz",
      details: {
        name: data.name,
        area: data.areaCovered + " ㎡",
        linkName: data.linkName,
        linkPhone: data.linkPhone,
        location: data.location,
      },
    };
  } else if (typeId == "6a95025bf122e6150de7e0e142525b53") {
    // 油气站
    return {
      markerType: "qy",
      id: data.id,
      icon: "/images/marker/mapdot-building-6.png",
      lng: data.mapX || "",
      lat: data.mapY || "",
      name: "油气站",
      label: { text: "油气站", font_size: 16 },
      dialogType: "yqz",
      details: {
        name: data.name,
        area: data.areaCovered + " ㎡",
        linkName: data.linkName,
        linkPhone: data.linkPhone,
        location: data.location,
      },
    };
  } else if (typeId == "87aff28c9ab509c703c70f99919a422b") {
    // 旅游景区
    return {
      markerType: "lyjq",
      id: data.id,
      icon: "/images/marker/mapdot-construction-machinery.png",
      lng: data.mapX || "",
      lat: data.mapY || "",
      name: "lyjq",
      label: { text: "旅游景区", font_size: 16 },
      dialogType: "lyjq",
      details: {
        name: data.name,
        area: data.areaCovered + " ㎡",
        linkName: data.linkName,
        linkPhone: data.linkPhone,
        location: data.location,
      },
    };
  } else if (typeId == "8a7e9d3ff3e1c8bd4368f534f1fb4ac1") {
    // 体育馆
    return {
      markerType: "tyg",
      id: data.id,
      icon: "/images/marker/icon_warehouse.png",
      lng: data.mapX || "",
      lat: data.mapY || "",
      name: "体育馆",
      label: { text: "体育馆", font_size: 16 },
      dialogType: "tyg",
      details: {
        name: data.name,
        area: data.areaCovered + " ㎡",
        linkName: data.linkName,
        linkPhone: data.linkPhone,
        location: data.location,
      },
    };
  } else if (typeId == "d9dbb206574b2bba3e61854c9619db75") {
    // 公共文化场所
    return {
      markerType: "ggwhcs",
      id: data.id,
      icon: "/images/marker/mapdot-scientific.png",
      lng: data.mapX || "",
      lat: data.mapY || "",
      name: "公共文化场所",
      label: { text: "公共文化场所", font_size: 16 },
      dialogType: "ggwhcs",
      details: {
        name: data.name,
        area: data.areaCovered + " ㎡",
        linkName: data.linkName,
        linkPhone: data.linkPhone,
        location: data.location,
      },
    };
  } else if (typeId == "efdedec4f3450981d8d0fae0dc95b15a") {
    // 医院
    return {
      markerType: "zddx_yy",
      id: data.id,
      icon: "/images/marker/mapdot-scientific.png",
      lng: data.mapX || "",
      lat: data.mapY || "",
      name: "医院",
      label: { text: "医院", font_size: 16 },
      dialogType: "zddx_yy",
      details: {
        name: data.name,
        area: data.areaCovered + " ㎡",
        linkName: data.linkName,
        linkPhone: data.linkPhone,
        location: data.location,
      },
    };
  } else if (typeId == "zdwz") {
    // 重点物资
    return {
      markerType: "zdwz",
      id: data.id,
      icon: "/images/marker/icon-space.png",
      lng: data.mapX || "",
      lat: data.mapY || "",
      name: "重点物资",
      label: { text: "重点物资", font_size: 16 },
      dialogType: "newyydxtj",
      details: {
        name: data.name,
        linkName: data.linkName,
        linkPhone: data.linkPhone,
        storageCapacity: data.storageCapacity,
      },
    };
  } else if (typeId == "wzck") {
    // 物资仓库
    return {
      markerType: "wzck",
      id: data.id,
      icon: "/images/marker/icon_warehouse.png",
      lng: data.mapX || "",
      lat: data.mapY || "",
      name: "物资仓库",
      label: { text: "物资仓库", font_size: 16 },
      dialogType: "yjwzk",
      details: {
        title: data.name,
        person: data.linkName,
        phone: data.linkPhone,
        address: data.address,
      },
    };
  } else if (typeId == "jydw") {
    // 救援队伍
    return {
      markerType: "jydw",
      id: data.id,
      icon: "/images/marker/icon_team.png",
      lng: data.mapX || "",
      lat: data.mapY || "",
      name: "救援队伍",
      label: { text: "救援队伍", font_size: 16 },
      dialogType: "newyydxtj",
      details: {
        name: data.name,
        linkName: data.linkName,
        linkPhone: data.linkPhone,
        storageCapacity: data.storageCapacity,
      },
    };
  } else if (typeId == "bncs") {
    // 避难场所
    return {
      markerType: "bncs",
      id: data.id,
      icon: "/images/marker/icon-bncs.png",
      lng: data.mapX || "",
      lat: data.mapY || "",
      name: "避难场所",
      label: { text: "避难场所", font_size: 16 },
      dialogType: "bncs",
      details: {
        title: data.name,
        area: data.areaCovered,
        accommodateNum: data.accommodateNum,
        person: data.linkName,
        phone: data.linkPhone,
      },
    };
  } else if (typeId == "dxjx") {
    // 大型机械
    return {
      markerType: "dxjx",
      id: data.id,
      icon: "/images/marker/mapdot-construction-machinery.png",
      lng: data.mapX || "",
      lat: data.mapY || "",
      name: "大型机械",
      label: { text: "大型机械", font_size: 16 },
      dialogType: "yydxtj",
      details: {
        name: data.name,
        linkName: data.linkName,
        linkPhone: data.linkPhone,
        storageCapacity: data.storageCapacity,
      },
    };
  } else if (typeId == "yjgb") {
    // 应急广播
    return {
      markerType: "yjgb",
      id: data.id,
      icon: "/images/marker/mapdot-volume-up-f.png",
      lng: data.mapX || "",
      lat: data.mapY || "",
      name: "应急广播",
      label: { text: "应急广播", font_size: 16 },
      dialogType: "yydxtj",
      details: {
        name: data.name,
        linkName: data.linkName,
        linkPhone: data.linkPhone,
        storageCapacity: data.storageCapacity,
      },
    };
  } else if (typeId == "spjk") {
    // 视频监控
    return {
      markerType: "spjk",
      id: data.id,
      icon: "/images/marker/mapdot-scientific.png",
      lng: data.mapX || "",
      lat: data.mapY || "",
      name: "视频监控",
      label: { text: "视频监控", font_size: 16 },
      dialogType: "spjk",
      details: {
        monitorName: data.name,
        typeName: data.typeName,
        location: data.location,
      },
    };
  } else if (typeId == "煤矿") {
    return {
      markerType: "mk",
      id: data.id,
      lng: data.longitude,
      lat: data.latitude,
      name: "煤矿",
      icon: "/images/marker/icon_meikuang.png",
      label: { text: "煤矿", font_size: 16 },
      dialogType: "mk",
      details: {
        name: data.enterpriseName,
        type: data.enterpriseType,
        area: data.xzqhName,
        address: data.address,
      },
    };
  } else if (typeId == "非煤矿山") {
    return {
      markerType: "fmks",
      id: data.id,
      lng: data.longitude,
      lat: data.latitude,
      name: "非煤矿山",
      icon: "/images/marker/icon_kuangshan.png",
      label: { text: "非煤矿山", font_size: 16 },
      dialogType: "fmks",
      details: {
        name: data.enterpriseName,
        type: data.enterpriseType,
        area: data.xzqhName,
        address: data.address,
      },
    };
  } else if (typeId == "烟花爆竹") {
    return {
      markerType: "yhbzqy",
      id: data.id,
      lng: data.longitude,
      lat: data.latitude,
      name: "烟花爆竹企业",
      icon: "/images/marker/icon_yanhua.png",
      label: { text: "烟花爆竹企业", font_size: 16 },
      dialogType: "yhbzqy",
      details: {
        name: data.enterpriseName,
        type: data.enterpriseType,
        area: data.xzqhName,
        address: data.address,
      },
    };
  } else if (typeId == "危化") {
    return {
      markerType: "qyxx",
      id: data.id,
      lng: data.longitude,
      lat: data.latitude,
      name: "危化企业",
      icon: "/images/marker/mapdot-dangerous-chemicals.png",
      label: { text: "危化企业", font_size: 16 },
      dialogType: "qyxx",
      details: {
        name: data.enterpriseName,
        type: data.enterpriseType,
        area: data.xzqhName,
        address: data.address,
      },
    };
  } else if (typeId == "尾矿库") {
    return {
      markerType: "qyxx",
      id: data.id,
      lng: data.longitude,
      lat: data.latitude,
      name: "尾矿库",
      icon: "/images/marker/mapdot-dangerous-chemicals.png",
      label: { text: "尾矿库", font_size: 16 },
      dialogType: "qyxx",
      details: {
        name: data.enterpriseName,
        type: data.enterpriseType,
        area: data.xzqhName,
        address: data.address,
      },
    };
  }
};