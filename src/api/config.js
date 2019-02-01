import Axios from 'axios'

var service = Axios.create({
    baseURL: 'https://localhost:44322/api/',
    withCredentials: false, 
});

export default service