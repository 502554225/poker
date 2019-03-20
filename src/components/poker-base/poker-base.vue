<template>
    <div class="poker-base" :class="{'isChoose' : pokerData.isChoose}" :style="{'width':width+'rpx','height':1.5*width+'rpx','margin-bottom':marginBottom+'rpx'}" @click="choosePoker">
        <!-- <div class="back"></div> -->
        <img :class="{'conb' : isCheck}" :src="src" alt="">
        <img v-if="check" :class="{'cona' : isCheck}" src="../../../static/img/back-face-pattern.png" alt="">
    </div>
</template>
<script>
import service from '../../api/service.js';
export default {
    props:{
        marginBottom:{
            type:Number,
            default:0
        },
        width:{
            type:String,
            default:'170'
        },
        check:{
            type:Boolean,
            default:false
        },
        pokerData:{
            type:Object,
            default:{
                pokerId:0,
                pokerName:0,
                life: 0,
                aggressivity: 0,//攻击力
                defenses: 0,//防御力
                vigour: 0,//气势
                crits: 0,//暴击
                indomitableness: 0,//韧劲
                evade:0,//闪避
                hit: 0,//命中
                skill: 0,//技能
                survival:0,
                action:'',
                ascription:0,
                position:{
                x:0,
                y:0
                },
                level:0,
                isChoose:false
            }
        },
        // isChoose:{
        //     type:Boolean,
        //     default:false
        // }
    },
    // computed:{
    //     isChoose(){
    //        return this.pokerData.isChoose 
    //     }
    // },
    data(){
        return{
            src:'../../../static/img/battle-bg.png',
            isCheck:false,
            
        }
    },
    mounted(){
        this.init()
    },
    methods:{
         async drive(){
            let len
            let allPokers
            await service.GetAll().then(res=>{
                len = res.data.length
                allPokers = res.data
            })
            let pokerid = Math.floor(Math.random()*len).toString()
            await service.GetMyAll().then(res=>{
                if(allPokers === res.data){
                    this.$emit('popup')// 弹窗提示 抽满了
                    return
                }
                res.data.forEach(item=>{
                if(item.pokerId === pokerid){
                    this.drive()
                    return
                }
                })
            })
            service.AddMyPoker({pokerId:pokerid}).then(res=>{
                if(res.data.length>0){
                //出现抽出的卡牌
                }
            }) 
        },
        choosePoker(){
            console.log('poker:',this.pokerData)
            this.$emit('choosePoker',this.pokerData)
            if(this.check){
                this.$set(this,'isCheck',true)

            }
        },
        init(){
            if(this.pokerData){
                this.src = '../../../static/img/battle-bg.png'  //未填写poker的src 这是默认的
            }
        },
        checkit(){
            
        }
    },
    watch:{
        // 'pokerData.isChoose':{
        //     deep:true,
        //     handler(data){ 
        //             // let hasChoose =   this.pokerData.hasOwnProperty('isChoose')
        //             if(!this.pokerData||!this.pokerData.isChoose) this.isChoose = false
        //             else this.isChoose = true
        //     },
        //     immediate: true,
            
        // }   
    }
}
</script>
<style scoped>
.poker-base{
    position: relative;
    border: 1px solid #000
}
.isChoose{
    border: 1px solid #fff
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
