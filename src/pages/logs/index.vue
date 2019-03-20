<template>
  <div class="main">
    <div class="information">
      <div class="img">
        <img src="" alt="" >
      </div>
      <div class="inf-body">
        <div>
            <h5>体</h5>
            <groove width="100%" height="40rpx"></groove>
        </div>
        <div>
            <h5>金</h5>
        </div>
        <div>
            <h5>经</h5>
        </div>
      </div>
    </div>
    <div class="AD">
      <div v-if="page==='guanka'" class="guanka">
        <scroll-view scroll-y class="guanka-box">
          <level  v-for="(item,key) of guanka" :key="key" :num="guanka-key" @saodang="saodang(num)"></level>
        </scroll-view>
        <!-- 当前关卡：{{guanka}}
        <span @click="start">开始闯关</span> -->
      </div>
      <div v-if="page==='kapai'" class="kapai">
        <div class="kapai-show">
          <pokerbase width="250" :pokerData="showPoker" ></pokerbase>
          <div class="showData">
            <div class="showData-title"><div>{{showPoker.pokerName}}</div></div>
            <div class="showData-body">
              <div>生命：{{showPoker.life}}</div>
              <div>攻击：{{showPoker.aggressivity}}</div>
              <div>防御：{{showPoker.defenses}}</div>
              <div>暴击：{{showPoker.crits}}</div>
              <div>韧劲：{{showPoker.indomitableness}}</div>
              <div>命中：{{showPoker.hit}}</div>
              <div>闪避：{{showPoker.evade}}</div>
              <div>技能：{{showPoker.skill}}</div>
            </div>
          </div>
        </div>
        <scroll-view scroll-y class="kapai-box">
          <div class="kapai-box2">
            <pokerbase  v-for="(poker,key) in pokers" :key="key"  :pokerData="poker" marginBottom="10" @choosePoker="choosePoker" >
              {{poker.name}}   
            </pokerbase> 
          </div>
        </scroll-view>
      </div>
      <div v-if="page==='Draw'" class="draw">
        <h2 style="font-size:24px">xxx的商店</h2>
        <div v-if="!isDrive" class="content-box">
          <goods v-for="(item,key) in goodsInfors" :key="key" :goodsInfor="item" @draw="toDraw"></goods>
        </div>
        <div v-if="isDrive" class="draw-body" > 
          <pokerbase v-for="(item,key) of 4" :key="key" check="true"></pokerbase>
          <!-- <span @click="drive">
            点击抽卡
          </span> -->
        </div>
      </div>
    </div>
      <div class="btn-box">
        <button size="mini" @click="toGuanka">开始闯关</button>
        <button size="mini" @click="toKapai">我的卡牌</button>
        <button size="mini" @click="toArray">我的布阵</button>
        <button size="mini" @click="toDrive">抽牌</button>
      </div>
      <popup ref="saodang" title="扫荡" type="saodang" :show="popupShow" @confirm="popupConfirm"></popup>
  </div>
</template>

<script>
import { formatTime } from '@/utils/index';
import card from '@/components/card';
import groove from '@/components/groove/groove';
import pokerbase from '@/components/poker-base/poker-base';
import serviceL from '../../api/login.js'
import service from '../../api/service.js';
import store from '../../store/store.js';
import pk from '../../utils/pokersControl.js';
import level from '@/components/level';
import goods from '@/components/goods';
import Infors from '../../utils/goodsInfors.js';
import popup from '../../components/popup/popup.vue';
export default {
  components: {
    card,
    groove,
    pokerbase,
    level,
    goods,
    popup
  },
  // computed:{
  //   showPoker(){
  //     console.log('wojinlailalaaaal')
  //     return function(){
  //       this.pokers.forEach(item=>{
  //         if(item.isChoose) return item
  //       })
  //     }
  //   }
  // },
  data () {
    return {
      page:'guanka',
      logs: [],
      guanka:1,
      isDrive:false,
      pokers:[],
      driveStatus:'未抽卡',
      choosePokerIndex:'',
      showPoker:[],
      goodsInfors:Infors,
      popupShow:false
    }
  },
  
  onShow(){
    this.init()
  },
  methods:{
    popupConfirm(){
      this.popupShow = false
      // 实现扫荡  popup 样式还有问题
    },
    saodang(num){
      console.log('dianwole ')
      this.popupShow = true
      this.$refs.saodang.saodangLevel = num
    },
    choosePoker(poker){
      // this.$children
      this.pokers.forEach(item => {
        if(item == poker){
          item.isChoose = true
          this.showPoker = item
        }
        else item.isChoose = false
      });
      // console.log('sichup;l:',poker)
      // this.choosePokerIndex = poker
    },
    toGuanka(){
      this.page = 'guanka'
    },
    toArray(){
      wx.navigateTo({
        url:'/pages/array/main'
      }) 
    },
    async toKapai(){
      let c = []
      await service.GetMyAll().then(res=>{
        c = pk.computed(pk.toPoker(res.data))
      })
      c.forEach(item=>{ //添加isChoose属性 避免后续报错
        item.isChoose = false
      })
      c[0].isChoose = true
      this.pokers = c
      this.showPoker = this.pokers[0]
      this.page = 'kapai'
    },
    toDrive(){
      this.page = 'Draw'
    },
    toDraw(){
      this.isDrive = true
    },
   
    start(){
       wx.navigateTo({
        url:'/pages/guanka/main'
      }) 
    },
    async init(){
      this.page='guanka'
      this.logs= []
      this.guanka=111
      this.isDrive=false
      this.pokers=[]
      await service.GetMyInfor().then(res=>{ 
        store.commit('setMyInfor',res.data)
      })
      console.log('store:',store.state.myInfor)
      this.guanka=store.state.myInfor.levelG
    }

  }
  
}
</script>

<style scoped>
.main{
  position: relative;
}
.information{
  display: flex;
  height: 150rpx;
  width: 100%;
  margin-top: 20rpx;
}
img{
  margin-left: 10rpx;
  width: 150rpx;
  height: 150rpx;
  border-radius: 50%;
  background: #bbb
}
.inf-body{
  display: flex;
  flex-direction: column;
  margin-left: 50rpx;
  margin-right: 50rpx;
  flex: auto;
}
.inf-body div{
  width: 100%;
  flex: auto;
  display: flex;
}
.AD{
  margin-top: 50rpx;
  width: 745rpx;
  height: 849rpx;
  background: #bbb;
  margin-left: auto;
  margin-right: auto;
  border-radius: 20rpx;
}
.poker{
  width: 180rpx;
  height: 270rpx;
  background: #000
}
.kapai {
  display: flex;
  flex-direction: column;
}
.kapai-show{
  display: flex;
  height: 375rpx;
}
.kapai-box{
  /* overflow-y: scroll; */
  margin-top: 10rpx;
  height: 465rpx;
}
.kapai-box2{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.kapai-box2 .poker-base{
  margin-top: 10rpx
}
.draw{
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.content-box{
  box-sizing: border-box;
  flex:auto;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 20rpx;
  /* padding-right: 20rpx; */
}
.content-box div{
  flex:auto
}
.draw-body{
  flex:auto;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx;
  background: blue
}
.showData-body{
  width: 500rpx;
  display: flex;
  flex-wrap: wrap;
}
.showData-body div{
  flex: auto;
  width: 50%;
  height: 25%;
  font-size: 12px;
}
.guanka{
  width: 100%;
  height: 100%;
}
.guanka-box{
  width: 100%;
  height: 98%;
  padding: 10rpx;
}
</style>
