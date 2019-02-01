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
export default {
  components:{
    poker,
    popup
  },
  data () { 
    return {
      userInfo: {},
      my:[
          // {
          //   life: 100,
          //   aggressivity: 55,//攻击力
          //   defenses: 5,//防御力
          //   vigour: 100,//气势
          //   crits: 0,//暴击
          //   indomitableness: 0,//韧劲
          //   evade: 0,//闪避
          //   hit: 1,//命中
          //   skill: 2,//技能
          //   survival:1, //是否存在
          //   action:'',
          //   ascription:0,//归属 0为我
          //   position:{
          //     x:1,
          //     y:1
          //   }
          // },
          
          // {
          //   life: 100,
          //   aggressivity: 55,//攻击力
          //   defenses: 5,//防御力
          //   vigour: 100,//气势
          //   crits: 0,//暴击
          //   indomitableness: 0,//韧劲
          //   evade: 0,//闪避
          //   hit: 1,//命中
          //   skill: 3,//技能
          //   survival:1,
          //   action:'',
          //   ascription:0,
          //   position:{
          //     x:2,
          //     y:1
          //   }
          // },
          
          // {
          //   life: 100,
          //   aggressivity: 55,//攻击力
          //   defenses: 5,//防御力
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
          //     x:3,
          //     y:1
          //   }
          // },
          // {
          //   life: 100,
          //   aggressivity: 55,//攻击力
          //   defenses: 5,//防御力
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
          //     x:3,
          //     y:2
          //   }
          // },
          // {
          //   life: 100,
          //   aggressivity: 10,//攻击力
          //   defenses: 5,//防御力
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
          //     x:3,
          //     y:3
          //   }
          // },

      ],
      opponent:[
          // {
          //   life: 100,
          //   aggressivity: 10,//攻击力
          //   defenses: 5,//防御力
          //   vigour: 0,//气势
          //   crits: 0,//暴击
          //   indomitableness: 0,//韧劲
          //   evade: 0,//闪避
          //   hit: 1,//命中
          //   skill: 0,//技能
          //   survival:1,
          //   action:'',
          //   ascription:1,
          //   position:{
          //     x:1,
          //     y:1
          //   }
          // },
          // {
          //   life: 100,
          //   aggressivity: 10,//攻击力
          //   defenses: 5,//防御力
          //   vigour: 0,//气势
          //   crits: 0,//暴击
          //   indomitableness: 0,//韧劲
          //   evade: 0,//闪避
          //   hit: 1,//命中
          //   skill: 0,//技能
          //   survival:1,
          //   action:'',
          //   ascription:1,
          //   position:{
          //     x:2,
          //     y:3
          //   }
          // },
          // {
          //   life: 100,
          //   aggressivity: 10,//攻击力
          //   defenses: 5,//防御力
          //   vigour: 0,//气势
          //   crits: 0,//暴击
          //   indomitableness: 0,//韧劲
          //   evade: 0,//闪避
          //   hit: 1,//命中
          //   skill: 0,//技能
          //   survival:1,
          //   action:'',
          //   ascription:1,
          //   position:{
          //     x:3,
          //     y:1
          //   }
          // },
          // {
          //   life: 100,
          //   aggressivity: 10,//攻击力
          //   defenses: 5,//防御力
          //   vigour: 0,//气势
          //   crits: 0,//暴击
          //   indomitableness: 0,//韧劲
          //   evade: 0,//闪避
          //   hit: 1,//命中
          //   skill: 0,//技能
          //   survival:1,
          //   action:'',
          //   ascription:1,
          //   position:{
          //     x:3,
          //     y:2
          //   }
          // },
          // {
          //   life: 100,
          //   aggressivity: 10,//攻击力
          //   defenses: 5,//防御力
          //   vigour: 0,//气势
          //   crits: 0,//暴击
          //   indomitableness: 0,//韧劲
          //   evade: 0,//闪避
          //   hit: 1,//命中
          //   skill: 0,//技能
          //   survival:1,
          //   action:'',
          //   ascription:1,
          //   position:{
          //     x:3,
          //     y:3
          //   }
          // },

      ],
      myOrder:[[],[],[]],
      opOrder:[[],[],[]],
      success:'111'
    }
  },
  computed:{

  },
  methods: {
    upDataOrder(){//更新攻击顺序,根据对方存活卡牌，一句X,Y坐标生成进攻顺序
      this.myOrder=[[],[],[]]
      this.opOrder=[[],[],[]]
      for (let y=3;y>0;y--){
        for(let x=1;x<4;x++){
          this.opponent.forEach((item,index)=>{
            if ((item.position.x===x)&&(item.position.y===y)){
              console.log(x,y)
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

      console.log('对战开始')
      let vm=this
      vm.roundStart()
    },
    async roundStart(){
      console.log('回合开始')
      this.upDataOrder(); //更新进攻顺序
      console.log(this.myOrder,this.opOrder)
      let index = 0;
      let vm=this
      let time =0
      let c= setInterval(async function() {

         if (vm.my[index]) { //我方
           console.log('动作')
           console.log('index',index)
           let item = vm.myOrder[vm.my[index].position.y-1].find(item=>{ //根据index找到第一个符合条件的进攻对象
              return vm.opponent[item]
           })
           vm.myAttack(index,item)
         }
         if (vm.opponent[index]) { //敌方
           setTimeout(await function() {
              let item = vm.opOrder[vm.opponent[index].position.y-1].find(item=>{
                 return vm.my[item]
               })
             vm.opAttack(index,item)
           },1200)
         }
         setTimeout(await function() {
           if (!vm.opponent[index]) {
             time = 1200;
           }
           else{
             time =0;
           }
           if (vm.my.length===0||vm.opponent.length===0){ //如果一方牌全军覆没则结束对战
              if(vm.my.length===0) {
                vm.$set(vm,'success',false)
                console.log('ennnnnnnnnnnnnnnnnnnnnnnnd:',this.success)
              }
              else {
                vm.$set(vm,'success',true)
                console.log('ennnnnnnnnnnnnnnnnnnnnnnnd:',this.success)
              }
             clearInterval(c)
           }
           if ((index>=(vm.my.length-1))&&(index>=(vm.opponent.length-1))){ //终止本回合
             console.log('next')
             vm.my.forEach(item=>{
               item.action=''
             })
             vm.opponent.forEach(item=>{
               item.action=''
             })
             clearInterval(c)
             vm.upDataOrder()
             console.log(vm.my,vm.opponent)
             console.log('length',vm.my.length,vm.opponent.length)
             if ((vm.my.length!==0)&&(vm.opponent.length!==0)){ //双方是否还有卡牌存在，是则开启下一回合
               vm.roundStart()
             }

           }
           index++
           console.log(index)
         },1200)
     },(2400-time))
      this.$once('hook:onUnload', () => {         //返回时关闭定时器   
          clearInterval(c);                                    
      })
    },
    myAttack:async function(num1, num2) {
      console.log('myA',num1,num2)
      let vm =this
      if (vm.my[num1].vigour>=100){ //如果气势大于100则使用技能
        console.log('>100<')
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
      console.log('opA',num1,num2)
      let vm =this
      if (vm.my[num1].vigour>=100){
        console.log('>100<')
        this.skill('my',num1,num2,this.opponent[num1].skill)
      }
      else {
        this.$set(this.opponent[num1], 'action', "op-atc-" + vm.my[num2].position.x + '-' + vm.my[num2].position.y)
        setTimeout(await function() {
          vm.damage('my',num1,num2,1)
        },400)


          this.$set(this.opponent[num1],'vigour',this.opponent[num1].vigour+25)
          this.$set(this.my[num2],'vigour',this.my[num2].vigour+25)

      }
    },
    damage(str,num1,num2,x){ //普工
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
        let hit = poker1.hit-poker2.evade;
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
          damage = (aggressivity1-defenses2)*doubleDamage*x;
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
    init(){
      this.userInfo= {}
      this.my=[
          {
            life: 100,
            aggressivity: 55,//攻击力
            defenses: 5,//防御力
            vigour: 100,//气势
            crits: 0,//暴击
            indomitableness: 0,//韧劲
            evade: 0,//闪避
            hit: 1,//命中
            skill: 2,//技能
            survival:1, //是否存在
            action:'',
            ascription:0,//归属 0为我
            position:{
              x:1,
              y:1
            },
            isEvade:false
          },
          
          {
            life: 100,
            aggressivity: 55,//攻击力
            defenses: 5,//防御力
            vigour: 100,//气势
            crits: 0,//暴击
            indomitableness: 0,//韧劲
            evade: 0,//闪避
            hit: 1,//命中
            skill: 3,//技能
            survival:1,
            action:'',
            ascription:0,
            position:{
              x:2,
              y:1
            },
            isEvade:false
          },
          
          {
            life: 100,
            aggressivity: 55,//攻击力
            defenses: 5,//防御力
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
              x:3,
              y:1
            },
            isEvade:false
          },
          {
            life: 100,
            aggressivity: 55,//攻击力
            defenses: 5,//防御力
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
              x:3,
              y:2
            },
            isEvade:false
          },
          {
            life: 100,
            aggressivity: 10,//攻击力
            defenses: 5,//防御力
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
              x:3,
              y:3
            },
            isEvade:false
          },

      ]
      this.opponent=[
          {
            life: 100,
            aggressivity: 10,//攻击力
            defenses: 5,//防御力
            vigour: 0,//气势
            crits: 0,//暴击
            indomitableness: 0,//韧劲
            evade: 0,//闪避
            hit: 1,//命中
            skill: 0,//技能
            survival:1,
            action:'',
            ascription:1,
            position:{
              x:1,
              y:1
            },
            isEvade:false
          },
          {
            life: 100,
            aggressivity: 10,//攻击力
            defenses: 5,//防御力
            vigour: 0,//气势
            crits: 0,//暴击
            indomitableness: 0,//韧劲
            evade: 0,//闪避
            hit: 1,//命中
            skill: 0,//技能
            survival:1,
            action:'',
            ascription:1,
            position:{
              x:2,
              y:3
            },
            isEvade:false
          },
          {
            life: 100,
            aggressivity: 10,//攻击力
            defenses: 5,//防御力
            vigour: 0,//气势
            crits: 0,//暴击
            indomitableness: 0,//韧劲
            evade: 0,//闪避
            hit: 1,//命中
            skill: 0,//技能
            survival:1,
            action:'',
            ascription:1,
            position:{
              x:3,
              y:1
            },
            isEvade:false
          },
          {
            life: 100,
            aggressivity: 10,//攻击力
            defenses: 5,//防御力
            vigour: 0,//气势
            crits: 0,//暴击
            indomitableness: 0,//韧劲
            evade: 0,//闪避
            hit: 1,//命中
            skill: 0,//技能
            survival:1,
            action:'',
            ascription:1,
            position:{
              x:3,
              y:2
            },
            isEvade:false
          },
          {
            life: 100,
            aggressivity: 10,//攻击力
            defenses: 5,//防御力
            vigour: 0,//气势
            crits: 0,//暴击
            indomitableness: 0,//韧劲
            evade: 0,//闪避
            hit: 0,//命中
            skill: 0,//技能
            survival:1,
            action:'',
            ascription:1,
            position:{
              x:3,
              y:3
            },
            isEvade:false
          },

      ]
      this.myOrder=[[],[],[]]
      this.opOrder=[[],[],[]]
      this.success='111'
      
    }
  },

  created () {
    console.log('created')

  },
  mounted(){
    
    this.init()
    console.log('mounted')
    // window.addEventListener("popstate",function(e) {
    // wx.closeWindow();
    // },false)
    this.startGame()
  },
  onShow() {
    console.log('onshow')
  },
  onHide() {
    console.log('onHide')
  },
  onLoad(){
   console.log('onLoad')
  },
  destory(){
    console.log('destory')
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
