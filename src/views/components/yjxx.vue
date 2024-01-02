<script setup>
import dialogVue from "@/components/common/dialog.vue";
import { ref, inject, onMounted } from "vue";
const $mitt = inject("$mitt");

const warningInfo = ref({});
const closeHandle = function () {
  showDialog.value = false;
};
const type = ref("")
const showDialog = ref(false);
$mitt.on("openWarningDetailDialog", function (info) {
  showDialog.value = true;
  console.log(info)
  warningInfo.value = info
  type.value = info.warningType11
});
</script>

<template>
  <dialogVue
    :dialogValue="showDialog"
    :title="'预警信息'"
    width="980px"
    height="490px"
    top="500px"
    @closeHandle="closeHandle"
  >
    <div class="from-content">
      <table class="table-box">
        <tr>
          <td class="label">预警标题</td>
          <td colspan="3">{{warningInfo.alarmName || "暂无数据"}}</td>
        </tr>
        <tr>
          <td class="label">预警类别</td>
          <td>{{warningInfo.alarmType || "暂无数据"}}</td>
          <td class="label">预警信号名称</td>
          <td>{{"暂无数据"}}</td>
        </tr>
        <tr>
          <td class="label" v-if="type==='yj'">预警等级</td>
          <td class="label" v-else>地震等级</td>
          <td>{{warningInfo.alarmColor || parseFloat(warningInfo.m) || "暂无数据"}}</td>
          <template v-if="type==='yj'">
            <td class="label">发布状态</td>
            <td>{{"暂无数据"}}</td>
          </template>
          <template v-else>
            <td class="label">震源深度</td>
            <td>{{warningInfo.epiDepth}}千米</td>
          </template>
        </tr>
        <tr>
          <td class="label">发布时间</td>
          <td>{{warningInfo.alarmTime||warningInfo.oTime||"暂无数据"}}</td>
          <td class="label">签发者姓名</td>
          <td>{{"暂无数据"}}</td>
        </tr>
        <tr class="tr-h6">
          <td class="label">预警内容</td>
          <td colspan="3">{{warningInfo.alarmContent || "暂无数据"}}</td>
        </tr>
        <tr class="tr-h6">
          <td class="label">预警原因说明</td>
          <td colspan="3">
            {{ "暂无数据" }}
          </td>
        </tr>
        <tr class="tr-h6">
          <td class="label">防范建议</td>
          <td colspan="3">
            {{"暂无数据"}}
          </td>
        </tr>
      </table>
    </div>
  </dialogVue>
</template>

<style lang="scss" scoped>
// 预警信息
.from-content {
  margin: auto;
  width: 937px;
  height: 400px;
  margin-top: 10px;
  background: rgba(0, 163, 206, 0.2);

  .table-box {
    width: 100%;
    border-collapse: collapse;
  }

  tr td {
    border: 1px solid #00a3ce;
    padding-left: 16px;
    font-size: 16px;
    font-family: Source Han Sans SC-Regular, Source Han Sans SC;
    font-weight: 400;
    color: #ffffff;
  }

  .label {
    width: 120px;
    text-align: center;
    padding-left: 0;
  }

  tr {
    height: 40px;
  }

  .tr-h6 {
    height: 80px;
  }
}
</style>
