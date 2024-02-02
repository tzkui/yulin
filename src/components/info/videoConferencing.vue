<template>
  <div
    v-if="showDialog"
    :style="style"
    class="video_dialog animate__animated animate__zoomIn"
    ref="videoConferencingRef"
  >
    <div class="dialog_head" ref="dialogHeaderRef">
      <h2 class="dialog_title">视频会商</h2>
      <div>
        <img 
          @click="suoxiaoDialog"
          class="dialog_suoxiao"
          src="@/assets/common/suoxiao.png"
          title="缩小"
          alt=""
        />
        <img
          @click="closeDialog"
          class="dialog_close"
          src="@/assets/integratedCommunication/dialog_close.png"
          alt=""
        />
      </div>
    </div>
    <div class="dialog_body">
      <div class="cont_left">
        <!-- 树结构列表 -->
        <div class="tree_list">
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
            <video
              class="video"
              :id="'video_' + meetingList[index]?.id"
            ></video>
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
                /> -->
                <img
                  class="video_box_icon"
                  src="@/assets/integratedCommunication/icon_close.png"
                  alt=""
                  @click="remove(index)"
                />
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
  <div v-if="showFangdaIcon">
    
    <img 
      @click="fangdaDialog"
      class="dialog_fangda"
      src="@/assets/common/fangda.png"
      title="缩小"
      alt=""
    />
  </div>
</template>
<script setup>
import { computed, onMounted, onUnmounted, ref, inject } from "vue";
import { useEventBus, useDraggable } from "@vueuse/core";
import { getOrgRoot, getOrgById } from "@/api/modules/videoConferencing.js";
const showDialog = ref(false);
import flvjs from "flv.js";
import {
  getDeviceTree,
  getDeviceList,
  initMeeting,
  getMeetingMember,
  getResourceLiveUrl,
  deleteMeeting,
  callGroupMember,
} from "@/api/modules/kd.js";
import { ElMessage } from "element-plus";
const txlLists = ref([]);
const kdLists = ref([]);

const $mitt = inject("$mitt");
getDeviceTree().then((res) => {
  kdLists.value = res.data.result || [];
  kdLists.value.forEach((item) => {
    item.label = item.name;
    getDeviceList({ groupId: item.id }).then((devs) => {
      item.children = devs.data.result.data.map((item) => {
        return {
          id: item.gbid,
          type: "TEMP_GB",
          label: item.deviceName,
        };
      });
    });
  });
});
const openDialog = function (e) {
  showDialog.value = true;
  console.log("视频会商参数：", e);
};
const dialogHeaderRef = ref();
const videoConferencingRef = ref();
const { x, y, style } = useDraggable(dialogHeaderRef, {
  initialValue: { x: window.innerWidth / 2 - 493, y: 204 },
  draggingElement: videoConferencingRef.value,
});
const meetingList = ref([]);
const remove = function (i) {
  meetingList.value.splice(i, 1);
};
const showFangdaIcon = ref(false)
const suoxiaoDialog = function(){
  showDialog.value = false;
  showFangdaIcon.value = true;
}
const fangdaDialog = function(){
  showDialog.value = true;
  showFangdaIcon.value = false;
}
const openVideoConferencingBus = useEventBus("openVideoConferencing");
openVideoConferencingBus.on(openDialog);
onMounted(() => {
  // getOrgs();
});
onUnmounted(() => {
  openVideoConferencingBus.off(openDialog);
});

// 树结构数据
const treeData = computed(() => {
  return [...txlLists.value, ...kdLists.value];
});
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
  closeMeeting();
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
const groupId = ref("MS8d11f0dd0f45aa9bbc5154e09c8d84");
const beginConferencing = function () {
      $mitt.emit("openSoundDialog")
      setTimeout(()=>{
        $mitt.emit("receiveMessage", {text: "打开安全生产"})
      },1000)
  if (meetingIns || meetingList.value.length === 0) return;
  beginRecord()
  // showMeeting.value = true;
  let options = {
    layoutType: "AUTO",
    meetDevices: [],
    listenDevices: [],
  };
  initMeeting(options).then((res) => {
    groupId.value = res.data.result?.groupId || "";
    if (groupId.value) {
      let param = {
        groupId: groupId.value,
        deviceList: meetingList.value.map((item) => {
          return {
            id: item.id,
            type: item.type,
          };
        }),
      };
      callGroupMember(param).then((res) => {
        console.log("xxxx", res);
        getMeetingMemberById();
      });
    }
    // if (res.data.result.failDevices.length > 0) {
    //   for (const info of res.data.result.failDevices) {
    //     ElMessage.error(info.messageBody.desc);
    //   }
    // }
  });
};
let meetingTimer = null;
let times = 0;
const getMeetingMemberById = function () {
  getMeetingMember(groupId.value).then((res) => {
    res.data.result.forEach((item) => {
      if (item.videoSendResourceId) {
        getRtspUrl(item.videoSendResourceId, item.id);
      } else {
        if (meetingTimer) {
          clearTimeout(meetingTimer);
        }
        meetingTimer = setTimeout(() => {
          if (times++ > 10) {
            return (times = 0);
          }
          getMeetingMemberById();
        }, 2000);
      }
    });
  });
};
const getRtspUrl = function (resourceId, id) {
  const params = {
    resourceId: resourceId,
    protocol: "http",
    requestType: "flv",
  };
  getResourceLiveUrl(params).then((res) => {
    console.log(res);
    let videoElement = document.getElementById("video_" + id);
    var flvPlayer = flvjs.createPlayer({
      type: "flv",
      url: res.data.result,
      isLive: true,
    });
    flvPlayer.attachMediaElement(videoElement);
    flvPlayer.load();
    flvPlayer.play();
    setTimeout(()=>{
      $mitt.emit("openSoundDialog")
      let json = JSON.stringify({
        type: "data",
        data: {
          pcmUrl: res.data.result
        }
      })
      recordWebsocket.send(json)
    }, 200)
  });
};
let recordWebsocket = null;
const beginRecord = function () {
  recordWebsocket = new WebSocket("ws://10.112.143.190:8892/server/pcm");
  recordWebsocket.onopen = function (event) {
    console.log("服务已连接");
    let json = JSON.stringify({
      type: "start",
    })
    recordWebsocket.send(json);
  };
  recordWebsocket.onmessage = function(event){
    let data = JSON.parse(event.data);
    if(data.data.type === "mid_text"){
      let text = data.data.data.text;
      $mitt.emit("receiveMessage", {text: text})
    }
  }
  recordWebsocket.onclose = function(event) {
    console.log("服务连接关闭")
  };
  recordWebsocket.onerror = function(event) {
    console.log(event,"连接出错")
  };
};
const closeWs = function(){
  if(recordWebsocket){
    recordWebsocket.close()
    recordWebsocket = null;
  }
}
const closeMeeting = function () {
  deleteMeeting(groupId.value).then((res) => {
    console.log(res);
  });
  if (meetingTimer) {
    clearTimeout(meetingTimer);
  }
  closeWs()
};
const onNodeClick = function (info) {
  if (!info.children) {
    let id = info.id;
    let index = meetingList.value.findIndex((item) => item.id === id);
    if (index === -1) {
      meetingList.value.push(info);
    } else {
      meetingList.value.splice(index, 1);
    }
  }
};
defineExpose({
  openDialog,
  closeDialog,
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
    cursor: move;
    .dialog_title {
      font-size: 20px;
      font-family: Source Han Sans SC-Medium, Source Han Sans SC;
      font-weight: 500;
      color: #ffffff;
    }
    .dialog_suoxiao{
      height: 25px;
      width: 25px;
      cursor: pointer;

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
            left: 0;
            top: 0;

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
      .video {
        height: 98%;
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
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
.dialog_fangda{
  position: absolute;
  bottom: 14px;
  left: 485px;
  z-index: 2;
  width: 28px;
  height: 28px;
  cursor: pointer;
}
</style>
