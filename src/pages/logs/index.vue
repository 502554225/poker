<template>
  <div class="main">
    <div class="information">
      <div class="myInfor">
        <img class="myInfor-img" :src="userInfor.avatarUrl" background-size="cover">
        <div class="name">{{userInfor.nickName}}</div>
      </div>
      <div class="inf-body">
        <groove v-for="(item,key) in grooveList" :key="key" width="100%" height="50rpx" :info="item"></groove>
      </div>
    </div>
    <div class="AD">
      <div v-if="page==='guanka'" class="guanka">
        <scroll-view scroll-y class="guanka-box" style="background:url(../../../static/img/bg1.jpg);background-size:cover;">
          <level  v-for="(item,key) of guanka" :key="key" :num="guanka-key" @saodang="saodang"></level>
        </scroll-view>
      </div>
      <div v-if="page==='kapai'" class="kapai">
        <div class="kapai-show">
          <pokerbase width="250" :pokerData="showPoker" ></pokerbase>
          <div class="showData" style="background:#D56E32">
            <div class="showData-title"><div>{{showPoker.pokerName}}</div></div>
            <div class="showData-body" >
              <div>生命：{{showPoker.life}}</div>
              <div>攻击：{{showPoker.aggressivity}}</div>
              <div>防御：{{showPoker.defenses}}</div>
              <div>暴击：{{showPoker.crits}}</div>
              <div>韧劲：{{showPoker.indomitableness}}</div>
              <div>命中：{{showPoker.hit}}</div>
              <div>闪避：{{showPoker.evade}}</div>
              <div>等级：{{showPoker.level}}</div>
              <div>技能：{{skillInt[showPoker.pokerId]}}</div>
            </div>
          </div>
        </div>
        <scroll-view scroll-y class="kapai-box" style="background:url(../../../static/img/bg4.jpg);background-size:cover;">
          <div class="kapai-box2">
            <pokerbase  v-for="(poker,key) in pokers" :key="key"  :pokerData="poker" marginBottom="10" @choosePoker="choosePoker" width="181">
              {{poker.name}}   
            </pokerbase> 
          </div>
        </scroll-view>
      </div>
      <div v-if="page==='Draw'" class="draw">
        <div class="shop" style="font-size:24px;text-align:center;background:url(../../../static/img/shop2.png);background-size:cover;color:#fff">商店</div>
        <div v-if="!isDrive" class="content-box" style="background:url(../../../static/img/bg6.jpg);background-size:cover;">
          <goods v-for="(item,key) in goodsInfors" :key="key" :goodsInfor="item" @draw="toDraw" @goods="goods"></goods>
        </div>
        <div v-if="isDrive" class="draw-body" style="background:url(../../../static/img/bg6.jpg);background-size:cover;"> 
          <div class="draw-box">
            <pokerbase v-for="(item,key) of 4" :key="key" check="true" @pokerFull="drawPopup = true" @addPoker="addPoker" @noNum="noNum" :isInit="drawInit"></pokerbase>
          </div>
          <div v-if="drawBtn" class="drawBtn-box">
            <button @click="drawAgain" size="mini">再抽一次</button>
            <button @click="drawOver" size="mini" style="margin-left:20rpx">确定</button>
          </div>
        </div>
      </div>
    </div>
      <div class="btn-box">
        <div class="menu-item" :class="{'choose-menu':chooseNum === 0}" @click="toGuanka">
          <img class="menu-img" src="../../../static/img/guanka.png" background-size="cover">
          <span class="menu-font">闯关</span>
          </div>
        <div class="menu-item" :class="{'choose-menu':chooseNum === 1}" @click="toKapai">
          <img class="menu-img" src="../../../static/img/poker.png" background-size="cover">
          <span class="menu-font">卡牌</span>
          </div>
        <div class="menu-item" :class="{'choose-menu':chooseNum === 2}" @click="toArray">
          <img class="menu-img" src="../../../static/img/array.png" background-size="cover">
          <span class="menu-font">布阵</span> 
          </div>
        <div class="menu-item" :class="{'choose-menu':chooseNum === 3}" @click="toDrive">
          <img class="menu-img" src="../../../static/img/shop.png" background-size="cover">
          <span class="menu-font">商店</span> 
          </div>
      </div>
      <popup ref="saodang" title="扫荡" type="saodang" :show="popupShow" @confirm="popupConfirm" @success="success" @fail="failPopup = true"></popup>
      <popup title="提示" words="扫荡成功！" :show="successPopup" @confirm="popupConfirm"></popup>
      <popup title="提示" words="体力不足！" :show="failPopup" @confirm="popupConfirm"></popup>
      <popup title="提示" :words="goodsWords" :show="goodsPopup" @confirm="popupConfirm"></popup>
      <popup title="提示" words="你已获取所有卡牌！" :show="drawPopup" :to="{page:'logs'}"  @confirm="popupConfirm"></popup>
  </div>
</template>

<script>
import { formatTime } from '@/utils/index'; //加一个购买成功弹窗
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
import {myList2, myList1 } from "../../utils/imgSrc.js";
import skillIntro from "../../utils/skillIntro.js";
export default {
  components: {   
    card,
    groove,
    pokerbase,
    level,
    goods,
    popup
  },
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
      chooseNum:0, //菜单栏控制
      popupShow:false, //扫荡弹窗
      failPopup:false, //扫荡失败弹窗
      successPopup:false, //扫荡成功弹窗
      drawPopup:false, //抽满卡牌弹窗
      goodsPopup:false,//购买弹窗
      drawBtn:false, //抽卡成功后按钮,
      drawInit:false,
      goodsWords:'',//购买弹窗的words
      skillInt:skillIntro,
      userInfor:{
        avatarUrl:'',
        nickName:''
      },
      grooveList:[
        {
          font:'体力',
          src:'../../../static/img/tili.png',
          num:0
        },
        {
          font:'金币',
          src:'../../../static/img/gold.png',
          num:0
        },
        {
          font:'抽卡',
          src:'../../../static/img/chouka.png',
          num:0
        },
      ],
      myInfor:{
      }
    }
  },
  onLoad(){
    service.UpMyInfor()
    this.backstage()
  },
  onShow(){
    this.init()
  },
  methods:{
    success(){
      this.successPopup = true
      this.initGrooveList()
    },
    addPoker(){
      this.drawBtn = true  
      this.initGrooveList()
    },
    noNum(){
      console.log('你的抽卡次数不足！')
      this.goodsPopup = true
      this.goodsWords = '你的抽卡次数不足！'
    },
    goods(data){
      this.initGrooveList()
      this.goodsWords = data
      this.goodsPopup = true
    },
    drawAgain(){
      console.log('again')
      this.drawInit = true
      this.drawPopup = false
      console.log('chi:',this.$children)
      this.$children.forEach((item,index)=>{
        if(8<=index<=11){
          item.isCheck = false
        }
      })
      this.drawBtn = false 
      this.drawInit = false
    },
    drawOver(){
      this.drawAgain()
      wx.redirectTo({
        url:'/pages/logs/main'
      })
    },
    popupConfirm(str){ //弹窗确认按钮
      console.log(str)    
      this.popupShow = false
      this.successPopup = false
      this.failPopup = false
      this.drawPopup = false
      this.goodsPopup = false
      if(str === 'saodang'){
        this.$refs.saodang.saodang()
      }
      // 实现扫荡 
    },
    saodang(num){
      console.log(num )
      this.popupShow = true
      this.$refs.saodang.saodangLevel = num
    },
    choosePoker(poker){
      this.pokers.forEach(item => {
        if(item == poker){
          item.isChoose = true
          this.showPoker = item
        }
        else item.isChoose = false
      });

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
      c.forEach((item,index)=>{ //添加isChoose属性 避免后续报错
        item.isChoose = false
        item.src = myList2[item.pokerId]
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
    backstage(){
      setInterval(function(){
        service.UpMyInfor()
      },300000)
    },
    async init(){
      this.page='guanka'
      this.logs= []
      this.isDrive=false
      this.pokers=[]
      this.userInfor = {...store.state.userInfor}
      await service.GetMyInfor().then(res=>{ 
        store.commit('setMyInfor',res.data)
      })
      this.initGrooveList()
      console.log('store:',store.state.myInfor)
      this.guanka=store.state.myInfor.levelG
    },
    async initGrooveList(){
      let grooveList = this.grooveList
      grooveList[0].num = store.state.myInfor.fatigueNum;
      grooveList[1].num = store.state.myInfor.gold;
      grooveList[2].num = store.state.myInfor.drawNum;
      this.grooveList= grooveList
    }
  },
  watch:{
    // userInfor:{
    //         deep:true,
    //         handler(data){ 
    //           console.log('wacth :',data)
    //                 this.userInfor = data
    //         },
    //         immediate: true,
            
    //     }   
  }
}
</script>

<style scoped>
.main{
  position: relative;
  width: 100vw;
  height: 100vh;
}
.information{
  display: flex;
  height: 180rpx;
  width: 100%;
  margin-top: 20rpx;
}
.myInfor{
  margin-left: 40rpx;
  width: 140rpx;
  height: 180rpx;
}
.myInfor-img{
  width: 140rpx;
  height: 140rpx;
  border-radius: 50%;
}
.name{
  width: 140rpx;
  height: 40rpx;
  font-size: 19px;
  line-height: 40rpx;
  text-align: center;
}
.inf-body{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 300rpx;
  margin-left: 100rpx;
  margin-right: 100rpx;
  flex: auto;
}
/* .inf-body div{
  width: 100%;
  flex: auto;
  display: flex;
} */
.AD{
  margin-top: 30rpx;
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
  /* justify-content: space-between; */
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
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 100rpx 5rpx 100rpx 5rpx;
  background: blue
}
.draw-box{
  display: flex;
  justify-content: space-between
}
.showData-title{
  text-align: center;
  font-size: 20px;
}
.showData-body{
  width: 480rpx;
  margin-left: 20rpx;
  flex: auto;
  display: flex;
  flex-wrap: wrap;
}
.showData-body div{
  /* margin-left: 30rpx; */
  width: 50%;
  height: 25%;
  font-size: 16px;
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
.btn-box{
  width: 100%;
  height: 110rpx;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: #bbb
}
.menu-item{
  position: relative;
  width: 25%;
  height: 100%;
  flex: auto;
}
.menu-img{
  width: 95rpx;
  height: 95rpx;
  margin-left: 47rpx;
}
.menu-font{
  position: absolute;
  left: 0;
  width: 100%;
  top: 65rpx;
  color: #fff;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
}
</style>
