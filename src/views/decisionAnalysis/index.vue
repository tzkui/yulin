<template>
    <div class="decision_analysis">
        <!-- 地图 -->
        <div class="map"></div>
        <!-- 左侧内容 -->
        <pageLeftContent>
            <left @eventClick="changeEvent"></left>
        </pageLeftContent>
        <!-- 右侧内容 -->
        <pageRightContent>
            <right :radius="radius" :centerPoint="centerPoint" @changeRadius="changeRadius"></right>
        </pageRightContent>

    </div>
</template>

<script setup>
import { ref, onMounted, reactive, inject } from "vue";
import pageLeftContent from "@/components/common/pageLeftContent.vue";
import pageRightContent from "@/components/common/pageRightContent.vue";
import left from "./components/left.vue";
import right from "./components/right.vue";




const $mitt = inject("$mitt");
onMounted(() => {
})

const radius = ref({
    effect_radius: 200,
    analysis_radius: 400,
})
// 右侧撒点中心点
const centerPoint = ref([])

// 改变事件
const changeEvent = (item) => {
    // console.log('item============>', item);
    centerPoint.value = [item.mapX, item.mapY]

    // 圈选半径
    radius.value.effect_radius = item.effectArea || 400
    radius.value.analysis_radius = item.effectArea || 600

    $mitt.emit('drawTypeGraph', {
        type: 'Circle',
        id: 'effect_radius',
        positions: centerPoint.value,
        style: {
            radius: radius.value.effect_radius,
            fillColor: "rgba(255,0,0,.3)",
            outlineColor: "#ee3844",
            outlineWidth: 5,
        }
    })
    $mitt.emit('drawTypeGraph', {
        type: 'Circle',
        id: 'analysis_radius',
        positions: centerPoint.value,
        style: {
            radius: radius.value.analysis_radius,
            fillColor: "transparent",
            outlineColor: "#1AAD19",
            outlineWidth: 5,
        }
    })
}

// 改变半径
const changeRadius = (type, val) => {
    // console.log('type,val===========>', type, val);
    $mitt.emit('upDataRadius', {
        type: 'Circle',
        id: type,
        radius: val,
    })
}


</script>


<style scoped lang="less">
.decision_analysis {
    ::-webkit-scrollbar {
        display: none;
    }
}
</style>

