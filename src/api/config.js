import Axios from 'axios'
import qs from 'qs'

var service = Axios.create({
    baseURL: 'https://localhost:44322/api/',
    withCredentials: false, 
    adapter:function(config){
        return new Promise((resolve, reject) => {
            let data = config.method === 'get' ? config.params : qs.stringify(config.data)
            wx.request({
                url: config.url,
                data: data,
                method: config.method,
                header: {'content-type': 'application/json'},
                success: res => {
                    resolve(res);
                },
                fail: res => {
                    reject(res);
                }
            });
        })
    }
});

export default service