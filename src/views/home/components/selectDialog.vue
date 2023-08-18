<template>
  <firDialog :name="name" @closeDialog="closeDialog">
    <div class="checkbox_popup">
      <el-tree :data="treeData" :props="treeConfig" default-expand-all show-checkbox ref="treeRef"
        @check-change="onChecked" node-key="id">
        <template #default="{ node, data }">
          <span class="custom-tree-node">
            <span>{{ node.label }}</span>
            <span class="yellow">
              {{ data.num }}
            </span>
          </span>
        </template>
      </el-tree>
    </div>
  </firDialog>
</template>

<script setup>
import { onMounted, ref, inject, watch, nextTick } from "vue";
import firDialog from "./firDialog.vue";
import commonFun from "@/utils/common.js";
const { initTree } = commonFun();
const $mitt = inject("$mitt");
const props = defineProps({
  name: {
    type: String,
    default: "",
  },
  listData: {
    type: Array,
    default() {
      return [
      ];
    },
  },
  treeConfig: {
    type: Object,
    default() {
      return { children: 'children', label: 'label' }
    }
  }
});
let isCheckedAll = ref(false)
const emits = defineEmits(['closeDialog', 'setMarker', 'removeMarker'])
// setCheckedKeys
watch(() => props.name, (newVal, oldVal) => {
  // treeRef.value.setCheckedNodes([])
  treeData.value = props.listData.length && [...props.listData]
})
const treeData = ref([])
const treeRef = ref()
const checkedNodes = ref([])
const closeDialog = function () {
  emits("closeDialog", 'select')
}

// const onChecked = function (data, allObj) {
const onChecked = function (obj, ischeck, leafischeck) {
  let data = { ...obj }
  if (data.children) {
    delete data.children
  }
  // console.log(data, ischeck, leafischeck);
  if (ischeck) {
    checkedNodes.value.push(JSON.stringify(data))
    nextTick(() => {
      emits('setMarker', data)

    })
  } else {
    let index = checkedNodes.value.indexOf(JSON.stringify(data))
    if (index !== -1) {
      checkedNodes.value.splice(index, 1)
      nextTick(() => {
        emits('removeMarker', data)

      })
    }
  }
}
onMounted(() => {
  treeData.value = props.listData.length && [...props.listData]
})
</script>

<style lang="scss" scoped>
.checkbox_popup {
  padding: 0 10px;

  :deep(.el-tree) {
    margin-top: 10px;
    background: transparent;

    // 隐藏 展开收起icon
    .el-tree-node__expand-icon {
      display: none;
    }

    .el-checkbox__inner {
      width: 20px;
      height: 20px;
      border: 1px solid #0075a4;
      border-radius: 0;
      background: transparent;
    }

    .el-checkbox__input.is-checked .el-checkbox__inner {
      border: none;
      background: url("@/assets/natural/check_Property.png") center/99% 99% no-repeat;

      &::after {
        display: none;
      }
    }

    .el-tree-node {
      font-size: 16px;
      font-family: Source Han Sans SC-Regular, Source Han Sans SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 19px;

      .yellow {
        color: #ffdf53;
        margin-left: 10px;
      }
    }

    .el-tree-node__content {
      margin: 4px 0;
    }

    .el-tree-node:focus>.el-tree-node__content,
    .el-tree-node__content:hover {
      background-color: RGBA(10, 91, 131, 0.3);
    }
  }
}
</style>
