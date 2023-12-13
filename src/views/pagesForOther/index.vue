<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import phoneCall from "@/components/common/phoneCall.vue";
import videoConferencing from "@/components/info/videoConferencing.vue";
import videoMonitoring from './videoMonitoring.vue';

const phoneCallRef = ref();
const videoConferencingRef = ref();
const videoMonitoringRef = ref()

const route = useRoute();
const { type, info, id } = route.query;
onMounted(() => {
  if (type == 1) {
    phoneCallRef.value.phoneCall(info);
  } else if(type == 2) {
    videoConferencingRef.value.openDialog();
  }else if(type == 3) {
    videoMonitoringRef.value.openDialog(id)
  }
  window.addEventListener("message", (e) => {
    console.log(e);
    console.log("关会了")
    // if(e.data === 'close')
    if(type==1){
      phoneCallRef.value.close();
    }else if(type==2){
      videoConferencingRef.value.closeDialog()
    }else if(type==3){
      videoMonitoringRef.value.closeDialog()
    }


  });
});
</script>
<template>
  <phoneCall ref="phoneCallRef"></phoneCall>
  <videoConferencing ref="videoConferencingRef"></videoConferencing>
  <videoMonitoring ref="videoMonitoringRef"></videoMonitoring>
</template>
