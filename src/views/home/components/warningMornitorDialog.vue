<script setup>
import { inject } from "vue";
import firDialog from "./firDialog.vue";

const $mitt = inject("$mitt");
const props = defineProps({
    detail: {
        type: Object,
        default() {
            return {};
        },
    },
});

const emits = defineEmits(["closeDialog"]);
const closeDialog = function () {
    emits("closeDialog", "WarningMornitor");
};
const setMarker = function (info) {
    // console.log('info==========>', info);
    $mitt.emit("addMarker", info);
    $mitt.emit("openPopup", info);
    $mitt.emit('flyTo', info)
};
</script>
<template>
    <firDialog :name='detail.name' @closeDialog="closeDialog">
        <div class="firDialog_main" :class="detail.type">
            <div class="btns" v-if="detail.type == 'yqjc'">
                <div class="btn btn1">站点雨量排名</div>
                <div class="btn btn2">乡镇雨量排名</div>
                <select>
                    <option value="1">1小时</option>
                    <option value="2">2小时</option>
                </select>
            </div>
            <!-- 河道 -->
            <ul class="card_list" v-if="detail.type == 'hdjc'">
                <li class="card" v-for="item in detail.data" :key="item.id" @click="setMarker(item.markerInfo)">
                    <div class="name">{{ item.name }}</div>
                    <div class="address">站址：{{ item.address }}</div>
                </li>
            </ul>
            <!-- 水库 -->
            <div v-else-if="detail.type == 'skjc'" class="list_content">
                <div class="list_header">
                    <div class="line1">名称</div>
                    <div class="line2">当前水位</div>
                    <div class="line3">警戒水位</div>
                    <div class="line4">保证水位</div>
                </div>
                <ul class="list">
                    <li class="list_item" v-for="item in detail.data" :key="item.id" @click="setMarker(item.markerInfo)">
                        <div class="line1">{{ item.name }}</div>
                        <div class="line2">{{ item.num1 }}</div>
                        <div class="line3">{{ item.num2 }}</div>
                        <div class="line4">{{ item.num3 }}</div>
                    </li>
                </ul>
            </div>
            <!-- 其他 -->
            <div v-else class="yl_list_box">
                <div class="yl_list_header">
                    <div :class="'line' + (index + 1)" v-for="(item, index) in detail.column" :key="index">{{ item.label }}
                    </div>
                </div>
                <ul class="yl_list">
                    <li class="yl_list_item" v-for="(item, index) in detail.data" :key="item.id"
                        @click="setMarker(item.markerInfo)">
                        <div class="line1">{{ index + 1 }}</div>
                        <div class="line2">{{ item.name }}</div>
                        <div class="line3 red" v-if="item.num > 120">{{ item.num }}</div>
                        <div class="line3 yellow" v-else-if="item.num > 70">
                            {{ item.num }}
                        </div>
                        <div class="line3 blue" v-else-if="item.num > 40">
                            {{ item.num }}
                        </div>
                        <div class="line3 green" v-else>{{ item.num }}</div>
                    </li>
                </ul>
            </div>
        </div>
    </firDialog>
</template>

<style lang="scss" scoped>
.btns {
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;

    .btn {
        width: 115px;
        height: 36px;
        border-radius: 4px;
        text-align: center;
        line-height: 36px;

        &1 {
            background-color: #038cfa;
            cursor: pointer;
        }

        &2 {
            background: linear-gradient(90deg, #0698d7 0%, #1e89fd 100%);
            color: #d0deee;
            cursor: pointer;
        }
    }

    select {
        width: 77px;
        height: 36px;
        background: #006688;
        border-radius: 4px;
        font-size: 16px;
        font-family: Alibaba PuHuiTi-Regular, Alibaba PuHuiTi;
        font-weight: 400;
        color: #ffffff;
    }
}

.yqjc,
.dzjc,
.aqscjc,
.lhjc {
    .yl_list_box {
        text-align: center;
        font-size: 16px;
        font-family: Source Han Sans SC-Regular, Source Han Sans SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 19px;

        .yl_list_header {
            display: flex;
            margin-bottom: 8px;
            text-align: center;

            .line1 {
                margin-left: 10px;
                width: 40px;
            }

            .line2 {
                flex: 1;
            }

            .line3 {
                margin-right: 10px;
                width: 50px;
            }
        }

        .yl_list {
            max-height: 290px;

            &::-webkit-scrollbar {
                display: none;
            }

            &_item {
                display: flex;
                margin-top: 8px;
                cursor: pointer;

                .line1 {
                    width: 40px;
                    margin-left: 10px;
                }

                .line2 {
                    flex: 1;
                }

                .line3 {
                    width: 50px;
                    margin-right: 10px;
                }
            }
        }
    }
}

.card_list {
    .card {
        height: 60px;
        background: #305077;
        border-radius: 4px;
        margin-top: 10px;
        font-size: 16px;
        font-family: Source Han Sans SC-Regular, Source Han Sans SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 20px;
        padding-left: 16px;
        padding-top: 4px;
        cursor: pointer;

        .name {
            margin-bottom: 8px;
        }
    }
}

.list_content {
    border: 1px solid rgba(6, 152, 215, 0.5);
    font-size: 16px;
    font-family: Source Han Sans SC-Regular, Source Han Sans SC;
    font-weight: 400;
    color: #ffffff;
    padding-bottom: 4px;
    text-align: center;
    line-height: 24px;

    .list_header {
        display: flex;
        text-align: center;
        margin-top: 12px;
        margin-bottom: 8px;
    }

    .list {
        &_item {
            margin-top: 8px;
            display: flex;
            margin-top: 8px;
            text-align: center;
            cursor: pointer;

            .sort {
                width: 32px;
                font-family: Source Han Sans SC-Regular, Source Han Sans SC;
                font-weight: 400;
                color: #ffdf53;
            }
        }
    }

    .line1 {
        margin-left: 10px;
        min-width: 160px;
        text-align: center;
    }

    .line2,
    .line3,
    .line4 {
        width: 80px;
        text-align: center;
    }
}

.dzjc,
.aqscjc,
.lhjc {
    .yl_list_item .line1 {
        width: 32px;
        font-family: Source Han Sans SC-Regular, Source Han Sans SC;
        font-weight: 400;
        color: #ffdf53;
    }
}
</style>
