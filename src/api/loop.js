import request from '@/utils/request.js'

//轮播图删除
export function loopDelete(params) {
    return request({
        url: '/loop/delete',
        method: 'get',
        params
    })
}
//轮播图列表
export function loopList() {
    return request({
        url: '/loop/listindex',
        method: 'get',
    })
}
//轮播图管理
export function loopManager() {
    return request({
        url: '/loop/listmanager',
        method: 'get',
    })
}
//轮播图更新
export function loopUpdate(data) {
    return request({
        url: '/loop/update',
        method: 'post',
        data
    })
}
//轮播图上传
export function loopUpload(formData) {
    return request({
        url: '/loop/upload',
        method: 'post',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}