import { request } from '@/network/request.js'

//获得年级数据
export function getGrade() {
    return request({
        url: '/knowledge/grade',
        method: 'post',
    })
}


//根据年级获取书籍列表
export function getBooks(data) {
    return request({
        url: '/knowledge/books',
        method: 'post',
        data
    })
}

//查找课程
export function search(params) {
    return request({
        url: '/search/',
        method: 'post',
        params
    })
}

//获得用户作品列表
export function userWorkList(params) {
    return request({
        url: '/worklist/users',
        method: 'get',
        params
    })
}

//获取自己收藏的课程
export function getCollection() {
    return request({
        url: 'collection/init',
        method: 'get'
    })
}
//获得管理员作品列表
export function adminWorkList(params) {
    return request({
        url: '/worklist/manager',
        method: 'get',
        params
    })
}

//搜索未审核作品列表
export function searchAdminWorkList(params) {
    return request({
        url: '/search/manager',
        method: 'get',
        params
    })
}
//搜索已审核作品列表
export function searchUserWorkList(params) {
    return request({
        url: '/search/user',
        method: 'get',
        params
    })
}