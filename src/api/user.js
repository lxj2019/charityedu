import { request } from '@/network/request.js'

//登陆
export function login(data) {
    return request({
        url: '/login/submit',
        method: 'post',
        data
    })
}
//登出
export function logout() {
    return request({
        url: '/logout',
        method: 'get',
    })
}
//注册
export function register(data) {
    return request({
        url: '/register/adduser',
        method: 'post',
        data
    })
}
//注册获取验证码
export function getcode(params) {
    return request({
        url: '/register/getcode',
        method: 'get',
        params
    })
}
//修改密码
export function repwd(data) {
    return request({
        url: '/repwd/modify',
        method: 'post',
        data
    })
}
//修改获取验证码
export function RepwdGetcode(data) {
    return request({
        url: '/repwd/getCode',
        method: 'post',
        data
    })
}