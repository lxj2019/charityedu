import request from '@/utils/request.js'

// 添加课本
export function addBook(data) {
  return request({
    url: '/knowledgePrivate/addbookroot',
    method: 'post',
    data
  })
}
