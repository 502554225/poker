<template>
  <div class="counter-warp">
    <div class="counter-main">
      <button size="mini" @click="decrement">-</button>
      <p>扫荡{{ count }}次</p>
      <button size="mini" @click="increment">+</button>
    </div>
  </div>
</template>

<script>
// Use Vuex
// import store from './store'

export default {
  data(){
    return {
      count:0
    }
  },
  methods: {
    increment () {
      // store.commit('increment')
      this.count++
    },
    decrement () {
      // store.commit('decrement')
      this.count--
    }
  }
}
</script>

<style>
.counter-warp {
  text-align: center;
}
.counter-main{
  display: flex;
}

</style>
