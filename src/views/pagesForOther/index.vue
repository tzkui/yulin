<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import phoneCall from "@/components/common/phoneCall.vue";
import videoConferencing from "@/components/info/videoConferencing.vue";
const phoneCallRef = ref();
const videoConferencingRef = ref();
const route = useRoute();
const { type, info } = route.query;
onMounted(() => {
  if (type == 1) {
    phoneCallRef.value.phoneCall(info);
  } else {
    videoConferencingRef.value.openDialog();
  }
  window.addEventListener("message", (e) => {
    console.log(e);
    console.log("关会了")
    // if(e.data === 'close')
    if(type==1){

      phoneCallRef.value.close();
    }else{
      videoConferencingRef.value.closeDialog()
    }


  });
});
</script>
<template>
  <phoneCall ref="phoneCallRef"></phoneCall>
  <videoConferencing ref="videoConferencingRef"></videoConferencing>
</template>
