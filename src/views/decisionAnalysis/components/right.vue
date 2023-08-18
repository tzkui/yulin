<template>
    <div class="right">
        <!-- 灾情分析 / 重点防护目标 -->
        <ViewBox title="灾情分析">
            <div class="resources">
                <div class="effect_radius">
                    影响半径<span class="blue">{{ radius.effect_radius }}米</span>
                    <el-slider v-model="radius.effect_radius" :max="1000"
                        @input="$event => { changeRaduis('effect_radius', $event) }" :show-tooltip="false"></el-slider>
                    <!-- 受灾内容 -->
                    <div class="effect_cont_lists">
                        <div class="effect_cont_list" v-for="(item, index) in effect_cont" :key="index">
                            <div class="cont_num">
                                <span class="num">{{ item.num }}</span>{{ item.unit }}
                            </div>
                            <div class="cont_type">
                                {{ item.type }}
                            </div>
                        </div>
                    </div>
                    <!-- 可多选box -->
                    <div class="checkboxs">
                        <div v-for="(item, index) in disaster_check_data" :key="index"
                            :class="{ 'check_item': true, 'active': disaster_checked_data.includes(item) }"
                            @click="onCheck('effect', item)">{{ item.name }}
                        </div>
                    </div>
                    <!-- 列表 -->
                    <div class="cont_lists">
                        <div class="cont_list" v-for="(item, index) in disaster_resources_list" :key="index"
                            @click="addMarker('zqzyfx', item)">
                            <div class="label">{{ item.name }}</div>
                            <div class="value_1">
                                {{ item.distance }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ViewBox>
        <ViewBox title="应用保障分析">
            <div class="application_object">
                <div class="analysis_radius">
                    分析半径<span class="blue">{{ radius.analysis_radius }}米</span>
                    <el-slider @input="$event => { changeRaduis('analysis_radius', $event) }"
                        v-model="radius.analysis_radius" :max="1000" :show-tooltip="false"></el-slider>
                    <!-- 可多选box -->
                    <div class="checkboxs">
                        <div v-for="(item, index) in analysis_check_data" :key="index"
                            :class="{ 'check_item': true, 'active': analysis_checked_data.includes(item) }"
                            @click="onCheck('analysis', item)">{{ item.name }}
                        </div>
                    </div>
                    <!-- 列表 -->
                    <div class="cont_lists">
                        <div class="cont_list" v-for="(item, index) in application_object_list" :key="index"
                            @click="addMarker('yydxtj', item)">
                            <div class="label">{{ item.name }}</div>
                            <div class="value_1">
                                {{ item.num }}
                            </div>
                            <div class="value_2">
                                {{ item.distance }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ViewBox>
    </div>
</template>

<script setup>
import { ref, onMounted, inject, nextTick } from 'vue';
const $mitt = inject('$mitt')
const emit = defineEmits(["changeRadius"]);
import { getZdfhmb, getYybzfx, getZdfhmbType, getYybzfxType } from '@/api/decision_analysis.js'
import { icon_config } from '../config'

import ViewBox from "@/components/common/view-box.vue";
const props = defineProps({
    radius: {
        type: Object,
        default: {
            effect_radius: 200,
            analysis_radius: 200,
        }
    },
    centerPoint: {
        type: Array,
        default: []
    },
});
/**
 * 灾情资源分析 数据
 */
// 灾情影响 统计内容
const effect_cont = ref([
    {
        num: 0,
        unit: '㎡',
        type: '影响面积'
    },
    {
        num: 0,
        unit: '个',
        type: '防护目标'
    },
])
// 灾情资源 场所选择tab
const disaster_check_data = ref([
    { name: '学校' },
    { name: '医院' },
    { name: '公共文化场所' },
    { name: '旅游景区' },
    { name: '企业' },
    { name: '体育馆' },
    { name: '超市' },
    { name: '露天矿山' },
])
// 灾情资源 场所选择tab  已选择内容
const disaster_checked_data = ref([])
// 灾情资源 列表
const disaster_resources_All = ref({
    '学校': [
        { markerType: 'xx', id: 'xx_1', name: '希望小学', distance: '距2314m', lng: '110.97928', lat: "39.44162", },
        { markerType: 'xx', id: 'xx_2', name: '第七中学', distance: '距369km', lng: '110.74074', lat: "39.01995", },
    ],
})
const disaster_resources_list = ref([])

/**
 * 应用对象统计 数据
 */
// 应用统计 选择tab
const analysis_check_data = ref([
    { name: '重点物资' },
    { name: '物资仓库' },
    { name: '救援队伍' },
    { name: '避难场所' },
    { name: '大型机械' },
    { name: '应急广播' },
    { name: '视频监控' },
])
// 应用统计 选择tab  已选择内容
const analysis_checked_data = ref([])
//  应用对象 列表
const application_object_All = ref({
    '重点物资': [
        { markerType: 'zdwz', id: 'zdwz_1', name: '物资一', num: '115人', distance: '距2314m', lng: '109.70081', lat: "38.28285", },
        { markerType: 'zdwz', id: 'zdwz_2', name: '物资二', num: '125人', distance: '距369km', lng: '109.78777', lat: "38.29434", },
        { markerType: 'zdwz', id: 'zdwz_3', name: '物资三', num: '25人', distance: '距379km', },
        { markerType: 'zdwz', id: 'zdwz_4', name: '物资四', num: '155人', distance: '距369km', },
        { markerType: 'zdwz', id: 'zdwz_5', name: '物资五', num: '65人', distance: '距569km', },
        { markerType: 'zdwz', id: 'zdwz_6', name: '物资六', num: '85人', distance: '距969km', },
    ],
})
const application_object_list = ref([])
onMounted(() => {
    // checkPlace('学校')
    // checkAnalysis('重点物资')
    initType()
})
// 滑块改变
const changeRaduis = (type, val) => {
    emit('changeRadius', type, val)
}
// 撒点func
const addMarker = (type, item) => {
    // console.log(type,item);
    // 先清除 再撒点
    // $mitt.emit('clearAll', { ignore: ['geo绘制图层'] })

    // 差不多在范围内随机生成点位
    let lng = (props.centerPoint[0] + '').replace(/^(.{6})(.{1})(.*)$/, '$1' + Math.floor(Math.random() * 10) + '$3')
    let lat = (props.centerPoint[1] + '').replace(/^(.{6})(.{1})(.*)$/, '$1' + Math.floor(Math.random() * 10) + '$3')

    let markerData = {
        markerType: item.markerType,
        id: item.id,
        lng: lng,
        lat: lat,
        // lng: item.lng,
        // lat: item.lat,
        name: item.name,
        icon: icon_config[item.markerType].icon,
        label: { text: item.name, font_size: 16 },
        dialogType: type,
        details: {}
    }

    if (type == 'zqzyfx') {
        markerData.details = {
            name: item.name,
            distance: item.distance,
        }
    } else if (type == 'yydxtj') {
        markerData.details = {
            name: item.name,
            num: item.num,
            distance: item.distance,
        }
    }
    // console.log(markerData);
    $mitt.emit('addMarker', markerData)
    $mitt.emit('openPopup', markerData)
    $mitt.emit("flyTo", markerData);

}

let objConfig = {
    '学校': 'xx',
    '医院': 'yy',
    '公共文化场所': 'ggwhcs',
    '旅游景区': 'lyjq',
    '企业': 'qy',
    '体育馆': 'tyg',
    '超市': 'cs',
    '露天矿山': 'ltks',
    '重点物资': 'zdwz',
    '物资仓库': 'wzck',
    '救援队伍': 'jydw',
    '避难场所': 'bncs',
    '大型机械': 'dxjx',
    '应急广播': 'yjgb',
    '视频监控': 'spjk',
};
const initType = async () => {
    let effect = await getZdfhmbType()
    disaster_check_data.value = Array.isArray(effect.data) ? effect.data : [effect.data]
    let analysis = await getYybzfxType()
    analysis_check_data.value = Array.isArray(analysis.data) ? analysis.data : [analysis.data]
}
/*
 * 资源分析
*/
const onCheck = async (type, item) => {
    let currentData, currentList, radius, funcName;

    if (type == 'effect') {
        currentData = disaster_checked_data.value
        currentList = disaster_resources_list.value
        radius = props.radius.effect_radius
        funcName = getZdfhmb
    } else if (type == 'analysis') {
        currentData = analysis_checked_data.value
        currentList = application_object_list.value
        radius = props.radius.analysis_radius
        funcName = getYybzfx
    }

    let index = currentData.indexOf(item);

    // 判断 无则加，有则减
    if (index == -1) {
        currentData.push(item)
    } else {
        currentData.splice(index, 1);
        // nextTick(() => {
        //     $mitt.emit('changeMarkerState', { markerType: objConfig[item], show: false })
        // })
    }
    // console.log('已选择场所=======>', currentData);
    let ids = currentData.map(item => {
        return item.value
    })
    let params = {
        map_x: props.centerPoint[0],
        map_y: props.centerPoint[1],
        radius: radius,
        typeIds: ids,
    }

    let res = await funcName(params)
    console.log('获取列表=====》', res);
    for (const key in res.data) {
        
    }

    // currentList

    // let arr = []
    // currentData.map(item => {
    //     arr.push(...disaster_resources_All.value[item])
    //     return
    // })
    // disaster_resources_list.value = arr
}
/*
 * 应用对象统计
 */
const checkAnalysis = (name) => {
    let index = analysis_checked_data.value.indexOf(name);
    if (index == -1) {
        analysis_checked_data.value.push(name)
    } else {
        analysis_checked_data.value.splice(index, 1);
        nextTick(() => {
            $mitt.emit('changeMarkerState', { markerType: objConfig[name], show: false })
        })
    }
    console.log('已选择分析对象=======>', analysis_checked_data.value);
    let arr = []
    analysis_checked_data.value.map(item => {
        arr.push(...application_object_All.value[item])
        return
    })
    application_object_list.value = arr
}

</script>

<style scoped lang="less">
.right {
    .resources {
        height: 470px;

        .effect_cont_lists {
            display: flex;
            justify-content: space-around;
            margin-top: 10px;

            .effect_cont_list {
                height: 95px;
                flex: 1;
                margin-right: 10px;
                background: url('@/assets/decisionAnalysis/effect_box_bg.png') center/100% 100% no-repeat;
                text-align: center;

                &:last-child {
                    margin: 0;
                }

                .cont_num {
                    line-height: 60px;
                    color: #ccc;

                    .num {
                        font-size: 22px;
                        font-weight: bold;
                        margin-right: 5px;
                        -webkit-text-fill-color: transparent;
                        background-image: -webkit-linear-gradient(left, #e6964f, #d16537 80%);
                        background-clip: text;
                        -webkit-background-clip: text;
                    }
                }

                .cont_type {
                    line-height: 26px;
                    font-size: 14px;
                    color: #ccc;
                    letter-spacing: 1px;
                }

            }
        }

        .effect_radius {
            .cont_lists {
                height: 190px;

                .cont_list {
                    .label {
                        width: 80%;
                    }
                }
            }
        }
    }

    .application_object {
        height: 345px;

        .analysis_radius {
            .cont_lists {
                height: 170px;

                .cont_list {
                    .label {
                        width: 50%;
                    }

                    .value_1 {
                        width: 30%;
                    }

                    .value_2 {
                        width: 20%;
                    }
                }
            }
        }
    }

    // 相同样式
    .resources,
    .application_object {

        .effect_radius,
        .analysis_radius {
            margin-top: 10px;
            font-size: 15px;

            .blue {
                margin-left: 8px;
                color: #59d4d1;
                font-weight: bold;
            }

            .cont_lists {
                overflow: auto;

                // margin-top: 8px;
                .cont_list {
                    display: flex;
                    line-height: 38px;
                    margin: 4px 0;
                    padding: 0 10px;
                    position: relative;

                    &:nth-child(even) {
                        background: #081c25;
                    }

                    &:hover {
                        background: #092a33;

                        &::before {
                            position: absolute;
                            content: '';
                            height: 16px;
                            width: 2px;
                            left: 0;
                            top: 10px;
                            background: #56cecc;
                        }
                    }

                    .label {
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                }
            }
        }

        :deep(.el-slider) {
            margin-top: 5px;

            .el-slider__runway {
                background-color: #062F41;
                border: 1px solid #1B4257;
            }

            .el-slider__bar {
                background: linear-gradient(90deg, #1A678B 0%, #1B9DBF 100%);
            }

            .el-slider__button {
                background: radial-gradient(circle, #A9EEFA, #4EB3CD);
                box-shadow: 0 0 12px 5px #1393bf;
                border: none;
                height: 10px;
                width: 10px;

                &:hover {
                    transform: scale(1.01);
                }
            }
        }

        .checkboxs {
            margin-top: 20px;
            display: flex;
            flex-wrap: wrap;

            .check_item {
                height: 45px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                width: calc((100% - 15px) / 4);
                font-size: 14px;
                background: url('@/assets/decisionAnalysis/tab.png') center/99% 100% no-repeat;
                margin-bottom: 8px;
                margin-right: 5px;

                &:nth-child(4n) {
                    margin: 0;
                }

                &.active {
                    background: url('@/assets/decisionAnalysis/tab_active.png') center/99% 100% no-repeat;
                }
            }
        }
    }
}
</style>