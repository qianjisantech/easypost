import request from '@/api'

export function DocDetail(id) {
  return request({
    url: `/am/doc/detail/${id}`,
    method: 'get',
  })
}
export function DocSave(body) {
  return request({
    url: '/am/doc/save',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  })
}
