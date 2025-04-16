import request from '@/api/index.ts'

export function DocDetail(id) {
  return request({
    url: `/ams/doc/detail/${id}`,
    method: 'get',
  })
}
export function DocSave(body) {
  return request({
    url: '/ams/doc/save',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  })
}
