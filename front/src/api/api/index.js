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

export function ApiDetailCreate(body) {
  return request({
    url: '/am/api/detail/create',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: body,
  })
}

export function ApiDetailUpdate(body) {
  return request({
    url: '/am/api/detail/update',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
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
export function ApiDocDetail(id) {
  return request({
    url: `/am/api/doc/detail/${id}`,
    method: 'get',
  })
}
export function ApiRunDetail(id) {
  return request({
    url: `/am/api/run/detail/${id}`,
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


export function ResponsibleSearch(body) {
  return request({
    url: '/am/responsible/search',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  })
}