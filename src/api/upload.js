import { request } from '@/network/request.js'

//登陆
export function uploadWork(data) {
    return request({
        url: '/filedeal/new',
        method: 'post',
        data
    })
}