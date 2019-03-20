<template >
    <div v-if="show" class="popup">
        <div class="popup-title">{{title}} </div>
        <div class="popup-body">
            <h4 v-if="type === 'words'">{{words}}</h4>
            <counter v-if="type === 'saodang'" ref="counter"></counter>
            <button size="mini" @click="confirm">确定</button>
        </div>
    </div>
</template>
<script>
import counter from '../counter/counter';
import service from '../../api/service.js';
import pk from '../../utils/pokersControl.js';
import levelList from '../../utils/levelList.js';
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
                 wx.redirectTo({
                    url:`/pages/${this.to.page}/main`
                })
            }
            else{
                this.$emit('confirm')
            }
        },
        async saodang(){
            let myArray
            let levelG = levelList[this.saodangLevel-1].level
            // await service.GetMyArray().then(res=>{
            //    myArray = pk.computed(pk.toPoker(res.data))
            // })
            let num = this.$refs.counter.count
            await service.AddLevel({level:levelG*num})
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
        width: 100%;
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
</style>
