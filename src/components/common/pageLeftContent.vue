<script setup>
import { ref, reactive } from "vue";
import { Search } from "@element-plus/icons-vue";
// 导入这个弹框的组件
import dialogVue from "@/components/common/dialog.vue";
// 导入获取这个人员的接口
import { getpersonalList, sendDuanxin } from "../../api/modules/home";
import resourceAnalysis from "@/components/info/resourceAnalysis.vue";
import { ElMessage } from "element-plus";

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
  selectedPersonPhones.value = []
  xxform.value = {}
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
  xxshow.value = false;
  console.log("提交数据");
};

// 表格的一些数据
const tableData = ref([
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
]);
// 控制表格显示还说隐藏的
const pershow = ref(false);
// 搜索表单需要的参数
const serpersonnel = ref("");
// 页码和页数的参数
const currentPage3 = ref(1);
const pageSize3 = ref(10);
// 总条数
const total = ref(0);
//页码和页数发生变化的时候
const handleSizeChange = (size) => {
  pageSize3.value = size;
  getper()
};
const handleCurrentChange = (page) => {
  currentPage3.value = page;
  getper()
};
// 点击输入框的时间
const perCl = () => {
  pershow.value = true;
  console.log(pershow.value, "看结果");
};
// 下面是这个确定选择的方法
const selectedPersonPhones = ref([])
const selectok = () => {
  pershow.value = false;
  let newdata = ref([]);
  xzdata.value.forEach((v) => {
    newdata.value.push(v.personalName);
    if(!selectedPersonPhones.value.includes(v.username)){
      selectedPersonPhones.value.push(v.username)
    }
  });
  xxform.personnel = JSON.stringify(newdata.value);
  console.log(JSON.stringify(newdata.value), "看结果选择的相关的一些东西的了");
};
// 选择的个数
const xznum = ref();
// 选择的数据的了
const xzdata = ref();
// 点击勾选框的时间
const select = (selection, row) => {
  xznum.value = selection.length;
  xzdata.value = selection;
  console.log(selection, row, "看看这个两个是什么");
};
const handleSelectionChange = (selection, row) => {
  console.log(selection);
  xzdata.value = selection;
  xznum.value = selection.length;
};
// 定义一个数据是这个表格头部的数据
const tableherader = ref([
  { label: "人员名称", value: "personalName" },
  { label: "性别", value: "sex" },
  { label: "部门", value: "departmentName" },
  { label: "职务", value: "jobShortName" },
]);

// 获取发布人员信息的
const getper = async () => {
  let res = await getpersonalList(
    currentPage3.value,
    pageSize3.value,
    serpersonnel.value
  );
  tableData.value = res.data;
  total.value = res.count;
  console.log(res, "=====>我是数据");
};
getper();

const sendDuanxinFun = function () {
  console.log("发送短信了：",selectedPersonPhones.value)
  sendDuanxin(selectedPersonPhones.value.join(",")).then(res=>{
  // sendDuanxin("15682381478").then(res=>{
    closeHandle()
    ElMessage.success("发送成功")
  });
};
</script>

<template>
  <div
    :class="[
      'left_content animate__animated  animate__fadeInLeft',
      isHide ? 'hide_content' : '',
    ]"
  >
    <div class="leftContent">
      <slot></slot>
    </div>
    <!-- 侧边悬浮搜索框 -->
    <!-- <div class="left_top_box">
      <el-input placeholder="请输入地址搜索" :suffix-icon="Search" v-model="searchValue"></el-input>
    </div> -->
    <!-- 信息发布 -->
    <div class="msg-fb" @click="xxshowclick">
      <img src="../../assets/header/msg-fb.png" />
    </div>
    <div @click="tooglePosition" :class="['arrow_box', isHide ? 'rotate' : '']">
      <el-icon size="32" color="#fff">
        <ArrowLeft />
      </el-icon>
    </div>
    <resourceAnalysis></resourceAnalysis>
  </div>

  <!-- 然后这个信息发布的弹框就写在这里了 -->
  <dialogVue
    :dialogValue="xxshow"
    :title="'信息发布'"
    width="640px"
    height="455px"
    top="500px"
    @closeHandle="closeHandle"
  >
    <el-form :model="xxform" class="xxform">
      <el-form-item
        class="peritem"
        label="发布人员"
        prop="personnel"
        @click="perCl"
      >
        <el-input v-model="xxform.personnel" placeholder="'" clearable />
        <!-- 这里先写一个表格,点击的时候把这个产生出来 -->
        <div class="sercehtable" v-show="pershow">
          <div class="tabletitle">
            <div>
              <input
                class="serinput"
                v-model="serpersonnel"
                placeholder="搜索名称"
                clearable
              />
              <el-button :icon="Search" @click="getper"></el-button>
            </div>
            <el-button type="primary" @click.stop="selectok"
              >选择{{ xznum }}</el-button
            >
          </div>

          <el-table
            class="tableAll"
            ref="multipleTableRef"
            :data="tableData"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            @select="select"
          >
            <el-table-column type="selection" width="55" />
            <!-- <el-table-column label="时间">
              <template #default="scope">{{ scope.row.date }}</template>
            </el-table-column> -->
            <el-table-column
              v-for="item in tableherader"
              :property="item.value"
              :label="item.label"
            />
            <!-- <el-table-column property="address" label="排名" show-overflow-tooltip /> -->
          </el-table>

          <div class="demo-pagination-block">
            <div class="demonstration">Jump to</div>
            <el-pagination
              v-model:current-page="currentPage3"
              v-model:page-size="pageSize3"
              :page-sizes="[10, 20, 30, 40]"
              layout="total, prev, pager, next"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </el-form-item>
      <el-form-item label="发布内容" prop="content" class="biginput">
        <el-input v-model="xxform.content" placeholder="'" clearable />
      </el-form-item>
    </el-form>
    <!-- 按钮 -->
    <!-- <div class="role">
      <button @click="telC">电话</button>
      <button @click="informationC">短信</button>
      <button @click="faxC">传真</button>
      <button @click="negotiateC">会商</button>
    </div> -->
    <div class="footerbt">
      <button @click="sendDuanxinFun">短信</button>
      <button @click="cancellation">传真</button>
      <button @click="cancellation">取消</button>
      <button @click="okC">确定</button>
    </div>
  </dialogVue>
</template>

<style lang="less" scoped>
@padding_left: 0; // 内容距离左边的宽度
@boxWidth: 440px; //内容宽度
@margin_top: 69px; //距离上面的宽度

// 弹框部分的样式的
.peritem {
  position: relative;

  .sercehtable {
    width: 526px;
    // height: 50px;
    background-color: #fff;
    position: absolute;
    z-index: 100000;
    left: 0px;
    top: 40px;
  }
}

.tabletitle {
  padding: 10px;
  // height: 30px;
  display: flex;
  justify-content: space-between;

  .serinput {
    margin-right: 5px;
    height: 30px;
    border: 1px solid #ddd;
    background: #fff;
    // color: #1e89fd;
  }
}

// 表格的相关的样式
::v-deep .el-table--fit {
  height: 230px;
  overflow: auto;
}

::v-deep .el-table__header-wrapper {
  background-color: #1e89fd;
}

// 分页这里的相关的样式
.demo-pagination-block {
  margin-left: 10px;
  margin-top: -10px;
  margin-bottom: 10px;
}

.left_content {
  width: @boxWidth + @padding_left;
  padding-left: @padding_left;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  // background: linear-gradient(145deg,
  //     rgba(1, 23, 65, 0.9) 0%,
  //     rgba(17, 48, 106, 0.9) 50%,
  //     rgba(1, 23, 65, 0.9) 100%);
  transition: 0.5s linear;
  z-index: 4;

  background: url(@/assets/common/left.png) no-repeat;
  background-size: 100% 100%;
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
