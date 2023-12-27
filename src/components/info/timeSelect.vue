<script setup>
import { ref, inject, onMounted } from "vue";
import dialogVue from "@/components/common/dialog.vue";
import {getRygj} from '@/api/modules/home.js'
import { ElMessage } from "element-plus";

const showDialog = ref(false);
const $mitt = inject("$mitt");

const personalId = ref("")
const getLists = function () {
  let param = {
    personalId: personalId.value,
    startTime: times.value[0],
    endTime: times.value[1],
  };
  getRygj(param).then((res) => {
    $mitt.emit("addTrajectory",{
      list: res.data
    })
    showDialog.value = false;
  });
};
onMounted(() => {
  $mitt.on("trajectoryTimeSelect", function (e) {
    showDialog.value = true;
    personalId.value = e.id;
  });
});
const times = ref([]);
const getTrajectory = function () {
  console.log(times.value);
  if (times.value?.length === 2) {
    getLists()
  }else{
    ElMessage.warning("请先选择时间")
  }
};
</script>

<template>
  <dialogVue
    :dialogValue="showDialog"
    :title="'选择时间'"
    width="440px"
    height="180px"
    top="500px"
    @closeHandle="showDialog = false"
  >
    <div class="dialog">
      <el-date-picker
        v-model="times"
        type="datetimerange"
        range-separator="到"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        value-format="YYYY-MM-DD HH:mm:ss"
      />
      <div class="btn" @click="getTrajectory">查询轨迹</div>
    </div>
  </dialogVue>
</template>

<style lang="scss" scoped>
.dialog {
  margin-top: 10px;
  background-color: #051e3a;
  .btn {
    text-align: center;
    line-height: 36px;
    height: 36px;
    margin: 20px auto;
    background: #0c4571;
    border-radius: 18px;
    cursor: pointer;
  }
}
</style>
