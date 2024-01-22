<template>
  <div class="left">
    <zqfxVue></zqfxVue>
    <hzfxVue></hzfxVue>
    <dzfxVue></dzfxVue>
  </div>
</template>

<script setup>
import zqfxVue from './components/zqfx.vue';
import dzfxVue from './components/dzfx.vue';
import hzfxVue from './components/hzfx.vue';
</script>

<style scoped lang="less">
.left {
  .disaster_situation {
    height: 230px;
    position: relative;
    display: flex;

    .type_select_box {
      position: absolute;
      top: -50px;
      right: 30px;

      :deep(.el-select) {
        .el-input {
          height: 25px;
          width: 120px;
        }

        .el-input__wrapper {
          box-shadow: none !important;
          border-radius: 0;
          background: #09262e !important;
          border: 2px solid #0698d7 !important;
        }

        .el-input__inner {
          height: 100%;
        }

        .el-select-dropdown__item.selected {
          background-color: rgba(0, 0, 0, 0.1) !important;
          color: #53befc !important;
        }

        .el-select-dropdown__item {
          font-size: 16px !important;
          height: 28px !important;
          padding: 4px !important;
        }
      }
    }

    .disaster_tabs {
      width: 96px;

      .disaster_tab {
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        width: 100%;
        font-size: 12px;
        background: url("@/assets/decisionAnalysis/tab.png") center/99% 100%
          no-repeat;
        margin-bottom: 8px;

        &:hover,
        &.active {
          background: url("@/assets/decisionAnalysis/tab_active.png") center/99%
            100% no-repeat;
        }
      }
    }

    .disaster_chart {
      flex: 1;
      overflow: hidden;
    }
  }
}
</style>
