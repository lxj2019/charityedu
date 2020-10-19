import request from '@/utils/request.js'

//新增评论
export function addMessage(params) {
    return request({
        url: '/works/addmessage',
        method: 'post',
        params,
    })
}

//删除评论
export function delMessage(data) {
    return request({
        url: '/works/delmessage',
        method: 'post',
        data,
    })
}

export function getComents(params) {
    return request({
        url: '/works/getcoments',
        method: 'post',
        params,
    })
}