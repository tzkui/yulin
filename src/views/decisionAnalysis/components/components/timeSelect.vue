<script setup>
import { ref, watch } from "vue";
import moment from "moment";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { zhCN } from "date-fns/locale";

const emits = defineEmits(["selectTime"]);
const timeRef = ref();
const parseTime = function (type) {
  if (type === 1) {
    return moment().subtract(1, "months").startOf("month").format("YYYY-MM-DD");
  } else if (type === 2) {
    return moment().startOf("month").format("YYYY-MM-DD");
  } else if (type === 3) {
    return moment().startOf("quarter").format("YYYY-MM-DD");
  } else if (type === 4) {
    return moment().startOf("year").format("YYYY-MM-DD");
  } else if (type === 5) {
    return moment().subtract(1, "months").endOf("month").format("YYYY-MM-DD");
  } else if (type === 6) {
    return moment().subtract(1, "years").startOf("year").format("YYYY-MM-DD");
  } else if (type === 7) {
    return moment().subtract(1, "years").endOf("year").format("YYYY-MM-DD");
  } else if (type === 8) {
    return moment().subtract(4, "years").startOf("year").format("YYYY-MM-DD");
  } else if (type === 9) {
    return moment().subtract(9, "years").startOf("year").format("YYYY-MM-DD");
  } else {
    return moment().format("YYYY-MM-DD");
  }
};

const tabs = ref([
  { id: 1, name: "上月", startTime: parseTime(1), endTime: parseTime(5) },
  { id: 2, name: "本月", startTime: parseTime(2), endTime: parseTime() },
  { id: 3, name: "本季", startTime: parseTime(3), endTime: parseTime() },
  { id: 4, name: "本年", startTime: parseTime(4), endTime: parseTime() },
  { id: 5, name: "时间", startTime: "", endTime: "" },
]);
const selectedItem = ref("");
const props = defineProps({
  isEarthquake: {
    type: Boolean,
    default: false,
  },
});
watch(
  () => props.isEarthquake,
  (val) => {
    selectedItem.value = "";
    if (val) {
      tabs.value = [
        { id: 1, name: "本年", startTime: parseTime(4), endTime: parseTime() },
        { id: 2, name: "去年", startTime: parseTime(6), endTime: parseTime(7) },
        { id: 3, name: "近5年", startTime: parseTime(8), endTime: parseTime() },
        {
          id: 4,
          name: "近十年",
          startTime: parseTime(9),
          endTime: parseTime(),
        },
        { id: 5, name: "时间", startTime: "", endTime: "" },
      ];
    } else {
      tabs.value = [
        { id: 1, name: "上月", startTime: parseTime(1), endTime: parseTime(5) },
        { id: 2, name: "本月", startTime: parseTime(2), endTime: parseTime() },
        { id: 3, name: "本季", startTime: parseTime(3), endTime: parseTime() },
        { id: 4, name: "本年", startTime: parseTime(4), endTime: parseTime() },
        { id: 5, name: "时间", startTime: "", endTime: "" },
      ];
    }
  }
);
const isClosePicker = ref(false);
const timePickerClose = function (e) {
  console.log(1, e);
  isClosePicker.value = true;
  selectedItem.value = "";
  setTimeout(()=>{
    isClosePicker.value = false;
  },100)
};
const selectTime = function (info) {
  if (isClosePicker.value && info.id === 5) {
    selectedItem.value = "";
    isClosePicker.value = false;
    emits("selectTime", []);
  } else if (info.id !== selectedItem.value) {
    selectedItem.value = info.id;
    if (info.id !== 5) {
      emits("selectTime", [info.startTime, info.endTime]);
    } else {
      timeRef.value.click();
    }
  } else {
    selectedItem.value = "";
    emits("selectTime", []);
  }
};
const parseSelectTime = function (time) {
  if (time && time.length === 2) {
    return (
      moment(time[0]).format("YYYY-MM-DD") +
      " ~ " +
      moment(time[1]).format("YYYY-MM-DD")
    );
  }
  return "";
};
const submitCustomTime = function (time) {
  if (time?.length === 2) {
    emits("selectTime", [
      moment(time[0]).format("YYYY-MM-DD"),
      moment(time[1]).format("YYYY-MM-DD"),
    ]);
  }
};
</script>

<template>
  <ul class="time_list">
    <li
      v-for="item in tabs"
      :class="item.id === selectedItem ? 'selected_item' : ''"
      :key="item.id"
      @click="selectTime(item)"
    >
      {{ item.name }}
    </li>
  </ul>
  <div class="timebox">
    <VueDatePicker
      :format-locale="zhCN"
      range
      :showTime="false"
      format="yyyy-MM-dd"
      @closed="timePickerClose"
    >
      <template #trigger>
        <p class="clickable-text" ref="timeRef"></p>
      </template>
      <template #action-row="{ internalModelValue, selectDate }">
        <div class="action-row">
          <div class="showTime">
            {{ parseSelectTime(internalModelValue) }}
          </div>
          <button
            class="select-button"
            @click="submitCustomTime(internalModelValue)"
          >
            确定
          </button>
        </div>
      </template>
    </VueDatePicker>
  </div>
</template>

<style lang="scss" scoped>
.time_list {
  position: absolute;
  right: 10px;
  top: 0;
  display: flex;
  z-index: 99;
  > li {
    font-size: 14px;
    line-height: 24px;
    padding: 0 10px;
    text-align: center;
    border: 1px solid #fff;
    color: #fff;
    margin-left: 8px;
    cursor: pointer;
  }
  .selected_item {
    border-color: #1976d2;
    background-color: #1976d2;
  }
}
.timebox {
  position: absolute;
  left: 550px;
  top: -10px;
}
:deep(.dp--tp-wrap) {
  display: none;
}
:deep(.dp__arrow_top) {
  display: none;
}
.action-row {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .select-button {
    background-color: #1976d2;
    color: #fff;
    width: 40px;
    height: 24px;
    line-height: 24px;
    border-radius: 4px;
  }
}
</style>
