<script setup>
import { onMounted, ref, inject, nextTick } from "vue";
import { getYjzy } from "@/api/modules/zrzh.js";
import selectDialogVue from "../components/selectDialog.vue";
const $mitt = inject("$mitt");

const clearAllMarker = function () {
  $mitt.emit("hideAllMarker");
};
const emits = defineEmits(['closeAll'])
const selectDialogInfo = ref({
  name: "",
  listType: "tree",
  listData: [],
  dialogType: "",
});

const yjzyList = ref([]); // 应急资源列表
const yjzyInfo = ref({});
// 获取应急资源列表
const getYjzyList = function () {
  getYjzy().then((res) => {
    let data = res.data;
    yjzyInfo.value = data;
    sessionStorage.setItem("yjzyInfos",JSON.stringify(data))
    yjzyList.value = [
      { id: "yjry", name: "应急人员", num: data.yjry.sl },
      { id: "yjzj", name: "应急专家", num: data.yjzj.sl },
      { id: "jydw", name: "救援队伍", num: data.jydw.sl },
      { id: "yjwzk", name: "应急物资库", num: data.yjwzk.sl },
      { id: "bncs", name: "避灾场所", num: data.bncs.sl },
      { id: "spjk", name: "视频监控", num: data.spjk.sl },
    ];
  });
};
const openDialog = function (info) {
  if(info.id===selectedItem.value){
    clearAllMarker();
    selectedItem.value = ""
    return;
  }
  emits("closeAll")
  selectedItem.value = "";
  nextTick(() => {
    let data = yjzyInfo.value[info.id];
    if (data) {
      selectedItem.value = info.id;
      let list = data.jh.map((item) => {
        let treeId = item.id;
        if (item.dataType) {
          treeId = item.dataType + "--" + item.id;
        }
        return {
          ...item,
          label: item.title || item.expertName,
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
const selectedItem = ref("");

const treeConfig = ref({});
onMounted(() => {
  getYjzyList();
});
</script>

<template>
  <ViewBox title="应急资源">
    <div class="yjzy">
      <ul class="yjzy_list">
        <li
          v-for="item in yjzyList"
          :key="item.id"
          @click="openDialog(item)"
          :class="selectedItem === item.id ? 'selectedYjzy' : ''"
        >
          <div class="line1">{{ item.num }}</div>
          <div class="line2">{{ item.name }}</div>
        </li>
      </ul>
    </div>
  </ViewBox>
  <selectDialogVue
    :name="selectDialogInfo.name"
    :listData="selectDialogInfo.listData"
    :listType="selectDialogInfo.listType"
    @closeDialog="closeDialog"
    :dialogType="selectDialogInfo.dialogType"
    v-if="!!selectedItem"
    :treeConfig="treeConfig"
  >
  </selectDialogVue>
</template>

<style lang="less" scoped>
@imgUrl: "@/assets/natural/";
.yjzy {
  padding-left: 4px;

  &_list {
    display: flex;
    flex-wrap: wrap;

    li {
      width: 120px;
      height: 80px;
      margin-left: 25px;
      margin-bottom: 12px;
      background: url("@{imgUrl}bg2.png") no-repeat;
      background-size: 100% 100%;
      text-align: center;
      cursor: pointer;

      &:nth-child(3n + 1) {
        margin-left: 0;
      }

      &:hover {
        background-image: url("@{imgUrl}bg2_active.png");
      }

      .line1 {
        font-size: 22px;
        font-family: Source Han Sans SC-Bold, Source Han Sans SC;
        font-weight: bold;
        color: #ffffff;
        line-height: 48px;
      }

      .line2 {
        font-size: 15px;
        font-family: Alibaba PuHuiTi-Regular, Alibaba PuHuiTi;
        font-weight: 400;
        color: #d0deee;
        line-height: 32px;
      }
    }

    .selectedYjzy {
      background-image: url("@{imgUrl}bg2_active.png");
    }
  }
}
</style>
