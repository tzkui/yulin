<script setup>
import { nextTick, ref, onUnmounted } from "vue";
import { ElMessage } from "element-plus";

import { useEventBus } from "@vueuse/core";
const showPhoneCall = ref(false);
const phoneCall = function (info) {
  let phone = info.phone || info.linkPhone;
  console.log("Phone: ",phone)
  if (phone) {
    showPhoneCall.value = false;
    nextTick(() => {
      showPhoneCall.value = true;
      nextTick(() => {
        const option = {
          access_type: 1,
          key: window.kdApiKey,
          devices: [{ id: phone, type: "TEMP_MOBILEPHONE" }],
          isDemo: true,
        };
        window.kdDispatchConference.createMeeting(
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
    });
  }
};

const phoneBus = useEventBus("phone");
phoneBus.on(phoneCall);

onUnmounted(() => {
  phoneBus.off(openDialog);
});
</script>
<template>
  <Teleport to="body">
    <div class="phone_dialog" v-if="showPhoneCall">
      <div id="phone_call"></div>
      <div class="close_icon" @click="showPhoneCall = false">
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
