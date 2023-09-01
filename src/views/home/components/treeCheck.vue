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
      <el-checkbox v-model="checked_all" @change="checkAll" label="选择全部" />
      <el-tree
        :data="data"
        show-checkbox
        node-key="type"
        :props="defaultProps"
        @node-click="nodeClick"
        @check="checkItem"
        ref="elTreeRef"
      >
        <template #default="{ node, data }">
          <span class="custom-tree-node">
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
import { yjzyLists } from "@/api/mock_tzk.js";


const $mitt = inject("$mitt");
const checked_all = ref(false);
const elTreeRef = ref();
const isHide = ref(false);
const defaultProps = {
  children: "children",
  label: "name",
};
let data = ref([]);
let resource_data = ref([
  {
    id: 1,
    type: "yjjg",
    name: "应急机构",
    icon: "../../../assets/home/icon_marker1.png",
  },
  {
    id: 2,
    type: "jydw",
    name: "应急队伍",
    icon: "../../../assets/home/icon_marker2.png",
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
    icon: "../../../assets/home/icon_marker4.png",
  },
  {
    id: 5,
    type: "wzck",
    name: "物资仓库",
    icon: "../../../assets/home/icon_marker5.png",
  },
  {
    id: 6,
    type: "yjzb",
    name: "应急装备",
    icon: "../../../assets/home/icon_marker6.png",
  },
  {
    id: 7,
    type: "yhdd",
    name: "隐患地点",
    icon: "../../../assets/home/icon_marker7.png",
  },
  {
    id: 8,
    type: "fxmb",
    name: "风险目标",
    icon: "../../../assets/home/icon_marker8.png",
  },
  {
    id: 9,
    type: "bncs",
    name: "避难场所",
    icon: "../../../assets/home/icon_marker9.png",
  },
  {
    id: 10,
    type: "qy",
    name: "企业",
    icon: "../../../assets/home/icon_marker10.png",
  },
  {
    id: 11,
    type: "spjk",
    name: "视频监控",
    icon: "../../../assets/home/icon_marker11.png",
  },
  {
    id: 12,
    type: "wrj",
    name: "无人机",
    icon: "../../../assets/home/icon_marker12.png",
  },
  {
    id: 13,
    type: "wxdh",
    name: "卫星电话",
    icon: "../../../assets/home/icon_marker13.png",
  },
]);
let checkedData = ref();
onMounted(() => {
  data.value = resource_data.value.map((item, index) => {
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
      // iconDom.style.left = parseInt(val) + parseInt(getComputedStyle(iconDom).left) + 'px'
    }
  });
};
const checkItem = (obj, checked) => {
  // console.log(obj, checked.checkedNodes);
  checkedData.value = checked.checkedNodes;
  if (checked.checkedNodes.includes(obj)) {
    let position = [109.92832, 38.27419];
    // 差不多在此范围内随机生成点位
    let lng = (position[0] + "").replace(
      /^(.{4})(.{3})(.*)$/,
      "$1" + Math.round(Math.random() * (999 - 100) + 100) + "$3"
    );
    let lat = (position[1] + "").replace(
      /^(.{4})(.{3})(.*)$/,
      "$1" + Math.round(Math.random() * (999 - 100) + 100) + "$3"
    );

    let markerData = {
      markerType: "id" + obj.name,
      id: obj.id,
      lng: lng,
      lat: lat,
      name: obj.name,
      // icon: "/images/marker/1.gif",
      icon: icon_config[obj.type].icon,
      label: { text: obj.name, font_size: 16 },
      dialogType: obj.type,
      details: {},
    };
    $mitt.emit("addMarker", markerData);
    $mitt.emit("openPopup", markerData);
    $mitt.emit("flyTo", markerData);
  } else {
    $mitt.emit("changeMarkerState", {
      markerType: "id" + obj.name,
      show: false,
    });
  }
};
const checkAll = (val) => {
  let checkedData;
  if (val) {
    elTreeRef.value.setCheckedNodes(data.value);
    checkedData = elTreeRef.value.getCheckedNodes();
    nextTick(() => {
      let position = [109.92832, 38.27419];
      for (let index = 0; index < checkedData.length; index++) {
        const obj = checkedData[index];
        // 差不多在此范围内随机生成点位
        let lng = (position[0] + "").replace(
          /^(.{4})(.{3})(.*)$/,
          "$1" + Math.round(Math.random() * (999 - 100) + 100) + "$3"
        );
        let lat = (position[1] + "").replace(
          /^(.{4})(.{3})(.*)$/,
          "$1" + Math.round(Math.random() * (999 - 100) + 100) + "$3"
        );
        let markerData = {
          markerType: "id" + obj.name,
          id: obj.id,
          lng: lng,
          lat: lat,
          name: obj.name,
          // icon: "/images/marker/1.gif",
          icon: icon_config[obj.type].icon,
          label: { text: obj.name, font_size: 16 },
          dialogType: obj.type,
          details: {},
        };
        $mitt.emit("addMarker", markerData);
        $mitt.emit("openPopup", markerData);
        if (index == 0) {
          $mitt.emit("flyTo", markerData);
        }
      }
    });
  } else {
    checkedData = elTreeRef.value.getCheckedNodes();
    console.log(checkedData);
    for (let index = 0; index < checkedData.length; index++) {
      const obj = checkedData[index];
      $mitt.emit("changeMarkerState", {
        markerType: "id" + obj.name,
        show: false,
      });
    }
    nextTick(() => {
      elTreeRef.value.setCheckedNodes([]);
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
</style>
