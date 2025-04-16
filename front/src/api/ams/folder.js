import request from '@/api/index.ts'
export function ApiTreeQueryPage(body) {
  return request({
    url: '/ams/api/tree/page',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  })
}

export function FolderDetailSave(body) {
  return request({
    url: '/ams/folder/detail/save',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
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
export function FolderDetail(id) {
  return request({
    url: `/ams/folder/detail/${id}`,
    method: 'get',
  })
}
export function ApiDocDetail(id) {
  return request({
    url: `/ams/api/doc/detail/${id}`,
    method: 'get',
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