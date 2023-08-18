<script setup>
import firDialog from '@/views/natural/components/firDialog.vue';

</script>
<template>
  <firDialog name="checkBoxPopupData.name" type="fxyh" @closeDialog="closeDialog" v-if="dialogFlags.fxyh">
    <div class="checkbox_popup">
      <div v-show="checkBoxPopupData.hasSerachBar" class="search_bar">
        <el-input class="input" :placeholder="checkBoxPopupData.inputData.label" :suffix-icon="Search"
          v-model="checkBoxPopupData.inputData.value">
        </el-input>
        <el-button v-show="checkBoxPopupData.buttonData" class="button" type="primary">{{
          checkBoxPopupData.buttonData.name }}</el-button>
      </div>
      <el-tree :data="checkBoxPopupData.treeData" :props="{ children: 'children', label: 'label' }" show-checkbox
        default-expand-all>
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