import request from '@/api'
export function ApiTreeQueryPage(body) {
  return request({
    url: '/am/api/tree/page',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  })
}

export function ApiDetailSave(body) {
  return request({
    url: '/am/api/detail/save',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  })
}
