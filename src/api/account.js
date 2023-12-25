import service from "../utils/request";

export function login(data){
    return service.request({
        url:"/users/login/",
        method:"post",
        data
    })
}

export function getUsers(){
    return service.request({
        url:"/users/",
        method:"get",
    })
}