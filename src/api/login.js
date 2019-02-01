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
    Login : 'https://localhost:44322/api/Poker/Login'
    ,

    AddMyPoker:'https://localhost:44322/api/Poker/AddMyPoker'
    ,

    AddMyArray:'https://localhost:44322/api/Poker/AddMyArray'
    ,

    GetMyAll:'https://localhost:44322/api/Poker/GetMyAll'
    ,

    GetAll:'https://localhost:44322/api/Poker/GetAll'
    ,
}
export default myService;