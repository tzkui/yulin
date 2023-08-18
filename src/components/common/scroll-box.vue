<script setup>
import { computed,onMounted,ref,} from "vue";

import { Vue3SeamlessScroll } from "vue3-seamless-scroll";

const props = defineProps({
  options: {
    type: Object,
    default() {
      return {}
    }
  },
  listData: {
    type: Array,
    default(){
      return []
    }
  },
  isscroll:{
    type: Boolean,
    default(){
      return true
    }
  }
})
const a=ref(true)
// 滚动的默认配置项
const defaultOptions = {
  direction: "up",  // 滚动方向,可选值up,down,left,right
  isWatch: true,  // 开启数据更新监听
  hover: true, // 是否开启鼠标悬停stop
  count: null,  // 动画循环次数，默认无限循环
  limitScrollNum: 10,  // 开启滚动的数据量，只有列表长度大于等于该值才会滚动
  step: 1, // 步进速度,数值越大速度滚动越快
  singleHeight: 0,  // 单步运动停止的高度
  singleWidth: 0,  // 单步运动停止的宽度
  singleWaitTime: 1000,  // 单步停止等待时间(默认值 1000ms)
  isRemUnit: true,  //  singleHeight and singleWidth 是否开启 rem 度量
  delay: 0,   //  动画延时时间
  ease: "ease-in",  // 动画效果，可以传入贝塞尔曲线数值
  copyNum: 1,   // 拷贝列表次数，默认拷贝一次，当父级高度大于列表渲染高度的两倍时可以通过该参数控制拷贝列表次数达到无缝滚动效果
  wheel: true , // 在开启鼠标悬停的情况下是否开启滚轮滚动，默认不开启
  singleLine: false,  // 启用单行横向滚动
}

const scrollOption = computed(() => {
  let option = Object.assign({},defaultOptions,props.options)
  return option;
})

// 子组件传递给父组件的
const emits = defineEmits(['visible-change'])//这里暴露父组件自定义的方法
const visiblechange = () => {
    emits('visible-change', 11)
    console.log(111)
}
console.log(props.isscroll,"我就是拿过来的值得")
</script>
<template>
  <div class="scrollComp">
    <vue3-seamless-scroll 
      ref="scroll" 
      :class-option="scrollOption" 
      :list="listData"
      :direction="scrollOption.direction"
      :isWatch="scrollOption.isWatch"
      :hover="scrollOption.hover"
      :count="scrollOption.count"
      :limitScrollNum="scrollOption.limitScrollNum"
      :step="scrollOption.step"
      :singleHeight="scrollOption.singleHeight"
      :singleWidth="scrollOption.singleWidth"
      :singleWaitTime="scrollOption.singleWaitTime"
      :isRemUnit="scrollOption.isRemUnit"
      :delay="scrollOption.delay"
      :ease="scrollOption.ease"
      :copyNum="scrollOption.copyNum"
      :wheel="scrollOption.wheel"
      :singleLine="scrollOption.singleLine"
      v-model="props.isscroll"
      @visible-change="visiblechange"
    >
    <!-- v-model属性来动态控制他是否停止滚动的 -->
      <slot></slot>
    </vue3-seamless-scroll>
  </div>
</template>

<style lang='less' scoped>
.scrollComp {
  overflow: hidden;
  height: 100%;
}
</style>