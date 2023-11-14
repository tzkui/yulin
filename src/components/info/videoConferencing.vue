<template>
  <div v-if="showDialog" class="video_dialog animate__animated animate__zoomIn">
    <div class="dialog_head">
      <h2 class="dialog_title">视频会商</h2>
      <img
        @click="closeDialog"
        class="dialog_close"
        src="@/assets/integratedCommunication/dialog_close.png"
        alt=""
      />
    </div>
    <div class="dialog_body">
      <div class="cont_left">
        <!-- 搜索框 -->
        <!-- <div class="video_searchbar">
          <input class="video_inout" placeholder="请输入号码" type="">
          <button class="video_search_btn">
            <img class="icon_phone" src="@/assets/integratedCommunication/icon_phone.png" alt="">
          </button>
        </div> -->
        <!-- 树结构列表 -->
        <div class="tree_list">
          <!-- <el-tree
            :data="treeData"
            :props="treeProps"
            show-checkbox
            @check-change="handleCheckChange"
            lazy
            :load="loadOrgNode"
          >
          </el-tree> -->
          <el-tree
            :data="treeData"
            :props="treeProps"
            @check-change="handleCheckChange"
            @node-click="onNodeClick"
          >
          </el-tree>
        </div>
      </div>
      <div class="cont_right" id="cont-right">
        <!-- 视频列表 -->
        <div :class="videoStyleClass" v-show="!showMeeting">
          <div
            v-for="(item, index) in currentFence"
            :key="item"
            class="monitorVideoFence"
          >
            <!-- 假装是视屏 -->
            <div class="video"></div>
            <!-- 视频移入  顶部遮罩 -->
            <div class="video_top_model">
              <div class="video_title">
                {{ meetingList[index]?.label }}
              </div>
              <div class="icon_box" v-show="meetingList[index]">
                <!-- <img
                  class="video_box_icon"
                  src="@/assets/integratedCommunication/icon_fullscreen.png"
                  alt=""
                />
                <img
                  class="video_box_icon"
                  src="@/assets/integratedCommunication/icon_close.png"
                  alt=""
                /> -->
              </div>
            </div>
          </div>
        </div>
        <div id="meeting_box" v-show="showMeeting"></div>
        <!-- 分屏切换 -->
        <div class="fences_box">
          <div class="fences">
            <!-- :style="{ 'background-image': `url(${'src/assets/integratedCommunication/video_fence_' + item.num + '.png'})` }" -->
            <div
              v-for="(item, index) in fencesData"
              :key="index"
              :class="currentFence == item.num ? item.active : item.normal"
              @click="changeFence(item.num)"
            ></div>
            <div
              :class="
                fullscreenFlag ? 'fence fence_expand' : 'fence fence_retract'
              "
              @click="changeFullscreen"
            ></div>
          </div>
          <div class="mute_btn" @click="beginConferencing">开始会商</div>
          <div class="mute_btn red" @click="closeMeeting">结束会商</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useEventBus } from "@vueuse/core";
import { getOrgRoot, getOrgById } from "@/api/modules/videoConferencing.js";
const showDialog = ref(false);
import {addressBook} from '@/api/addressBook.js'

const openDialog = function (e) {
  showDialog.value = true;
  console.log("视频会商参数：", e);
};

const meetingList = ref([]);
const loadOrgNode = async function (node, resolve) {
  console.log("node: ", node);
  if (node.level === 0) {
    let res = await getOrgRoot();
    return resolve(res.data);
  } else {
    const param = {
      xzqh: node.data.id,
      grade: node.data.grade,
      type: "all",
    };
    let res = await getOrgById(param);
    return resolve(res.data);
  }
};
const openVideoConferencingBus = useEventBus("openVideoConferencing");
openVideoConferencingBus.on(openDialog);
onMounted(() => {
  // getOrgs();
});
onUnmounted(() => {
  openVideoConferencingBus.off(openDialog);
});

// 树结构数据
const treeData = ref([
  {
    id: 1,
    label: "通讯录",
    children: addressBook.map(item=>{
      return {
        ...item,
        type: "TEMP_VOLTE",
        label: item.name,
        id: item.phone
      }
    })
  },
  {
    id: 2,
    label: "单兵",
    children: [
      {
        id: "320571000013270000021",
        type: "TEMP_GB",
        label: "单兵1",
      },
    ],
  },
  {
    id: 3,
    label: "视频监控",
    children: [
      {
        id: "1000000000137",
        type: "TEMP_MT",
        label: "地址一视频监控",
      },
    ],
  },
  {
    id: 4,
    label: "视频会议终端",
    children: [
      {
        id: "32057100001327000002",
        type: "TEMP_GB",
        label: "视频会议终端1",
      },
    ],
  },
  {
    id: 5,
    label: "无人机",
    children: [
      {
        id: "10000000001371",
        type: "TEMP_MT",
        label: "无人机1",
      },
    ],
  },
  {
    id: 6,
    label: "卫星电话",
    children: [
      {
        id: "17323215510",
        type: "TEMP_VOLTE",
        label: "卫星电话1",
      },
    ],
  },
  {
    id: 7,
    label: "窄带对讲",
    children: [
      {
        id: "111111111",
        type: "TEMP_VOLTE",
        label: "对讲机1",
      },
    ],
  },
]);
// 树结构显示prop
const treeProps = ref({
  label: "label",
  children: "children",
});
// 分屏按钮数据
const fencesData = ref([
  { normal: "fence fence_1", active: "fence fence_1 active", num: 1 },
  { normal: "fence fence_2", active: "fence fence_2 active", num: 2 },
  { normal: "fence fence_4", active: "fence fence_4 active", num: 4 },
  { normal: "fence fence_9", active: "fence fence_9 active", num: 9 },
]);
// 当前分屏数
const currentFence = ref(4);
// 全屏flag
const fullscreenFlag = ref(true);
// 视屏列表不同分屏布局样式
const videoStyleClass = ref("videos videos_4");
const handleCheckChange = (data, checked, indeterminate) => {
  console.log(data, checked, indeterminate);
};
// 关闭弹框
const closeDialog = () => {
  closeMeeting()
  showDialog.value = false;
};
// 切换分屏
const changeFence = (num) => {
  videoStyleClass.value = "videos videos_" + num;
  currentFence.value = num;
};
// 切换全屏
const changeFullscreen = () => {
  if (fullscreenFlag.value) {
    document.getElementById("cont-right").requestFullscreen();
  } else {
    document.exitFullscreen();
  }
  fullscreenFlag.value = !fullscreenFlag.value;
};

const showMeeting = ref(false);
let meetingIns = null;
const beginConferencing = function () {
  if (meetingIns || meetingList.value.length === 0) return;
  showMeeting.value = true;
  let options = {
    access_type: 2,
    devices: meetingList.value.map((item, index) => {
      return {
        id: item.id,
        type: item.type,
        index,
      };
    }),
    key: window.kdApiKey,
  };
  meetingIns = kdDispatchConference.createMeeting(
    "#meeting_box",
    options,
    (data, name) => {
      // data 回调数据  name 回调事件名称
      console.log("回调数据", data, name);
      // data.groupId 用于还原调度组组件或者调用http高级接口
      console.log("组件Id", data.groupId);
      if (data.status === 13) {
        closeMeeting();
      }
    }
  );
};
const closeMeeting = function () {
  if (meetingIns) {
    showMeeting.value = false;
    meetingIns.closeMeeting();
    meetingIns = null;
  }
};
const onNodeClick = function (info) {
  console.log(info);
  if (!info.children) {
    let id = info.id;
    let index = meetingList.value.findIndex((item) => item.id === id);
    if (index === -1) {
      meetingList.value.push(info);
    } else {
      meetingList.value.splice(index, 1);
    }
    console.log(meetingList.value);
  }
};
defineExpose({
  openDialog,
  closeDialog
});
</script>

<style scoped lang="less">
.video_dialog {
  width: 986px;
  height: 676px;
  background: #051e3a;
  box-shadow: inset 0px 0px 15px 0px rgba(19, 148, 241, 0.57);
  border-radius: 12px;
  border: 1px solid rgba(10, 148, 220, 0.5);
  position: absolute;
  top: calc((100% - 676px) / 2);
  left: calc((100% - 986px) / 2);
  z-index: 1111;
  display: flex;
  flex-direction: column;

  .dialog_head {
    height: 54px;
    padding: 0 15px 0 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: url("@/assets/integratedCommunication/dialog_head_bg.png")
      center/965px 54px no-repeat;

    .dialog_title {
      font-size: 20px;
      font-family: Source Han Sans SC-Medium, Source Han Sans SC;
      font-weight: 500;
      color: #ffffff;
    }

    .dialog_close {
      height: 33.65px;
      width: 33.65px;
      cursor: pointer;
    }
  }

  .dialog_body {
    flex: 1;
    padding: 11px 15px 17px;
    display: flex;

    .cont_left {
      width: 318px;
      margin-right: 15px;
      .video_searchbar {
        width: 100%;
        height: 33px;
        background: rgba(0, 181, 251, 0.25);
        border-radius: 0px 5px 5px 0px;
        border: 1px solid #0091ff;
        display: flex;

        .video_search_btn {
          cursor: pointer;
          width: 43px;
          height: 100%;
          background: linear-gradient(
            180deg,
            #3a89ff 0%,
            rgba(58, 137, 255, 0.32) 100%
          );
          border-radius: 0px 4px 4px 0px;
          border: none;

          .icon_phone {
            width: 18px;
            height: 18px;
          }
        }

        .video_inout {
          flex: 1;
          background: transparent;
          border: none;
          padding: 0 13px;
          font-size: 14px;
          font-family: Source Han Sans CN-Regular, Source Han Sans CN;
          font-weight: 400;
          color: #d0deee;
          text-shadow: 0px 0px 9px rgba(21, 154, 255, 0.5);

          &::-webkit-input-placeholder {
            color: #d0deee;
            text-shadow: 0px 0px 9px rgba(21, 154, 255, 0.5);
          }
        }
      }

      .tree_list {
        overflow: auto;
        height: 550px;
        &::-webkit-scrollbar {
          display: none;
        }

        :deep(.el-tree) {
          background: transparent;

          .el-tree-node__content {
            margin: 0 0 5px 0;
            height: 37px;
            box-sizing: content-box;
            outline: none;

            &:hover {
              background: #09415d !important;
            }

            .el-tree-node__label {
              font-size: 18px;
              font-family: Source Han Sans CN-Regular, Source Han Sans CN;
              font-weight: 400;
              color: rgba(255, 255, 255, 0.85);
              line-height: 24px;
            }
          }

          .el-tree-node:focus > .el-tree-node__content {
            background: #09415d;
          }

          > .el-tree-node > {
            position: relative;
            margin: 0 0 10px 0;

            &::after {
              content: "";
              position: absolute;
              height: 1px;
              width: 100%;
              background: rgba(255, 255, 255, 0.15);
              bottom: -5px;
            }
          }

          .el-tree-node.is-expanded
            > .el-tree-node__children
            > .el-tree-node:nth-child(odd)
            > .el-tree-node__content {
            background: rgba(255, 255, 255, 0.05);
          }

          .el-checkbox__inner {
            height: 16px;
            width: 16px;
            border-radius: 0;
            background: transparent;
            border: 1px solid rgba(0, 145, 255, 0.85);

            &:after {
              display: none;
            }
          }

          .el-checkbox__input.is-checked .el-checkbox__inner {
            border: none;
            background: url("@/assets/integratedCommunication/checked_tree.png")
              center/100% no-repeat;
          }

          .el-checkbox__input.is-indeterminate .el-checkbox__inner {
            // border: none;
            // background: url('@/assets/integratedCommunication/checked_tree.png') center/100% no-repeat;
          }

          .el-tree-node__expand-icon.expanded {
            color: rgba(0, 145, 255, 1);
          }
        }
      }
    }

    .cont_right {
      flex: 1;
      overflow: hidden;
      display: flex;
      flex-direction: column;

      .videos {
        flex: 1;
        overflow: hidden;

        .monitorVideoFence {
          height: calc(100% - 2px);
          width: calc(100% - 2px);
          background: #98beed;
          overflow: hidden;
          position: relative;
          float: left;
          margin: 1px;

          .video_top_model {
            position: absolute;
            width: 100%;
            box-sizing: border-box;
            height: 24px;
            background: rgba(0, 0, 0, 0.75);
            padding: 0 5px 0 15px;
            letter-spacing: 1px;
            display: flex;
            align-items: center;

            .video_title {
              flex: 1;
              font-size: 12px;
              font-family: Source Han Sans CN-Regular, Source Han Sans CN;
              font-weight: 400;
              color: #ffffff;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            .icon_box {
              display: flex;
              align-items: center;

              .video_box_icon {
                width: 15px;
                height: 15px;
                margin: 0 0 0 17px;
                cursor: pointer;
              }
            }
          }
        }

        &.videos_2 .monitorVideoFence {
          height: calc((100% - 4px) / 2);
        }

        &.videos_4 .monitorVideoFence {
          height: calc((100% - 4px) / 2);
          width: calc((100% - 4px) / 2);
        }

        &.videos_9 .monitorVideoFence {
          height: calc((100% - 6px) / 3);
          width: calc((100% - 6px) / 3);
        }

        &.videos_12 .monitorVideoFence {
          height: calc((100% - 8px) / 4);
          width: calc((100% - 6px) / 3);
        }

        &.videos_16 .monitorVideoFence {
          height: calc((100% - 8px) / 4);
          width: calc((100% - 8px) / 4);
        }
      }

      .fences_box {
        width: 100%;
        height: 43px;
        box-sizing: border-box;
        padding: 0 11px;
        background: linear-gradient(360deg, #023f4f 0%, #003f50 100%);
        box-shadow: 0px 2px 5px 0px rgba(3, 28, 64, 0.9),
          inset 0px 0px 8px 0px rgba(40, 124, 225, 0.6);
        display: flex;
        justify-content: space-between;
        align-items: center;

        .fences {
          flex: 1;
          display: flex;

          .fence {
            cursor: pointer;
            width: 37px;
            height: 37px;
            border-radius: 24px;
            margin-right: 18px;
            background-color: rgba(16, 71, 128, 0.25);
            border: 1px solid rgba(175, 207, 255, 0.2);
            // background-position: center;
            // background-size: 18px;
            // background-repeat: no-repeat;

            &.fence_1 {
              background: url("@/assets/integratedCommunication/video_fence_1.png")
                center/18px no-repeat;
            }

            &.fence_2 {
              background: url("@/assets/integratedCommunication/video_fence_2.png")
                center/18px no-repeat;
            }

            &.fence_4 {
              background: url("@/assets/integratedCommunication/video_fence_4.png")
                center/18px no-repeat;
            }

            &.fence_9 {
              background: url("@/assets/integratedCommunication/video_fence_9.png")
                center/18px no-repeat;
            }

            &.fence_12 {
              background: url("@/assets/integratedCommunication/video_fence_12.png")
                center/18px no-repeat;
            }

            &.fence_16 {
              background: url("@/assets/integratedCommunication/video_fence_16.png")
                center/18px no-repeat;
            }

            &.fence_expand {
              background: url("@/assets/integratedCommunication/video_box_expand.png")
                center/18px no-repeat;
            }

            &.fence_retract {
              background: url("@/assets/integratedCommunication/video_box_retract.png")
                center/18px no-repeat;
            }

            &.active {
              border: 1px solid #159aff;
              background-color: rgba(21, 154, 255, 0.22);
            }
          }
        }

        .mute_btn {
          cursor: pointer;
          // width: 83px;
          margin-left: 13px;
          padding: 0 6px;
          height: 27px;
          background: rgba(21, 154, 255, 0.2);
          box-shadow: inset 0px 0px 8px 0px rgba(153, 211, 255, 0.6);
          border: 1px solid #159aff;
          display: flex;
          align-items: center;
          justify-content: space-between;

          font-size: 12px;
          font-family: Source Han Sans SC-Regular, Source Han Sans SC;
          font-weight: 400;
          color: #ffffff;

          &.red {
            background: rgba(255, 35, 21, 0.2);
            box-shadow: inset 0px 0px 6px 0px rgba(255, 153, 153, 0.6);
            border: 1px solid #ff4d15;
          }
        }
      }
    }
  }
  #meeting_box {
    height: 500px;
  }
}
</style>
