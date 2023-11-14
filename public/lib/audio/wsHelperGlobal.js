/*
* WebSocket对象接口
* 是否有重新连接IsReConnect设置为true，reConnectTime为重连的间隔，maxRetries为重连次数；
    是否有心跳IsKeepAlive设置true|false, KeepAliveTime为心跳间隔, KeepAliveData心跳包参数
* 初始化：
    wsInterface({
        name: "",
        url:"",
        IsReConnect:true|false,
        reConnectTime:20,
        maxRetries: "",
        onOpen:e => {},
        onMessage:e => {},
        onError:e => {},
        onClose:e => {}
    });
* 方法：返回0成功，返回-1失败
* 发送：wsInterface("Send","msg", "name");
* 关闭：wsInterface("Close", "msg", "name");
* 重连：wsInterface("ReConnect","msg", "name");
* 心跳：wsInterface("KeepAlive","msg", "name");
* 错误：wsInterface("GetError",code, "name");
*/

// 全局通用对象
Window.WebSocketObjs = Window.WebSocketObjs ?? {};

const wsInterface = (() => {
    let wsObject = null; // 连接对象
    let wsOptions = null; // 当前socket的参数
    let wsInterval = null; // 当前心跳定时器
    let wsTimeout = null; // 当前重连定时器
    let wsMaxRetries = null; // 最大重连次数
    let wsGlobalObject = Window.WebSocketObjs; // 连接对象集

    // 方法
    const methods = {
        Send: (param) => {
            function send() {
                wsObject.send(param);
                // console.info(param);
            }
            if (wsObject.readyState === 1) {
                send();
            }
        },
        Close: (param, name) => {
            wsOptions.IsReConnect = false;
            if (wsObject) {
                if (param) {
                    wsInterface('Send', param, name);
                }
                wsObject.close();
                delete Window.WebSocketObjs[name];
            }
        },
        ReConnect: () => {
            let time = wsOptions.reConnectTime || 10; // 默认为10秒
            let maxRetries = wsOptions.maxRetries || 100; // 默认100次
            if (wsMaxRetries < maxRetries) {
                wsTimeout = setTimeout(() => {
                    wsInterface(wsOptions);
                    wsMaxRetries++;
                }, time * 1000);
                return;
            }
            if (wsTimeout) {
                // 清空重连
                clearTimeout(wsTimeout);
                wsTimeout = null;
                wsMaxRetries = 0;
            }
        },
        KeepAlive: () => {
            let time = wsOptions.KeepAliveTime || 20; // 默认为20秒
            if (wsInterval) {
                return;
            }
            if (wsOptions.IsKeepAlive && wsOptions.KeepAliveData) {
                wsInterval = setInterval(() => {
                    // bca-disable-line
                    methods['Send'](wsOptions.KeepAliveData);
                    // bca-disable-line
                }, time * 1000);
            }
        },
        GetError: (code) => {
            let msgStr = null;
            switch (code) {
                case -1:
                    msgStr = '您的浏览器不支持WebSocket';
                    break;
                case 0:
                    msgStr = 'WebSocket连接尚未创建';
                    break;
                case 1:
                    msgStr = 'WebSocket连接已经建立';
                    break;
                case 2:
                    msgStr = 'WebSocket连接正在关闭';
                    break;
                case 3:
                    msgStr = 'WebSocket连接已经关闭或不可用';
                    break;
                case 4:
                    msgStr = '指定方法未定义';
                    break;
                case 5:
                    msgStr = '初始化WebSocket未定义url';
                    break;
                case 6:
                    msgStr = 'WebSocket连接未指定名称';
                    break;
            }
            return msgStr;
        }
    };

    return (options, param, name) => {
        if (options === 'GetError') {
            // bca-disable-line
            return methods['GetError'](param);
            // bca-disable-line
        }
        if (!window.WebSocket) {
            return -1;
        }
        if (typeof options === 'string') {
            // 方法
            if (!name || typeof name !== 'string') {
                return 6;
            }
            wsObject = wsGlobalObject[name];
            if (!wsObject) {
                return 0;
            }
            if (!methods[options]) {
                return 4;
            }
            wsOptions = wsGlobalObject[name].options;
            methods[options](param, name);
            return wsObject.readyState;
        } else {
            // 属性或事件
            if (!wsObject && !options.url && !options.name) {
                return 5;
            }
            if (
                !wsGlobalObject[options.name]
                || wsGlobalObject[options.name]?.url !== options.url
                || wsGlobalObject[options.name].readyState !== 1
            ) {
                wsOptions = options;
                wsObject = new WebSocket(options.url);
                wsObject.onopen = (e) => {
                    if (options.onOpen) {
                        options.onOpen(e);
                    }
                };
                wsObject.onmessage = (e) => {
                    if (wsTimeout) {
                        // 清空重连
                        clearTimeout(wsTimeout);
                        wsTimeout = null;
                    }
                    if (options.onMessage) {
                        options.onMessage(e);
                    }
                };
                wsObject.onerror = (e) => {
                    if (options.onError) {
                        options.onError(e);
                    }
                };
                wsObject.onclose = (e) => {
                    if (options.onClose) {
                        options.onClose(e);
                    }
                    // 清空心跳
                    clearInterval(wsInterval);
                    wsInterval = null;
                    // 是否重连，如果是手动断开，请调用wsInterface("Close")
                    if (wsOptions.IsReConnect) {
                        wsInterface('ReConnect', {}, options.name);
                    }
                };
                wsObject.options = wsOptions;
                Window.WebSocketObjs[options.name] = wsObject;
            } else {
                wsObject = wsGlobalObject[options.name];
            }
        }
        return wsObject.readyState;
    };
})();
