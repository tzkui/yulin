<!-- 2d地图编辑面板 -->
<template>
  <div class="editPlan" :class="show?'showEdit':''">
    <h3>编辑面板 {{editType}} <span class="closeSpan" @click="closeIconClick"></span></h3>
    <div class="editLabel" v-if="editType == 'label'">
        <div class="flex">
            <el-text  class="mx-1 mr10" type="info">文字内容</el-text> 
            <el-input style="width: 200px;" v-model="text" placeholder="请输入文字" />
        </div>
        <div class="mt10">
            <el-text class="mx-1 mr10" type="info">字体大小</el-text>
            <el-input-number :min="12" :max="30" v-model="font_size" :step="1" />
        </div>
        <div class="mt10">
            <el-text class="mx-1 mr10" type="info">文字颜色</el-text>
            <el-color-picker v-model="color" show-alpha />
        </div>
        <div class="mt10">
            <el-text class="mx-1 mr10" type="info">是否加粗</el-text>
            <el-switch
                v-model="font_weight"
                inline-prompt
                active-text="是"
                inactive-text="否"
            />
        </div>
    </div>
    <div class="editMarker" v-if="editType == 'marker'">
        <div class="flex">
            <el-text  class="mx-1 mr10" type="info">类型</el-text> 
            <el-select v-model="markeType" @change="typeChange" class="m-2" placeholder="请选择类型" size="large">
                <el-option
                v-for="item in typeOps"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                />
            </el-select>
        </div>
        <div class="flex">
            <el-text  class="mx-1 mr10" type="info">图片</el-text> 
            <el-select v-model="markerIcon"  @change="iconChange" class="m-2" placeholder="请选择图片" size="large">
            <el-option
                v-for="item in iconOps"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                >
                <div class="flex" >
                    <img style="width: 20px;height: auto;" :src="item.icon"/>
                    <span>{{ item.label }}</span>
                </div>
               
            </el-option>
            </el-select>
        </div>
        <div class="flex mt10">
            <el-text  class="mx-1 mr10" type="info">宽度</el-text> 
            <el-input-number
                v-model="width"
                :min="30"
                :max="60"
                controls-position="right"
                class="mx-4"
            />
            <el-text  class="mx-1 mr10" type="info">高度</el-text> 
            <el-input-number
                v-model="height"
                :min="30"
                :max="100"
                controls-position="right"
                class="mx-4"
            />
        </div>
    </div>
    <div class="editLine" v-if="editType == 'polyline' ||editType == 'brushLine' ">
        <div class="mt10">
            <el-text class="mx-1 mr10" type="info">线颜色</el-text>
            <el-color-picker v-model="lineColor" show-alpha />
        </div>
        <div class="mt10">
            <el-text class="mx-1 mr10" type="info">线宽度</el-text>
            <el-input-number :min="1" :max="10" v-model="lineWidth" :step="1" />
            <!-- <el-color-picker v-model="lineWidth" show-alpha /> -->
        </div>
    </div>
    <div v-else class="editPolygon">
        <div class="mt10">
            <el-text class="mx-1 mr10" type="info">线颜色</el-text>
            <el-color-picker v-model="polygonColor" show-alpha />
        </div>
        <div class="mt10">
            <el-text class="mx-1 mr10" type="info">线宽度</el-text>
            <el-input-number :min="1" :max="10" v-model="polygonWidth" :step="1" />
            <!-- <el-color-picker v-model="lineWidth" show-alpha /> -->
        </div>
        <div class="mt10">
            <el-text class="mx-1 mr10" type="info">覆盖颜色</el-text>
            <el-color-picker v-model="polygonFill" show-alpha />
        </div>
        <div class="mt10">
            <el-text class="mx-1 mr10" type="info">透明度</el-text>
            <el-input-number :min="0" :max="1" v-model="polygonOpa" :step="0.1" />
            <!-- <el-color-picker v-model="lineWidth" show-alpha /> -->
        </div>
    </div>
    <div class="editPlanBtns">
        <el-button @click="view">预览</el-button>
        <el-button type="primary" @click="editOk">确定</el-button>
        <el-button type="info" @click="editClose">清除</el-button>
    </div>
  </div>
</template>

<script setup>
import {
    ref,
    onMounted,
    onUnmounted,
    inject,
    defineExpose,
    defineProps,
    defineEmits
    } from 'vue';
    import {
        assetsUrl
    }from '../hook/index';
    // let props = defineProps({
    //     style:{
    //         type:Object,
    //         default:{}
    //     }
    // })
    let emit = defineEmits()
    let text = ref('');
    let font_size = ref(13);
    let font_weight = ref(false)
    let color =ref('#000');
    let editType = ref('')
    const show = ref(false);
    const markeType= ref('');
    const markerIcon= ref('')
    const width= ref(30)
    const height = ref(40);
    const lineColor = ref('')
    const lineWidth = ref(1)

    const polygonColor=ref('')
    const polygonWidth=ref(3)
    const polygonFill=ref('')
    const polygonOpa=ref(1)
    let id = '';
    let backData={};
    let typeOps=[{
        value:"wz",
        label:"物资标记"
    },{
        value:"yj",
        label:"应急标记" 
    }];
    let iconOps=[{
        value:"yj",
        label:"应急标记" ,
        icon:assetsUrl('/images/marker/m2.png')
    },{
        value:"wz",
        label:"物资标记" ,
        icon:assetsUrl('/images/marker/m4.png') 
    }];
    onMounted(()=>{
       
    });
    const setStyle = (type,style,gId)=>{
        console.log('setStyle--->',type,style)
        editType.value = type
        id = gId
        backData={};
        if(type == 'label'){
            text.value = style.text;
            font_size.value = style.font_size
            color.value = style.color;
            font_weight.value = style.font_weight =='bold';
           
            backData = {text,font_size,color,font_weight,editType}
        }else if(type == 'marker'){
            // let icon = style.image;
            width.value = style.width;
            height.value = style.height;
            backData = {width,height,editType}
        }else if(type == 'polyline' || type == 'brushLine'){
            lineColor.value = style.color;
            lineWidth.value = style.width;
            backData = {lineColor,lineWidth,editType}
        }else{
            polygonColor.value=style.outlineColor
            polygonWidth.value=style.outlineWidth
            polygonFill.value=style.fillColor
            polygonOpa.value=style.fillOpacity;
            backData = {polygonColor,polygonWidth,polygonFill,polygonOpa,editType}
        }
        
        if(show.value){
            show.value =false; 
            setTimeout(()=>{
                show.value =true
            },800)
        }else{
            show.value =true; 
        }
        
        
    }
    const view=()=>{
        emit('viewClick',backData)
    }
    const editOk=()=>{
        emit('eidtOk',backData)
    }
    const editClose=()=>{
        console.log(id)
        emit('eidtClose',{id:id})
        show.value = false
    }
    const iconChange=()=>{
        let item = iconOps.find((itx)=>{
            return itx.value == markerIcon.value
        });
        backData.icon= item.icon;
    }
    const closeIconClick=()=>{
        show.value = false
    }
    defineExpose({
        setStyle
    })

</script>

<style lang="scss" scoped>
.editPlan{
    width: 300px;
    position: absolute;
    top: 0px;
    right: -310px;
    z-index: 10;
    border: 1px #999 solid;
    border-radius: 2px;
    background-color: rgba(255,255,255,0.7);
    box-sizing: border-box;
    padding: 10px;
    font-size: 14px;
    letter-spacing: 1px;
    color: #000;
    transition: all .4s linear;
    h3{
        margin-bottom: 20px;
        font-size: 18px;
        position: relative;
        .closeSpan{
            position: absolute;
            right: 0px;
            top: 0px;
            width: 20px;
            height: 20px;
            // background-image: url('../../../assets/images/marker/close.png');
            background-size: 100% 100%;
        }
        // margin-top: 10px;
    }
    .flex{
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }
    .mt10{
        margin-top: 10px;
    }
    .mr10{
        margin-right: 10px;
    }
    .ml10{
        margin-left: 5px;
    }
    .editLabel{
        v-deep .el-text.el-text--info{
            margin-right: 10px;
        }
    }
    .editPlanBtns{
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }
}
.showEdit{
    right: 0px;
}

</style>