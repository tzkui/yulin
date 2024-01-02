import { ElMessage } from 'element-plus';
// import * as XLSX from "xlsx";
// import * as XLSXStyle from "xlsx-style";
export default function Common() {
  // 编辑对象复制
  function objCopyPro(form, info) {
    const NEE_OBJECT_FORM = {
      id: info.id || ''
    };
    Object.keys(form).forEach(key => {
      NEE_OBJECT_FORM[key] = info[key] == null ? '' : info[key]
    })
    return NEE_OBJECT_FORM;
  }
  // 深克隆多层
  function cloneData(data) {
    const type = Object.prototype.toString.call(data)
    if (type === "[object Object]") {
      const newObj = {};
      Object.keys(data).forEach(key => newObj[key] = cloneData(data[key]));
      return newObj;
    } else if (type === "[object Array]") {
      return data.map(item => cloneData(item));
    }
    return data;
  }
  // 时间戳转详细时间
  function dateTime(time) {
    if (!time) return '-';
    let date = new Date(time);
    let year = date.getFullYear();
    let month =
      date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
    let day = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();
    let h = date.getHours() >= 10 ? date.getHours() : "0" + date.getHours();
    let m =
      date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes();
    let s =
      date.getSeconds() >= 10 ? date.getSeconds() : "0" + date.getSeconds();
    return `${year}-${month}-${day} ${h}:${m}:${s}`;
  }
  // 时间戳转详细时间
  function timeInfo(time) {
    if (!time) return '-';
    let date = new Date(time);
    let h = date.getHours() >= 10 ? date.getHours() : "0" + date.getHours();
    let m =
      date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes();
    let s =
      date.getSeconds() >= 10 ? date.getSeconds() : "0" + date.getSeconds();
    return `${h}:${m}:${s}`;
  }
  // 时间戳转日期
  function dateMonth(time) {
    if (!time) return '-';
    let date = new Date(time);
    let year = date.getFullYear();
    let month =
      date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
    let day = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();
    return `${year}年${month}月${day}日`;
  }
  // 时间戳转年
  function dateYear(time) {
    if (!time) return '-';
    let date = new Date(time);
    let year = date.getFullYear();
    return `${year}年`;
  }
  // 弹框
  function showToast(msg, type, time) {
    ElMessage({
      message: msg,
      type: type ? type : 'success',
      duration: time ? time : 1000
    })
  }
  // 阿拉伯数字转成中文
  function toChinesNum(num) {
    let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
    let unit = ['', '十', '百', '千', '万']
    num = parseInt(num)
    let getWan = (temp) => {
      let strArr = temp.toString().split('').reverse()
      let newNum = ''
      let newArr = []
      strArr.forEach((item, index) => {
        newArr.unshift(item === '0' ? changeNum[item] : changeNum[item] + unit[index])
      })
      let numArr = []
      newArr.forEach((m, n) => {
        if (m !== '零') numArr.push(n)
      })
      if (newArr.length > 1) {
        newArr.forEach((m, n) => {
          if (newArr[newArr.length - 1] === '零') {
            if (n <= numArr[numArr.length - 1]) {
              newNum += m
            }
          } else {
            newNum += m
          }
        })
      } else {
        newNum = newArr[0]
      }
      return newNum
    }
    let overWan = Math.floor(num / 10000)
    let noWan = num % 10000
    if (noWan.toString().length < 4) {
      noWan = '0' + noWan
    }
    return overWan ? getWan(overWan) + '万' + getWan(noWan) : getWan(num)
  }
  function getMothList() {
    let mothList = [];
    for (let i = 1; i <= 12; i++) {
      mothList.push({
        label: i + '月',
        value: i
      })
    }
    return mothList
  }
  function getYearList() {
    let thisYear = new Date().getFullYear(), yearList = [];
    for (let i = thisYear; i >= thisYear - 3; i--) {
      yearList.push({
        label: i + '年',
        value: i
      })
    }
    return yearList;
  }
  // 十六进制 转透明度
  function hexToRgba(hex, opacity) {
    let rgbaColor = "";
    let reg = /^#[\da-f]{6}$/i;
    if (reg.test(hex)) {
      rgbaColor = `rgba(${parseInt("0x" + hex.slice(1, 3))},${parseInt(
        "0x" + hex.slice(3, 5)
      )},${parseInt("0x" + hex.slice(5, 7))},${opacity})`;
    }
    return rgbaColor;
  }
  function initTree(data, config = {}) {
    data = cloneData(data)
    var id = config.id || "id"
    var pid = config.pid || "pid"
    var children = config.children || "children"
    var idMap = {}
    var jsonTree = []
    data.forEach(function (v) {
        idMap[v[id]] = v
    })
    data.forEach(function (v) {
        var parent = idMap[v[pid]]
        if (parent) {
            !parent[children] && (parent[children] = [])
            parent[children].push(v)
        } else {
            jsonTree.push(v)
        }
    })
    return jsonTree
  }
  const calcDiff = function(arr1, arr2) {
    const dict = Object.create(null);
    for (const val of arr1) {
      dict[val] = 1;
    }
    for (const val of arr2) {
      if (dict[val] === 1) {
        delete dict[val];
      } else {
        dict[val] = 1;
      }
    }
    return Object.keys(dict);
  };
  return {
    objCopyPro,
    cloneData,
    dateTime,
    dateMonth,
    dateYear,
    showToast,
    toChinesNum,
    timeInfo,
    getMothList,
    getYearList,
    hexToRgba,
    initTree,
    calcDiff,
    // exportModsHandle
  }
}