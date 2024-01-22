<script setup>
import dialogVue from "@/components/common/dialog.vue";
import {zpzj} from '@/api/decision_analysis.js'
import { ref } from "vue";
import {ElMessage} from 'element-plus'
const showDialog = ref(false);
const closeHandle = function () {
  showDialog.value = false;
};
const formData = ref({
  content: "",
  eventId: ""
});
const submit = function () {
  zpzj(formData.value).then(res=>{
  }).catch(()=>{

  }).finally(()=>{
    ElMessage.success("提交成功")
    closeHandle()
  })
}
defineExpose({
  openDialog(info) {
    console.log(info)
    formData.value.eventId = info.event.id;
    formData.value.content = "";
    showDialog.value = true;
  },
});
</script>

<template>
  <Teleport to="body">
    <dialogVue
      :dialogValue="showDialog"
      :title="'战评总结'"
      width="640px"
      height="455px"
      top="500px"
      @closeHandle="closeHandle"
    >
      <el-form :model="xxform" class="xxform">
        <el-form-item label="战评总结" prop="content" class="biginput">
          <el-input
            v-model="formData.content"
            type="textarea"
            placeholder="请输入总结"
            clearable
          />
        </el-form-item>
      </el-form>
      <div class="footerbt">
        <button @click="closeHandle">取消</button>
        <button @click="submit">确定</button>
      </div>
    </dialogVue>
  </Teleport>
</template>

<style lang="scss" scoped>
.footerbt{
  text-align: right;
  button{
    width: 49px;
    height: 28px;
    color: #fff;
    border-radius: 5px;
    margin: 5px;
    background-color: #0d4f6d;
    font-size: 14px;
  }

}
:deep(.el-form-item__label){
  color: #fff;

}
:deep(.el-form-item__content) {
  textarea{
    background-color: transparent;
    height: 300px;
    color: #fff;
    border-color: #00A3CE;
  }
}
</style>