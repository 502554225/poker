<template >
    <div class="popup">
        <div class="popup-title">{{title}} </div>
        <div class="popup-body">
            <h4>{{word}}</h4>
            <button @click="confirm">确定</button>
        </div>
    </div>
</template>
<script>
export default {
    name:'popup',
    data(){
        return{
            
        }
    },
    props:{
        success:{
            type:Boolean,
            default:false
        }
    },
    computed:{
        title(){
            if(this.success) return '成功'
            else return '失败'
        },
        word(){
            if(this.success) return '你已消灭所有敌人'
            else return '还差那么一点点'
        }
    },
    methods:{
        confirm(){
           wx.redirectTo({
               url:'/pages/logs/main'
           })
        }
    }
}
</script>
<style>
    .popup{
        position: absolute;
        top: 350rpx;
        left: 125rpx;
        width: 500rpx;
        height: 500rpx;
        z-index: 20
    }
    .popup-title{
        width: 100%;
        height: 100rpx;
    }
    .popup-body{
        width: 100%;
        height: 400rpx;
    }
    button{
        margin-left: auto;
        margin-right: auto;
    }
</style>
