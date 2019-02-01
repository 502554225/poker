<template>
  <div class="container" @click="clickHandle('test click', $event)">

    <div class="userinfo" @click="bindViewTap">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div>

    <div class="usermotto">
      <div class="user-motto">
        <card :text="motto"></card>
      </div>
    </div>

    <button open-type='getUserInfo' >获取授权</button>
  </div>
</template>

<script>
import card from '@/components/card'
import store from '../../store/store.js'
import service from '../../api/login.js'

export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {}
    }
  },

  components: {
    card
  },

  methods: {
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: (res) => {
          var code = res.code
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
              var globalData = store.state.globalData
              
              wx.request({
                url: 'https://api.weixin.qq.com/sns/jscode2session?appid='+globalData.appid+'&secret='+globalData.secret+'&js_code='+ code +'&grant_type=authorization_code',
                data: {},
                header: {
                    'content-type': 'application/json'
                },
                success: function(res) {
                  console.log('heh:',res.data.openid)
                  store.commit('setUserId',res.data.openid)
                  wx.request({
                    url: service.Login,
                    data: {userId:store.state.userId},
                    header: {
                        'content-type': 'application/json'
                    },
                    success: function(res) {
                      if (res && res.header && res.header['Set-Cookie']) {
                          wx.setStorageSync('cookieKey', res.header['Set-Cookie']);   //保存Cookie到Storage
                      }
                    }
                  })
                }
              })
              
            },
            fail: (res)=>{
              console.log('获取用户信息失败')
              // console.log(res)
            }
          })
        }
      })
      
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    }
  },

  created () {// 调用应用实例的方法获取全局数据
    this.getUserInfo()
  }
}
</script>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
