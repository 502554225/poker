<template>
  <div class="guanka">
    <div class="pk-box">
      <poker v-for="(item,index) in opponent" :key="index" :pokerData="item"></poker>
      <poker v-for="(item,index) in my" :key="index" :pokerData="item"></poker>
    </div>
    <img src="../../../static/img/skill.png" :class="{'skillAn' : skillN===1||skillN===7}" class="skill" style="top:70rpx" background-size:cover>
    <img src="../../../static/img/skill.png" :class="{'skillAn' : skillN===2||skillN===7}" class="skill" style="top:240rpx" background-size:cover>
    <img src="../../../static/img/skill.png" :class="{'skillAn' : skillN===3||skillN===7}" class="skill" style="top:410rpx" background-size:cover>
    <img src="../../../static/img/skill.png" :class="{'skillAn' : skillN===4||skillN===8}" class="skill" style="top:705rpx" background-size:cover>
    <img src="../../../static/img/skill.png" :class="{'skillAn' : skillN===5||skillN===8}" class="skill" style="top:875rpx" background-size:cover>
    <img src="../../../static/img/skill.png" :class="{'skillAn' : skillN===6||skillN===8}" class="skill" style="top:1075rpx" background-size:cover>
    <popup :title="success ? '成功' : '失败'" :reward="rewardShow" :words="success ? '你已消灭所有敌人' : '还差那么一点点'" :to="{page:'logs'}" :show="popupShow" @confirm="confirm"></popup>
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
import {myList1,opList1} from "../../utils/imgSrc.js";
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
      myList:[],
      opList:[],
      success:'111',
      guanka:0,
      c:0,
      popupShow:false,
      rewardShow:{
        isShow:false,
        numList:[0,0,0]
      },
      skillN:0
    }
  },
  computed:{

  },
  methods: {
    confirm(){
      this.popupShow = false;
      clearInterval(this.c);      
    },
    upDataOrder(){//更新攻击顺序,根据对方存活卡牌，依据X,Y坐标生成进攻顺序
      console.log('更新进攻顺序')
      this.isGameOver()
      this.skillN = 0
      this.myOrder=[[],[],[]]
      this.opOrder=[[],[],[]]
      for (let y of [3,2,1]){  
        for(let x=1;x<4;x++){
          this.opponent.forEach((item,index)=>{
            if ((item.position.x===x)&&(item.position.y===y)&&item.survival===1){
              this.myOrder[0].push(index)
            }
          })
          this.my.forEach((item,index)=>{
            if ((item.position.x===x)&&(item.position.y===y)&&item.survival===1){
              this.opOrder[0].push(index)
            }
          })
        }
      }
      for (let y of [2,3,1]){
        for(let x=1;x<4;x++){
          this.opponent.forEach((item,index)=>{
            if (item.position.x===x&&item.position.y===y&&item.survival===1){
              this.myOrder[1].push(index)
            }
          })
          this.my.forEach((item,index)=>{
            if (item.position.x===x&&item.position.y===y&&item.survival===1){
              this.opOrder[1].push(index)
            }
          })
        }
      }
      for (let y of [1,2,3]){
        for(let x=1;x<4;x++){
          this.opponent.forEach((item,index)=>{
            if (item.position.x===x&&item.position.y===y&&item.survival===1){
              this.myOrder[2].push(index)
            }
          })
          this.my.forEach((item,index)=>{
            if (item.position.x===x&&item.position.y===y&&item.survival===1){
              this.opOrder[2].push(index)
            }
          })
        }
      }
      this.myList = []
      this.opList = []
      this.my.forEach((item,index)=>{
        if(item.survival === 1) this.myList.push(index)
      })
      this.opponent.forEach((item,index)=>{
        if(item.survival === 1) this.opList.push(index)
      })
      console.log('数据更新,myorder:',this.myOrder,'opOrder:',this.opOrder)
      console.log('myList:',this.myList,'opList:',this.opList)
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
      this.c= setInterval(async ()=> {
            time = 0  
           if ((index>=(this.myList.length))&&(index>=(this.opList.length))){ //终止本回合
             console.log('终止本回合:index:',index)
             this.my.forEach(item=>{
               item.action=''
             })
             this.opponent.forEach(item=>{
               item.action=''
             })
             clearInterval(this.c)
             this.upDataOrder()
             let MY = this.my.some((item)=>{ //有任意一张存在则返回true 
               return item.survival === 1
             })
             let OP = this.opponent.some((item)=>{ 
               return item.survival === 1
              })
             if (MY&&OP){ //双方是否还有卡牌存在，是则开启下一回合
                console.log('开始下一回合')
               this.roundStart()
             }
           }  
          console.log('INDEX:',index,'========')
         if (this.myList[index]>=0) { //我方
            let index2 = this.myList[index]
            console.log('myindex2:',index2)
            let item = this.myOrder[this.my[index2].position.y-1].find(item=>{ //根据index找到第一个符合条件的进攻对象
                return this.opponent[item]
            })
            await this.myAttack(index2,item)
            console.log('我方',this.my[index2],",",'进攻',this.opponent[item],'完毕')
         }
          this.isGameOver()
         if (this.opList[index]>=0) { //敌方
            let index2 = this.opList[index]
            console.log('opindex2:',index2)
            setTimeout(await function() {
                let item = this.opOrder[this.opponent[index2].position.y-1].find(item=>{
                  return this.my[item]
                })
              this.opAttack(index2,item)
              console.log('敌方',this.opponent[index2],",",'进攻',this.my[item],'完毕')

            }.bind(this),1200)
         }

         setTimeout(await function() {
           if (!(this.opList>=0)||!(this.myList>=0)) {
             time = 1200;
           }
           if (!(this.opList>=0)&&!(this.myList>=0)) {
             time = 2399;
           }
           if((this.opList>=0)&&(this.myList>=0)){
             time =0;
           }
            // this.isGameOver()
           index++
         }.bind(this),1200)
     },(2400-time))
      this.$once('hook:onUnload', () => {         //返回时关闭定时器   
          clearInterval(this.c);                                    
      })
    },
    setSkillN(num){
      console.log('setSkill')
      this.skillN=num
    },
    async isGameOver(){ 
      console.log('skillN:',this.skillN)
      let vm = this
      let MY = this.my.every((item)=>{ //所有不存在则返回true 
        return item.survival === 0
      })
      let OP = this.opponent.every((item)=>{ 
        return item.survival === 0
      })
      if (MY||OP){ //如果一方牌全军覆没则结束对战
        if(MY) {
          vm.$set(vm,'success',false)
          this.popupShow = true
        }
        else {
          vm.$set(vm,'success',true)
          let myInfor = store.state.myInfor
          let level = levelList[myInfor.levelG-1] //计算对应关卡的经验
          await service.AddLevel({level:level.level})
          this.rewardShow.isShow = true
          this.rewardShow.numList[0] = level.level
          await service.GetMyArray().then(res=>{
            res.data.forEach(item=>{
              item.level += level.level
            })
            service.AddMyArray({pokerList:JSON.stringify(res.data)})
          })
          this.rewardShow.numList[1] = level.gold 
          myInfor.gold+=levelList[myInfor.levelG-1].gold
          if(myInfor.levelG<=this.guanka){
            myInfor.drawNum+=levelList[myInfor.levelG-1].drawNum
            myInfor.levelG++ 
            this.rewardShow.numList[2] = level.drawNum
          }
          this.popupShow = true
          console.log('sih:',this.rewardShow)
          await service.SaveMyInfor({'infor':JSON.stringify(myInfor)}) //更新关卡
        }
        clearInterval(this.c)
      }
    },
    myAttack:async function(num1, num2) { 
      let vm =this
      if (vm.my[num1].vigour>=100){ //如果气势大于100则使用技能
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
      if (vm.opponent[num1].vigour>=100){
        this.skill('my',num1,num2,this.opponent[num1].skill)
      }
      else {
       this.opponent[num1].action = "op-atc-" + vm.my[num2].position.x + '-' + vm.my[num2].position.y
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
          }
          if (str==='op'){ //伤害反馈到界面
              this.$set(this.opponent[num2],'isEvade',true)
          }
          return
        }
        else {
          if (Math.random()>=crits){ //如果为暴击则伤害倍数为1
            doubleDamage =1;
          }
          damage = ((aggressivity1*10000)*(doubleDamage*10)*(x*10)-defenses2*1000000)/1000000;//解决浮点类型bug
          console.log('D  A  M A  G  E:',damage)
          if(damage<=0) damage = 1
        // }
        }

      if (str==='my'){ //数值计算
        if (damage!==0){
          let life = (this.my[num2].life*100000-damage*100000)/100000; //解决浮点类型bug
          this.$set(this.my[num2],'life',life)
          if (this.my[num2].life<=0){
            // this.my.splice(num2,1)
            this.my[num2].survival = 0;
            this.upDataOrder()
          }
        }
      }
      if (str ==='op') {
        if (damage!==0){
          let life = this.opponent[num2].life-damage;
          this.$set(this.opponent[num2],'life',life)
          if (this.opponent[num2].life<=0){
            this.opponent[num2].survival = 0;
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
      let opponent 
      let my
      await service.ToArray({'opList':JSON.stringify(opList[levelG-1])}).then(res=>{
        opponent = pk.computed(pk.toPoker(res.data))
      })  
      opponent.forEach((item,index)=>{
        item.isEvade = false
        item.survival = 1
        item.src = opList1[item.pokerId]
      })
      this.opponent = opponent
      this.myOrder=[[],[],[]]
      this.opOrder=[[],[],[]]
      this.success='111'
      this.popupShow=false
      await service.GetMyArray().then(res=>{
        my = pk.computed(pk.toPoker(res.data))
      })
      my.forEach(item=>{
        item.isEvade = false //是否闪避
        item.survival = 1
        item.src = myList1[item.pokerId]
      })
      this.my = my
      console.log('my:',this.my)
      let length = this.my.length
      console.log('op:',this.opponent)
      let min 
      console.log('len:',length)
      for(let j = 0; j < length; j++){ 
        for(let i = length-1; i > j; i--){
          if((this.my[i].position.x*10+this.my[i].position.y)<(this.my[i-1].position.x*10+this.my[i-1].position.y)){
            min = this.my[i]
            this.my[i] = this.my[i-1]
            this.my[i-1] = min
            return this.my
          }
        }
      }
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
    clearInterval(this.c)
    wx.redirectTo({
      url: '/pages/logs/main'
    })
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
.skill{
  position: absolute;
  height: 100rpx;
  width: 100rpx;
  z-index: 1000;
  left: 120rpx;
  visibility: hidden;
}
@keyframes skill{
  0%{
    left: 120rpx;
    visibility:visible;
  }
  1%{
    left: 120rpx;
    visibility:visible;
  }
  99%{
    left: 550rpx;
    visibility:visible;
  }
  100%{
    left: 120rpx;
    visibility:hidden;
  }
}
.skillAn{
  animation: skill 1.0s ease both;
}
</style>
