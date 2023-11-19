
<script setup>
import pageLeftContent from "@/components/common/pageLeftContent.vue";
import pageRightContent from "@/components/common/pageRightContent.vue";
import dialogVue from "@/components/common/dialog.vue";
import scrollBanner from '@/components/common/scrollBanner.vue'
import right from "../../views/natural/right.vue";
import { ref, onMounted, reactive, inject } from "vue";
import left from "./left.vue";
import firDialog from "./components/firDialog.vue";

import { assetsUrl } from "@/components/map/map2d/hook/index";
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";
import {getQxyj} from '@/api/modules/home.js'

const $mitt = inject("$mitt");
const newsList = reactive([
  {
    title:
      "3至4月和10至11月，48小时内最低气温将降至4摄氏度以下，或者已经下降到4摄氏度以下并将持续可能或已对农业、林业等产生一定影响",
  },
  {
    title:
      "3至4月和10至11月，48小时内最低气温将降至4摄氏度以下，或者已经下降到4摄氏度以下并将持续可能或已对农业、林业等产生一定影响",
  },
]);
onMounted(() => {
  getQxyj().then((res) => {
    bannerContent.value = res.data[0]?.alarmContent
  });
})

const bannerContent = ref("")
const isyjShow = ref(false);

const yjBox = () => {
  isyjShow.value = true;
};
const closeHandle = () => {
  isyjShow.value = false
}

const closeDialog1 = () => {
  showDialog.value.ck = false;
};
// 决定这些框线是否需要隐藏的东东
const showDialog = ref({
  ck: false,
  bl: false,
  zh: false,
  hs: false,
});

// 下面这个是事件信息的这个弹框配置的
const sjcloseHandle = () => {
  showDialog.value.ck = false;
};
// 下面这个就是点击的时候变颜色的框框了
const smacl = function (e) {
  if (e.target.className == "ordinary") {
    let spans = document.querySelectorAll(".ordinary");
    let title = document.querySelector(".smalltitle");
    spans.forEach((v) => {
      v.className = "ordinary";
    });
    e.target.className = "ordinary bgordinary";
  }
};
// 上传的时候的一些配置
const imageUrl = ref('')

const handleAvatarSuccess = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL()
}

const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

// 下面就是接收子组件的数据
const getValue = (value) => {
  console.log(value, "我就是父亲传递过来的数据的")
  showDialog.value = value
  console.log(showDialog.value, "让我看看改变之后的你")
}

// 定义一个绑定事件核实这里的表单数据
const hsform = ref({
  name: "自然灾害山体崩塌事件",
  time: "2023-07-11 18:23:39",
  grade: "",
  region: "横山区",
  address: "横山区156号只能街道",
  describe: "做好防护准备",
  state: '1',
  type: '1',
  mo: "短信模板"
})

// 下面定义一个就是关于这个bl的相关的这个数据
const blform = ref({
  bh: '577454545',
  lx: '1',
  sj: '2022-10-21',
  name: '大哥大',
  dj: '1',
  cd: '1',
  swqk: {
    xzgy: 9999,
    hjsw: 999,
    hjsz: 999,
    hjzs: 99,
    hjqs: 9,
    hjbk: 999,
    hjzd: 999,
  },
  quyu: "榆阳区",
  xxdz: "渝北区",
  dtdw: {
    jd: 198.55,
    wd: 65.656,
    gc: 557.45
  },
  xxdz: "撒娇的和孤岛惊魂",
  bsry: "测试",
  bsmc: "收到",
  bssj: "2022-12-10",
  lxdh: "17858945569",

})

// 定义一个用来是做这个下拉框循环的
const xldata = ref([
  { label: '1', value: "1" },
  { label: '2', value: "2" },
  { label: '3', value: "3" },
  { label: '4', value: "4" },
])
// 下面这个就是表单的一个验证规则
const rules = reactive({
  name: [
    { required: true, message: '名称不能为空', trigger: 'blur' },
    // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  time: [
    { required: true, message: '请输入时间', trigger: 'blur' },
    // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  grade: [
    { required: true, message: '请选择等级', trigger: 'blur' },
    // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],

})

// checkbox 弹框数据
const checkBoxPopupDataAll = ref([
  {
    name: '地质灾害隐患点', type: 'checkbox_popup', hasSerachBar: true, inputData: { label: '搜索地点名称', value: '' }, buttonData: { name: '地图清除' }, treeData: [
      {
        label: '地质灾害',
        num: '411'
      },
      {
        label: '泥石流',
        num: '231',
        children: [
          {
            label: '榆阳区',
            num: '41'
          },
          {
            label: '横山区',
            num: '11'
          },
          {
            label: '神木县',
            num: '31'
          },
          {
            label: '府谷县',
            num: '34'
          },
        ]
      },
      {
        label: '滑坡',
        num: '105'
      },
      {
        label: '山体崩塌',
        num: '105'
      },
      {
        label: '地面塌陷',
        num: '105'
      },
      {
        label: '地裂缝',
        num: '105'
      },
      {
        label: '地面沉降',
        num: '105'
      },
      {
        label: '不稳定斜坡',
        num: '105'
      },
    ]
  },
  {
    name: '历史危房信息', type: 'checkbox_popup', hasSerachBar: false, treeData: [
      {
        label: '住建危旧房',
        num: '411'
      },
      {
        label: 'A级危旧房',
        num: '231',
        children: [
          {
            label: '榆阳区',
            num: '41'
          },
          {
            label: '横山区',
            num: '11'
          },
          {
            label: '神木县',
            num: '31'
          },
          {
            label: '府谷县',
            num: '34'
          },
          {
            label: '神木市',
            num: '34'
          },
          {
            label: '定边县',
            num: '34'
          },
          {
            label: '靖边县',
            num: '34'
          },
        ]
      },
      {
        label: 'B级危旧房',
        num: '105'
      },
      {
        label: 'C级危旧房',
        num: '105'
      },
      {
        label: 'D级危旧房',
        num: '105'
      },
    ]
  },
  {
    name: '地质灾害易发区', type: 'checkbox_popup', hasSerachBar: true, inputData: { label: '搜索地点名称', value: '' }, buttonData: { name: '地图清除' }, treeData: [
      {
        label: '地质灾害易发区',
        num: '411'
      },
      {
        label: '低风险区',
        num: '231',
      },
      {
        label: '中风险区',
        num: '105'
      },
      {
        label: '高风险区',
        num: '105'
      },
      {
        label: '极高风险区',
        num: '105'
      },
    ]
  },
  {
    name: '森火隐患点', type: 'checkbox_popup', hasSerachBar: false, treeData: [
      {
        label: '大风灾害危险性分布图',
        num: '411'
      },
      {
        label: '低温（冷空气）危险性分布图',
        num: '231',
      },
      {
        label: '暴雨灾害危险性分布图',
        num: '105'
      },
      {
        label: '雨雪灾害冰冻危险性分布图',
        num: '105'
      },
      {
        label: '干旱灾害危险性分布图',
        num: '105'
      },
    ]
  },
  {
    name: '山洪灾害', type: 'checkbox_popup', hasSerachBar: true, inputData: { label: '搜索地点名称', value: '' }, buttonData: { name: '地图清除' }, treeData: [
      {
        label: '山洪灾害',
        num: '411',
        children: [
          {
            label: '榆阳区',
            num: '41'
          },
          {
            label: '横山区',
            num: '11'
          },
          {
            label: '神木县',
            num: '31'
          },
          {
            label: '府谷县',
            num: '34'
          },
          {
            label: '神木市',
            num: '34'
          },
          {
            label: '定边县',
            num: '34'
          },
          {
            label: '靖边县',
            num: '34'
          },
          {
            label: '府谷县',
            num: '34'
          },
          {
            label: '神木市',
            num: '34'
          },
          {
            label: '定边县',
            num: '34'
          },
          {
            label: '靖边县',
            num: '34'
          },
        ]
      },
    ]
  },
])
const checkBoxPopupData = ref({
  name: '地质灾害隐患点', type: 'checkbox_popup', hasSerachBar: true, inputData: { label: '搜索地点名称', value: '' }, buttonData: { name: '地图清除' }, treeData: [
    {
      label: '地质灾害',
      num: '411'
    },
    {
      label: '泥石流',
      num: '231',
      children: [
        {
          label: '榆阳区',
          num: '41'
        },
        {
          label: '横山区',
          num: '11'
        },
        {
          label: '神木县',
          num: '31'
        },
        {
          label: '府谷县',
          num: '34'
        },
      ]
    },
    {
      label: '滑坡',
      num: '105'
    },
    {
      label: '山体崩塌',
      num: '105'
    },
    {
      label: '地面塌陷',
      num: '105'
    },
    {
      label: '地裂缝',
      num: '105'
    },
    {
      label: '地面沉降',
      num: '105'
    },
    {
      label: '不稳定斜坡',
      num: '105'
    },
  ]
})
</script>

<template>
  <div class="bigScreen" ref="bigScreen">
    <!-- 无缝滚动 -->
    <div class="scollBox" @click="yjBox">
      <img src="../../assets/natural/tongzhi.png" class="tz">
      
      <scrollBanner :content="bannerContent"></scrollBanner>
      <!-- <span class="tz-num">2</span> -->
      <!-- <vue3-seamless-scroll :list="newsList" direction="left" limitScrollNum="1" class="seamless-warp2">

        <ul class="item">
          <li v-for="(item, index) in newsList" v-text="item.title" :key="index"></li>
        </ul>
      </vue3-seamless-scroll> -->
    </div>
    <!-- 左侧内容 -->
    <pageLeftContent>
      <left></left>
    </pageLeftContent>
    <!-- 右侧内容 -->
    <pageRightContent>
      <!-- <ViewBox left="0" top="0" width="430" height="166" title="天气情况">
        我是右边的内容
      </ViewBox> -->
      <right @getValue="getValue"></right>
    </pageRightContent>
    <!--预警信息  -->
    <dialogVue :dialogValue="isyjShow" :title="'预警信息'" width="980px" height="460px" top="500px"
      @closeHandle="closeHandle">
      <div class="from-content">
        <table class="table-box">
          <tr>
            <td class="label">预警标题</td>
            <td colspan="3">榆林气象台解除霜冻蓝色预警信号</td>
          </tr>
          <tr>
            <td class="label">预警类别</td>
            <td>霜冻</td>
            <td class="label">预警信号名称</td>
            <td>霜冻蓝色</td>
          </tr>
          <tr>
            <td class="label">预警等级</td>
            <td>蓝色</td>
            <td class="label">发布状态</td>
            <td>已解除</td>
          </tr>
          <tr>
            <td class="label">发布时间</td>
            <td>2022-0404 09:05:34</td>
            <td class="label">签发者姓名</td>
            <td>夏XX</td>
          </tr>
          <tr>
            <td class="label">预警内容</td>
            <td colspan="3">解除霜冻蓝色预警</td>
          </tr>
          <tr class="tr-h6">
            <td class="label">预警原因说明</td>
            <td colspan="3">3至4月和10至11月，48小时内最低气温将降至4摄氏度以下，或者已经下降到4摄氏度以下并将持续可能或已对农业、林业等产生一定影响</td>
          </tr>
          <tr class="tr-h6">
            <td class="label">防范建议</td>
            <td colspan="3">1.政府及相关部门做好防需冻准备工作; 2.对茶叶、蔬菜、花卉、瓜果等作物采取一定防护措施</td>
          </tr>
        </table>
      </div>
    </dialogVue>
    <!-- 发布信息的页面写在pageLeftContent组件里面的 -->

    <!-- <firDialog :name="checkBoxPopupData.name">
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
    </firDialog> -->
  </div>
</template>



<style scoped lang="less">
.mapBox {
  width: 1920px;
  height: 1080px;
}

.scollBox {
  width: 527px;
  height: 39px;
  padding: 0 20px;
  // background: rgba(6, 152, 215, 0.2);
  background: url(@/assets/common/warn_bg.png) no-repeat;
  background-size: 100% 100%;
  position: absolute;
  left: 50%;
  margin-left: -263px;
  top: 98px;
  cursor: pointer;
  z-index: 9999;
  display: flex;
  align-items: center;

  .tz {
    width: 24px;
    height: 19px;
    padding-right: 10px;
  }

  .tz-num {
    padding-left: 5px;
    font-size: 14px;
    color: #20e6a4;
    padding-right: 10px;
  }

  .seamless-warp2 {
    overflow: hidden;
    height: 39px;
    width: 517px;
    line-height: 39px;
    padding-left: 20px;

    ul.item {
      width: 520px;

      li {
        float: left;
        margin-right: 10px;
        font-size: 16px;
        font-weight: 500;
        color: #FFFFFF;
        padding-left: 10px;
      }
    }
  }
}

.webRtc {
  position: absolute;
  left: 0;
  top: 0;
  width: 300px;
  height: 200px;
}

.layoutAuto {
  position: fixed;
  top: 0;
  left: 0;
  width: 500px;
  height: 400px;
}

// 预警信息
.from-content {
  margin: auto;
  width: 937px;
  height: 364px;
  margin-top: 10px;
  background: rgba(0, 163, 206, 0.2);

  .table-box {
    width: 100%;
    border-collapse: collapse;
  }

  tr td {
    border: 1px solid #00a3ce;
    padding-left: 16px;
    font-size: 16px;
    font-family: Source Han Sans SC-Regular, Source Han Sans SC;
    font-weight: 400;
    color: #ffffff;
  }

  .label {
    width: 120px;
    text-align: center;
    padding-left: 0;
  }

  tr {
    height: 40px;
  }

  .tr-h6 {
    height: 80px;
  }
}

// 多选框 弹框内容样式
.checkbox_popup {
  padding: 0 10px;

  .search_bar {
    display: flex;

    :deep(.el-input) {
      flex: 1;
      height: 36px;
      background: linear-gradient(90deg, #0698D7 0%, #1E89FD 100%);
      border-radius: 4px 4px 4px 4px;
      border: 1px solid !important;
      border-image: linear-gradient(90deg, rgba(6, 152, 215, 1), rgba(30, 137, 253, 1)) 1 1 !important;
      margin-right: 3px;
      font-size: 16px;
    }

    .button {
      width: 97px;
      height: 36px;
      background: linear-gradient(90deg, #0698D7 0%, #1E89FD 100%) !important;
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
      border: 1px solid #0075A4;
      border-radius: 0;
      background: transparent;
    }

    .el-checkbox__input.is-checked .el-checkbox__inner {
      border: none;
      background: url('@/assets/natural/check_Property.png') center/99% 99% no-repeat;

      &::after {
        display: none;
      }
    }

    .el-tree-node {
      font-size: 16px;
      font-family: Source Han Sans SC-Regular, Source Han Sans SC;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 19px;

      .yellow {
        color: #FFDF53;
        margin-left: 10px;
      }
    }

    .el-tree-node__content {
      margin: 4px 0;
    }

    .el-tree-node:focus>.el-tree-node__content,
    .el-tree-node__content:hover {
      background-color: RGBA(10, 91, 131, .3);
    }
  }
}
</style>