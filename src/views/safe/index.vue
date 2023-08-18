
<script setup>
// import pageHeader from "@/components/common/pageHeader.vue";
import pageLeftContent from "@/components/common/pageLeftContent.vue";
import pageRightContent from "@/components/common/pageRightContent.vue";
import dialogVue from "../../components/common/dialog.vue";
import { ref, onMounted, inject, nextTick } from "vue";
import left from "./components/left.vue";
import right from "./components/right.vue";
import integratedCommunication from "./components/integratedCommunication.vue";
import { yjsjDetails, enterpriseLists } from "@/api/mock_tzk.js";
// 导入需要打点的数据
import { qylxlist } from "../../api/affair_ys"

import { viewDetailqilx } from "@/utils/funcNames/ys";
import { useEventBus } from "@vueuse/core";

const $mitt = inject("$mitt");

const yjsjDetail = ref({});
const showDialog = ref({
  video: false,
  yjsj: false,
  qyxx: false,
  eventLevel: false,
});
// 决定这些框线是否需要隐藏的东东
const showDialog2 = ref({
  ck: false,
  bl: false,
  zh: false,
  hs: false,
});
// 关闭相对应弹窗的方法
const closeDialog1 = function () {
  showDialog2.value.ck = false
}
const closeDialog2 = function () {
  showDialog2.value.hs = false
}
const closeDialog3 = function () {
  showDialog2.value.bl = false
}

// 事故等级||事故类型 数据
const eventLevelPopupData = ref({
  title: '一般事件',
  data: [
    {
      title: 'XXX化工厂',
      id: 'hgc_1',
      rows: [
        {
          label: '具体地点:',
          value: '榆林市 陕西省榆林市榆阳区肤施路',
        },
        {
          label: '详细描述:',
          value: '化工厂未达到检测标准，排放工业污水',
        },
        {
          label: '事件类型:',
          value: '污水排放',
          inline: 'inline_3'
        },
        {
          label: '事发区域:',
          value: '榆林市',
          inline: 'inline_3'
        },
        {
          label: '上报时间:',
          value: '2023-07-11 18:23:39',
          inline: 'inline_3'
        },
      ]
    },
  ]
})

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


const enterpriseList = ref([]);
// 开启弹窗
const openDialog = function (key, info) {
  // 应急事件
  if (key === "yjsj") {
    yjsjDetail.value = yjsjDetails[info.id];
  }
  // 企业信息
  if (key === "qyxx") {
    const i = parseInt(Math.random() * 5);
    enterpriseList.value = enterpriseLists.slice(i);
  }
  // 事故等级||事故类型
  if (key === 'eventLevel') {
    // 没有数据 return
    if (!info.num) return
    eventLevelPopupData.value.title = info.name

    // let mardata = qylxlist[0].maekerList[0]
    let position = [109.92832, 38.27419]

    let arr = []
    for (let index = 0; index < info.num ; index++) {
      console.log(info.jh,"[index]")
      console.log(info.jh[index],"ppp")
      // 差不多在此范围内随机生成点位
      // let lng = (position[0] + '').replace(/^(.{4})(.{3})(.*)$/, '$1' + Math.round(Math.random() * (999 - 100) + 100) + '$3')
      // let lat = (position[1] + '').replace(/^(.{4})(.{3})(.*)$/, '$1' + Math.round(Math.random() * (999 - 100) + 100) + '$3')
      arr.push({
        // title: index + '号化工厂' + info.id,
        title: info.name,
        id: info.id,//如此唯一
        mardata: {
          markerType: "wxx",
          id: info.jh[index].id + '_' + index,
          icon: "/images/marker/icon_jigou.png",
          lng: info.jh[index].mapX,
          lat: info.jh[index].mapY,
          name: '化工厂',
          label: { text: info.id + '-' + index + '号化工厂', font_size: 16 },
          dialogType: "qylxxx",
          details: {
            name: info.id + '-' + index + '号化工厂',
            job: "榆阳区12号",
            compony: "陕西省双翼有限公司",
            aphone: "白位于",
            phone: "14598989876",
            duty: "榆阳区"
          }
        },
        rows: [
          {
            label: '具体地点:',
            value:  info.jh[index].eventAddress,
          },
          {
            label: '详细描述:',
            value:info.jh[index].eventContent,
          },
          {
            label: '事件类型:',
            value: info.jh[index].typeName,
            inline: 'inline_3'
          },
          {
            label: '事发区域:',
            value: info.jh[index].xzqhName,
            inline: 'inline_3'
          },
          {
            label: '上报时间:',
            value: info.jh[index].updateTime,
            inline: 'inline_3'
          },
        ]
      })
    }
    eventLevelPopupData.value.data = arr

  }
  showDialog.value[key] = true;
};
const closeDialog = function (key) {
  showDialog.value[key] = false;
};

// 定义一个变量,这个就是关于企业类型弹窗是否展示的一个列表的
const qylxfxshow = ref(false)
// 关闭的方法
const closeqylxfxshow = function () {
  qylxfxshow.value = false
}
// 定义一个传递过来的值
const qylxdata = ref([])
// 下面就是接收子组件的数据
const getValue = (value) => {
  showDialog2.value = value
}

// 这里还要再定义一个这个弹窗的标题名字
const qyfxdjtitle = ref()
// 下面接收子组件传递过来的值
const getValue10 = (value, isshow) => {
  console.log(value, "我就是儿子传递过来的数据的======>")
  qylxdata.value = value.qydatas
  qylxfxshow.value = isshow
  qyfxdjtitle.value = value.lx
  console.log(qylxdata.value, "我看看这个现在到底变成了什么")
}
// 下面就是点击这个查看弹窗的事件
const busqy = useEventBus(viewDetailqilx);
// 查看
busqy.on(function (e) {
  // 这里判断我点击的是谁
  console.log(e, "看看有些什么参数");
  qyxxshow.value = true
});
// 下面就是点击表格的时候就要进行这个打点的了
// 定义一个数据,存储之前有的这个打了点的数据了,然后在点击其他的时候需要把这个清楚掉的
let iscun = ref(true);
let monedata = ref("");
// 来判断我点击的是不是原来的这个
let mmid = ref("");
const qylxdd = function (item) {
  getdatasj()
  console.log(item, "准备打点的了看看有些什么东西")
  if (iscun.value) {
    mmid.value = item.marker.id;
    let mardata = item.marker;
    $mitt.emit("addMarker", mardata);
    $mitt.emit("openPopup", mardata);
    $mitt.emit("openPopup", mardata);
    // 然后还要把我打了点的数据保存下来,待会把她清楚掉
    monedata.value = item.marker;
    iscun.value = false;
    qylxfxshow.value = false
  } else {
    if (item.marker.id == mmid.value) {
      mmid.value = item.marker.id;
      // 决定要不要清楚就看你的了
      // $mitt.emit("changeMarkerState", monedata.value);
      iscun.value = true;
      qylxfxshow.value = false
    } else {
      // 下面这个就表示已经打了点的了,需要把之前的点取消掉
      // 明白我点的是哪一个
      mmid.value = item.marker.id;
      console.log("我走的这里吗");
      iscun.value = true;
      $mitt.emit("changeMarkerState", monedata.value);
      monedata.value = item.marker;
      // 然后还要再打新的点
      let mardata = item.marker;
      $mitt.emit("addMarker", mardata);
      $mitt.emit("openPopup", mardata);
      $mitt.emit("openPopup", mardata);
      // 然后还要把我打了点的数据保存下来,待会把她清楚掉
      monedata.value = item.marker;
      iscun.value = false;
      qylxfxshow.value = false
    }
  }
}

// 把打点的数据放进行添加进去
const getdatasj = function () {
  qylxdata.value.forEach((v, i) => {
    qylxdata.value[i].marker = qylxlist[0].maekerList[i];
  })
};

const currentEventLevelType = ref({ markerType: '', id: '' })
// 点击事故等级||事故类型弹框列表 撒点
const clickEventLevel = (item) => {
  closeDialog('eventLevel')

  // 先清除之前的 再撒点
  if (currentEventLevelType.value.markerType) {
    $mitt.emit('changeMarkerState', { markerType: currentEventLevelType.value.markerType, id: currentEventLevelType.value.id, show: false })
  }
  $mitt.emit("addMarker", item.mardata);
  $mitt.emit("openPopup", item.mardata);
  $mitt.emit("openPopup", item.mardata);

  currentEventLevelType.value.markerType = item.mardata.markerType
  currentEventLevelType.value.id = item.mardata.id
}

// 下面就是这个企业信息弹窗的了
const qyxxshow = ref(false)
// 关闭方法
const closeqyxxshow = function () {
  qyxxshow.value = false
}
</script>

<template>
  <div class="bigScreen" ref="bigScreen">
    <!-- 头部 -->
    <!-- <pageHeader></pageHeader> -->
    <!-- 左侧内容 -->
    <pageLeftContent class="leftbig">
      <left @openDialog="(type, info) => { openDialog(type, info) }" @getValue="getValue"></left>

    </pageLeftContent>
    <!-- 右侧内容 -->
    <pageRightContent>
      <right @openDialog="(type, info) => { openDialog(type, info) }" @getValue10="getValue10"></right>
      <!-- <ViewBox left="0" top="0" width="430" height="166" title="公共的内容模块">
        我是右边的内容
      </ViewBox> -->
    </pageRightContent>
    <!-- 视频监控 -->
    <integratedCommunication :show-dialog="showDialog.video" @closeVideoDialog="closeDialog('video')">
    </integratedCommunication>

    <!-- 应急事件 -->
    <dialogVue :dialogValue="showDialog.yjsj" :title="'应急事件'" width="864px" height="476px" :top="500"
      @closeHandle="closeDialog('yjsj')">
      <div class="eventList ">
        <div class="title">灾害信息</div>
        <table class="table-box">
          <tr>
            <td class="label">具体地点:</td>
            <td colspan="5">{{ yjsjDetail.address }}</td>
          </tr>
          <tr>
            <td class="label">详细描述:</td>
            <td colspan="5">{{ yjsjDetail.detail }}</td>
          </tr>
          <tr>
            <td class="label">事件类型:</td>
            <td>{{ yjsjDetail.type }}</td>
            <td class="label">事发区域:</td>
            <td>{{ yjsjDetail.area }}</td>
            <td class="label">上报时间:</td>
            <td>{{ yjsjDetail.time }}</td>
          </tr>
        </table>
        <div class="title">灾害风险图片或视频</div>
        <div class="img-lie fl-f">
          <div class="lie">
            <el-image style="width: 100px; height: 100px"
              :src="'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'"
              :preview-src-list="['https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg']"
              :initial-index="4" fit="cover" />
          </div>
          <div class="lie"></div>
        </div>
        <div class="bottom-btn">
          <span class="cancel">取消</span>
          <span class="sub">上报</span>
        </div>
      </div>
    </dialogVue>

    <!-- 企业信息 -->
    <dialogVue :dialogValue="showDialog.qyxx" :title="'企业信息'" width="844px" height="557px"
      @closeHandle="closeDialog('qyxx')">
      <div class="enterprise">
        <table>
          <tr>
            <th width="178">单位名称</th>
            <th>单位类型</th>
            <th>所属区域</th>
            <th>联系人</th>
            <th>联系电话</th>
            <th>值班电话</th>
            <th>地址</th>
          </tr>
          <tr v-for="item in enterpriseList" :key="item.id">
            <td width="178">{{ item.name }}</td>
            <td>{{ item.type }}</td>
            <td>{{ item.area }}</td>
            <td>{{ item.link }}</td>
            <td>{{ item.phone }}</td>
            <td>{{ item.phone1 }}</td>
            <td>{{ item.address }}</td>
          </tr>
        </table>
      </div>
    </dialogVue>


    <!-- 下面再来一个,这个就是事件信息的一个弹窗口的了 -->
    <dialogVue :dialogValue="showDialog2.ck" :title="'事件信息'" width="850px" height="556px" top="500px"
      @closeHandle="closeDialog1()">
      <div class="sjmain">
        <!-- 小标题部分 -->
        <!-- <div class="smalltitle" @click="smacl">
          <span class="ordinary bgordinary">事件信息</span>
          <span class="ordinary">事件处理</span>
        </div> -->
        <!-- 表单的信息等部分的内容了 -->
        <div class="sjform">
          <div>
            <p> 事件编号 : <span class="small">1556488</span></p>
            <p> 事件类型 : <span class="small">山体滑坡</span></p>
          </div>
          <div>
            <p> 事发时间 : <span class="small">2023-07-11 18:23:39</span></p>
            <p> 所在区域 : <span class="small">等6845454</span></p>
          </div>
          <div>
            <p> 事件等级 : <span class="small">较大</span></p>
            <p> 紧急程度 : <span class="small">1556488</span></p>
          </div>
          <!-- 详细地质 -->
          <div>
            <p>详细地质 : <span class="big">陕西省榆林市横山区李家亏</span></p>
          </div>
          <div class="describe">
            <p>事件描述 : <span
                class="big ">区李家亏陕西省榆林市横山区李家亏陕西省榆林市横山区李家亏陕西省榆林市横山区李家亏陕西省榆林市横山区李家亏陕西省榆林市横山区李家亏陕西省榆林市横山区李家亏陕西省榆林市横山区李家亏陕西省榆林市横山区李家亏市横山区李家亏</span>
            </p>
          </div>
          <div class="annex">
            <p>附件信息 :<span class="big">
                <!-- <img src="" alt="">
                <img src="" alt=""> -->
              </span>
            </p>
          </div>
        </div>
      </div>
    </dialogVue>
    <!-- 下面这个就是事件核实的弹出框的了 -->
    <dialogVue :dialogValue="showDialog2.hs" :title="'事件核实'" width="866px" height="578px" top="500px"
      @closeHandle="closeDialog2()">
      <!-- 下面这个就是里面的内容部分的了 -->
      <div class="sjhsmain">
        <div class="title">
          <span>事件信息</span>
        </div>
        <!-- 下面是这个主体内容 -->
        <div class="forms">
          <el-form ref="ruleFormRef" class="smalform" :model="hsform" :rules="rules">
            <el-form-item label="事件名称" prop="name">
              <el-input v-model="hsform.name" placeholder="" clearable />
            </el-form-item>
            <el-form-item label="事发时间" prop="time">
              <el-input v-model="hsform.time" placeholder="" clearable />
            </el-form-item>
          </el-form>
          <el-form class="smalform" :model="hsform" :rules="rules">
            <el-form-item label="事件等级" prop="grade">
              <!-- <el-input v-model="hsform.name" placeholder="'" clearable /> -->
              <el-select v-model="hsform.grade" placeholder="" size="large">
                <el-option v-for="item in xldata" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="事发区域" prop="region">
              <!-- <el-input v-model="hsform.name" placeholder="'" clearable /> -->
              <el-select v-model="hsform.region" placeholder="Select" size="large">
                <el-option v-for="item in xldata" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-form>
          <el-form :model="hsform" :rules="rules">
            <el-form-item label="详细地址" prop="address">
              <el-input v-model="hsform.address" placeholder="'" clearable />
            </el-form-item>
          </el-form>
          <el-form :model="hsform">
            <el-form-item label="事件描述" class="describeinput">
              <el-input v-model="hsform.describe" placeholder="'" clearable />
            </el-form-item>
          </el-form>
        </div>

        <div class="title2">
          <span>事件信息</span>
        </div>
        <el-form class="smalform" :model="hsform" :rules="rules">
          <el-form-item label="核实状态">
            <el-radio-group v-model="hsform.state" class="ml-4">
              <el-radio label="1" size="small">属实</el-radio>
              <el-radio label="2" size="small">不属实</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="事件类型">
            <!-- <el-input v-model="hsform.name" placeholder="'" clearable /> -->
            <el-select v-model="hsform.type" placeholder="Select" size="large">
              <el-option v-for="item in xldata" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-form>
        <el-form :model="hsform" :rules="rules">
          <el-form-item label="短信模板">
            <el-input v-model="hsform.mo" placeholder="'" clearable />
          </el-form-item>
        </el-form>
        <!-- 下面就是按钮的了 -->
        <div class="buttons">
          <button>取消</button>
          <button>确定</button>
        </div>
      </div>
    </dialogVue>

    <!-- 最后一个就是补录这个页面的了 -->
    <dialogVue :dialogValue="showDialog2.bl" :title="'事件补录'" width="850px" height="692px" top="500px"
      @closeHandle="closeDialog3()">
      <!-- 下面这个就是里面的内容部分的了 -->
      <div class="sjblmain">
        <div class="title">
          <span>事件信息</span>
        </div>
        <!-- 下面是这个主体内容 -->
        <div class="forms">
          <el-form class="smalform" :model="blform">
            <el-form-item label="事件编号" prop="name">
              <el-input v-model="blform.bh" placeholder="" clearable />
            </el-form-item>
            <el-form-item label="事件类型" prop="time">
              <el-input v-model="blform.lx" placeholder="" clearable />
            </el-form-item>
          </el-form>
          <el-form class="smalform" :model="blform">
            <el-form-item label="事发时间" prop="grade">
              <!-- <el-input v-model="hsform.name" placeholder="'" clearable /> -->
              <el-select v-model="blform.sj" placeholder="" size="large">
                <el-option v-for="item in xldata" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="时间名称" prop="region">
              <!-- <el-input v-model="hsform.name" placeholder="'" clearable /> -->
              <el-select v-model="blform.name" placeholder="Select" size="large">
                <el-option v-for="item in xldata" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-form>
          <el-form class="smalform" :model="blform">
            <el-form-item label="事件等级" prop="grade">
              <!-- <el-input v-model="hsform.name" placeholder="'" clearable /> -->
              <el-select v-model="blform.dj" placeholder="" size="large">
                <el-option v-for="item in xldata" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="紧张程度" prop="region">
              <!-- <el-input v-model="hsform.name" placeholder="'" clearable /> -->
              <el-select v-model="blform.cd" placeholder="Select" size="large">
                <el-option v-for="item in xldata" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-form>
          <!-- 这里是那个特殊的比较小的那种 -->
          <el-form class="smalform" :model="blform">
            <el-form-item label="伤亡情况">
              <el-form class="smalformss" :model="blform">
                <el-form-item label="现场共有" prop="grade">
                  <el-input class="sbl" v-model="blform.swqk.xzgy" placeholder="'" clearable />
                </el-form-item>
                <el-form-item label="合计死亡" prop="region">
                  <el-input class="sbl" v-model="blform.swqk.hjsw" placeholder="'" clearable />
                </el-form-item>
                <el-form-item label="合计失踪" prop="region">
                  <el-input class="sbl" v-model="blform.swqk.hjsz" placeholder="'" clearable />
                </el-form-item>
                <el-form-item label="合计重伤" prop="region">
                  <el-input class="sbl" v-model="blform.swqk.hjzs" placeholder="'" clearable />
                </el-form-item>
                <el-form-item label="合计轻伤" prop="region">
                  <el-input class="sbl" v-model="blform.swqk.hjqs" placeholder="'" clearable />
                </el-form-item>
              </el-form>
              <el-form class="smalforms2" :model="hsform">
                <el-form-item label="合计被困" prop="region">
                  <el-input class="sbl" v-model="blform.swqk.hjbk" placeholder="'" clearable />
                </el-form-item>
                <el-form-item label="合计中毒" prop="region">
                  <el-input class="sbl" v-model="blform.swqk.hjzd" placeholder="'" clearable />
                </el-form-item>
              </el-form>
            </el-form-item>
          </el-form>

          <el-form class="smalform" :model="blform">
            <el-form-item label="所在区域" prop="grade">
              <!-- <el-input v-model="hsform.name" placeholder="'" clearable /> -->
              <el-select v-model="blform.quyu" placeholder="" size="large">
                <el-option v-for="item in xldata" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="详细地址" prop="region">
              <!-- <el-input v-model="hsform.name" placeholder="'" clearable /> -->
              <el-select v-model="blform.xxdz" placeholder="Select" size="large">
                <el-option v-for="item in xldata" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-form>
          <!-- 下面这个是地图定位的 -->
          <el-form class="smalform" :model="blform">
            <el-form-item label="地图定位" prop="grade">
              <el-form class="smalforms3" :model="blform">
                <el-form-item prop="grade">
                  <!-- <el-input v-model="hsform.name" placeholder="'" clearable /> -->
                  <el-select v-model="blform.dtdw.jd" placeholder="" size="large">
                    <el-option v-for="item in xldata" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
                <el-form-item prop="region">
                  <!-- <el-input v-model="hsform.name" placeholder="'" clearable /> -->
                  <el-select v-model="blform.dtdw.wd" placeholder="Select" size="large">
                    <el-option v-for="item in xldata" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
                <el-form-item prop="region">
                  <!-- <el-input v-model="hsform.name" placeholder="'" clearable /> -->
                  <el-select v-model="blform.dtdw.gc" placeholder="Select" size="large">
                    <el-option v-for="item in xldata" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
                <el-form-item prop="region">
                  <el-button>地图选择位置</el-button>
                </el-form-item>
              </el-form>
            </el-form-item>
          </el-form>
        </div>

        <el-form :model="blform">
          <el-form-item label="详细地址" class="describeinput">
            <el-input v-model="blform.xxdz" placeholder="'" clearable />
          </el-form-item>
        </el-form>

        <div class="title">
          <span>事件信息</span>
        </div>
        <el-form class="smalform" :model="blform">
          <el-form-item label="报送人员" prop="grade">
            <!-- <el-input v-model="hsform.name" placeholder="'" clearable /> -->
            <el-select v-model="blform.bsry" placeholder="" size="large">
              <el-option v-for="item in xldata" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="报送名称" prop="region">
            <!-- <el-input v-model="hsform.name" placeholder="'" clearable /> -->
            <el-select v-model="blform.bsmc" placeholder="Select" size="large">
              <el-option v-for="item in xldata" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-form>
        <el-form class="smalform" :model="hsform">
          <el-form-item label="报送时间" prop="grade">
            <!-- <el-input v-model="hsform.name" placeholder="'" clearable /> -->
            <el-select v-model="blform.bssj" placeholder="" size="large">
              <el-option v-for="item in xldata" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="联系电话" prop="region">
            <!-- <el-input v-model="hsform.name" placeholder="'" clearable /> -->
            <el-select v-model="blform.lxdh" placeholder="Select" size="large">
              <el-option v-for="item in xldata" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-form>
        <!-- 附件上传部分的 -->
        <div class="title">
          <span>附件信息</span>
        </div>
        <div class="fj">
          <div class="fjimg">
            <el-upload class="avatar-uploader" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
              :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon">
                <Plus />
              </el-icon>
            </el-upload>
          </div>

        </div>

        <!-- 下面就是按钮的了 -->
        <div class="buttons">
          <button>取消</button>
          <button>确定</button>
        </div>
      </div>
    </dialogVue>
  </div>

  <!-- 事故等级与事故类型 弹框 -->
  <dialogVue :dialogValue="showDialog.eventLevel" :title="eventLevelPopupData.title" width="850px" height="350px"
    top="350px" @closeHandle="closeDialog('eventLevel')">
    <div class="level_and_type" :style="{ 'maxHeight': (350 - 70) + 'px' }">
      <div class="event_list" v-for="(item, index) in eventLevelPopupData.data" :key="index"
        @click="clickEventLevel(item)">
        <div class="event_title">
          事故发生单位：{{ item.title }}
        </div>
        <div class="event_cont_box">
          <div :class="{ 'event_cont': true, [child.inline]: true }" v-for="(child, cindex) in item.rows" :key="cindex">
            <div class="list">
              <span class="label">{{ child.label }}</span>
              <div class="value">{{ child.value }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </dialogVue>

  <!-- 下面这个就是企业类型分析的这个弹框的了 -->
  <dialogVue :dialogValue="qylxfxshow" :title="qyfxdjtitle" width="850px" height="446px" top="500px"
    @closeHandle="closeqylxfxshow()">
    <div class="qilx">
      <div class="title">
        <span></span>
        <p>排名列表</p>
      </div>
      <!-- 下面就是主要内容的了 -->
      <div class="mains">
        <div class="maintitle">
          <span>企业名称</span>
          <span>风险等级</span>
          <span>事故发生次数</span>
          <span>事故动态</span>
          <span>联系人</span>
          <span>联系电话</span>
        </div>
        <div class="mainitems">
          <div class="mainitem" v-for="(item, index) in qylxdata" :key="index" @click="qylxdd(item)">
            <span>{{ item.name }}</span>
            <span>{{ item.fxdj }}</span>
            <span>{{ item.sgcs }}</span>
            <span class="colochang">{{ item.sgdt }}</span>
            <span>{{ item.lxr }}</span>
            <span>{{ item.lxdh1 }}</span>
          </div>
        </div>
      </div>
    </div>
  </dialogVue>

  <!-- 下面这个就是点击查看弹出企业详细信息的弹框的了 -->
  <dialogVue :dialogValue="qyxxshow" :title="'企业信息'" width="850px" height="486px" top="500px"
    @closeHandle="closeqyxxshow()">
    <div class="qilx">
      <div class="title">
        <span></span>
        <p>企业信息</p>
      </div>
      <!-- 下面就是主要内容的了 -->
      <div class="qixxmain">
        <div class="item">
          <div>
            <span>企业名称</span>
            <p>渔阳渔业有限责任公司</p>
          </div>
          <div>
            <span>全国统一社会代.</span>
            <p>12108402101215B12</p>
          </div>
        </div>

        <div class="item">
          <div>
            <span>联系人</span>
            <p>白国雨</p>
          </div>
          <div>
            <span>联系电话</span>
            <p>13778193829</p>
          </div>
        </div>
        <div class="item">
          <div>
            <span>法人</span>
            <p>白国雨</p>
          </div>
          <div>
            <span>联系电话</span>
            <p>13778193829</p>
          </div>
        </div>
        <div class="item">
          <div>
            <span>开业成立时间</span>
            <p>2012-10-12</p>
          </div>
          <div>
            <span>是否位于工业区</span>
            <p>是</p>
          </div>
        </div>
        <div class="item">
          <div>
            <span>建设状态</span>
            <p>完成</p>
          </div>
          <div>
            <span>最大当班人数</span>
            <p>241</p>
          </div>
        </div>
        <div class="item">
          <div>
            <span>企业类型</span>
            <p>农业</p>
          </div>
          <div>
            <span>所属区域</span>
            <p>榆阳区</p>
          </div>
        </div>
        <div class="item">
          <div>
            <span>安全生产标准化等级</span>
            <p>A</p>
          </div>
          <div>
            <span>危险工艺类型</span>
            <p>无</p>
          </div>
        </div>
        <div class="item">
          <div>
            <span>经度</span>
            <p>10°50′</p>
          </div>
          <div>
            <span>维度</span>
            <p>10°50′</p>
          </div>
        </div>
        <!-- 详细地址单独的这一行 -->
        <div class="item">
          <div>
            <span>详细地址</span>
            <p>榆阳区123号</p>
          </div>
        </div>

      </div>
    </div>
  </dialogVue>
</template>



<style scoped lang="less">
// 下面这个就是企业信息弹窗的样式的了
.qixxmain {
  .item {
    display: flex;
    justify-content: space-between;

    div {
      flex: 1;
      display: flex;
      height: 40px;

      span {
        display: flex;
        align-items: center;
        padding-left: 10px;
        height: 40px;
        width: 128px;
        border: 1px solid rgba(0, 163, 206, 0.15);
      }

      p {
        display: flex;
        align-items: center;
        height: 40px;
        flex: 1;
        padding-left: 10px;
        border: 1px solid rgba(0, 163, 206, 0.15);
      }
    }
  }
}

// 下面就是这个企业类型分析的这个样式的了
.qilx {
  margin: -10px;
  margin-top: 0px;

  .title {
    height: 32px;
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    background-color: rgba(0, 163, 206, 0.15);

    span {
      width: 4px;
      height: 100%;
      background-color: rgba(0, 163, 206, 1);
      margin-right: 8px;
    }
  }

  .mains {
    background-color: rgba(1, 40, 59, 1);

    .mainitems {
      height: 300px;
      overflow-y: auto;

      &::-webkit-scrollbar {
        display: none;
        width: 0;
      }

      .colochang {
        color: rgba(37, 227, 216, 1);
      }
    }

    .maintitle {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 32px;
      background-color: rgba(0, 163, 206, 0.15);

      span {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .mainitem:hover {
      background-color: rgb(27, 27, 43);
    }

    .mainitem {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 32px;

      // background-color: rgba(0, 163, 206, 0.15);
      span {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}

.mapBox {
  width: 1920px;
  height: 1080px;
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

.leftbig {
  background: rgba(7, 20, 28, 0.8);
}

//应急事件
.eventList {
  padding: 10px;

  .title {
    width: 814px;
    height: 32px;
    background: rgba(0, 163, 206, 0.15);
    box-shadow: inset 4px 0px 0px 0px #00a3ce;
    position: relative;
    font-size: 16px;
    font-family: Source Han Sans SC-Regular, Source Han Sans SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 32px;
    padding-left: 10px;
  }

  .title::before {
    position: absolute;
    content: "";
    width: 3px;
    height: 32px;
    background-color: rgba(0, 163, 206, 1);
    left: 0;
  }

  .table-box {
    width: 100%;
    border-collapse: collapse;
    margin: 10px 0;
  }

  tr td {
    padding-left: 16px;
    font-size: 16px;
    font-family: Source Han Sans SC-Regular, Source Han Sans SC;
    font-weight: 400;
    color: #ffffff;
  }

  .label {
    width: 120px;
  }

  tr {
    height: 40px;
  }

  .img-lie {
    width: 100%;
    margin-top: 10px;

    .lie {
      width: 124px;
      height: 94px;
      margin-right: 20px;
      overflow: hidden;

      .el-image {
        width: 100% !important;
      }
    }
  }

  .bottom-btn {
    border-top: 2px solid #054353;
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    span {
      width: 49px;
      height: 28px;
      background: #0d4f6d;
      border-radius: 4px;
      display: inline-block;
      text-align: center;
      line-height: 28px;
      font-size: 14px;
      font-weight: 400;
      color: #ffffff;
      margin-top: 17px;
      margin-right: 20px;
      cursor: pointer;
    }

    span:hover {
      background: rgba(13, 79, 109, 0.6);
      transition: all 0.3s linear;
    }
  }
}

//企业信息
.enterprise {
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 10px 0;

    tr {
      width: 100%;
      border: 1px solid rgba(25, 42, 90, 0.7);
    }

    tr th {
      text-align: left;
      padding-left: 10px;
      height: 42px;
      background: #042533;
      font-size: 16px;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #dff2ff;
    }

    tr td {
      text-align: left;
      padding-left: 10px;
      height: 42px;
      font-size: 16px;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #dff2ff;
    }
  }

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

// 下面是这个事件信息弹框的一个样式的处理的了
.sjmain {
  height: 533px;
  // background-color: #35dfed;
  margin: -10px;
  // padding-top: 16px;

  .smalltitle {
    // height: 39px;
    width: 100%;
    // margin-bottom: 7px;
    padding-left: 16px;
    display: flex;
    border-bottom: 1px solid rgba(0, 154, 195, 1);

    .ordinary {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100px;
      height: 32px;
      background-color: rgba(1, 40, 59, 1);
    }

    .bgordinary {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100px;
      height: 32px;
      position: relative;
      background-color: rgba(30, 78, 140, 1);
    }

    .bgordinary:before {
      content: "";
      width: 0px;
      height: 0px;
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
      border-left: 7px solid rgba(0, 163, 206, 1);
      position: absolute;
      // top: 42px;
      right: 80px;
    }
  }

  // 下面就是里面的主要的内容部分的了
  .sjform {
    padding: 0px 9px;
    font-size: 14px;
    // margin-top: 24px;

    div {
      display: flex;
      width: 100%;
      height: 40px;
      align-items: center;
      justify-content: space-between;
      margin: 12px 0px;

      p {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      // 大框和小框的样式
      .small {
        display: flex;
        align-items: center;
        padding-left: 16px;
        height: 40px;
        width: 320px;
        border: 1px solid rgba(0, 163, 206, 1);
        margin-left: 8px;
        background-color: rgba(1, 40, 59, 1);
      }

      .big {
        line-height: 20px;
        width: 736px;
        display: flex;
        align-items: center;
        padding-left: 16px;
        height: 40px;
        border: 1px solid rgba(0, 163, 206, 1);
        margin-left: 8px;
        justify-content: left;
        background-color: rgba(1, 40, 59, 1);
      }
    }

    .describe {
      height: 80px;

      .big {
        height: 80px;
      }
    }

    .annex {
      height: 170px;

      .big {
        height: 170px;
        padding-left: 0px;

        img {
          width: 200px;
          height: 150px;
          margin-left: 18px;
        }
      }
    }
  }
}

// 下面这个就是事件核实的一个相关的样式的了
.sjhsmain {
  width: 850px;
  padding: 0px 8px 0px 8px;
  margin: -10px !important;
  height: 492px;

  // 中间那个小小的那个表单
  .smallblform {
    height: 88px !important;
    width: 100%;
    display: flex;

    ::v-deep .el-form-item {
      display: flex;
    }
  }

  // 处理一下表单的样式
  ::v-deep .el-form-item__label {
    color: #fff;
  }

  ::v-deep .el-input__wrapper {
    background-color: rgba(1, 40, 59, 1) !important;
    border: 1px solid rgba(0, 163, 206, 1) !important;
    box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color)) inset;
    width: 320px;
    flex: 1;
    height: 40px;
    border-radius: 0px;
    margin-bottom: -3px;
  }

  ::v-deep .el-form-item--default {
    display: flex;
    align-items: center !important;
  }

  ::v-deep .el-form-item {
    display: flex;
    align-items: center !important;
  }


  // background: #00a3ce;
  .title {
    height: 56px;
    display: flex;
    align-items: center;
    font-size: 16px;
    border-bottom: 1px solid rgba(0, 154, 195, 1);
    margin-bottom: 8px;
  }

  .ssm {
    ::v-deep .el-input__wrapper {
      background-color: rgba(1, 40, 59, 1) !important;
      border: 1px solid rgba(0, 163, 206, 1) !important;
      box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color)) inset;
      width: 30px !important;
      flex: 1;
      height: 40px;
      border-radius: 0px;
      margin-bottom: -3px;
    }
  }

  .title2 {
    height: 56px;
    display: flex;
    align-items: center;
    font-size: 16px;
    margin-top: -20px;
    border-bottom: 1px solid rgba(0, 154, 195, 1);
    margin-bottom: 8px;
  }

  .smalform {
    // width: 100%;
    display: flex;
    justify-content: space-between;
  }

  // 底部按钮的样式
  .buttons {
    display: flex;
    justify-content: center;

    button {
      width: 49px;
      height: 28px;
      background-color: rgba(13, 79, 109, 1);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0px 5px;
      border-radius: 5px;
    }
  }

  .describeinput {
    ::v-deep .el-input__wrapper {
      height: 80px;
    }
  }

  // 下面这个是单选框的样式
  ::v-deep .el-radio__inner {
    width: 12px;
    height: 12px;
    background: transparent;
    border-radius: 1px solid rgba(6, 152, 215, 1);
  }

  ::v-deep .el-radio__inner::after {
    background: rgba(6, 152, 215, 1);
  }

  ::v-deep .el-radio {
    color: #fff;
  }

  ::v-deep .el-popper.is-light .el-popper__arrow::before {
    border: 1px solid var(--el-border-color-light) !important;
    background: rgba(0, 163, 206, 0.2) !important;
    right: 0;
  }
}

// 下面就是事件补录的这个相关的样式的了
.sjblmain {
  padding: 0px 8px 0px 8px;
  margin: -10px !important;
  height: 632px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  // 处理一下表单的样式
  ::v-deep .el-form-item__label {
    color: #fff;
  }

  ::v-deep .el-input__wrapper {
    background-color: rgba(1, 40, 59, 1) !important;
    border: 1px solid rgba(0, 163, 206, 1) !important;
    box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color)) inset;
    width: 320px;
    flex: 1;
    height: 40px;
    border-radius: 0px;
    margin-bottom: -3px;
  }

  ::v-deep .el-form-item {
    // width: 100% !important;
    // display: flex !important;
    // justify-content: end;
  }

  // background: #00a3ce;
  .title {
    height: 56px;
    display: flex;
    align-items: center;
    font-size: 16px;
    // border-bottom: 1px solid rgba(0, 154, 195, 1);
    margin-bottom: 8px;

    span {
      display: inline-block;
      height: 32px;
      display: flex;
      align-items: center;
      width: 100%;
      background-color: rgba(0, 163, 206, 0.15);
      padding-left: 8px;
    }
  }

  .title2 {
    height: 56px;
    display: flex;
    align-items: center;
    font-size: 16px;
    margin-top: -20px;
    border-bottom: 1px solid rgba(0, 154, 195, 1);
    margin-bottom: 8px;
  }

  .smalform {
    // width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .smalforms2 {
    width: 100%;
    margin: 5px 0px;
    display: flex;
    align-items: center;
    justify-content: left;

    ::v-deep .el-form-item {
      padding-right: 26px;
    }

    ::v-deep .el-input__wrapper {
      background-color: rgba(1, 40, 59, 1) !important;
      border: 1px solid rgba(0, 163, 206, 1) !important;
      box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color)) inset;
      width: 60px;
      flex: 1;
      height: 40px;
      border-radius: 0px;
      margin-bottom: -3px;
    }
  }

  // 只有三个框框的那个
  .smalforms3 {
    width: 100%;
    margin: 5px 0px;
    display: flex;
    align-items: center;
    justify-content: left;

    ::v-deep .el-form-item {
      padding-right: 12px;
    }

    ::v-deep .el-input__wrapper {
      background-color: rgba(1, 40, 59, 1) !important;
      border: 1px solid rgba(0, 163, 206, 1) !important;
      box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color)) inset;
      width: 180px;
      flex: 1;
      height: 40px;
      border-radius: 0px;
      margin-bottom: -3px;
    }
  }

  // 下面是附件信息哪里的相关的样式的了
  .fj {
    width: 100%;
    height: 170px;
    display: flex;
    align-items: center;
    justify-content: center;

    .fjimg {
      width: 752px;
      height: 170px;
      border: 1px solid rgba(0, 163, 206, 0.50);
      display: flex;
      align-items: center;
      padding-left: 20px;

      ::v-deep .el-upload {
        width: 200px;
        height: 150px;
        border: 1px solid rgba(0, 163, 206, 0.50);
      }
    }
  }

  .smalformss {
    width: 100%;
    margin: 5px 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    ::v-deep .el-input__wrapper {
      background-color: rgba(1, 40, 59, 1) !important;
      border: 1px solid rgba(0, 163, 206, 1) !important;
      box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color)) inset;
      width: 60px;
      flex: 1;
      height: 40px;
      border-radius: 0px;
      margin-bottom: -3px;
    }
  }

  // 底部按钮的样式
  .buttons {
    display: flex;
    justify-content: end;
    margin: 20px 0px;

    button {
      width: 49px;
      height: 28px;
      background-color: rgba(13, 79, 109, 1);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0px 5px;
      border-radius: 5px;
    }
  }

  .describeinput {
    ::v-deep .el-input__wrapper {
      height: 80px;
    }
  }

  // 下面这个是单选框的样式
  ::v-deep .el-radio__inner {
    width: 12px;
    height: 12px;
    background: transparent;
    border-radius: 1px solid rgba(6, 152, 215, 1);
  }

  ::v-deep .el-radio__inner::after {
    background: rgba(6, 152, 215, 1);
  }

  ::v-deep .el-radio {
    color: #fff;
  }

  ::v-deep .el-popper.is-light .el-popper__arrow::before {
    border: 1px solid var(--el-border-color-light) !important;
    background: rgba(0, 163, 206, 0.2) !important;
    right: 0;
  }

  ::v-deep .el-form-item {
    display: flex;
    align-items: center !important;
  }
}

// 事件等级||事件类型 弹框样式
.level_and_type {
  height: 100%;
  overflow: auto;

  .event_list {
    margin-bottom: 10px;
    cursor: pointer;

    .event_title {
      height: 32px;
      background: rgba(0, 163, 206, 0.15);
      box-shadow: inset 4px 0px 0px 0px #00A3CE;

      font-size: 16px;
      font-family: Source Han Sans SC-Regular, Source Han Sans SC;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 32px;
      text-indent: 10px;
      margin-bottom: 10px;
    }

    .event_cont_box {
      display: flex;
      flex-wrap: wrap;

      .event_cont {
        width: 100%;

        &.inline_3 {
          width: calc((100% - 16px) / 3);
          margin-right: 8px;

          &:last-child {
            margin: 0;
          }
        }

        .list {
          display: flex;
          font-size: 16px;
          font-family: Source Han Sans SC-Regular, Source Han Sans SC;
          font-weight: 400;
          color: #FFFFFF;
          line-height: 24px;
          margin-bottom: 8px;

          .label {
            width: 70px;
            margin-right: 20px;
          }
          .value{
            flex: 1;
          }
        }
      }
    }

  }
}
</style>
