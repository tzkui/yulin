<template>
  <div
    class="tree_check"
    :style="{ transform: isHide ? 'translateY(calc(100% + 30px))' : '' }"
  >
    <div
      class="hideIcon"
      @click="isHide = !isHide"
      :style="{ transform: isHide ? 'rotate(180deg)' : '' }"
    ></div>
    <div class="tree_check_box">
      <div class="search_box">
        <el-input v-model="search_value" placeholder="请输入关键字" clearable />
        <img
          class="img"
          @click="searchTreeData"
          src="@/assets/home/icon_search.png"
          alt=""
        />
      </div>
      <el-checkbox v-model="checked_all" @change="checkAll" label="选择全部" />
      <el-tree
        :data="nowTreeList"
        show-checkbox
        node-key="type"
        :props="defaultProps"
        @node-click="nodeClick"
        @check="checkItem"
        ref="elTreeRef"
      >
        <template #default="{ node, data }">
          <span class="custom-tree-node" :id="data.type + 'checkbox'">
            <img
              @click="
                () => {
                  console.log(node, data);
                }
              "
              class="icon"
              :src="imgefileUrl(data.icon)"
              alt=""
            />
            <span class="name">{{ data.name }}</span>
          </span>
        </template>
      </el-tree>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, inject, nextTick, watch } from "vue";
import { icon_config } from "@/config/common.js";
import entityDict from "@/utils/entityDict.js";
import { fxyhLists, yjzyLists, spjkLists } from "@/api/mock_tzk.js";
import { getYjjg } from "@/api/modules/home.js";
import { getFxgz } from "@/api/modules/zrzh.js";
const $mitt = inject("$mitt");
const checked_all = ref(false);
const elTreeRef = ref();
const isHide = ref(false);
const defaultProps = {
  children: "children",
  label: "name",
};
const otherLists = {
  jsd: [
    {
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
  ],
};
let data = ref([]);
let resource_data = ref([
  {
    id: 1,
    type: "yjjg",
    name: "应急机构",
    icon: "../../../assets/images/marker/icon_jigou.png",
    py: "yjjg",
    pinyin:"yingjijigou"
  },
  {
    id: 2,
    type: "jydw",
    name: "救援队伍",
    icon: "../../../assets/images/marker/icon_team.png",
    py: "jydw",
    pinyin:"jiuyuanduiwu"
  },
  // {
  //   id: 3,
  //   type: "yjry",
  //   name: "应急人员",
  //   icon: "../../../assets/home/icon_marker3.png",
  // },
  {
    id: 4,
    type: "yjzj",
    name: "应急专家",
    icon: "../../../assets/images/marker/icon-expert.png",
    py: "yjjg",
    pinyin:"yingjizhuanjia"
  },
  {
    id: 5,
    type: "yjwzk",
    name: "物资仓库",
    icon: "../../../assets/images/marker/icon_warehouse.png",
    py: "wzck",
    pinyin:"wuzicangku"
  },
  {
    id: 6,
    type: "yjzb",
    name: "救援装备",
    icon: "../../../assets/images/marker/icon-material.png",
    py: "jyzb",
    pinyin:"jiuyuanzhuangbei"
  },
  {
    id: 7,
    type: "jsd",
    name: "隐患地点",
    icon: "../../../assets/images/marker/mapdot-worm.png",
    py: "yhdd",
    pinyin:"yinhuandidian"
  },
  {
    id: 8,
    type: "fhmb",
    name: "防护目标",
    icon: "../../../assets/images/marker/icon_fhmb.png",
    py: "fhmb",
    pinyin:"fanghumubiao"
  },
  {
    id: 9,
    type: "bncs",
    name: "避难场所",
    icon: "../../../assets/images/marker/icon-bncs.png",
    py: "bncs",
    pinyin:"binanchangsuo"
  },
  {
    id: 10,
    type: "qyxx",
    name: "企业",
    icon: "../../../assets/images/marker/mapdot-building-6.png",
    py: "qy",
    pinyin:"qiye"
  },
  {
    id: 11,
    type: "spjk",
    name: "视频监控",
    icon: "../../../assets/images/marker/mapdot-scientific.png",
    py: "spjk",
    pinyin:"shipinjiankong"
  },
  {
    id: 12,
    type: "wrj",
    name: "无人机",
    icon: "../../../assets/images/marker/icon_wrj.png",
    py: "wrj",
    pinyin:"wurenji"
  },
  {
    id: 13,
    type: "wxdh",
    name: "卫星电话",
    icon: "../../../assets/images/marker/icon_wxdh.png",
    py: "wxdh",
    pinyin:"weixingdianhua"
  },
]);
let checkedData = ref();
const yjjgList = ref([]);
const getyjjgData = function () {
  getYjjg().then((res) => {
    yjjgList.value = res.data;
    sessionStorage.setItem("yjjgListData", JSON.stringify(yjjgList.value));
  });
};
const getYhddData = function () {
  getFxgz().then((res) => {
    let arr = res.data.jsd.jh.map((item) => {
      return {
        ...item,
        name: item.jswz,
        info: item.jsyy,
        person: item.zrr,
        phone: item.lxdh,
      };
    });
    sessionStorage.setItem("jsdListData", JSON.stringify(arr));
  });
};
const nowTreeList = ref([]);
const search_value = ref("");
const searchTreeData = function () {
  let val = search_value.value.trim();
  nowTreeList.value = data.value.filter((item) => {
    return item.name.includes(val) || item.py.includes(val) || item.pinyin.includes(val);
  });
  console.log("筛查结果", nowTreeList.value);
};

onMounted(() => {
  getyjjgData();
  getYhddData();
  data.value = resource_data.value.map((item, index) => {
    return { ...item, id: index };
  });
  nowTreeList.value = resource_data.value.map((item, index) => {
    return { ...item, id: index };
  });
});
const imgefileUrl = (url) => {
  // let baseUrl = import.meta.url.split('views')[0]
  // return new URL(url.split('@/')[1], baseUrl).href;
  return new URL(url, import.meta.url).href;
};
const nodeClick = (obj) => {
  // console.log('当前点击对象============>',obj);
  nextTick(() => {
    // 样式调整
    let dom = document.querySelector(
      ".el-tree-node__children .el-tree-node__content"
    );
    if (dom) {
      let val = dom.style.paddingLeft;
      let iconDom = document.querySelector(
        ".el-tree-node__children .el-tree-node__content>.el-tree-node__expand-icon"
      );

      iconDom.style.left = parseInt(val) + 20 + "px";
    }
  });
};
const checkItem = (obj, checked) => {
  checkedData.value = checked.checkedNodes;
  if (checked.checkedNodes.includes(obj)) {
    let listData = sessionStorage.getItem(obj.type + "ListData");
    if (listData) {
      let list = JSON.parse(listData);
      for (let i = 0; i < list.length; i++) {
        let info = list[i];
        if (!info.mapX || !info.mapY) {
          continue;
        }
        const model =
          fxyhLists[obj.type] || yjzyLists[obj.type] || otherLists[obj.type];
        if (model) {
          let markerData = JSON.parse(JSON.stringify(model[0].maekerList[0]));
          markerData.id = info.id;
          markerData.lng = info.mapX;
          markerData.lat = info.mapY;
          if (info.spare1) {
            try {
              let details = JSON.parse(info.spare1);
              let dict = entityDict[obj.type];
              for (let key in dict) {
                markerData.details[key] = details[dict[key]];
              }
            } catch (error) {
              console.log("解析JSON出错了--->", info);
            }
          } else {
            for (let key in markerData.details) {
              markerData.details[key] = info[key] || "-";
            }
          }
          $mitt.emit("addMarker", markerData);
          $mitt.emit("openPopup", markerData);
          $mitt.emit("flyTo", markerData);
        }
      }
    }
    if (elTreeRef.value.getCheckedNodes().length === 12) {
      checked_all.value = true;
    }
  } else {
    $mitt.emit("changeMarkerState", {
      markerType: obj.type,
      show: false,
    });
    checked_all.value = false;
  }
};
const checkAll = (val) => {
  $mitt.emit("hideAllMarker");
  elTreeRef.value.setCheckedNodes([]);
  if (val) {
    nextTick(() => {
      elTreeRef.value.setCheckedNodes(nowTreeList.value);
      let checkedData = elTreeRef.value.getCheckedNodes();
      checkedData.forEach((item) => {
        let dom = document.getElementById(item.type + "checkbox");
        console.log(dom.previousElementSibling);
        dom?.previousElementSibling?.children[0].click();
      });
    });
  }
};
</script>

<style scoped lang="less">
.tree_check {
  position: absolute;
  left: 490px;
  bottom: 30px;
  transition: 0.3s linear;

  ::-webkit-scrollbar {
    display: none;
  }

  .hideIcon {
    width: 24px;
    height: 24px;
    position: absolute;
    right: 0;
    top: -24px;
    cursor: pointer;
    transition: 0.3s linear;
    background: url(@/assets/icons/icon_arrow_down.png) no-repeat;
    background-size: 14px 14px;
    background-position: 5px 5px;
    background-color: rgba(4, 14, 21, 0.7);
  }

  .tree_check_box {
    overflow: auto;

    height: auto;
    max-height: 430px;

    width: 180px;
    background: rgba(1, 23, 65, 0.8);
    box-shadow: inset 0px 0px 12px 1px rgba(87, 229, 255, 0.5);
    border-radius: 4px 4px 4px 4px;
    border: 1px solid;
    border-image: linear-gradient(
        135deg,
        rgba(255, 255, 255, 1),
        rgba(19, 93, 148, 0.32),
        rgba(255, 255, 255, 1)
      )
      1 1;
    padding: 12px;

    :deep(.el-checkbox) {
      height: auto;

      .el-checkbox__inner {
        width: 20px;
        height: 20px;
        border: 1px solid #0075a4;
        background-color: transparent;
      }

      .el-checkbox__input.is-checked .el-checkbox__inner::after {
        display: none;
      }

      .el-checkbox__input.is-checked .el-checkbox__inner {
        background: url("@//assets/common/checked.png") center/100% 100%
          no-repeat;
        border: none;
      }

      .el-checkbox__label {
        font-size: 14px;
        font-family: Source Han Sans SC-Regular, Source Han Sans SC;
        font-weight: 400;
        color: #c6d1db;
        line-height: 21px;
      }

      &.is-checked .el-checkbox__label,
      .el-checkbox__label:hover {
        color: #fff;
      }
    }

    :deep(.el-tree) {
      background: transparent;

      .is-checked {
        .name {
          color: #fff;
        }
      }

      .el-tree-node__content {
        position: relative;
        margin-top: 3px;
        background-color: transparent;

        .el-tree-node__expand-icon {
          position: absolute;
          left: 20px;
        }

        .el-checkbox {
          margin-right: 24px;
        }

        .el-tree-node__expand-icon,
        .el-tree-node__expand-icon.is-leaf {
          color: #25e3d8;
        }

        .el-tree-node__label,
        .custom-tree-node {
          font-size: 14px;
          font-family: Source Han Sans SC-Regular, Source Han Sans SC;
          font-weight: 400;
          color: #c6d1db;
          line-height: 20px;

          &:hover {
            color: #fff;
          }

          .icon {
            width: 20px;
            height: 20px;
            vertical-align: middle;
            margin-right: 6px;
          }
        }
      }
    }
  }
}
.search_box {
  display: flex;
  align-items: center;
  width: 161px;
  height: 32px;
  background: rgba(9, 39, 67, 0.7);
  border: 1px solid #1e89fd;
  padding-right: 12px;
  margin-bottom: 10px;

  :deep(.el-input__inner) {
    &::-webkit-input-placeholder {
      font-size: 16px;
      color: #aacbf6 !important;
    }
  }

  .img {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
}
</style>
