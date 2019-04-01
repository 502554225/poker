<template>
  <div class="counter-warp">
    <div class="counter-main">
      <button size="mini" @click="decrement">-</button>
      <div class="font">扫荡{{ count }}次</div>
      <button size="mini" @click="increment">+</button>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      count:0
    }
  },
  methods: {
    increment () {
      if(this.count<40) 
      this.count++
    },
    decrement () {
      if(this.count>=1) 
      this.count--
    }
  }
}
</script>

<style>
.counter-warp {
  width: 100%;
  text-align: center;
}
.counter-main{
  width: 100%;
  display: flex;
  justify-content: space-between
}
.font{
  flex: auto;
  font-size: 16px;
  line-height: 64rpx;
}
</style>
