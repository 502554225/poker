<template>
        <div class="levelBody">
            <img class="img" :src="imgsrc" >
            <div class="levelInfor">
                <div>第{{num}}关</div>
                <div class="levelBtn">
                    <div @click="toGuanka">开始闯关</div>
                    <div v-if="saodangShow" @click="saodang">扫荡关卡</div>
                </div>
            </div>
        </div>
</template>
<script>
import store from '../store/store.js';
import service from '../api/service.js';
import {opList2} from '../utils/imgSrc.js'
export default {
    props:{
        levelInfor:{
            type:Object,
            default:{}
        },
        num:{
            type:Number,
            default:1
        }
    },
    data(){
        return{
            imgsrc:''
        }
    },
    computed:{
        saodangShow(){
            return store.state.myInfor.levelG>this.num
        }
    },
    methods:{
        toGuanka(){
            let myInfor = store.state.myInfor
            myInfor.fatigueNum -=5
            store.commit('setMyInfor',myInfor)
            service.SaveMyInfor({'infor':JSON.stringify(myInfor)})
            wx.navigateTo({
                url:`/pages/guanka/main?num=${this.num}`
            })
        },
        saodang(){
            this.$emit('saodang',this.num)
        }
    },
     mounted(){
         this.imgsrc = opList2[this.num]
     }
}
</script>

<style scoped>
.levelBody{
    width: 725rpx;
    height: 200rpx;
    display: flex;
    background: red;
}
.img{
    margin-top: 10rpx;
    margin-left: 10rpx;
    width: 180rpx;
    height: 180rpx;
}
.levelInfor{
    flex: auto;
    margin-top: 10rpx;
    margin-right: 10rpx;
    height: 180rpx;
    background: #fff;
}
</style>
