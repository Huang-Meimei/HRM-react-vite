import axios from "axios"
const service = axios.create({
    baseURL: import.meta.env.REACT_APP_API,
    timeout:5000
})

service.interceptors.request.use(function (config){
    //console.log(import.meta.env.REACT_APP_API)
    console.log('config', config)
    return config;
}, function (error){
    return Promise.reject(error)
})

service.interceptors.response.use(function (response){
    
    return response;
}, function (error){
    
    return Promise.reject(error)
})

export default service;