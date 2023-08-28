<script setup>
import { nextTick, ref } from "vue";
import { ElMessage } from "element-plus";

const showPhoneCall = ref(false);
let meetingIns = null;
const phoneCall = function (phone = "17323215510") {
  showPhoneCall.value = true;
  nextTick(() => {
    const option = {
      access_type: 1,
      key: "88b6bb347f2c4890bec4c76522cb4e4a",
      devices: [{ id: phone, type: "TEMP_MOBILEPHONE" }],
      isDemo: true,
    };
    meetingIns = window.kdDispatchConference.createMeeting(
      "#phone_call",
      option,
      function (data, name) {
        console.log("回调数据：", data, name);
        if (data.code === 3) {
          showPhoneCall.value = false;
          ElMessage.error("对方未接听");
        }
      }
    );
  });
};
const close = function () {
  meetingIns.closeMeeting();
  meetingIns = null;
  showPhoneCall.value = false;
};
defineExpose({
  phoneCall,
  close,
});
</script>
<template>
  <Teleport to="body">
    <div class="phone_dialog" v-if="showPhoneCall">
      <div id="phone_call"></div>
      <div class="close_icon" @click="close">
        <el-icon size="32"><CirclePlus /></el-icon>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
$width: 200px;
$height: 400px;
.phone_dialog {
  width: $width;
  height: $height;
  position: fixed;
  left: calc((100vw - $width) / 2);
  top: calc((100vh - $height) / 2);
  z-index: 99;
  display: flex;
  .close_icon {
    position: absolute;
    right: -16px;
    top: -16px;
    cursor: pointer;
    color: #fff;
    transform: rotate(45deg);
  }
}
</style>
