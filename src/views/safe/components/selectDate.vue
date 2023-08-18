<script setup>
import { readonly } from 'vue'
const dates = readonly([
  {
    key: '1',
    name: '日'
  },
  {
    key: '2',
    name: '周'
  },
  {
    key: '3',
    name: '月'
  },
  {
    key: '4',
    name: '年'
  },
])

const props = defineProps({
  nowDate: {
    type: String,
    default: "day"
  },
  dateType: {
    type: String,
    default: ""
  }
})
</script>
<template>
  <ul class="date_list">
    <li v-for="item in dates" :key="item.key" @click="$emit('toogleDate',dateType, item.key)"
      :class="nowDate === item.key ? 'active' : ''">{{ item.name }}</li>
  </ul>
</template>

<style lang="less" scoped>
.date_list {
  display: flex;

  li {
    width: 34px;
    height: 27px;
    background: #0E4F6E;
    border-radius: 0px 0px 5px 0px;
    font-size: 14px;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.5);
    text-align: center;
    line-height: 27px;
    cursor: pointer;
    margin-left: 12px;
    &:first-child{
      margin-left: 0;
    }
  }
  .active {
    color: #FFFFFF;
    background: #1E78A3;
    cursor: auto;
  }
}
</style>