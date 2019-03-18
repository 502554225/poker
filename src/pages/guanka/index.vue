<template>
  <div class="guanka">
    <div class="pk-box">
      <poker v-for="(item,index) in opponent" :key="index" :pokerData="item"></poker>
      <poker v-for="(item,index) in my" :key="index" :pokerData="item"></poker>
    </div>
    <popup  v-if="(success===true) || (success === false)" :success="success"></popup>
  </div>
</template>)

<script>
import poker from '../../components/poker/poker.vue'
import skillList from './skillFuncList'
import popup from '../../components/popup/popup.vue';
import pk from '../../utils/pokersControl.js';
import service from '../../api/service';
import opList from '../../utils/opList.js'
import { setTimeout } from 'timers';
import store from '../../store/store';
import levelList from '../../utils/levelList.js';
export default {
  components:{
    poker,
    popup
  },
  data () { 
    return {
      userInfo: {},
      my:[],
      opponent:[],
      myOrder:[[],[],[]],
      opOrder:[[],[],[]],
      success:'111',
      guanka:0,
      c:0
    }
  },
  computed:{

  },
  methods: {
    upDataOrder(){//更新攻击顺序,根据对方存活卡牌，依据X,Y坐标生成进攻顺序
      console.log('更新进攻顺序')
      this.myOrder=[[],[],[]]
      this.opOrder=[[],[],[]]
      for (let y=3;y>0;y--){
        for(let x=1;x<4;x++){
          this.opponent.forEach((item,index)=>{
            if ((item.position.x===x)&&(item.position.y===y)){
              // console.log(x,y)
              this.myOrder[0].push(index)
            }
          })
          this.my.forEach((item,index)=>{
            if ((item.position.x===x)&&(item.position.y===y)){
              this.opOrder[0].push(index)
            }
          })
        }
      }
      for (let y of [2,3,1]){
        for(let x=1;x<4;x++){
          this.opponent.forEach((item,index)=>{
            if (item.position.x===x&&item.position.y===y){
              this.myOrder[1].push(index)
            }
          })
          this.my.forEach((item,index)=>{
            if (item.position.x===x&&item.position.y===y){
              this.opOrder[1].push(index)
            }
          })
        }
      }
      for (let y of [1,3,2]){
        for(let x=1;x<4;x++){
          this.opponent.forEach((item,index)=>{
            if (item.position.x===x&&item.position.y===y){
              this.myOrder[2].push(index)
            }
          })
          this.my.forEach((item,index)=>{
            if (item.position.x===x&&item.position.y===y){
              this.opOrder[2].push(index)
            }
          })
        }
      }
    },
    async startGame(){
      let vm=this
      vm.roundStart()
    },
    async roundStart(){
      console.log('回合开始')
      this.upDataOrder(); //更新进攻顺序
      let index = 0;
      let vm=this
      let time =0
      this.c= setInterval(async function() {
           if ((index>=(vm.my.length))&&(index>=(vm.opponent.length))){ //终止本回合
             console.log('终止本回合:index:',index,'mylength:',vm.my.length,'oplength:',vm.opponent.length)
             vm.my.forEach(item=>{
               item.action=''
             })
             vm.opponent.forEach(item=>{
               item.action=''
             })
             clearInterval(vm.c)
             vm.upDataOrder()
            //  console.log(vm.my,vm.opponent)
            //  console.log('length',vm.my.length,vm.opponent.length)
             if ((vm.my.length!==0)&&(vm.opponent.length!==0)){ //双方是否还有卡牌存在，是则开启下一回合
               vm.roundStart()
             }
           }  
          console.log('每方的第',index+1,'张卡牌出战')
         if (vm.my[index]) { //我方
           let item = vm.myOrder[vm.my[index].position.y-1].find(item=>{ //根据index找到第一个符合条件的进攻对象
              return vm.opponent[item]
           })
           console.log(item)
          await vm.myAttack(index,item)
           console.log('我方',vm.my[index].position.x,",",vm.my[index].position.y,'进攻',vm.opponent[item].position.x,',',vm.opponent[item].position.y,'完毕')
         }

          vm.isGameOver()
         if (vm.opponent[index]) { //敌方
           setTimeout(await function() {
              let item = vm.opOrder[vm.opponent[index].position.y-1].find(item=>{
                 return vm.my[item]
               })
             vm.opAttack(index,item)
             console.log('敌方',vm.opponent[index].position.x,",",vm.opponent[index].position.y,'进攻',vm.my[item].position.x,',',vm.my[item].position.y,'完毕')

           },1200)
         }

         setTimeout(await function() {
           if (!vm.opponent[index]) {
             time = 1200;
           }
           else{
             time =0;
           }
            vm.isGameOver()
          
           index++
         },1200)
     },(2400-time))
      this.$once('hook:onUnload', () => {         //返回时关闭定时器   
          clearInterval(this.c);                                    
      })
    },
    async isGameOver(){ 
      let vm = this
      if (vm.my.length===0||vm.opponent.length===0){ //如果一方牌全军覆没则结束对战
        if(vm.my.length===0) {
          vm.$set(vm,'success',false)
        }
        else {
          vm.$set(vm,'success',true)
          let myInfor = store.state.myInfor
          await service.AddLevel({level:levelList[myInfor.levelG-1].level})
          console.log(myInfor.levelG,';;;',this.guanka)
          if(myInfor.levelG<=this.guanka){
            myInfor.drawNum+=levelList[myInfor.levelG-1].drawNum
            myInfor.gold+=levelList[myInfor.levelG-1].gold
            myInfor.levelG++ 
            await service.SaveMyInfor({'infor':JSON.stringify(myInfor)}) //更新关卡
          }
        }
        clearInterval(this.c)
      }
    },
    myAttack:async function(num1, num2) { 
      // console.log('myA',num1,num2)
      let vm =this
      if (vm.my[num1].vigour>=100){ //如果气势大于100则使用技能
        // console.log('>100<')
        await this.skill('op',num1,num2,this.my[num1].skill)
      }
      else{ //否则普通攻击
        this.$set(this.my[num1],'action',"my-atc-" + vm.opponent[num2].position.x+'-'+vm.opponent[num2].position.y)
        setTimeout(await function() {
          vm.damage('op',num1,num2,1)
        },400)
        this.$set(this.my[num1],'vigour',this.my[num1].vigour+25) //增加气势
        this.$set(this.opponent[num2],'vigour',this.opponent[num2].vigour+25)

      }


    },
    async opAttack(num1,num2){
      let vm =this
      let action =  this.opponent[num1].action
      console.log('前class:',action)
      if (vm.opponent[num1].vigour>=100){
        // console.log('>100<')
        this.skill('my',num1,num2,this.opponent[num1].skill)
      }
      else {
        // this.$set(this.opponent[num1], 'action', "op-atc-" + vm.my[num2].position.x + '-' + vm.my[num2].position.y)
       this.opponent[num1].action = "op-atc-" + vm.my[num2].position.x + '-' + vm.my[num2].position.y
       console.log('后class:',this.opponent[num1].action)
        setTimeout(await function() {
          vm.damage('my',num1,num2,1)
        },400)
        this.$set(this.opponent[num1],'vigour',this.opponent[num1].vigour+25)
        this.$set(this.my[num2],'vigour',this.my[num2].vigour+25)
      }
    },
    damage(str,num1,num2,x){ //伤害计算
      let poker1;
      let poker2;
      let damage;
      if (str==='my'){
        poker1=this.opponent[num1]
        poker2=this.my[num2]
      }
      if (str==='op'){
        poker1=this.my[num1]
        poker2=this.opponent[num2]
      }
      // if (poker1.vigour>=100){ //其实大于100触发绝技
      //
      // }
      // else{ //气势小于100则普工
        let aggressivity1= poker1.aggressivity;
        let defenses2= poker2.defenses;

        let doubleDamage=1.5;//爆伤
        let hit = (1-0.2)*(1-poker2.evade)*(poker1.hit);      
        let crits = poker1.crits-poker2.indomitableness;
        if (Math.random()>=hit){//生成随机数，若大于命中几率则闪避
          // console.log('闪避')
          if (str==='my'){ //伤害反馈到界面
              this.$set(this.my[num2],'isEvade',true)
              // let vm=this;
              // setTimeout(function() {
              //   vm.$set(this.my[num2],'isEvade',false)
              // },450)
          }
          if (str==='op'){ //伤害反馈到界面
              this.$set(this.opponent[num2],'isEvade',true)
              // let vm=this;
              // setTimeout(function() {
              //   vm.$set(this.opponent[num2],'isEvade',false)
              // },450)
          }
          // if (str ==='op') {
          //   if (damage!==0){
          //     let life = this.opponent[num2].life-damage;
          //     this.$set(this.opponent[num2],'life',life)
          //     if (this.opponent[num2].life<=0){
          //       this.opponent.splice(num2,1)
          //       // this.$set(this,'my',this.opponent)
          //       this.upDataOrder()
          //     } ;
          //   }
          // }
          return
        }
        else {

          if (Math.random()>=crits){ //如果为暴击则伤害倍数为1
            doubleDamage =1;
            // console.log('没暴击')
          }
          damage = (aggressivity1)*doubleDamage*x-defenses2;
          if(damage<=0) damage = 1
        // }
      }

      if (str==='my'){ //伤害反馈到界面
        if (damage!==0){
          let life = this.my[num2].life-damage;
          this.$set(this.my[num2],'life',life)
          if (this.my[num2].life<=0){
            this.my.splice(num2,1)
            // this.$set(this,'my',this.my)
            this.upDataOrder()
          }
        }
      }
      if (str ==='op') {
        if (damage!==0){
          let life = this.opponent[num2].life-damage;
          this.$set(this.opponent[num2],'life',life)
          if (this.opponent[num2].life<=0){
            this.opponent.splice(num2,1)
            // this.$set(this,'my',this.opponent)
            this.upDataOrder()
          } ;
        }
        }

    },
    skill(str,num1,num2,skillNum){
      let vm=this
      skillList[skillNum](vm,str,num1,num2)
    },
    async init(levelG){
      this.userInfo= {}
      // let levelG = store.state.myInfor.levelG
      let opponent 
      let my
      await service.ToArray({'opList':JSON.stringify(opList[levelG-1])}).then(res=>{
        opponent = pk.computed(pk.toPoker(res.data))
      })  
      opponent.forEach(item=>{
        item.isEvade = false
      })
      this.opponent = opponent
      this.myOrder=[[],[],[]]
      this.opOrder=[[],[],[]]
      this.success='111'
      await service.GetMyArray().then(res=>{
        my = pk.computed(pk.toPoker(res.data))
      })
      my.forEach(item=>{
        item.isEvade = false
      })
      this.my = my
      // let mypk = []
      console.log('my:',this.my)
      let length = this.my.length
      console.log('op:',this.opponent)
      let min 
      for(let j = 0; j < length; i++){ 
        for(let i = length-1; i >= j; i--){
          if((this.my[i].position.x*10+this.my[i].position.y) < (this.my[i-1].position.x*10+this.my[i-1].position.y)){
            min = this.my[i]
            this.my[i] = this.my[i-1]
            this.my[i-1] = min
            console.log('my:',this.my)
            return this.my
          }
        }
      }
      console.log(this.my)
    }
  },
  async onLoad(){
    
  },
  async onShow(){
    this.guanka = this.$root.$mp.query.num
    await this.init(this.guanka)
    this.startGame()
  },
  async mounted(){
    
  },
  onUnload(){
    console.log('onUnload')
    console.log(this.roundStart())
    wx.redirectTo({
      url: '/pages/logs/main'
    })
    // clearInterval(this.roundStart().c)
  }
}
</script>

<style scoped>
.guanka{
  position: relative;
}
.pk-box{
  position: relative;
  margin-left: 100rpx;
  margin-right: 100rpx;
  height: 100vh;
  background: #91f;
}
.popup{
 
}
</style>
