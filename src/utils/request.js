
   var requestAll = function(url, data, method) {
      let cookie = wx.getStorageSync('cookieKey');//取出Cookie
      var header = { 'Content-Type': 'application/x-www-form-urlencoded'};
      if (cookie) {
          header.Cookie = cookie;
      } 
      return new Promise((resolve, reject) => {
        wx.request({
          url: 'https://localhost:44322/api/'+url,
          data: data,
          header: header,
          method: method,
          success: (res => {
            if (res.statusCode === 200) {
              resolve(res)
            } 
          }),
          fail: (res => {
            reject(res)
          })
        })
      })
    }
var request ={
    get(url, data) {
      return requestAll(url, data, 'GET')
    },
  
    post(url, data) {
      return requestAll(url, data, 'POST')
    }
  }
  
  export default request