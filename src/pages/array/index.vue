<template>
  <div class="con">
      <div class="array">
        <div class="array-item" v-for="(item,index) of 9" :key="index"></div>
      </div>
      <div class="myPoker">
        <div class="myPoker-font">我的卡牌</div>
        <div scroll-y class="poker-box">
          <div v-for="(item,index) in myPokers" :key="index" class="arrayPokerShow" style="width: 130rpx;height: 195rpx;background: #777812;" @touchstart="down" @touchmove="move($event,index)" @touchend="end(item,index)" :style="style[index]"></div>
        </div>
      </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import poker from '../../components/poker/poker.vue'
import service from '../../api/service';
import pk from '../../utils/pokersControl.js';
import pokerbase from '@/components/poker-base/poker-base';
import imgList from '../../utils/imgSrc.js';
import store from '../../store/store.js';
export default {
  name:'1',
  data () {
    return {
      array:[], //布阵信息，对战场景调用
      myPokers:[
        {
          life: 100,
          aggressivity: 55,//攻击力
          Defenses: 5,//防御力
          vigour: 0,//气势
          crits: 0,//暴击
          indomitableness: 0,//韧劲
          evade: 0,//闪避
          hit: 1,//命中
          skill: 0,//技能
          survival:1, //是否存在
          action:'',
          ascription:0,//归属 0为我
          position:{
              x:'',
              y:''
          }
        },
        {
          life: 100,
          aggressivity: 10,//攻击力
          Defenses: 5,//防御力
          vigour: 0,//气势
          crits: 0,//暴击
          indomitableness: 0,//韧劲
          evade: 0,//闪避
          hit: 1,//命中
          skill: 0,//技能
          survival:1,
          action:'',
          ascription:0,
          position:{
            x:'',
            y:''
          }
        },
        // poker3:{
        //   life: 100,
        //   aggressivity: 10,//攻击力
        //   Defenses: 5,//防御力
        //   vigour: 0,//气势
        //   crits: 0,//暴击
        //   indomitableness: 0,//韧劲
        //   evade: 0,//闪避
        //   hit: 1,//命中
        //   skill: 0,//技能
        //   survival:1,
        //   action:'',
        //   ascription:0,
        //   position:{
        //     x:1,
        //     y:3
        //   }
        // },
        {
          life: 100,
          aggressivity: 55,//攻击力
          Defenses: 5,//防御力
          vigour: 0,//气势
          crits: 0,//暴击
          indomitableness: 0,//韧劲
          evade: 0,//闪避
          hit: 1,//命中
          skill: 0,//技能
          survival:1,
          action:'',
          ascription:0,
          position:{
            x:'',
            y:''
          }
        },
        // poker5:{
        //   life: 100,
        //   aggressivity: 10,//攻击力
        //   Defenses: 5,//防御力
        //   vigour: 0,//气势
        //   crits: 0,//暴击
        //   indomitableness: 0,//韧劲
        //   evade: 0,//闪避
        //   hit: 1,//命中
        //   skill: 0,//技能
        //   survival:1,
        //   action:'111',
        //   ascription:0,
        //   position:{
        //     x:2,
        //     y:2
        //   }
        // },
        // poker6:{
        //   life: 100,
        //   aggressivity: 10,//攻击力
        //   Defenses: 5,//防御力
        //   vigour: 0,//气势
        //   crits: 0,//暴击
        //   indomitableness: 0,//韧劲
        //   evade: 0,//闪避
        //   hit: 1,//命中
        //   skill: 0,//技能
        //   survival:1,
        //   action:'',
        //   ascription:0,
        //   position:{
        //     x:2,
        //     y:3
        //   }
        // },
        {
          life: 100,
          aggressivity: 55,//攻击力
          Defenses: 5,//防御力
          vigour: 0,//气势
          crits: 0,//暴击
          indomitableness: 0,//韧劲
          evade: 0,//闪避
          hit: 1,//命中
          skill: 0,//技能
          survival:1,
          action:'',
          ascription:0,
          position:{
            x:'',
            y:''
          }
        },
        {
          life: 100,
          aggressivity: 55,//攻击力
          Defenses: 5,//防御力
          vigour: 0,//气势
          crits: 0,//暴击
          indomitableness: 0,//韧劲
          evade: 0,//闪避
          hit: 1,//命中
          skill: 0,//技能
          survival:1,
          action:'',
          ascription:0,
          position:{
            x:'',
            y:''
          }
        },
        {
          life: 100,
          aggressivity: 10,//攻击力
          Defenses: 5,//防御力
          vigour: 0,//气势
          crits: 0,//暴击
          indomitableness: 0,//韧劲
          evade: 0,//闪避
          hit: 1,//命中
          skill: 0,//技能
          survival:1,
          action:'',
          ascription:0,
          position:{
            x:'',
            y:''
          }
        },

      ], //拥有的卡牌
      flags: false,
      position: { x: 0, y: 0 },
      nx: '', ny: '', dx: '', dy: '', xPum: '', yPum: '',
      style:[],
      pokerImg:imgList
    }
  },
  components: {
    draggable,
    poker,
    pokerbase
  },

  methods: {
    initBcakground(){
      this.style.forEach((item,index)=>{ //background放上去
        if(item===0){
          this.style[index] = 'background:url('+this.pokerImg[this.myPokers[index].pokerId]+');'
        }
        else
        this.style[index]+= 'background:url('+this.pokerImg[this.myPokers[index].pokerId]+');'
      })
    },
    pokerClass(item){
      console.log('item',item,this.pokerImg[item.pokerId])
      return this.pokerImg[item.pokerId]
    },
    down(event){
      
      this.flags = true;
      let a111=event.target
      var touch;
      if(event.touches){
        touch = event.touches[0];
      }else {
        touch = event;
      }
      this.position.x = touch.clientX;
      this.position.y = touch.clientY;
      this.dx = a111.offsetLeft;
      this.dy = a111.offsetTop;
      console.log('position.x:',this.position.x,'dx:',this.dx)
    },
    move($event,index){
      let event =$event
      // console.log(event)
      if(this.flags){
        var touch ;
        if(event.touches){
          touch = event.touches[0];
        }else {
          touch = event;
        }
        this.nx = touch.clientX - this.position.x;
        this.ny = touch.clientY - this.position.y;
        this.xPum = this.dx+this.nx;
        this.yPum = this.dy+this.ny;

        if (this.xPum>280){
          this.xPum=277
        } ;
        if (this.xPum<0){
          this.xPum=0
        } ;
        if (this.yPum>425){
          this.yPum=423
        } ;
        if (this.yPum<0){
          this.yPum=0
        } ;

        this.$set(this.style,index,'left:'+this.xPum+'px;'+'top:'+this.yPum+'px;'+'position: absolute;'+'background:url('+this.pokerImg[this.myPokers[index].pokerId]+');')
      }
    },
    end(item,index){
      this.array= this.array.filter(i=>{//先把正在移动这个卡牌在数组中删除，避免重复添加
        if (i.pokerId!==item.pokerId) { //如果正在移动的卡牌的id等于布阵中的卡牌id，则布阵中的那种相同的卡牌先删除
          return i
        }
      }) 
      if (this.array.length>=5){
        this.yPum=10000
      }
      if (this.xPum<=75){    //第一列
        if (this.yPum<=75){
          let res;
          this.array.forEach(i => {
            if ((i.position.x===1)&&(i.position.y===1)) {
              res=true
            }
          })
          if (res){
            this.yPum=10000
          }
          else {
            this.xPum=60;
            this.yPum=27
            item.position.x = 1;
            item.position.y = 1
            this.array.push(item)
          }
        }
        else if (this.yPum<=185){
          let res
          this.array.forEach(i => {
            if ((i.position.x===2)&&(i.position.y===1)) {
              res=true
            }
          })
          if (res){
            this.yPum=10000
          }
          else {
            this.xPum = 60;
            this.yPum = 277
            item.position.x = 2;
            item.position.y = 1
            this.array.push(item)
          }
        }
        else if (this.yPum<=300) {
          let res
          this.array.forEach(i => {
            if ((i.position.x===3)&&(i.position.y===1)) {
              res= true
            }
          })
          if (res){
            this.yPum=10000
          }
          else {
            this.xPum=60;
            this.yPum=527
            item.position.x = 3;
            item.position.y = 1
            this.array.push(item)
          }
        } 
        else {
          this.yPum=10000
        }
      }
      else if (this.xPum<=185){  //第二列
        if (this.yPum<=75){
          let res
          this.array.forEach(i => {
            if ((i.position.x===1)&&(i.position.y===2)) {
              res=true
            }
          })
          if (res){
            this.yPum=10000
          }
          else {
            this.xPum = 307;
            this.yPum = 27
            item.position.x = 1;
            item.position.y = 2
            this.array.push(item)
          }
        }
        else if (this.yPum<=185){
          let res
          this.array.forEach(i => {
            if ((i.position.x===2)&&(i.position.y===2)) {
              res=true
            }
          })
          if (res){
            this.yPum=10000
          }
          else {
            this.xPum = 307;
            this.yPum = 277
            item.position.x = 2;
            item.position.y = 2
            this.array.push(item)
          }
        }
        else if (this.yPum<=300) {
          let res
          this.array.forEach(i => {
            if ((i.position.x===3)&&(i.position.y===2)) {
              res=true
            }
          })
          if (res){
            this.yPum=10000
          }
          else {
            this.xPum = 307;
            this.yPum = 527
            item.position.x = 3;
            item.position.y = 2
            this.array.push(item)
          }
        }
        else this.yPum=10000
      }
      else {  //第三列
        if (this.yPum<=75){
          let res
          this.array.forEach(i => {
            if ((i.position.x===1)&&(i.position.y===3)) {
              res= true
            }
          })
          if (res){
            this.yPum=10000
          }
          else {
            this.xPum=560;
            this.yPum=27
            item.position.x = 1;
            item.position.y = 3
            this.array.push(item)
          }
        }
        else if (this.yPum<=185){
          let res
          this.array.forEach(i => {
            if ((i.position.x===2)&&(i.position.y===3)) {
              res=true
            }
          })
          if (res){
            this.yPum=10000
          }
          else {
            this.xPum = 560;
            this.yPum = 277
            item.position.x = 2;
            item.position.y = 3
            this.array.push(item)
          }
        }
        else if (this.yPum<=300) {
          let res
          this.array.forEach(i => {
            if ((i.position.x===3)&&(i.position.y===3)) {
              res=true
            }
          })
          if (res){
            this.yPum=10000
          }
          else {
            this.xPum = 560;
            this.yPum = 527
            item.position.x = 3;
            item.position.y = 3
            this.array.push(item)
          }
        }
        else this.yPum=10000
      }
      console.log(this.xPum,this.yPum)
      console.log(this.array)
      if (this.yPum===10000){
        this.$set(this.style,index,'')
      }
      else{
        this.$set(this.style,index,'left:'+this.xPum+'rpx;'+'top:'+this.yPum+'rpx;'+'position: absolute;')
      }
      this.flags = false;
      this.position= { x: 0, y: 0 }
      this.nx= '';this.ny= '';this.dx= '';this.dy= '';this.xPum= '';this.yPum= ''
      this.initBcakground()
    },
    async initStyle(){
      this.style=[]
      console.log('ini:',this.style)
      await service.GetMyAll().then(res=>{ //获取我的卡牌
        this.myPokers = pk.toPoker(res.data)
      })
      
      await service.GetMyArray().then(res=>{ //获取我的布阵
        this.array = pk.toPoker(res.data)
      })
      this.myPokers.forEach((pkItem,pkIndex)=>{ //将一布阵的卡牌设置位置
        this.style.push(0)
        this.array.forEach(arItem=>{
          if(pkItem.pokerId == arItem.pokerId){
            if(arItem.position.x == 1){
              if(arItem.position.y == 1){
                this.$set(this.style,pkIndex,'left:60rpx;'+'top:27rpx;'+'position: absolute;')
              }
              else if(arItem.position.y == 2){
                this.$set(this.style,pkIndex,'left:307rpx;'+'top:27rpx;'+'position: absolute;')
              }
              else if(arItem.position.y == 3){
                this.$set(this.style,pkIndex,'left:560rpx;'+'top:27rpx;'+'position: absolute;')
              }
            }
            else if(arItem.position.x == 2){
              if(arItem.position.y == 1){
                this.$set(this.style,pkIndex,'left:60rpx;'+'top:277rpx;'+'position: absolute;')
              }
              else if(arItem.position.y == 2){
                this.$set(this.style,pkIndex,'left:307rpx;'+'top:277rpx;'+'position: absolute;')
              }
              else if(arItem.position.y == 3){
                this.$set(this.style,pkIndex,'left:560rpx;'+'top:277rpx;'+'position: absolute;')
              }
            }
            else if(arItem.position.x == 3){
              if(arItem.position.y == 1){
                this.$set(this.style,pkIndex,'left:60rpx;'+'top:527rpx;'+'position: absolute;')
              }
              else if(arItem.position.y == 2){
                this.$set(this.style,pkIndex,'left:307rpx;'+'top:527rpx;'+'position: absolute;')
              }
              else if(arItem.position.y == 3){
                this.$set(this.style,pkIndex,'left:560rpx;'+'top:527rpx;'+'position: absolute;')
              }
            }
          }
        })
      })
      this.initBcakground()
    }
  },
  watch:{
    array (newData) {
      let data = pk.toDBPoker(newData)
      let userid  = store.state.userId
      data.forEach(item=>{
        item.userId = userid
      })
      service.AddMyArray({pokerList:JSON.stringify(data)})
    }
  },
  onLoad(){
        console.log('onshow:',this.style)
  },
  async onShow () {
     await this.initStyle();
  },
  async mounted () {
    console.log(this.myPokers,this.pokerImg[this.myPokers[0].pokerId],this.myPokers[0].pokerId)
  }
}
</script>

<style scoped>
  body{
    overflow: hidden;
  }
  .con{
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
  }
  .array{
    display: flex;
    width: 750rpx;
    height: 750rpx;
    background: #9911ff;
    flex-wrap: wrap;
  }
  .array-item{
    width: 250rpx;
    height: 250rpx;
    border: 10px solid black;
    box-sizing: border-box;

  }
  .myPoker{
    border-radius: 20rpx;
    border: 10px solid black;
    height: 400rpx;  
    width: 100vw; 
  }
  .myPoker-font{
    height: 80rpx;
    line-height: 80rpx;
    font-size: 20px;
    text-align: center;
    background: #9911ff
  }
  .poker-box{
    display: flex;
    flex-wrap: wrap;
    height: 320rpx;
    width: 100%;
  }
  /* .arrayPokerShow{
    width: 150rpx;
    height: 225rpx;
    background-size: cover;
    background-position: 100% 100%;
  } */
</style>
