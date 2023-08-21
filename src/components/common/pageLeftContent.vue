<script setup>
import { ref, reactive } from "vue";
import { Search } from "@element-plus/icons-vue";
// 导入这个弹框的组件
import dialogVue from "@/components/common/dialog.vue";

const isHide = ref(false);
const tooglePosition = function () {
  isHide.value = !isHide.value;
};
// 定义信息弹框的form数据
const xxform = reactive({
  personnel: "发布的人",
  content: "发布的内容",
});
// 绑定这个弹框显示或者隐藏的
const xxshow = ref(false);
//弹出弹框
const xxshowclick = function () {
  xxshow.value = true;
};
// 关闭的方法
const closeHandle = function () {
  xxshow.value = false;
};

// 电话的方法
const telC = function () {
  console.log("执行电话的方案");
};
// 短信的方法
const informationC = function () {
  console.log("执行信息的方案");
};
// 传真的方法
const faxC = function () {
  console.log("执行传真的方案");
};
// 会商的方法
const negotiateC = function () {
  console.log("执行会商的方案");
};
// 取消的方法
const cancellation = function () {
  xxshow.value = false;
};
// 确定的方法
const okC = function () {
  console.log("提交数据");
};
</script>

<template>
  <div :class="['left_content animate__animated  animate__fadeInLeft', isHide ? 'hide_content' : '']">
    <div class="leftContent">
      <slot></slot>
    </div>
    <!-- 侧边悬浮搜索框 -->
    <!-- <div class="left_top_box">
      <el-input placeholder="请输入地址搜索" :suffix-icon="Search" v-model="searchValue"></el-input>
    </div> -->
    <!-- 信息发布 -->
    <div class="msg-fb" @click="xxshowclick">
      <img src="../../assets/header/msg-fb.png">
    </div>
    <div @click="tooglePosition" :class="['arrow_box', isHide ? 'rotate' : '']">
      <el-icon size="32" color="#fff">
        <ArrowLeft />
      </el-icon>
    </div>
  </div>

  <!-- 然后这个信息发布的弹框就写在这里了 -->
  <dialogVue :dialogValue="xxshow" :title="'信息发布'" width="640px" height="455px" top="500px" @closeHandle="closeHandle">
    <el-form :model="xxform" class="xxform">
      <el-form-item label="发布人员" prop="personnel">
        <el-input v-model="xxform.personnel" placeholder="'" clearable />
      </el-form-item>
      <el-form-item label="发布内容" prop="content" class="biginput">
        <el-input v-model="xxform.content" placeholder="'" clearable />
      </el-form-item>
    </el-form>
    <!-- 按钮 -->
    <div class="role">
      <button @click="telC">电话</button>
      <button @click="informationC">短信</button>
      <button @click="faxC">传真</button>
      <button @click="negotiateC">会商</button>
    </div>
    <div class="footerbt">
      <button @click="cancellation">取消</button>
      <button @click="okC">确定</button>
    </div>
  </dialogVue>
</template>

<style lang="less" scoped>
@padding_left: 10px; // 内容距离左边的宽度
@boxWidth: 440px; //内容宽度
@margin_top: 69px; //距离上面的宽度

.left_content {
  width: @boxWidth + @padding_left;
  padding-left: @padding_left;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background: linear-gradient(
    145deg,
    rgba(1, 23, 65, 0.9) 0%,
    rgba(17, 48, 106, 0.9) 50%,
    rgba(1, 23, 65, 0.9) 100%
  );
  transition: 0.5s linear;
  z-index: 4;
  .leftContent {
    padding-top: @margin_top;
  }
  .arrow_box {
    position: absolute;
    bottom: 10px;
    left: @padding_left + @boxWidth + 10px;
    cursor: pointer;
    transition: 0.5s linear;
  }

  .rotate {
    transform: rotate(180deg);
  }

  .left_top_box {
    position: absolute;
    left: @padding_left + @boxWidth + 10px;
    top: 50px;
    width: 200px;
    height: 40px;
    background: rgba(9, 39, 67, 0.7);
    border-radius: 0px 0px 0px 0px;
    opacity: 1;
    border: 1px solid #1e89fd;
  }

  .msg-fb {
    position: absolute;
    left: @padding_left + @boxWidth + 10px;
    top: 103px;
    width: 124px;
    height: 48px;
    cursor: pointer;
    z-index: 1;

    img {
      width: 100%;
    }
  }
}

.hide_content {
  left: -(@padding_left + @boxWidth);
}

// 下面这个就是信息发布这个表单的样式操作
.xxform {
  ::v-deep .el-form-item__label {
    color: #fff;
  }

  ::v-deep .el-form-item__content {
    border: 1px solid rgba(0, 163, 206, 1);
    display: flex;
    align-items: end;
  }

  ::v-deep .el-input__wrapper {
    align-items: flex-start;
  }

  ::v-deep .el-form-item__content {
    border: 1px solid rgba(0, 163, 206, 1);
  }

  .biginput {
    height: 225px;
  }
}

.role {
  display: flex;
  justify-content: end;

  button {
    width: 49px;
    height: 28px;
    color: #fff;
    border-radius: 5px;
    margin: 5px;
    background-color: rgba(13, 79, 109, 1);
    font-size: 14px;
  }
}

.footerbt {
  display: flex;
  justify-content: end;
  margin-top: 10px;

  button {
    width: 49px;
    height: 28px;
    color: #fff;
    border-radius: 5px;
    margin: 5px;
    background-color: rgba(13, 79, 109, 1);
    font-size: 14px;
  }
}
</style>