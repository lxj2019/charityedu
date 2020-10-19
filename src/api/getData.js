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