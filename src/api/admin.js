import request from '@/utils/request.js'

// 审核作品
export function check(params) {
  return request({
    url: '/manager/check',
    method: 'get',
    params
  })
}

// 删除作品
export function deleteWork(data) {
  return request({
    url: '/manager/delete',
    method: 'post',
    data
  })
}
// 搜索未审核作品列表
export function searchAdminWorkList(params) {
  return request({
    url: '/search/manager',
    method: 'get',
    params
  })
}

// 获得管理员作品列表
export function adminWorkList(params) {
  return request({
    url: '/worklist/manager',
    method: 'get',
    params
  })
}

// 下载
export function downWork(params) {
  return request({
    url: '/manager/down',
    method: 'get',
    params
  })
}

