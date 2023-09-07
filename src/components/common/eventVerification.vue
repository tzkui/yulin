<script setup>
import { ref, onUnmounted } from "vue";
import dialogVue from "./dialog.vue";
import {
  getEventInfoById,
  getEventTypeList,
  eventVerify,
} from "@/api/modules/zrzh.js";
import { useEventBus } from "@vueuse/core";
import { ElMessage } from "element-plus";

const bus = useEventBus("eventVerification");
const listener = function (e) {
  console.log(e);
  showDialog.value = true;
  getEventInfo(e.id);
};
bus.on(listener);
const getEventInfo = function (id) {
  getEventInfoById(id).then((res) => {
    for (let key in formData.value) {
      formData.value[key] = res.data[key];
    }
    formData.value.state = 2;
    formData.value.manageType = 2;
  });
};
const showDialog = ref(false);
const closeDialog = function () {
  showDialog.value = false;
};
const eventLevelList = ref([
  { label: "一般", value: 1 },
  { label: "较大", value: 2 },
  { label: "重大", value: 3 },
  { label: "特大", value: 4 },
]);
const formData = ref({
  eventName: "",
  eventDate: "",
  eventLevel: "",
  xzqhCode: "",
  eventAddress: "",
  eventContent: "",
  manageType: 2,
  id: "",
  state: 2,
  manageContent: "",
});
const submitForm = function () {
  const params = {
    ...formData.value,
  };
  console.log("params: ", params);
  eventVerify(params).then((res) => {
    console.log(res);
    ElMessage.success("核实成功");
    showDialog.value = false;
  });
};
const eventTypeList = ref([
  {
    label: "应急事件",
    value: 2,
  },
  {
    label: "一般事件",
    value: 1,
  },
]);
const areaList = [
  {
    id: "610000",
    label: "榆林市",
    children: [
      {
        id: "610802",
        label: "榆阳区",
      },
    ],
  },
];
onUnmounted(() => {
  bus.off(listener);
});
</script>
<template>
  <!-- 下面这个就是事件核实的弹出框的了 -->
  <dialogVue
    :dialogValue="showDialog"
    :title="'事件核实'"
    width="866px"
    height="720px"
    top="500px"
    @closeHandle="closeDialog"
  >
    <!-- 下面这个就是里面的内容部分的了 -->
    <div class="sjhsmain">
      <div class="title">
        <span>事件信息</span>
      </div>
      <!-- 下面是这个主体内容 -->
      <div class="forms">
        <el-form ref="ruleFormRef" :model="formData">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="事件名称" prop="name">
                <el-input
                  v-model="formData.eventName"
                  placeholder=""
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="事发时间" prop="time">
                <el-date-picker
                  v-model="formData.eventDate"
                  type="datetime"
                  placeholder="选择时间"
                  value-format="YYYY-MM-DD HH:mm:ss"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="事件等级" prop="grade">
                <el-select
                  v-model="formData.eventLevel"
                  placeholder=""
                  size="large"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in eventLevelList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select> </el-form-item
            ></el-col>
            <el-col :span="12">
              <el-form-item label="事发区域" prop="region" class="sfqy">
                
                <el-tree-select
                  v-model="formData.xzqhCode"
                  :data="areaList"
                  check-strictly
                  :render-after-expand="false"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="详细地址" prop="address">
                <el-input
                  v-model="formData.eventAddress"
                  placeholder=""
                  clearable
                /> </el-form-item
            ></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="事件描述" class="describeinput">
                <el-input
                  v-model="formData.eventContent"
                  type="textarea"
                  placeholder=""
                  clearable
                  :rows="4"
                /> </el-form-item
            ></el-col>
          </el-row>
          <div class="title">
            <span>事件核实</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="核实状态">
                <el-radio-group v-model="formData.state" class="ml-4">
                  <el-radio :label="2" size="small">属实</el-radio>
                  <el-radio :label="-1" size="small">不属实</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="事件类型">
                <el-select
                  v-model="formData.manageType"
                  placeholder="Select"
                  size="large"
                >
                  <el-option
                    v-for="item in eventTypeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="短信内容">
                <el-input
                  v-model="formData.manageContent"
                  type="textarea"
                  :rows="3"
                  placeholder=""
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>
          <div class="buttons">
            <div class="btn">取消</div>
            <div class="btn" @click="submitForm">确定</div>
          </div>
        </el-form>
      </div>
    </div>
  </dialogVue>
</template>

<style lang="scss" scoped>
.sjhsmain {
  width: 850px;
  padding: 0px 8px 0px 8px;
  margin: -10px !important;
  height: 600px;
  font-size: 16px;

  // 处理一下表单的样式
  ::v-deep .el-form-item__label {
    color: #fff;
    font-size: 16px;
  }
  ::v-deep .el-radio__label {
    font-size: 16px;
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
    margin-bottom: 18px;
  }

  // 底部按钮的样式
  .buttons {
    display: flex;
    justify-content: center;
    // margin-top: 24px;
    // margin-bottom: 16px;

    .btn {
      width: 49px;
      height: 28px;
      background-color: rgba(13, 79, 109, 1);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0px 5px;
      border-radius: 5px;
      cursor: pointer;
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
::v-deep .el-textarea__inner {
  background-color: rgba(1, 40, 59, 1) !important;
  border: 1px solid rgba(0, 163, 206, 1) !important;
  box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color))
    inset;
  color: #aacbf6;
}
.sfqy {
  height: auto !important;
  ::v-deep .el-tree {
    background: unset;
    .el-tree-node__content:hover {
      background-color: rgba(0, 0, 0, 0.1) !important;
      color: #53befc !important;
      z-index: 999;
    }
    .el-tree-node__content.hover {
      background-color: rgba(0, 0, 0, 0.1) !important;
    }
  }
}
</style>
