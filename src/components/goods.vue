<template>
    <div class="goods">
        <img :src="goodsInfor.src" class="image">
        <div class="btn" @click="buy">
            {{goodsInfor.num}}{{goodsInfor.type}}
        </div>
    </div>
</template>
<script>
import store from '../store/store.js';
import service from '../api/service.js';
export default {
    props:{
        goodsInfor:{
            type:Boolean,
        }
    },
    methods:{
        buy(){
            let myInfor = store.state.myInfor
            switch(this.goodsInfor.type)
            {
                case 'gold':
                    myInfor.gold -= this.goodsInfor.num
                    if(this.goodsInfor.get == 'drawNum') myInfor.drawNum += this.goodsInfor.getNum
                    store.commit('setMyInfor',myInfor)
                    service.SaveMyInfor(store.state.myInfor)
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
    width: 200rpx;
    height: 50rpx;
    font-size: 14px;
}
</style>
