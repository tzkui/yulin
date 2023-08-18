<script setup>
import { ref, reactive, onMounted, inject } from "vue";
import dialogConfigs from "@/components/map/map2d/config/dialog.config.js";
import viewDialog from "./viewDialog.vue";
import { useEventBus } from "@vueuse/core";

const emits = defineEmits(["closeDialog"]);

const doSomething = function (info) {
  console.log(info, info.funcName)
  if (info.funcName) {
    useEventBus(info.funcName).emit({
      dialogType: props.dialogType,
      ...props.details
    });
  } else {
    throw new Error("请传入funcName");
  }
};
//  使用传过来的值
const props = defineProps({
  dialogType: {
    type: String,
  },
  details: {
    type: Object,
    default() {
      return {};
    },
  },
});
console.log("传来的参数：", props);
const closeDialog = function () {
  emits("closeDialog");
};
const title = ref("");
const main_list = ref([]);
const btns = ref([]);
const leftBtns = ref([]);
if (dialogConfigs[props.dialogType]) {
  const info = dialogConfigs[props.dialogType];
  if (!info.rows) {
    throw new Error("请配置rows，即每一行的信息");
  }
  if (!info.title) {
    throw new Error("请配置title，弹窗标题");
  }
  main_list.value = info.rows;
  title.value = info.title;
  btns.value = info.btns || [];
  leftBtns.value = info.leftBtns || [];
}
</script>

<template>
  <viewDialog :title="title" :showDialog="true" @closeDialog="closeDialog('syqxx')">
    <div class="dialog_content">
      <ul v-if="main_list.length" class="info_list">
        <li class="info_list_item" v-for="item in  main_list " :key="item.key" :class="item.inline ? 'inline_item' : ''">
          <div class="left">{{ item.name }}：</div>
          <div class="right">
            <span :style="{ color: item.colorKey ? details[item.colorKey] : '' }">{{ details[item.key] }}</span>
            <img v-if="item.iconUrl" @click="doSomething(item)" class="icon" :src="item.iconUrl" alt="">
          </div>
        </li>
      </ul>
      <div class="empty_data" v-else>
        暂无数据
      </div>
    </div>
    <template #footer>
      <div class="dialog_footer">
        <div class="leftBtns" v-if="leftBtns.length > 0">
          <div class="imgBox" v-for="item in leftBtns" :key="item.imgUrl">
            <img :src="item.imgUrl" :title="item.title" alt="" @click="doSomething(item)">
          </div>
        </div>
        <template v-if="btns.length > 0">
          <div class="btn" v-for="item in btns" v-show="item.name !== '查看'" :key="item.name" @click="doSomething(item)">{{
            item.name }}</div>
        </template>
      </div>
    </template>
  </viewDialog>
</template>

<style lang="less" scoped>
.dialog_content {
  width: 300px;

  .info_list {
    max-height: 500px;
    overflow-y: hidden;

    &::-webkit-scrollbar {
      display: none;
    }

    &_item {
      display: flex;
      margin-top: 12px;
      align-items: center;

      .left {
        width: 120px;
        flex-shrink: 0;
      }

      .right {
        flex: 1;
        text-align: right;

        .icon {
          margin-left: 8px;
          cursor: pointer;
          float: right;
          width: 20px;
          height: 20px;
          margin-top: -2px;
        }
      }

      &:first-child {
        margin-top: 0;
      }
    }

    .inline_item {
      display: block;

      .left,
      .right {
        display: inline;
      }
    }
  }
}

.dialog_footer {
  height: 50px;
  border-top: 1px solid #00a3ce;
  text-align: right;
  padding-right: 16px;
  padding-top: 12px;
  box-sizing: border-box;

  .imgBox {
    cursor: pointer;
  }

  .btn {
    display: inline-block;
    text-align: center;
    font-size: 12px;
    font-family: Source Han Sans SC-Medium, Source Han Sans SC;
    font-weight: 500;
    color: #ffffff;
    height: 26px;
    line-height: 26px;
    background: #0d4f6d;
    cursor: pointer;
    border-radius: 2px;
    padding: 0 13px;

    &:hover {
      background-color: #0c3e5c;
    }
  }
}
</style>