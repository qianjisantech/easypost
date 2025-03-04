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
export function ApiDetail(id) {
  return request({
    url: `/am/api/detail/${id}`,
    method: 'get',
  })
}
export function ApiDelete(id) {
  return request({
    url: `/am/api/delete/${id}`,
    method: 'get',
  })
}
export function ApiCopy(body) {
  return request({
    url: `/am/api/copy`,
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  })
}
export function ApiRename(body) {
  return request({
    url: `/am/api/rename`,
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  })
}
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