<script setup>
import { ref, onUnmounted } from "vue";
import dialogVue from "@/components/common/dialog.vue";
import { useEventBus } from "@vueuse/core";

const bus = useEventBus("eventView");
const listener = function (e) {
  console.log(e);
  showDialog.value = true;
};
bus.on(listener);
const showDialog = ref(false);

const props = defineProps({
  info: {
    type: Object,
    default: {},
  },
});

defineExpose({
  openDialog() {
    showDialog.value = true;
  },
});
onUnmounted(() => {
  bus.off(listener);
});
</script>
<template>
  <!-- 下面再来一个,这个就是事件信息的一个弹窗口的了 -->
  <Teleport to="#app">
    <dialogVue
      :dialogValue="showDialog"
      :title="'事件信息1111'"
      width="850px"
      height="556px"
      top="500px"
      @closeHandle="showDialog = false"
    >
      <div class="sjmain">
        <div class="sjform">
          <div>
            <p>
              事件编号 : <span class="small">{{ info.eventNumber }}</span>
            </p>
            <p>
              事件类型 : <span class="small">{{ info.typeName }}</span>
            </p>
          </div>
          <div>
            <p>
              事发时间 : <span class="small">{{ info.reportDate }}</span>
            </p>
            <p>
              所在区域 : <span class="small">{{ info.xzqhName }}</span>
            </p>
          </div>
          <div>
            <p>
              事件等级 : <span class="small">{{ info.eventLevelName }}</span>
            </p>
            <p>
              紧急程度 : <span class="small">{{ info.eventLevelName }}</span>
            </p>
          </div>
          <!-- 详细地质 -->
          <div>
            <p>
              详细地址 : <span class="big">{{ info.eventAddress }}</span>
            </p>
          </div>
          <div class="describe">
            <p>
              事件描述 :
              <span class="big">{{ info.eventContent }}</span>
            </p>
          </div>
          <div class="annex">
            <p>附件信息 :<span class="big"> </span></p>
          </div>
        </div>
      </div>
    </dialogVue>
  </Teleport>
</template>

<style lang="scss" scoped>
.sjmain {
  height: 533px;
  // background-color: #35dfed;
  margin: -10px;
  color: #fff;
  // padding-top: 16px;

  .smalltitle {
    // height: 39px;
    width: 100%;
    // margin-bottom: 7px;
    padding-left: 16px;
    display: flex;
    border-bottom: 1px solid rgba(0, 154, 195, 1);

    .ordinary {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100px;
      height: 32px;
      background-color: rgba(1, 40, 59, 1);
    }

    .bgordinary {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100px;
      height: 32px;
      position: relative;
      background-color: rgba(30, 78, 140, 1);
    }

    .bgordinary:before {
      content: "";
      width: 0px;
      height: 0px;
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
      border-left: 7px solid rgba(0, 163, 206, 1);
      position: absolute;
      // top: 42px;
      right: 80px;
    }
  }

  // 下面就是里面的主要的内容部分的了
  .sjform {
    padding: 0px 9px;
    font-size: 14px;
    // margin-top: 24px;

    div {
      display: flex;
      width: 100%;
      height: 40px;
      align-items: center;
      justify-content: space-between;
      margin: 12px 0px;

      p {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      // 大框和小框的样式
      .small {
        display: flex;
        align-items: center;
        padding-left: 16px;
        height: 40px;
        width: 320px;
        border: 1px solid rgba(0, 163, 206, 1);
        margin-left: 8px;
        background-color: rgba(1, 40, 59, 1);
      }

      .big {
        line-height: 20px;
        width: 736px;
        display: flex;
        align-items: center;
        padding-left: 16px;
        height: 40px;
        border: 1px solid rgba(0, 163, 206, 1);
        margin-left: 8px;
        justify-content: left;
        background-color: rgba(1, 40, 59, 1);
      }
    }

    .describe {
      height: 80px;

      .big {
        height: 80px;
      }
    }

    .annex {
      height: 170px;

      .big {
        height: 170px;
        padding-left: 0px;

        img {
          width: 200px;
          height: 150px;
          margin-left: 18px;
        }
      }
    }
  }
}
</style>
