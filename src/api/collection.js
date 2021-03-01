import request from '@/utils/request.js'

// 课程添加收藏
export function collectWork(params) {
  return request({
    url: '/collection/add',
    method: 'get',
    params
  })
}
// 搜索未审核作品列表
export function removeCollection(params) {
  return request({
    url: '/collection/delete',
    method: 'get',
    params
  })
}

// 获得收藏作品列表
export function collectionList() {
  return request({
    url: '/collection/init',
    method: 'get'
  })
}

