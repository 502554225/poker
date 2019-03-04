
// var setErrorHandler = function(handler) {
//   this._errorHandler = handler;
// // }
// var a_header = function(){
  
//   console.log(cookie,'=========')
//   return header
// } 

  /**
     * 网络请求
     */
   var requestAll = function(url, data, method) {
      let cookie = wx.getStorageSync('cookieKey');//取出Cookie
      var header = { 'Content-Type': 'application/x-www-form-urlencoded'};
      // if(url == 'Poker/AddMyArray'){
      //   header = { 'Content-Type': 'text/html'};
      // }
      if (cookie) {
          header.Cookie = cookie;
      } 
      return new Promise((resolve, reject) => {
        wx.request({
          url: 'https://localhost:44322/api/'+url,
          data: data
          // function(){
          //   if(method == 'POST'){
          //     return Util.json2Form(data)
          //   }
          //   else{
          //     return data
          //   }
          // }
          ,
          header: header,
          method: method,
          success: (res => {
            if (res.statusCode === 200) {
              // return res
              resolve(res)
            } 
            // else {
            //   //其它错误，提示用户错误信息
            //   if (_errorHandler != null) {
            //   //如果有统一的异常处理，就先调用统一异常处理函数对异常进行处理
            //     _errorHandler(res)
            //   }
            //   reject(res)
            // }
          }),
          fail: (res => {
            // if (_errorHandler != null) {
            //   _errorHandler(res)
            // }
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