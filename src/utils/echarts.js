export default function EchartsHandle() {
    // 单图形高亮
    function tipRun(event, list, time = 5000) {
        const length = list.length;
        let count = 0, timer = null;
        const handle = () => {
            if (count >= length) {
                count = 0
            }
            event.dispatchAction({
                type: "highlight",
                dataIndex: count,
                seriesIndex: 0,
            })
            event.dispatchAction({
                type: "showTip",
                dataIndex: count,
                seriesIndex: 0,
            })
            count++;
        }
        handle()
        timer = setInterval(handle, time)
        event.on('mouseover', () => {
            console.log(1)
            clearInterval(timer)
        })
        event.on('mouseout', e => {
            count = e.dataIndex + 1;
            timer = setInterval(handle, time)
        })
    }
    // 圆环高亮
    function tipRunPei(event, list, time = 3000) {
        const length = list.length;
        let count = 0, timer = null;
        const handle = () => {
            event.dispatchAction({
                type: "downplay",
                seriesIndex: 0,
                dataIndex: count - 1
            });
            if (count >= length) {
                count = 0
            }
            event.dispatchAction({
                type: "highlight",
                dataIndex: count,
                seriesIndex: 0,
            })
            event.dispatchAction({
                type: "showTip",
                dataIndex: count,
                seriesIndex: 0,
            })
            count++;
        }
        handle()
        timer = setInterval(handle, time)
        event.on('mouseover', () => {
            event.dispatchAction({
                type: "downplay",
                seriesIndex: 0,
                dataIndex: count - 1
            });
            clearInterval(timer)
        })
        event.on('mouseout', e => {
            count = e.dataIndex + 1
            timer = setInterval(handle, time)
        })
    }
    return {
        tipRunPei,
        tipRun,
    }
}
