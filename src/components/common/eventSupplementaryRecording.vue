<script setup>
import { ref, onUnmounted, computed } from "vue";
import dialogVue from "./dialog.vue";

import { getEventInfoById, getEventTypeList } from "@/api/modules/zrzh.js";
import Common from "@/utils/common.js";
import { useEventBus } from "@vueuse/core";

const bus = useEventBus("eventSupplementaryRecording");
const listener = function (e) {
  console.log(e);
  showDialog.value = true;
};

getEventInfoById("13b0daa026ad4f6ab0a6185d3fac964e").then((res) => {
  console.log("xxxxxxxxx", res);
});
getEventTypeList().then((res) => {
  console.log("xxxxx,", res);
  const { initTree } = Common();
  eventTypeList.value = initTree(res.data, { pid: "parentId" });
  console.log("xxxx", eventTypeList);
});
const eventTypeList = ref([]);
bus.on(listener);
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
// 紧急程度下拉框
const emergencyList = ref([
  { label: "常规", value: 1 },
  { label: "紧急", value: 2 },
  { label: "特急", value: 3 },
]);
const formData = ref({
  eventNumber: "",
  eventType: "",
  eventDate: "",
  eventName: "",
  mapX: 109.82103,
  mapY: 38.331165,
  mapZ: "",
  eventContent: "",
  eventLevel: 1,
  emergency: 1,
  deathNum: 0,
  poisoningNum: 0,
  injuryNum: 0,
  seriousInjuryNum: 0,
  relocationNum: 0,
  bemissingNum: 0,
});
const submitForm = function () {
  console.log(formData.value);
};
onUnmounted(() => {
  bus.off(listener);
});
const xlData = ref([]);
const totalCount = computed(() => {
  let {
    deathNum,
    poisoningNum,
    injuryNum,
    seriousInjuryNum,
    relocationNum,
    bemissingNum,
  } = formData.value;
  return (
    deathNum +
    poisoningNum +
    injuryNum +
    seriousInjuryNum +
    relocationNum +
    bemissingNum
  );
});
</script>

<template>
  <dialogVue
    :dialogValue="showDialog"
    :title="'事件补录'"
    width="850px"
    height="692px"
    top="500px"
    @closeHandle="closeDialog"
  >
    <!-- 下面这个就是里面的内容部分的了 -->
    <div class="sjblmain">
      <div class="title">
        <span>事件信息</span>
      </div>
      <!-- 下面是这个主体内容 -->
      <div class="forms">
        <el-form :model="formData">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="事件编号" prop="eventNumber">
                <el-input
                  v-model="formData.eventNumber"
                  placeholder=""
                  clearable
                /> </el-form-item
            ></el-col>
            <el-col :span="12">
              <el-form-item label="事件类型" prop="eventType">
                <el-cascader
                  :options="eventTypeList"
                  :props="{
                    checkStrictly: true,
                    label: 'typeName',
                    value: 'id',
                  }"
                  clearable
                /> </el-form-item
            ></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="事发时间" prop="eventDate">
                <el-date-picker
                  v-model="formData.eventDate"
                  type="datetime"
                  placeholder="选择时间"
                  value-format="YYYY-MM-DD HH:mm:ss"
                  style="width: 275px"
                /> </el-form-item
            ></el-col>
            <el-col :span="12">
              <el-form-item label="事件名称" prop="eventName">
                <el-input
                  v-model="formData.eventName"
                  placeholder=""
                  clearable
                /> </el-form-item
            ></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="事件等级" prop="eventLevel">
                <el-select
                  v-model="formData.eventLevel"
                  placeholder=""
                  size="large"
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
              <el-form-item label="紧急程度" prop="region">
                <el-select
                  v-model="formData.emergency"
                  placeholder="Select"
                  size="large"
                >
                  <el-option
                    v-for="item in emergencyList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select> </el-form-item
            ></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <div class="swqk">
                <el-form-item label="伤亡情况">
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <el-form-item label="现场共有" prop="grade">
                        <el-input
                          class="sbl"
                          v-model="totalCount"
                          placeholder=""
                          clearable
                        /> </el-form-item
                    ></el-col>
                    <el-col :span="6">
                      <el-form-item label="合计死亡" prop="deathNum">
                        <el-input
                          class="sbl"
                          v-model="formData.deathNum"
                          placeholder=""
                          clearable
                        /> </el-form-item
                    ></el-col>
                    <el-col :span="6">
                      <el-form-item label="合计失踪" prop="poisoningNum">
                        <el-input
                          class="sbl"
                          v-model="formData.poisoningNum"
                          placeholder=""
                          clearable
                        /> </el-form-item
                    ></el-col>
                    <el-col :span="6">
                      <el-form-item label="合计重伤" prop="seriousInjuryNum">
                        <el-input
                          class="sbl"
                          v-model="formData.seriousInjuryNum"
                          placeholder=""
                          clearable
                        /> </el-form-item
                    ></el-col>
                  </el-row>
                  <div style="height: 10px"></div>
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <el-form-item label="合计轻伤" prop="injuryNum">
                        <el-input
                          class="sbl"
                          v-model="formData.injuryNum"
                          placeholder=""
                          clearable
                        /> </el-form-item
                    ></el-col>
                    <el-col :span="6">
                      <el-form-item label="合计被困" prop="relocationNum">
                        <el-input
                          class="sbl"
                          v-model="formData.relocationNum"
                          placeholder=""
                          clearable
                        /> </el-form-item
                    ></el-col>
                    <el-col :span="6">
                      <el-form-item label="合计中毒" prop="poisoningNum">
                        <el-input
                          class="sbl"
                          v-model="formData.poisoningNum"
                          placeholder=""
                          clearable
                        /> </el-form-item
                    ></el-col>
                  </el-row>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col>
              <el-form-item label="详细地址" prop="eventAddress">
                <el-input
                  v-model="formData.eventAddress"
                  placeholder="请输入地址"
                  clearable
                /> </el-form-item
            ></el-col>
          </el-row>
          <el-row :gutter="3">
            <el-form-item label="地图定位">
              <el-col :span="6">
                <el-form-item prop="grade">
                  <el-input
                    v-model="formData.mapX"
                    placeholder=""
                    disabled
                  /> </el-form-item
              ></el-col>
              <el-col :span="6">
                <el-form-item prop="region">
                  <el-input
                    v-model="formData.mapY"
                    placeholder=""
                    disabled
                  /> </el-form-item
              ></el-col>
              <el-col :span="6">
                <el-form-item prop="region">
                  <el-input
                    v-model="formData.mapZ"
                    placeholder="请输入高程"
                    clearable
                  /> </el-form-item
              ></el-col>
              <el-col :span="6">
                <el-form-item prop="region">
                  <el-button>地图选择位置</el-button>
                </el-form-item></el-col
              >
            </el-form-item>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="事件描述" class="describeinput">
                <el-input
                  v-model="formData.eventContent"
                  type="textarea"
                  placeholder=""
                  clearable
                  rows="3"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <!-- <div class="title">
        <span>事件信息</span>
      </div>
      <el-form class="smalform" :model="formData">
        <el-form-item label="报送人员" prop="reportPersonal">
          <el-input
            v-model="formData.reportPersonal"
            placeholder="'"
            clearable
          />
        </el-form-item>
        <el-form-item label="报送单位" prop="reportOrg">
          <el-select
            v-model="formData.reportOrg"
            placeholder="Select"
            size="large"
          >
          </el-select>
        </el-form-item>
        <el-form-item label="报送时间" prop="reportDate">
          <el-date-picker
            v-model="formData.reportDate"
            type="datetime"
            placeholder="选择时间"
            value-format="YYYY-MM-DD HH:mm:ss"
            style="width: 275px"
          />
        </el-form-item>
        <el-form-item label="联系电话" prop="reportPhone">
          <el-input v-model="formData.reportPhone" placeholder="'" clearable />
        </el-form-item>
      </el-form> -->
      <div class="title">
        <span>附件信息</span>
      </div>
      <!-- 附件上传部分的 -->
      <div class="fj">
        <div class="fjimg">
          <el-upload
            class="avatar-uploader"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </div>
      </div>

      <!-- 下面就是按钮的了 -->
      <div class="buttons">
        <button @click="closeDialog">取消</button>
        <button @click="submitForm">确定</button>
      </div>
    </div>
  </dialogVue>
</template>

<style lang="scss" scoped>
.sjblmain {
  padding: 0px 8px 0px 8px;
  margin: -10px !important;
  height: 632px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
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

  ::v-deep .el-cascader {
    margin: unset;
  }
  ::v-deep .el-textarea__inner {
    background-color: rgba(1, 40, 59, 1) !important;
    border: 1px solid rgba(0, 163, 206, 1) !important;
    box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color))
      inset;
    color: #aacbf6;
  }
  .title {
    height: 56px;
    display: flex;
    align-items: center;
    font-size: 16px;
    margin-bottom: 8px;

    span {
      display: inline-block;
      height: 32px;
      display: flex;
      align-items: center;
      width: 100%;
      background-color: rgba(0, 163, 206, 0.15);
      padding-left: 8px;
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

  // 下面是附件信息哪里的相关的样式的了
  .fj {
    width: 100%;
    height: 170px;
    display: flex;
    align-items: center;
    justify-content: center;

    .fjimg {
      width: 752px;
      height: 170px;
      border: 1px solid rgba(0, 163, 206, 0.5);
      display: flex;
      align-items: center;
      padding-left: 20px;

      ::v-deep .el-upload {
        width: 200px;
        height: 150px;
        border: 1px solid rgba(0, 163, 206, 0.5);
      }
    }
  }
  // 底部按钮的样式
  .buttons {
    display: flex;
    justify-content: end;
    margin: 20px 0px;

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

  ::v-deep .el-form-item {
    display: flex;
    align-items: center !important;
  }
}
</style>
