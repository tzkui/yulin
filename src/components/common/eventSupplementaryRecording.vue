<script setup>
import { ref, onUnmounted, computed } from "vue";
import dialogVue from "./dialog.vue";

import {
  getEventInfoById,
  getEventTypeList,
  eventUpdata,
  uploadFile
} from "@/api/modules/zrzh.js";
import Common from "@/utils/common.js";
import selectLocation from "@/components/common/selectLocation.vue";
import { useEventBus } from "@vueuse/core";
import { ElMessage } from "element-plus";
const bus = useEventBus("eventSupplementaryRecording");
const listener = function (e) {
  getEventInfo(e.id);
  showDialog.value = true;
};
const getEventInfo = function (id) {
  getEventInfoById(id).then((res) => {
    for (let key in formData.value) {
      formData.value[key] = res.data[key];
    }
    // formData.value.eventType = 2
    fileList.value=res.files.map(item=>{
      return {
        ...item,
        name: item.fileName
      }
    })
  });
};
getEventTypeList().then((res) => {
  const { initTree } = Common();
  eventTypeList.value = initTree(res.data, { pid: "parentId" });
});
const uploadUrl = ref(window.baseRequestUrl+"/zrzh/eventfile_upload")
const uploadHeader = ref({
  Authorization: "Bearer " + sessionStorage.getItem("token")
})
const eventTypeList = ref([]);
bus.on(listener);
const showDialog = ref(false);
const closeDialog = function () {
  showDialog.value = false;
};
// 事件等级下拉框选项
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
  eventAddress: "",
  mapX: 109.82103,
  mapY: 38.331165,
  // mapZ: null,
  eventContent: "",
  eventLevel: 1,
  emergency: 1,
  deathNum: 0,
  poisoningNum: 0,
  minorWoundNum: 0,
  seriousInjuryNum: 0,
  trappedNum: 0,
  bemissingNum: 0,
  typeId: "",
  id: ""
});
const submitForm = function () {
  console.log(formData.value);
  eventUpdata({...formData.value,select: formData.value.typeId,file: ""}).then(res=>{
    console.log(res)
    ElMessage.success("补录成功");
    closeDialog()
  }).catch(err=>{
    console.log("err",err)
    ElMessage.warning({
      type: "warning",
      message: "请填写完整再保存",
      offset: 500
    })
  })
};
const selectLocationRef = ref();
const openMap = function () {
  selectLocationRef.value.openDialog();
};
onUnmounted(() => {
  bus.off(listener);
});
const totalCount = computed(() => {
  let {
    deathNum,
    poisoningNum,
    minorWoundNum,
    seriousInjuryNum,
    trappedNum,
    bemissingNum,
  } = formData.value;
  return (
    (deathNum - 0 || 0) +
    (poisoningNum - 0 || 0) +
    (minorWoundNum - 0 || 0) +
    (seriousInjuryNum - 0 || 0) +
    (trappedNum - 0 || 0) +
    (bemissingNum - 0 || 0)
  );
});
const choiceLocation = function (data) {
  formData.value.mapX = data.lng;
  formData.value.mapY = data.lat;
};
const center = computed(() => {
  return {
    lng: formData.value.mapX,
    lat: formData.value.mapY,
  };
});
const fileList = ref([])

const pdfUrl = ref("")
const previewFile = function(data){
  console.log(data)
  pdfUrl.value = "http://127.0.0.1:5500/test.pdf";
  showPdf.value = true;
}
const showPdf = ref(false)
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
                  placeholder="请输入"
                  clearable
                /> </el-form-item
            ></el-col>
            <el-col :span="12">
              <el-form-item label="事件类型" prop="typeId">
                <el-tree-select
                  v-model="formData.typeId"
                  :data="eventTypeList"
                  check-strictly
                  :render-after-expand="false"
                  :props="{label:'typeName',value: 'id'}"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="事发时间" prop="eventDate">
                <el-date-picker
                  v-model="formData.eventDate"
                  type="datetime"
                  placeholder="选择时间"
                  value-format="YYYY-MM-DD HH:mm:ss"
                  style="width: 100%"
                /> </el-form-item
            ></el-col>
            <el-col :span="12">
              <el-form-item label="事件名称" prop="eventName">
                <el-input
                  v-model="formData.eventName"
                  placeholder="请输入"
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
                  style="width: 100%"
                  size="large"
                >
                  <el-option
                    style="min-width: 198px"
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
                  placeholder="请选择"
                  style="width: 100%"
                  size="large"
                >
                  <el-option
                    v-for="item in emergencyList"
                    style="min-width: 198px"
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
                          type="number"
                          placeholder="请输入"
                          disabled
                          clearable
                        /> </el-form-item
                    ></el-col>
                    <el-col :span="6">
                      <el-form-item label="合计死亡" prop="deathNum">
                        <el-input
                          class="sbl"
                          v-model="formData.deathNum"
                          placeholder="请输入"
                          type="number"
                          clearable
                        /> </el-form-item
                    ></el-col>
                    <el-col :span="6">
                      <el-form-item label="合计失踪" prop="bemissingNum">
                        <el-input
                          class="sbl"
                          v-model="formData.bemissingNum"
                          placeholder="请输入"
                          type="number"
                          clearable
                        /> </el-form-item
                    ></el-col>
                    <el-col :span="6">
                      <el-form-item label="合计重伤" prop="seriousInjuryNum">
                        <el-input
                          class="sbl"
                          v-model="formData.seriousInjuryNum"
                          placeholder="请输入"
                          type="number"
                          clearable
                        /> </el-form-item
                    ></el-col>
                  </el-row>
                  <div style="height: 10px"></div>
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <el-form-item label="合计轻伤" prop="minorWoundNum">
                        <el-input
                          class="sbl"
                          v-model="formData.minorWoundNum"
                          placeholder="请输入"
                          type="number"
                          clearable
                        /> </el-form-item
                    ></el-col>
                    <el-col :span="6">
                      <el-form-item label="合计被困" prop="trappedNum">
                        <el-input
                          class="sbl"
                          v-model="formData.trappedNum"
                          placeholder="请输入"
                          type="number"
                          clearable
                        /> </el-form-item
                    ></el-col>
                    <el-col :span="6">
                      <el-form-item label="合计中毒" prop="poisoningNum">
                        <el-input
                          class="sbl"
                          v-model="formData.poisoningNum"
                          placeholder="请输入"
                          type="number"
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
                    placeholder="请输入"
                  /> </el-form-item
              ></el-col>
              <el-col :span="6">
                <el-form-item prop="region">
                  <el-input
                    v-model="formData.mapY"
                    placeholder="请输入"
                  /> </el-form-item
              ></el-col>
              <el-col :span="6">
                <el-form-item
                  prop="region"
                  style="display: flex; align-items: center"
                >
                  <el-button
                    @click="openMap"
                    type="primary"
                    style="height: 36px"
                    >地图选择位置</el-button
                  >
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

      <div class="title">
        <span>附件信息</span>
      </div>
      <!-- 附件上传部分的 -->
      <div class="fj">
        <div class="fjimg">
          <el-upload
            :file-list="fileList"
            class="avatar-uploader"
            :action="uploadUrl"
            :headers="uploadHeader"
            :data="{eventId: formData.id}"
            :show-file-list="true"
            :on-success="()=>console.log(fileList)"
            :onPreview="previewFile"
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
  <selectLocation
    @choiceLocation="choiceLocation"
    ref="selectLocationRef"
    :center="center"
  ></selectLocation>
  
  <dialogVue
    :dialogValue="showPdf"
    :title="'文件预览'"
    width="1000px"
    height="780px"
    top="500px"
    @closeHandle="showPdf=false"
  >
  <iframe :src="pdfUrl" width="960" height="700" frameborder="0"></iframe>
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

  .el-select-dropdown {
    min-width: 198px !important;
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

  // 下面是附件信息哪里的相关的样式的了
  .fj {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .fjimg {
      width: 752px;
      // height: 170px;
      border: 1px solid rgba(0, 163, 206, 0.5);
      display: flex;
      align-items: center;
      padding: 20px 20px 10px;

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
}
.preview{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 700px;
  z-index: 99999;
}
</style>
