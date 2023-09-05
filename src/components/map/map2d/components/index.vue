<!-- popup 入口组件 根据不同类型显示不同的展示-->
<template>
    <link rel="stylesheet" :href="cssUrl()">
    <!-- 组件文件 -->
    <!-- <mapTxtVue></mapTxtVue>
    <mapVideoVue></mapVideoVue> -->
    <div style="width: 300px;">
        <mapViewTxtDialog :dialogType="dialogType" :details="details" @closeDialog="closeDialog"></mapViewTxtDialog>
    </div>
</template>
<script setup>
import { defineProps, defineExpose, onMounted, watch, ref, inject } from 'vue';
import mapTxtVue from './map-txt.vue';
import mapVideoVue from './map-video.vue';
import  mitter  from "@/utils/mitt.js";
import mapViewTxtDialog from '@/components/common/mapViewTxtDialog.vue';
import { } from '../config/dialog.config'

const props = defineProps({
    data: {
        type: Object,
        default: {}
    }
});
const cssUrl = () => {
    let url = new URL('./popup.css', import.meta.url).href
    return url
}
let json = props.data.replaceAll("#####", " ")
const info = JSON.parse(json);
console.log('xxxxx',info)
// details.value = info.details;
// dialogType.value = info.dialogType
const details = ref(info.details)
details.value.id = info.id
const dialogType = ref(info.dialogType)

const closeDialog = function () {
    console.log(info)
    mitter.emit("hidePopup", {
        markerType: info.markerType,
        id: info.id
    })
}

onMounted(() => {
    // console.log('获取数据--->', props.data)
})

</script>