<template>
    <div class="groove" :style="{'width':width,'height':height}"> 
        <div class="width"></div>
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
        }
    }
}
</script>
<style>
    .groove{
        box-sizing: border-box;
        border: 2rpx solid #000;
        border-radius: 10rpx;
        z-index: 1;
    }
    .width{
        width: 100%;
        height: 100%;
        background: #b9b121;
        z-index: -1;
    }
</style>
