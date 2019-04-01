<template >
    <div v-if="show" class="popup">
        <div class="popup-body">
            <div class="popup-title">{{title}} </div>
            <h4 v-if="type === 'words'">{{words}}</h4>
            <counter v-if="type === 'saodang'" ref="counter"></counter>
            <div class="reward" v-if="reward.isShow">
                <div>经验：{{reward.numList[0]}}</div>
                <div>金币：{{reward.numList[1]}}</div>
                <div>符咒：{{reward.numList[2]}}</div>
            </div>
            <button size="mini" @click="confirm">确定</button>
        </div>
    </div>
</template>
<script>
import counter from '../counter/counter';
import service from '../../api/service.js';
import pk from '../../utils/pokersControl.js';
import levelList from '../../utils/levelList.js';
import store from '../../store/store.js';
export default {
    name:'popup',
    data(){
        return{
            saodangLevel:0
        }
    },
    components:{
        counter
    },
    props:{
        reward:{
            type:Object,
            default:{
                isShow:false,
                numList:[0,0,0]
            }
        },
        type:{
            type:String,
            default:'words'
        },
        title:{
            type:String,
            default:'提示'
        },
        words:{
            type:String,
            default:'提示'
        },
        to:{
            type:Object,
            default:null
        },
        show:{
            type:Boolean,
            default:false
        }
    },
    methods:{
        confirm(){
            if(this.to){  
                this.$emit('confirm')
                 wx.redirectTo({
                    url:`/pages/${this.to.page}/main`
                })
            }
            else{
                if(this.type === 'words'){this.$emit('confirm','close')}
                if(this.type === 'saodang'){
                        console.log('type:',this.type)
                        this.$emit('confirm','saodang')
                    }
            }

        },
        async saodang(){
            console.log('saodang')
            let myArray,myInfor
            let levelG = levelList[this.saodangLevel-1].level
            let num = this.$refs.counter.count
            myInfor = store.state.myInfor
            if(myInfor.fatigueNum<num*5){
                //提示
                let obj={}
                obj.title = '提示'
                obj.words = '体力不足！'
                obj.type = 'words'
                this.$emit('fail')
            }
            else{
                myInfor.fatigueNum-=num*5
                store.commit('setMyInfor',myInfor)
                await service.SaveMyInfor({infor:JSON.stringify(myInfor)})
                await service.AddLevel({level:levelG*num})
                this.$emit('success')
            }
        }
    }
}
</script>
<style scoped>
    .popup{
        position: absolute;
        top: 350rpx;
        left: 125rpx;
        width: 500rpx;
        height: 350rpx;
        z-index: 20;
        background: rgba(167, 162, 162, 0.6)
    }
    .popup-title{
        width: 100%;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        font-size: 16px;
        background: #fff
    }
    .popup-body{
        width: 500rpx;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }
    button{
        width: 200rpx;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 10rpx;
    }
    .reward{
        display: flex;
        justify-content: space-around;
    }
</style>
