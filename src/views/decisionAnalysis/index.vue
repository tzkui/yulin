<template>
    <div class="decision_analysis">
        <!-- 地图 -->
        <div class="map"></div>
        <!-- 左侧内容 -->
        <pageLeftContent>
            <left></left>
        </pageLeftContent>
        <!-- 右侧内容 -->
        <pageRightContent>
            <right></right>
        </pageRightContent>

    </div>
</template>

<script setup>
import pageLeftContent from "@/components/common/pageLeftContent.vue";
import pageRightContent from "@/components/common/pageRightContent.vue";
import left from "./components/left.vue";
import right from "./components/right.vue";
</script>


<style scoped lang="less">
.decision_analysis {
    ::-webkit-scrollbar {
        display: none;
    }
}
</style>

