import request from '@/api/index.ts'
export function ApiTreeQueryPage() {
  return request({
    url: '/ams/api/tree/page',
    method: 'get',
  })
}

export function ApiDetailCreate(body) {
  return request({
    url: '/ams/api/detail/create',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: body,
  })
}

export function ApiDetailUpdate(body) {
  return request({
    url: '/ams/api/detail/update',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: body,
  })
}
export function ApiDetail(id) {
  return request({
    url: `/ams/api/detail/${id}`,
    method: 'get',
  })
}
export function ApiDocDetail(id) {
  return request({
    url: `/ams/api/doc/detail/${id}`,
    method: 'get',
  })
}
export function ApiRunDetail(id) {
  return request({
    url: `/ams/api/run/detail/${id}`,
    method: 'get',
  })
}
export function ApiRunSave(body) {
  return request({
    url: '/ams/api/run/save',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: body,
  })
}
export function ApiDelete(id) {
  return request({
    url: `/ams/api/delete/${id}`,
    method: 'get',
  })
}
export function ApiCopy(body) {
  return request({
    url: `/ams/api/copy`,
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  })
}
export function ApiRename(body) {
  return request({
    url: `/ams/api/rename`,
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  })
}
export function ApiMove(body) {
  return request({
    url: `/ams/api/move`,
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  })
}

export function ResponsibleSearch(body) {
  return request({
    url: '/ams/responsible/search',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  })
}