<script setup>
import { ref } from "vue";
import firDialog from "@/views/natural/components/firDialog.vue";
import { Search } from "@element-plus/icons-vue";

const emits = defineEmits(["closeDialog", "selectChange"]);
const closeDialog = function () {
  emits("closeDialog");
};
const props = defineProps({
  checkboxData: {
    type: Object,
    default: {},
  },
});
const treeRef = ref(null);
const searchVal = ref("");
const handleCheck = function (data) {
  const selectedKeys = treeRef.value.getCheckedKeys();
  emits("selectChange", selectedKeys);
};
</script>
<template>
  <firDialog :name="checkboxData.name" @closeDialog="closeDialog">
    <div class="checkbox_popup">
      <!-- <div v-show="checkboxData.hasSerachBar" class="search_bar">
        <el-input class="input" :placeholder="checkboxData.inputData.label" :suffix-icon="Search" v-model="searchVal">
        </el-input>
        <el-button v-show="checkboxData.buttonData" class="button" type="primary">{{
          checkboxData.buttonData.name }}</el-button>
      </div> -->
      <el-tree ref="treeRef" :data="checkboxData.treeData" :check-on-click-node="true" :props="{ children: 'children', label: 'label' }" show-checkbox @check="handleCheck" default-expand-all node-key="label">
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

<style lang="scss" scoped>
.checkbox_popup {
  padding: 0 10px;

  .search_bar {
    display: flex;

    :deep(.el-input) {
      flex: 1;
      height: 36px;
      background: linear-gradient(90deg, #0698d7 0%, #1e89fd 100%);
      border-radius: 4px 4px 4px 4px;
      border: 1px solid !important;
      border-image: linear-gradient(
          90deg,
          rgba(6, 152, 215, 1),
          rgba(30, 137, 253, 1)
        )
        1 1 !important;
      margin-right: 3px;
      font-size: 16px;
    }

    .button {
      width: 97px;
      height: 36px;
      background: linear-gradient(90deg, #0698d7 0%, #1e89fd 100%) !important;
      border-radius: 4px 4px 4px 4px;
      font-size: 16px;
    }
  }

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
      background: url("@/assets/natural/check_Property.png") center/99% 99%
        no-repeat;

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

    .el-tree-node:focus > .el-tree-node__content,
    .el-tree-node__content:hover {
      background-color: RGBA(10, 91, 131, 0.3);
    }
  }
}
</style>