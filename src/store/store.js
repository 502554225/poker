import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
            userId:'',
            globalData:{
                appid:'wxbe7cd0752c8a40a0',
                secret:'32a9917e940e5fe143aed7f883ff3370'
            }
    },
    mutations: {
        setUserId: (state, data) => {
            state.userId = data
        },
    }
})

export default store
