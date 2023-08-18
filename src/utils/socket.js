
// socket类
// 基础路径
const wsURL = import.meta.env.VITE_BASE_WS //'ws://192.168.1.50:1002'
import store from '../store/index';



let num = 0, maxnum = 10;
class CustomSocket {
  instance = null;
  wsURL = '';
  constructor(wsUrl) {
    this.wsURL = wsUrl ? wsUrl : wsURL;
    this.state = {};
    this.timeOut = null;
    this.keepTime = 5000;
    this.createInstance();
  }


  createInstance () {
    if (this.instance) return
    if (this.wsURL) {
      this.instance = new WebSocket(this.wsURL)
      this.init()
    } else {
      throw new Error('前端提示:WebSocket缺少baseURL!')
    }
  }
  init () {
    this.open()
    this.message()
    this.error()
    this.close()
    this.disconnect()
  }
  // WebSocket.onopen 用于指定连接成功后的回调函数。
  open () {
    this.instance.onopen = (event) => {
      //0 - 表示连接尚未建立，1 - 表示连接已建立，可以进行通信，2 - 表示连接正在进行关闭，3 - 表示连接已经关闭或者连接不能打开
      let stateCode = this.checkReadyState()
      switch (Number(stateCode)) {
        case 1:
          this.login()
          break
        case 2:
          console.log("连接正在关闭")
          break
        case 3:
          let url = window.location.href;
          if (url.indexOf('login') == -1) {
            num = num + 1
            if (num >= maxnum) {
              console.log('大于最大连接次数,停止连接,返回首页')
              window.location.href = '/'
            } else {
              console.log("继续连接")
              //this.init()
            }
          }
          break
      }
    }
  }
  //socket连接断开
  disconnect () {
    this.instance.disconnect = (event) => {
      console.log('disconnect', event);
    }
  }
  // 用于指定收到服务器数据后的回调函数。
  message () {
    this.instance.onmessage = (event) => {
      console.log('onmessage');
      if (this.checkReadyState() === 1) {
        this.handleMessage(event)
      }
    }
  }
  // 用于指定报错时的回调函数。
  error () {
    this.instance.onerror = (event) => {
      console.log('onerror', event);
    }
  }
  // 用于指定连接关闭后的回调函数。
  close () {
    this.instance.onclose = (event) => {
      console.log('onclose', event);
    }
  }
  // 发送数据
  send (data) {
    console.log("发生data", data)
    let that = this
    let sipConfig = JSON.parse(localStorage.getItem('sipConfig'));
    let gh = sipConfig.gh;//sipConfig.account
    let fj = sipConfig.fj//sipConfig.account;
    if (!data.Action) {
      console.log('socket未传关键action请查看')
      return
    }
    return new Promise((resolve, reject) => {
      let defObj = { PlatFormCode: "Default", GongHao: gh, FenJi: fj, Params: '', Message: "" };
      let sendObj = Object.assign(defObj, data)
      if (sendObj.Action != 'keeplive') {
        console.log('sendData-->', sendObj)
      }
      that.instance.send(JSON.stringify(sendObj))
      setTimeout(function () {
        resolve();
      }, 100)

    })
    // this.instance.send(data)
  }
  // 获取通讯状态 - 状态说明
  checkReadyState () {
    // CONNECTING：值为0，表示正在连接。 OPEN：值为1，表示连接成功，可以通信了。 CLOSING：值为2，表示连接正在关闭。 CLOSED：值为3，表示连接已经关闭，或者打开连接失败。
    return Number(this.instance.readyState)
  }
  // 登录
  async login () {
    // if(!localStorage.getItem('sipConfig')){
    //     console.log("无法获取配置")
    //     return
    // }
    // let sipConfig = JSON.parse(localStorage.getItem('sipConfig'))
    // 公号===分机号
    let data = { Action: "Login" }
    await this.send(data)

    //设置组别权限
    let roleData = { Action: "SetGroupRole", Params: "座席1组" }
    await this.send(roleData)

  }
  //保持心跳
  keeplive (data) {
    let that = this;
    clearTimeout(that.timeOut)
    that.timeOut = setTimeout(() => {
      that.send(data);

    }, that.keepTime)
  }
  handleMessage (event) {
    console.log("收到信息返回", event)
    let that = this
    let data = event.data
    const functionWrapper = new Function(data)
    // console.log('handleMessage--->', data, typeof data)
    const fName = data.split('(')[0];
    window[fName] = (data) => {
      if (fName != 'Back_keeplive') {
        // console.log(fName+'--->',data);
        that.state.lastState = {};
        that.state.lastState[fName] = data;
        // that.state[fName] = data;
      }
      that.state[fName] = data;
      store.commit('socketStore/setSocket', {
        key: fName,
        val: JSON.stringify(data)
      })
      if (fName == 'Back_Login') {
        that.send({ Action: "keeplive" })
      } else if (fName == 'Back_keeplive') {
        that.keeplive({ Action: "keeplive" })
      }
    }
    functionWrapper();
  }
  closeSocet () {
    this.instance.close();
  }
  getSocketState () {
    let that = this;
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        resolve(that.state);
      }, 1000)
    })
  }
}

export default new CustomSocket();