<template>
    <div class="poker-base" :class="{'isChoose' : pokerData.isChoose}" :style="{'width':width+'rpx','height':1.5*width+'rpx','margin-bottom':marginBottom+'rpx'}" @click="choosePoker">
        <!-- <div class="back"></div> -->
        <img :class="{'conb' : isCheck}" :src="pokerData.src" alt="">
        <img v-if="check" :class="{'cona' : isCheck}" src="../../../static/img/back-face-pattern.png" alt="">
    </div>
</template>
<script>
import service from '../../api/service.js';
import {myList2} from '../../utils/imgSrc.js'
import store from '../../store/store.js'
export default {
    name:'pokerbase',
    props:{
        // src:{
        //     type:String,
        //     default:'../../../static/img/battle-bg.png',
        // },
        isInit:{
            type:Boolean,
            default:false
        },
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

    data(){
        return{
            
            isCheck:false,
        }
    },
    mounted(){
        this.init()
    },
    methods:{
         async drive(){
            console.log('store:',store.state.myInfor)
            let cando
            if(store.state.myInfor.drawNum>0) cando = true
            else{
                this.$emit('noNum')
                cando = false 
            } 
            console.log('huhuh:',cando) 
            if(cando){
                let allPokers
                let drawPokers=[]
                await service.GetAll().then(res=>{
                    allPokers = res.data
                })
                await service.GetMyAll().then(res=>{   
                    allPokers.forEach(item=>{
                    if(res.data.every(item2=>{
                            return item2.pokerId !==item.pokerId
                        })) {
                            drawPokers.push(item.pokerId)
                        }
                    }) 
                })
                console.log('drawPokers:',drawPokers)
                if(drawPokers.length === 0){
                    this.$emit('pokerFull')// 弹窗提示 抽满了
                }
                else{
                    let len = drawPokers.length
                    let pokerid = drawPokers[Math.floor(Math.random()*len)]
                    console.log(pokerid)
                    this.pokerData.src = myList2[pokerid]
                    this.$set(this,'isCheck',true)
                    service.AddMyPoker({pokerId:pokerid})
                    let myInfor = store.state.myInfor
                    myInfor.drawNum--
                    store.commit('setMyInfor',myInfor)
                    this.$emit('addPoker')
                    service.SaveMyInfor({infor:JSON.stringify(myInfor)})
                }
            } 
        },
        choosePoker(){
            console.log('poker:',this.pokerData)
            this.$emit('choosePoker',this.pokerData)
            if(this.check){
                this.drive()
            }
        },
        init(){
            this.isCheck = false
            // if(this.pokerData){
            //     this.src = '../../../static/img/battle-bg.png'  //未填写poker的src 这是默认的
            // }
        },
        checkit(){
            
        }
    },
    watch:{
        isInit:{  //监听不到props
            immediate: true,        
            handler (val) {
                console.log(this.isInit)
                if(this.isInit) this.init()
            }
        },

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
