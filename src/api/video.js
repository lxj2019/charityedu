import request from '@/utils/request.js'

// 获得已审核作品信息
export function getWorkInfo(params) {
  return request({
    url: '/works/user/init',
    method: 'get',
    params
  })
}

// 获得未审核作品信息
export function getUnreviewedWorkInfo(params) {
  return request({
    url: '/works/manager/init',
    method: 'get',
    params
  })
}
// 新增评论
export function addMessage(params) {
  return request({
    url: '/works/addmessage',
    method: 'post',
    params
  })
}

// 删除评论
export function delMessage(data) {
  return request({
    url: '/works/delmessage',
    method: 'post',
    data
  })
}

// 点赞
export function addLike(params) {
  return request({
    url: '/works/like',
    method: 'post',
    params
  })
}

// 收藏
export function collect(params) {
  return request({
    url: '/collection/add',
    method: 'get',
    params
  })
}

export function addClick(params) {
  return request({
    url: '/works/addClick',
    method: 'post',
    params
  })
}
export function getComments(params) {
  return request({
    url: '/works/getcoments',
    method: 'post',
    params
  })
}
// eslint-disable-next-line eol-last
// eslint-disable-next-line eol-last