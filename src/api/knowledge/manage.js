import request from '@/utils/request.js'

// 获得根节点
export function getRootList() {
  return request({
    url: '/knowledgePrivate/getbooks',
    method: 'post'
  })
}
// 获得子节点
export function getChildList(params) {
  return request({
    url: '/knowledgePrivate/list',
    method: 'post',
    params
  })
}

// 更新课本的目录结点
export function updateKnowledge(params) {
  return request({
    url: '/knowledgePrivate/updatenode',
    method: 'post',
    params
  })
}

// 删除课本的目录结点
export function deleteKnowledge(params) {
  return request({
    url: '/knowledgePrivate/deletenode',
    method: 'post',
    params
  })
}
// 新增课本的目录结点
export function addKnowledge(params) {
  return request({
    url: '/knowledgePrivate/addnode',
    method: 'post',
    params
  })
}
// 新增根结点
export function addBook(params) {
  return request({
    url: '/knowledgePrivate/addbookroot',
    method: 'post',
    params
  })
}
