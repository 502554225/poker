<template>
    <div class="groove" :style="{'width':width,'height':height}"> 
        <img class="icon" :src="info.src" background-size="cover">
        <div class="font">{{info.font}}</div>
        <div class="font">{{info.num}}</div>
        <img class="icon" src="" alt="">
    </div>
</template>
<script>
export default {
    props:{
        width:{
            type:String,
            default:'100%'
        },
        height:{
            type:String,
            default:'100%'
        },
        info:{
            type:Object,
            default:{
                font:'xxx',
                src:'../../../static/img/back-face-pattern.png',
                num:0
            }
        }
    }
}
</script>
<style>
    .groove{
        display: flex;
        justify-content: space-around;
        box-sizing: border-box;
        border: 2rpx solid #000;
        border-radius: 10rpx;
        z-index: 1;
    }
    .icon{
        margin-left: 5rpx;
        height: 45rpx;
        width: 45rpx;
    }
    .font{
        line-height: 45rpx;
        height: 50rpx;
        font-size: 16px;
    }
</style>
