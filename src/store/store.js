import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
            userId:'',
            userInfor:{

            },
            globalData:{
                appid:'wxbe7cd0752c8a40a0',
                secret:'32a9917e940e5fe143aed7f883ff3370'
            },
            myInfor:{
                userId : '',
                levelG : '',
                drawNum : '',
                gold : '',
                fatigueNum :''
            }
    },
    mutations: {
        setUserInfor:(state, data) =>{
            state.userInfor = data
        },
        setUserId: (state, data) => {
            state.userId = data
        },
        setMyInfor: (state,data) => {
            state.myInfor = data
        }
    }
})

export default store
