<script setup>
import dialogVue from "@/components/common/dialog.vue";
import { ref, inject, onMounted } from "vue";
const $mitt = inject("$mitt");

const warningInfo = ref({});
const closeHandle = function () {
  showDialog.value = false;
};
const showDialog = ref(false);
$mitt.on("openWarningDetailDialog", function (info) {
  showDialog.value = true;
  console.log(info)
});
</script>

<template>
  <dialogVue
    :dialogValue="showDialog"
    :title="'预警信息'"
    width="980px"
    height="460px"
    top="500px"
    @closeHandle="closeHandle"
  >
    <div class="from-content">
      <table class="table-box">
        <tr>
          <td class="label">预警标题</td>
          <td colspan="3">榆林气象台解除霜冻蓝色预警信号</td>
        </tr>
        <tr>
          <td class="label">预警类别</td>
          <td>霜冻</td>
          <td class="label">预警信号名称</td>
          <td>霜冻蓝色</td>
        </tr>
        <tr>
          <td class="label">预警等级</td>
          <td>蓝色</td>
          <td class="label">发布状态</td>
          <td>已解除</td>
        </tr>
        <tr>
          <td class="label">发布时间</td>
          <td>2022-0404 09:05:34</td>
          <td class="label">签发者姓名</td>
          <td>夏XX</td>
        </tr>
        <tr>
          <td class="label">预警内容</td>
          <td colspan="3">解除霜冻蓝色预警</td>
        </tr>
        <tr class="tr-h6">
          <td class="label">预警原因说明</td>
          <td colspan="3">
            3至4月和10至11月，48小时内最低气温将降至4摄氏度以下，或者已经下降到4摄氏度以下并将持续可能或已对农业、林业等产生一定影响
          </td>
        </tr>
        <tr class="tr-h6">
          <td class="label">防范建议</td>
          <td colspan="3">
            1.政府及相关部门做好防需冻准备工作;
            2.对茶叶、蔬菜、花卉、瓜果等作物采取一定防护措施
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
  height: 364px;
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
