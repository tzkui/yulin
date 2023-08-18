<template>
    <div>
        <div id="main"></div>
        {{ a }}
        1111
    </div>
</template>

<script setup>
import * as echarts from 'echarts';
import { ref } from "vue";
const a=ref(111)
</script>

<style>
#main {
    height: 500px;
}
</style>
