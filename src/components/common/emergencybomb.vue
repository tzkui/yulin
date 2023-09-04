<template>
  <!-- 下面这里再来测试一下这个弹出框的东西了 -->
  <viewDialog
    :style="{ top: top, left: left }"
    class="tcbox"
    :title="title"
    :showDialog="islook"
    @closeDialog="closeDialog"
  >
    <div>
      <!-- <div class="header">
            <img class="top" src="../../assets/emergencybomb/top.png" alt="">
            <div class="title">
                <div class="titletext">{{ title }}</div>
                <img @click="closeDialog()" class="titleicon" src="../../assets/emergencybomb/guanbi.png" alt="">
            </div>
            <img class="buttom" src="../../assets/emergencybomb/dibu.png" alt="">
        </div> -->
      <div class="main">
        <div class="mainitem" v-for="item in data">
          <span>{{ item.name }}:</span>
          <!-- 这里还可以根据判断这个状态的颜色字体的 -->
          <p :class="item.name == '状态' ? 'cochange' : ''">
            {{ item.content }} <img v-if="item.img" :src="item.img" alt="" />
          </p>
        </div>
      </div>
      <!-- 下面还有底部的按钮功能的 -->
      <div class="buttons">
        <!-- 按钮内容也是循环产生的 -->
        <div class="imgs">
          <img v-for="item in imgs" :src="item" alt="" />
        </div>
        <div class="btns">
          <button v-for="(item, index) in buttondata" @click="onAdd(index)">
            {{ item }}
          </button>
        </div>
      </div>
    </div>
  </viewDialog>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import viewDialog from "./viewDialog.vue";
console.log(viewDialog);
// 定义一个控制开启或者关闭的数据
const isswitch = ref(true);
// 调用父组件的方法
const emits = defineEmits(["FatherMethod", "closeDialog"]);
const onAdd = (index) => {
  emits("FatherMethod");
  console.log(index, "看看我点击的谁");
};
//  使用传过来的值
const props = defineProps([
  "title",
  "data",
  "buttondata",
  "imgs",
  "islook",
  "top",
  "left",
]);
const closeDialog = function () {
  emits("closeDialog");
};
</script>

<style lang="less" scoped>
// 这个先是弹出框的样式的
.tcbox {
  // top: 80px;
  // left: 1000px;
  width: 304px;
  background-color: #35dfed;
  background-color: rgba(5, 15, 24, 1);
  border-radius: 10px;

  // 下面是这个头部的相关的样式
  .header {
    padding: 0px 10px;
    height: 54px;

    .top {
      width: 50px;
      height: 12px;
      margin-left: 18px;
    }

    .title {
      margin-top: 11px;
      display: flex;
      font-size: 20px;
      justify-content: space-between;

      .titleicon {
        width: 26px;
        height: 26px;
      }
    }
  }

  .main {
    // padding: 13px 10px 0px;
    // height: 300px;
    font-size: 16px;
    color: rgba(255, 255, 255, 1);

    .mainitem {
      display: flex;
      // justify-content: space-between;
      // height: 20px;
      align-items: center;
      padding: 10px 0px;

      span {
        display: inline-block;
        width: 104px;
        margin-right: 20px;
      }

      p {
        text-align: end;
        width: 180px;
        line-height: 20px;
        max-height: 300px;
        // 这里设置一个最大高度,如果太高了,就把他滚动
        overflow: auto;
        &::-webkit-scrollbar {
          display: none;
        }
      }

      img {
        width: 20px;
        height: 20px;
      }
      .cochange {
        color: green;
      }
    }

    .location,
    .name {
      height: 40px !important;
    }

    // 下面这个就是描述里面的内容的相关的东西的了
    .contents {
      span {
        margin-right: 30px;
      }

      .contmain {
        line-height: 24px;
        // letter-spacing: 2px;
        height: 140px;
        overflow-y: auto;

        &::-webkit-scrollbar {
          display: none;
        }
      }
    }
  }

  // 下面是底部的按钮的相关的功能的了
  .buttons {
    margin-top: 8px;
    height: 48px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 2px solid rgba(5, 67, 83, 1);
    padding-right: 4px;

    .imgs {
      display: flex;
      align-items: center;
      // width: 90px;
      margin-left: 8px;

      img {
        width: 20px;
        height: 20px;
        margin: 0px 5px;
      }
    }

    .btns {
      display: flex;
      justify-content: end;
      align-items: center;
      flex: 1;
    }

    button {
      height: 28px;
      border-radius: 4px;
      margin: 0px 4px;
      padding: 4px 10px;
      background-color: rgba(13, 79, 109, 1);
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style>
