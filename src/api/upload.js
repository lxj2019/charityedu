import request from '@/utils/request.js'

// 登陆
export function uploadWork(data) {
  return request({
    url: '/filedeal/new',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
// eslint-disable-next-line eol-last
// eslint-disable-next-line eol-last