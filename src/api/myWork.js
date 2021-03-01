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

