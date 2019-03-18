import request from '../utils/request';
var service = {}
service.Login=async function(data){
    return request.get('Poker/Login',data)
}
service.AddMyPoker=async function(data){
    return request.post('Poker/AddMyPoker',data)
}
service.AddMyArray=async function(data){
    return request.post('Poker/AddMyArray',data)
}
service.GetMyArray=async function(data){
    return request.get('Poker/GetMyArray',data)
}
service.GetMyAll=async function(data){
    return request.get('Poker/GetMyAll',data)
}
service.GetAll=async function(data){
    return request.get('Poker/GetAll',data)
}
service.ToArray=async function(data){
    return request.post('Poker/ToArray',data)
}
service.GetLevel=async function(data){
    return request.get('Poker/GetLevel',data)
}
service.GetMyInfor=async function(data){
    return request.get('Poker/GetMyInfor',data)
}
service.SaveMyInfor=async function(data){
    return request.post('Poker/SaveMyInfor',data)
}
service.AddLevel=async function(data){
    return request.post('Poker/AddLevel',data)
}
export default service