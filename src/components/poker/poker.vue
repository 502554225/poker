<style>
  @import "pokerAnimaion.css";
  @import "lifeAnimaion.css";
</style>
<template>
    <div v-if="pokerData.survival === 1" class="poker" :class="[positionClass,pokerData.action,test]" @click="change">
      <div class="life-vigour-box">
        <div class="life-box">
          <div class="life" :class="'life'+(pokerData.life-pokerData.life%10)"></div>
        </div>
        <div class="vigour-box">
          <div class="vigour" :class="'vigour'+pokerData.vigour"></div>
        </div>
      </div>
      <div class="img">
        {{pokerData.life}}
        {{pokerData.vigour}}
        {{pokerData.aggressivity}}
        {{pokerData.defenses}}
      </div>
      <span class="damage" :class="{'damageAn':damageClass}">{{damage}}</span>
    </div>
</template>

<script>
  export default {
    name: "",
    data(){
      return{
        test:'',
        damage:0,
        damageClass:false,
      }
    },
    props:{
      pokerData: {}
    },
    computed:{
      positionClass(){
        let ascription;
        if (this.pokerData.ascription===1){
          ascription='as'
        }
        else ascription='my'
        return ascription+'-'+this.pokerData.position.x+'-'+this.pokerData.position.y;
      },
      action(){
        return this.pokerData.action;
      }
    },
    methods:{
      change(){
        this.test='test'
      }
    },
    watch:{
      'pokerData.life': {
        deep: true,
        handler(val,ov){
          if (val!==ov){
            this.damage=(val*10000-ov*10000)/10000;
            this.damageClass=true;
            let vm=this;
            setTimeout(function() {
              vm.damageClass=false
            },450)
            // this.life=val-val%10
          }
        }
      },
      'pokerData.isEvade':{
        deep:true,
        handler(){
          if(this.pokerData.isEvade){
          this.damageClass = true;
          this.damage = '闪避';
          let vm =this
          setTimeout(function() {
            vm.damageClass=false
          },450)
        }
        }
      }
    },
    create(){
      // this.imgSrc=pokerData
    },
    mounted(){
      // console.log(this.pokerData)
      
    }
  };
</script>

<style scoped>
  div,span,button{
    box-sizing: border-box;
  }
  .poker{
    position: relative;
    width: 160rpx;
    height:160rpx;
    background: #aaaaaa;
    border:  1rpx solid #000;
  }
  .poker image{
    width: 100%;
    height: 100%;
  }
  .as-1-1{
    position: absolute;
    right: 10rpx;
    top: 370rpx;
  }
  .as-1-2{
    position: absolute;
    right: 193rpx;
    top: 370rpx;
  }
  .as-1-3{
    position: absolute;
    right: 375rpx;
    top: 370rpx;
  }
  .as-2-1{
    position: absolute;
    right: 10rpx;
    top: 190rpx;
  }
  .as-2-2{
    position: absolute;
    right: 193rpx;
    top: 190rpx;
  }
  .as-2-3{
    position: absolute;
    right: 375rpx;
    top: 190rpx;
  }
  .as-3-1{
    position: absolute;
    right: 10rpx;
    top: 10rpx;
  }
  .as-3-2{
    position: absolute;
    right: 193rpx;
    top: 10rpx;
  }
  .as-3-3{
    position: absolute;
    right: 375rpx;
    top: 10rpx;
  }

  .my-1-3{
    position: absolute;
    right: 10rpx;
    bottom: 370rpx;
  }
  .my-1-2{
    position: absolute;
    right: 193rpx;
    bottom: 370rpx;
  }
  .my-1-1{
    position: absolute;
    right: 375rpx;
    bottom: 370rpx;
  }
  .my-2-3{
    position: absolute;
    right: 10rpx;
    bottom: 190rpx;
  }
  .my-2-2{
    position: absolute;
    right: 193rpx;
    bottom: 190rpx;
  }
  .my-2-1{
    position: absolute;
    right: 375rpx;
    bottom: 190rpx;
  }
  .my-3-3{
    position: absolute;
    right: 10rpx;
    bottom: 10rpx;
  }
  .my-3-2{
    position: absolute;
    right: 193rpx;
    bottom: 10rpx;
  }
  .my-3-1{
    position: absolute;
    right: 375rpx;
    bottom: 10rpx;
  }
  .popup{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(44,44,44,0.66);
    z-index: 50;
  }
  @keyframes test{
    50%{
      right: 300rpx;
      top: 10rpx;
    }
  }
  .test{
    animation: test 1.0s ease both;
  }
  @keyframes damage{
    0%{
      visibility: hidden;

    }
    50%{
      visibility: visible;
    }
    99%{
      transform: translateY(-40rpx);
    }
    100%{
      visibility: hidden;

    }
  }
  .damageAn{
    animation: damage 1.0s ease both;
  }
  .damage{
    position: absolute;
    top: 10rpx;
    text-align: center;
    visibility: hidden;
  }
  .life-vigour-box{
    height: 20rpx;
    width: 160rpx;
  }
  .life-box{
    float: left;
    height: 20rpx;
    width: 50%;
    border: 2rpx solid #fff;
    border-right: 0;
    vertical-align: top;
  }
  .life{
    height: 16rpx;
    background: red;
    /*margin-top: 2rpx;*/
    /*margin-left: 2rpx;*/
  }
  .vigour-box{
    float: right;
    margin-right: 3rpx;
    height: 20rpx;
    width: 48%;
    border: 2rpx solid #fff;
    vertical-align: top;
  }
  .vigour{
    height: 16rpx;
    background: orange;
    /*margin-top: 2rpx;*/
    /*margin-right: 2rpx;*/
  }
</style>
