<template>
  <div class="right">
    <meteorologicalInformation></meteorologicalInformation>
    <earlyWarningMonitoringInformation></earlyWarningMonitoringInformation>
    <disasterArea></disasterArea>
    <productionAccident></productionAccident>
    <!-- 预警监测一级弹框 -->
    <warningMornitorDialog
      v-if="dialogFlags.WarningMornitor"
      @closeDialog="closeDialog"
      :detail="warning_detail"
    >
    </warningMornitorDialog>
    <!-- 监测内容详情弹框 -->
    <syqxxThreePopup
      v-if="dialogFlags.showInfoDialog"
      :data="infoDialogData"
      @closeDialog="closeDialog('showInfoDialog')"
    >
    </syqxxThreePopup>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["openDialog"]);
import { viewDetail } from "../../../utils/funcNames/tzk";
import { useEventBus } from "@vueuse/core";
import meteorologicalInformation from "./components/meteorologicalInformation.vue";

import warningMornitorDialog from "./warningMornitorDialog.vue";
import earlyWarningMonitoringInformation from "./components/earlyWarningMonitoringInformation.vue";
import disasterArea from "./components/disasterArea.vue";
import productionAccident from "./components/productionAccident.vue";
import syqxxThreePopup from "./syqxxThreePopup.vue";

import "@/utils/lunbo.js";
const dialogFlags = ref({
  WarningMornitor: false,
  showInfoDialog: false,
});
const currentWarningType = ref();
const warning_detail = ref();

const infoDialogData = ref({
  name: "雨量监测站",
  list: [
    { id: 1, line1: "00：00", line2: "3.9" },
    { id: 2, line1: "03：00", line2: "2.0" },
    { id: 3, line1: "06：00", line2: "8.9" },
    // { id: 4, line1: "09：00", line2: "5.0" },
    // { id: 5, line1: "12：00", line2: "4.9" },
    // { id: 6, line1: "15：00", line2: "10.0" },
  ],
  showSelect: false,
  headers: ["时间", "雨量mm"],
});

const openDialog = function (type, info) {
  emit("openDialog", type, info);
};

const closeDialog = function (type) {
  dialogFlags.value[type] = false;
  if (type == "WarningMornitor") {
    currentWarningType.value = "";
  }
};

const bus = useEventBus(viewDetail);
const eventListener = function (e) {
  if (e.dialogType === "ylzd") {
    infoDialogData.value.name = e.name;
    dialogFlags.value.showInfoDialog = true;
  }
};
bus.on(eventListener);
</script>
