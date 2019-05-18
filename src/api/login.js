import Axios from "axios";
import service from './config';
import { AxiosRequestConfig, AxiosResponse } from 'axios'


// Axios.defaults.adapter = function (url) {
//     return new Promise((resolve, reject) => {
//         wx.request({
//             url: url,
//             data: data,
//             method: method,
//             header: {'content-type': 'application/json'},
//             success: res => {
//                 resolve(res);
//             },
//             fail: res => {
//                 reject(res);
//             }
//         });
//     })
// }

const myService={
    // Login : 'https://170.20.10.3:5001/api/Poker/Login'
    Login : 'https://localhost:5001/api/Poker/Login'
}
export default myService;