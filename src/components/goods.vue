<template>
    <div class="goods">
        <img :src="goodsInfor.src" class="image">
        <div class="btn" @click="buy">
            <div class="btn-font">{{goodsInfor.num}}</div>
            <img class="img" :src="[goodsInfor.type === 'gold' ? '../../static/img/gold.png' : '../../static/img/chouka.png']" background-size="cover">
        </div>
    </div>
</template>
<script>
import store from '../store/store.js';
import service from '../api/service.js';
export default {
    props:{
        goodsInfor:{
            type:Object,
        }
    },
    methods:{
        buy(){
            let myInfor = store.state.myInfor
            switch(this.goodsInfor.type)
            {
                case 'gold':
                    if(myInfor.gold >=this.goodsInfor.num){
                        myInfor.gold -= this.goodsInfor.num
                        if(this.goodsInfor.get == 'drawNum') myInfor.drawNum += this.goodsInfor.getNum
                        store.commit('setMyInfor',myInfor)
                        service.SaveMyInfor({'infor':JSON.stringify(myInfor)})
                        this.$emit('goods','购买成功！')
                    }
                    else this.$emit('goods','金币不足，购买失败！')
                break;
                case 'drawNum':
                    this.$emit('draw')
                break;
                default:
            }
        }
    }
}
</script>
<style scoped>
.goods{
    width: 200rpx;
    height: 250rpx;
}
.image{
    width: 200rpx;
    height: 200rpx;
}
.btn{
    display: flex;
    justify-content: center;
    width: 200rpx;
    height: 50rpx;
    font-size: 14px;
    box-sizing: border-box;
    border: 1px solid red;
}
.btn-font{
    height: 50rpx;
    line-height: 50rpx;
}
.img{
    width: 40rpx;
    height: 40rpx;
}
</style>
