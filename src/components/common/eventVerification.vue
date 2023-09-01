<script setup>
import { ref, onUnmounted } from "vue";
import dialogVue from "./dialog.vue";
import { useEventBus } from "@vueuse/core";
const bus = useEventBus("eventVerification")
const listener = function(e){
  console.log(e)
  showDialog.value = true;
}
bus.on(listener)
const showDialog = ref(false);
const closeDialog = function () {
  showDialog.value = false;
};
const formData = ref({});
onUnmounted(()=>{
  bus.off(listener)
})
</script>
<template>
  <!-- 下面这个就是事件核实的弹出框的了 -->
  <dialogVue
    :dialogValue="showDialog"
    :title="'事件核实'"
    width="866px"
    height="578px"
    top="500px"
    @closeHandle="closeDialog"
  >
    <!-- 下面这个就是里面的内容部分的了 -->
    <div class="sjhsmain">
      <div class="title">
        <span>事件信息111</span>
      </div>
      <!-- 下面是这个主体内容 -->
      <div class="forms">
        <el-form ref="ruleFormRef" class="smalform" :model="formData">
          <el-form-item label="事件名称" prop="name">
            <el-input v-model="formData.name" placeholder="" clearable />
          </el-form-item>
          <el-form-item label="事发时间" prop="time">
            <el-input v-model="formData.time" placeholder="" clearable />
          </el-form-item>
        </el-form>
        <el-form class="smalform" :model="formData" :rules="rules">
          <el-form-item label="事件等级" prop="grade">
            <!-- <el-input v-model="formData.name" placeholder="'" clearable /> -->
            <el-select v-model="formData.grade" placeholder="" size="large">
              <el-option
                v-for="item in xldata"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="事发区域" prop="region">
            <!-- <el-input v-model="formData.name" placeholder="'" clearable /> -->
            <el-select
              v-model="formData.region"
              placeholder="Select"
              size="large"
            >
              <el-option
                v-for="item in xldata"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <el-form :model="formData" :rules="rules">
          <el-form-item label="详细地址" prop="address">
            <el-input v-model="formData.address" placeholder="'" clearable />
          </el-form-item>
        </el-form>
        <el-form :model="formData">
          <el-form-item label="事件描述" class="describeinput">
            <el-input v-model="formData.describe" placeholder="'" clearable />
          </el-form-item>
        </el-form>
      </div>

      <div class="title2">
        <span>事件信息</span>
      </div>
      <el-form class="smalform" :model="formData" :rules="rules">
        <el-form-item label="核实状态">
          <el-radio-group v-model="formData.state" class="ml-4">
            <el-radio label="1" size="small">属实</el-radio>
            <el-radio label="2" size="small">不属实</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="事件类型">
          <!-- <el-input v-model="formData.name" placeholder="'" clearable /> -->
          <el-select v-model="formData.type" placeholder="Select" size="large">
            <el-option
              v-for="item in xldata"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <el-form :model="formData" :rules="rules">
        <el-form-item label="短信模板">
          <el-input v-model="formData.mo" placeholder="'" clearable />
        </el-form-item>
      </el-form>
      <!-- 下面就是按钮的了 -->
      <div class="buttons">
        <button>取消</button>
        <button>确定</button>
      </div>
    </div>
  </dialogVue>
</template>

<style lang="scss" scoped>
.sjhsmain {
  width: 850px;
  padding: 0px 8px 0px 8px;
  margin: -10px !important;
  height: 492px;

  // 中间那个小小的那个表单
  .smallblform {
    height: 88px !important;
    width: 100%;
    display: flex;

    ::v-deep .el-form-item {
      display: flex;
    }
  }

  // 处理一下表单的样式
  ::v-deep .el-form-item__label {
    color: #fff;
  }

  ::v-deep .el-input__wrapper {
    background-color: rgba(1, 40, 59, 1) !important;
    border: 1px solid rgba(0, 163, 206, 1) !important;
    box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color))
      inset;
    width: 320px;
    flex: 1;
    height: 40px;
    border-radius: 0px;
    margin-bottom: -3px;
  }

  ::v-deep .el-form-item--default {
    display: flex;
    align-items: center !important;
  }

  ::v-deep .el-form-item {
    display: flex;
    align-items: center !important;
  }

  // background: #00a3ce;
  .title {
    height: 56px;
    display: flex;
    align-items: center;
    font-size: 16px;
    border-bottom: 1px solid rgba(0, 154, 195, 1);
    margin-bottom: 8px;
  }

  .ssm {
    ::v-deep .el-input__wrapper {
      background-color: rgba(1, 40, 59, 1) !important;
      border: 1px solid rgba(0, 163, 206, 1) !important;
      box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color))
        inset;
      width: 30px !important;
      flex: 1;
      height: 40px;
      border-radius: 0px;
      margin-bottom: -3px;
    }
  }

  .title2 {
    height: 56px;
    display: flex;
    align-items: center;
    font-size: 16px;
    margin-top: -20px;
    border-bottom: 1px solid rgba(0, 154, 195, 1);
    margin-bottom: 8px;
  }

  .smalform {
    // width: 100%;
    display: flex;
    justify-content: space-between;
  }

  // 底部按钮的样式
  .buttons {
    display: flex;
    justify-content: center;

    button {
      width: 49px;
      height: 28px;
      background-color: rgba(13, 79, 109, 1);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0px 5px;
      border-radius: 5px;
    }
  }

  .describeinput {
    ::v-deep .el-input__wrapper {
      height: 80px;
    }
  }

  // 下面这个是单选框的样式
  ::v-deep .el-radio__inner {
    width: 12px;
    height: 12px;
    background: transparent;
    border-radius: 1px solid rgba(6, 152, 215, 1);
  }

  ::v-deep .el-radio__inner::after {
    background: rgba(6, 152, 215, 1);
  }

  ::v-deep .el-radio {
    color: #fff;
  }

  ::v-deep .el-popper.is-light .el-popper__arrow::before {
    border: 1px solid var(--el-border-color-light) !important;
    background: rgba(0, 163, 206, 0.2) !important;
    right: 0;
  }
}
</style>
