import request from '@/utils/request.js'

//登陆
export function uploadWork(formData) {
    return request({
        url: '/filedeal/new',
        method: 'post',
        data: formData,
        // headers: {
        //     'Content-Type': 'multipart/form-data'
        // }
    })
}