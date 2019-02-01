<template>
    <div class="poker-base" :style="{'width':width+'rpx','height':1.5*width+'rpx'}" @click="checkit">
        <!-- <div class="back"></div> -->
        <img :class="{'conb' : isCheck}" :src="src" alt="">
        <img v-if="check" :class="{'cona' : isCheck}" src="../../../static/img/back-face-pattern.png" alt="">
    </div>
</template>
<script>
export default {
    props:{
        width:{
            type:String,
            default:'170'
        },
        check:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return{
            src:'../../../static/img/battle-bg.png',
            isCheck:false
        }
    },
    methods:{
        checkit(){
            if(this.check){
                console.log("diaji")
                this.$set(this,'isCheck',true)
                            console.log(this.isCheck)

            }
        }
    }
}
</script>
<style scoped>
.poker-base{
    position: relative;
}
/* .back{
    background: url('../../../static/img/back-face-pattern.png') no-repeat center;
    background-position: 100% 100%;
    z-index: 10;
} */
img{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
@keyframes cona{
    99%{
        display: block;
    }
    100%{
        display: none;
        transform: rotateY(90deg)
    }
}
.cona{
    animation: cona 0.4s ease both;
}
@keyframes conb{
    0%{
        display: none
    }
    50%{
        display: block;
        /* transform: rotateY(90deg) */
    }
    100%{
        transform: rotateY(180deg)
    }
}
.conb{
    animation: conb .8s ease both;
}
</style>
