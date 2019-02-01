import Vue from 'vue'
import App from './App'
// import MpvueRouterPatch from 'mpvue-router-patch'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
// Vue.use(MpvueRouterPatch)
app.$mount()
