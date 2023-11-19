<script setup>
import {ref, onMounted, onUnmounted} from 'vue';
const props = defineProps({
  content: {
    type: String,
    default: ""
  },
  step: {
    type: Number,
    default: 1
  },
  width: {
    type: String,
    default : "460px"
  } 
})
onMounted(()=>{
  scroll()
})
const contentRef = ref()
const flag = ref(true)
let timer = null;
const scroll = function(){
  if(!props.content){
    setTimeout(scroll, 1000)
  }else{
    let boxWidth = parseFloat(props.width);
    let contentWidth = parseFloat(window.getComputedStyle(contentRef.value).width);
    let left = 0;
    timer = setInterval(() => {
      left += props.step
      contentRef.value.style.left = -left + "px"
      if(left+boxWidth>=contentWidth+100){
        left = -props.step
      }
    }, 50);
  }
}
onUnmounted(()=>{
  clearInterval(timer)
})
</script>

<template>
  <div class="scroll_banner" :style="{width: width}">
    <div class="content" ref="contentRef">{{ content }}</div>
  </div>
</template>
<style scope>
.scroll_banner{
  position: relative;
  height: 24px;
  line-height: 24px;
  margin: 0 auto;
  overflow: hidden;
}
.content{
  position: absolute;
  width: auto;
  white-space: nowrap;
  left: 0;
  top: 0;
}
</style>