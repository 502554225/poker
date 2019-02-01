<template>
  <div>
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
        当前关卡：{{guanka}}
        <span @click="start">开始闯关</span>
      </div>
      <div v-if="page==='kapai'" class="kapai">
        <div class="kapai-show">
          <div class="poker"></div>
        </div>
        <scroll-view scroll-y class="kapai-box">
          <div class="kapai-box2">
            <pokerbase  v-for="(poker,key) in pokers" :key="key" class="poker" >
              {{poker.name}}
            </pokerbase>
          </div>
        </scroll-view>
      </div>
      <div v-if="page==='drive'" class="drive">
          <div>
            <h2 style="font-size:24px">xxx的商店</h2>
            <div v-if="!isDrive" class="content-box">
              <div class="one">
                <span @click="drive1">抽一次</span>
              </div>
              <div class="ten">
                <span @click="drive10">抽十次</span>
              </div>
            </div>
            <div v-if="isDrive" class="drive-body" > 
              <span>
                点击抽卡
              </span>
            </div>
          </div>          
      </div>
    </div>
      <div class="btn-box">
        <button size="mini" @click="toGuanka">开始闯关</button>
        <button size="mini" @click="toKapai">我的卡牌</button>
        <button size="mini" @click="toArray">我的布阵</button>
        <button size="mini" @click="toDrive">抽牌</button>
      </div>
  </div>
</template>

<script>
import { formatTime } from '@/utils/index'
import card from '@/components/card'
import groove from '@/components/groove/groove';
import pokerbase from '@/components/poker-base/poker-base';
import serviceL from '../../api/login.js'
import service from '../../api/service.js';
import store from '../../store/store.js';
export default {
  components: {
    card,
    groove,
    pokerbase
  },

  data () {
    return {
      page:'guanka',
      logs: [],
      guanka:1,
      isDrive:false,
      pokers:[{name:111},{name:222},{name:311},{name:422},{name:511},{name:622},{name:711},{name:822},{name:911},{name:102},{name:111},{name:122},]
    }
  },
  
  created () {
    // const logs = (wx.getStorageSync('logs') || [])
    // this.logs = logs.map(log => formatTime(new Date(log)))
  },
  methods:{
    toGuanka(){
      this.page = 'guanka'
    },
    toArray(){
      wx.navigateTo({
        url:'/pages/array/main'
      }) 
    },
    async toKapai(){
      this.page = 'kapai';
      service.GetMyAll().then(res=>{
        this.pokers = res.data
      })
    },
    toDrive(){
      this.page = 'drive'
    },
    drive1(){
      this.isDrive = true
    },
    start(){
       wx.navigateTo({
        url:'/pages/guanka/main'
      }) 
    }

  }
  
}
</script>

<style scoped>
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
  height: 283rpx;
}
.kapai-box{
  /* overflow-y: scroll; */
  height: 566rpx;
}
.kapai-box2{
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.kapai-box2 .poker-base{
  margin-top: 10rpx
}
.content-box{
  display: flex;
}
.content-box div{
  flex:auto
}
</style>
