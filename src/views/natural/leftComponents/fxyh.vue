<script setup>
import { onMounted, ref, inject, nextTick } from "vue";

import selectDialogVue from "../components/selectDialog.vue";
import { getFxyh } from "@/api/modules/zrzh.js";
const $mitt = inject("$mitt");

const clearAllMarker = function () {
  $mitt.emit("hideAllMarker");
};

const emits = defineEmits(['closeAll'])
const fxyhInfo = ref({});
const selectDialogInfo = ref({
  name: "",
  listType: "tree",
  listData: [],
  dialogType: "",
});
const openDialog = function (info) {
  if(info.id===selectedItem.value){
    clearAllMarker();
    selectedItem.value = ""
    return;
  }
  emits("closeAll")
  selectedItem.value = "";
  nextTick(() => {
    let data = fxyhInfo.value[info.id];
    if (data) {
      selectedItem.value = info.id;
      let list = data.jh.map((item) => {
        let treeId = item.id;
        if (item.dataType) {
          treeId = item.dataType + "--" + treeId;
        }
        return {
          ...item,
          label: item.title,
          num: item.count,
          treeId: treeId,
        };
      });
      selectDialogInfo.value = {
        name: info.name,
        listType: data.lx,
        listData: list,
        dialogType: info.id,
      };
    }
  });
};
const closeDialog = function () {
  selectedItem.value = "";
  clearAllMarker();
};
defineExpose({
  closeDialog
})
const getFxyhInfo = function () {
  getFxyh().then((res) => {
    fxyhInfo.value = res.data;
  });
};

const selectedItem = ref("");
onMounted(() => {
  getFxyhInfo();
});
</script>

<template>
  <ViewBox title="风险隐患">
    <div class="fxyh">
      <div class="line line1">
        <div
          @click="openDialog({ id: 'dzyhd', name: '地灾隐患点' })"
          :class="['fxyh_item', selectedItem === 'dzyhd' ? 'selectedItem' : '']"
        >
          <div class="num">{{ fxyhInfo.dzyhd?.sl || 0 }}</div>
          <div class="word">地灾隐患点</div>
        </div>
        <div class="space"></div>
        <div
          @click="openDialog({ id: 'lswjf', name: '历史危旧房' })"
          :class="['fxyh_item', selectedItem === 'lswjf' ? 'selectedItem' : '']"
        >
          <div class="num">{{ fxyhInfo.lswjf?.sl || 0 }}</div>
          <div class="word">历史危旧房</div>
        </div>
      </div>
      <div class="line line2">
        <div
          @click="openDialog({ id: 'dzyfq', name: '地灾易发区' })"
          :class="['fxyh_item', selectedItem === 'dzyfq' ? 'selectedItem' : '']"
        >
          <div class="num">{{ fxyhInfo.dzyfq?.sl || 0 }}</div>
          <div class="word">地灾易发区</div>
        </div>
        <div class="space"></div>
        <div
          @click="openDialog({ id: 'shyhd', name: '森火隐患点' })"
          :class="['fxyh_item', selectedItem === 'shyhd' ? 'selectedItem' : '']"
        >
          <div class="num">{{ fxyhInfo.shyhd?.sl || 0 }}</div>
          <div class="word">森火隐患点</div>
        </div>
      </div>
      <div class="line line3">
        <div
          @click="openDialog({ id: 'shzh', name: '山洪灾害' })"
          :class="['fxyh_item', selectedItem === 'shzh' ? 'selectedItem' : '']"
        >
          <div class="num">{{ fxyhInfo.shzh?.sl || 0 }}</div>
          <div class="word">山洪灾害</div>
        </div>
        <div class="space"></div>
        <div
          @click="openDialog({ id: 'csyld', name: '城市易涝点' })"
          :class="['fxyh_item', selectedItem === 'csyld' ? 'selectedItem' : '']"
        >
          <div class="num">{{ fxyhInfo.csyld?.sl || 0 }}</div>
          <div class="word">城市易涝点</div>
        </div>
      </div>
      <div class="bg"></div>
    </div>
  </ViewBox>
  <selectDialogVue
    :name="selectDialogInfo.name"
    :listData="selectDialogInfo.listData"
    :listType="selectDialogInfo.listType"
    @closeDialog="closeDialog"
    :dialogType="selectDialogInfo.dialogType"
    v-if="!!selectedItem"
  >
  </selectDialogVue>
</template>

<style lang="less" scoped>
@imgUrl: "@/assets/natural/";
.fxyh {
  position: relative;
  height: 176px;
  box-sizing: border-box;
  padding-top: 18px;
  &_item {
    cursor: pointer;
  }
  .bg {
    width: 230px;
    height: 177px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    background: url("@{imgUrl}risk_bg.png") no-repeat;
    background-size: 100% 100%;
    z-index: 2;
  }

  .line {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    .num {
      font-size: 18px;
      font-family: Source Han Sans SC-Bold, Source Han Sans SC;
      font-weight: bold;
      color: #ffffff;
      line-height: 21px;
    }

    .word {
      font-size: 15px;
      font-family: Source Han Sans SC-Regular, Source Han Sans SC;
      font-weight: 400;
      color: #d0deee;
      line-height: 18px;
    }
  }

  .line1 {
    .space {
      width: 180px;
    }
  }

  .line2 {
    margin: 11px 0;

    .space {
      width: 243px;
    }
  }

  .line3 {
    margin-top: 20px;

    .space {
      width: 196px;
    }
  }
  .selectedItem {
    .num,
    .word {
      color: #ffdf53 !important;
    }
  }
}
</style>
