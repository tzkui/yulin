<script setup>
import { ref, onUnmounted } from "vue";
import dialogVue from "./dialog.vue";
import { useEventBus } from "@vueuse/core";
const bus = useEventBus("eventSupplementaryRecording")
const listener = function(e){
  console.log(e)
  showDialog.value = true;
}
bus.on(listener)
const showDialog = ref(false)
const closeDialog = function () {
  showDialog.value = false;
};
const formData = ref({});
onUnmounted(()=>{
  bus.off(listener)
})
const xlData = ref([])
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
        <el-form class="smalform" :model="formData">
          <el-form-item label="事件编号" prop="name">
            <el-input v-model="formData.bh" placeholder="" clearable />
          </el-form-item>
          <el-form-item label="事件类型" prop="time">
            <el-input v-model="formData.lx" placeholder="" clearable />
          </el-form-item>
        </el-form>
        <el-form class="smalform" :model="formData">
          <el-form-item label="事发时间" prop="grade">
            <!-- <el-input v-model="hsform.name" placeholder="'" clearable /> -->
            <el-select v-model="formData.sj" placeholder="" size="large">
              <!-- <el-option
                v-for="item in xldata"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              /> -->
            </el-select>
          </el-form-item>
          <el-form-item label="时间名称" prop="region">
            <!-- <el-input v-model="hsform.name" placeholder="'" clearable /> -->
            <el-select v-model="formData.name" placeholder="Select" size="large">
              <el-option
                v-for="item in xldata"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <el-form class="smalform" :model="formData">
          <el-form-item label="事件等级" prop="grade">
            <!-- <el-input v-model="hsform.name" placeholder="'" clearable /> -->
            <el-select v-model="formData.dj" placeholder="" size="large">
              <!-- <el-option
                v-for="item in xldata"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              /> -->
            </el-select>
          </el-form-item>
          <el-form-item label="紧张程度" prop="region">
            <!-- <el-input v-model="hsform.name" placeholder="'" clearable /> -->
            <el-select v-model="formData.cd" placeholder="Select" size="large">
              <!-- <el-option
                v-for="item in xldata"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              /> -->
            </el-select>
          </el-form-item>
        </el-form>
        <!-- 这里是那个特殊的比较小的那种 -->
        <el-form class="smalform" :model="formData">
          <el-form-item label="伤亡情况">
            <el-form class="smalformss" :model="formData">
              <el-form-item label="现场共有" prop="grade">
                <el-input
                  class="sbl"
                  v-model="formData.swqk"
                  placeholder="'"
                  clearable
                />
              </el-form-item>
              <el-form-item label="合计死亡" prop="region">
                <el-input
                  class="sbl"
                  v-model="formData.swqk"
                  placeholder="'"
                  clearable
                />
              </el-form-item>
              <el-form-item label="合计失踪" prop="region">
                <el-input
                  class="sbl"
                  v-model="formData.swqk"
                  placeholder="'"
                  clearable
                />
              </el-form-item>
              <el-form-item label="合计重伤" prop="region">
                <el-input
                  class="sbl"
                  v-model="formData.swqk"
                  placeholder="'"
                  clearable
                />
              </el-form-item>
              <el-form-item label="合计轻伤" prop="region">
                <el-input
                  class="sbl"
                  v-model="formData.swqk"
                  placeholder="'"
                  clearable
                />
              </el-form-item>
            </el-form>
            <el-form class="smalforms2" :model="hsform">
              <el-form-item label="合计被困" prop="region">
                <el-input
                  class="sbl"
                  v-model="formData.swqk"
                  placeholder="'"
                  clearable
                />
              </el-form-item>
              <el-form-item label="合计中毒" prop="region">
                <el-input
                  class="sbl"
                  v-model="formData.swqk"
                  placeholder="'"
                  clearable
                />
              </el-form-item>
            </el-form>
          </el-form-item>
        </el-form>

        <el-form class="smalform" :model="formData">
          <el-form-item label="所在区域" prop="grade">
            <!-- <el-input v-model="hsform.name" placeholder="'" clearable /> -->
            <el-select v-model="formData.quyu" placeholder="" size="large">
              <!-- <el-option
                v-for="item in xldata"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              /> -->
            </el-select>
          </el-form-item>
          <el-form-item label="详细地址" prop="region">
            <!-- <el-input v-model="hsform.name" placeholder="'" clearable /> -->
            <el-select v-model="formData.xxdz" placeholder="Select" size="large">
              <!-- <el-option
                v-for="item in xldata"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              /> -->
            </el-select>
          </el-form-item>
        </el-form>
        <!-- 下面这个是地图定位的 -->
        <el-form class="smalform" :model="formData">
          <el-form-item label="地图定位" prop="grade">
            <el-form class="smalforms3" :model="formData">
              <el-form-item prop="grade">
                <!-- <el-input v-model="hsform.name" placeholder="'" clearable /> -->
                <el-select v-model="formData.dtdw" placeholder="" size="large">
                  <!-- <el-option
                    v-for="item in xldata"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  /> -->
                </el-select>
              </el-form-item>
              <el-form-item prop="region">
                <!-- <el-input v-model="hsform.name" placeholder="'" clearable /> -->
                <el-select
                  v-model="formData.dtdw"
                  placeholder="Select"
                  size="large"
                >
                  <!-- <el-option
                    v-for="item in xldata"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  /> -->
                </el-select>
              </el-form-item>
              <el-form-item prop="region">
                <!-- <el-input v-model="hsform.name" placeholder="'" clearable /> -->
                <el-select
                  v-model="formData.dtdw"
                  placeholder="Select"
                  size="large"
                >
                  <!-- <el-option
                    v-for="item in xldata"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  /> -->
                </el-select>
              </el-form-item>
              <el-form-item prop="region">
                <el-button>地图选择位置</el-button>
              </el-form-item>
            </el-form>
          </el-form-item>
        </el-form>
      </div>

      <el-form :model="formData">
        <el-form-item label="详细地址" class="describeinput">
          <el-input v-model="formData.xxdz" placeholder="'" clearable />
        </el-form-item>
      </el-form>

      <div class="title">
        <span>事件信息</span>
      </div>
      <el-form class="smalform" :model="formData">
        <el-form-item label="报送人员" prop="grade">
          <!-- <el-input v-model="hsform.name" placeholder="'" clearable /> -->
          <el-select v-model="formData.bsry" placeholder="" size="large">
            <el-option
              v-for="item in xldata"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="报送名称" prop="region">
          <!-- <el-input v-model="hsform.name" placeholder="'" clearable /> -->
          <el-select v-model="formData.bsmc" placeholder="Select" size="large">
            <el-option
              v-for="item in xldata"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <el-form class="smalform" :model="hsform">
        <el-form-item label="报送时间" prop="grade">
          <!-- <el-input v-model="hsform.name" placeholder="'" clearable /> -->
          <el-select v-model="formData.bssj" placeholder="" size="large">
            <el-option
              v-for="item in xldata"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="联系电话" prop="region">
          <!-- <el-input v-model="hsform.name" placeholder="'" clearable /> -->
          <el-select v-model="formData.lxdh" placeholder="Select" size="large">
            <el-option
              v-for="item in xldata"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 附件上传部分的 -->
      <div class="title">
        <span>附件信息</span>
      </div>
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
        <button>取消</button>
        <button>确定</button>
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

  ::v-deep .el-form-item {
    // width: 100% !important;
    // display: flex !important;
    // justify-content: end;
  }

  // background: #00a3ce;
  .title {
    height: 56px;
    display: flex;
    align-items: center;
    font-size: 16px;
    // border-bottom: 1px solid rgba(0, 154, 195, 1);
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

  .smalform {
    // width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .smalforms2 {
    width: 100%;
    margin: 5px 0px;
    display: flex;
    align-items: center;
    justify-content: left;

    ::v-deep .el-form-item {
      padding-right: 26px;
    }

    ::v-deep .el-input__wrapper {
      background-color: rgba(1, 40, 59, 1) !important;
      border: 1px solid rgba(0, 163, 206, 1) !important;
      box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color))
        inset;
      width: 60px;
      flex: 1;
      height: 40px;
      border-radius: 0px;
      margin-bottom: -3px;
    }
  }

  // 只有三个框框的那个
  .smalforms3 {
    width: 100%;
    margin: 5px 0px;
    display: flex;
    align-items: center;
    justify-content: left;

    ::v-deep .el-form-item {
      padding-right: 12px;
    }

    ::v-deep .el-input__wrapper {
      background-color: rgba(1, 40, 59, 1) !important;
      border: 1px solid rgba(0, 163, 206, 1) !important;
      box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color))
        inset;
      width: 180px;
      flex: 1;
      height: 40px;
      border-radius: 0px;
      margin-bottom: -3px;
    }
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

  .smalformss {
    width: 100%;
    margin: 5px 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    ::v-deep .el-input__wrapper {
      background-color: rgba(1, 40, 59, 1) !important;
      border: 1px solid rgba(0, 163, 206, 1) !important;
      box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color))
        inset;
      width: 60px;
      flex: 1;
      height: 40px;
      border-radius: 0px;
      margin-bottom: -3px;
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
