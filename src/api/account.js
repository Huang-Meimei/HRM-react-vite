import service from "../utils/request";

export function login(data){
    return service.request({
        url:"/users/login",
        method:"post",
        data,
    })
}

export function getUsers(){
    return service.request({
        url:"/users",
        method:"get",
    })
}

export function getCode(data){
    return service.request({
        url:"/code/getSms",
        method:"post",
        data
    })
}

export function register(data){
    return service.request({
        url:"/users/register",
        method:"post",
        data
    })
}