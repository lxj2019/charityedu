import request from '@/utils/request.js'

// 删除我的作品
export function deleteMyWork(params) {
  return request({
    url: '/myworks/delete',
    method: 'get',
    params
  })
}

// 获得我的作品
export function myWorksList() {
  return request({
    url: '/myworks/init',
    method: 'get'
  })
}

// 修改作品
export function updateWork(params) {
  return request({
    url: '/filedeal/updateWorkInfo',
    method: 'post',
    params
  })
}

// 更新作品封面图片
export function updateWorkImg(params, data) {
  return request({
    url: '/filedeal/updateWorkImg',
    method: 'post',
    params,
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
