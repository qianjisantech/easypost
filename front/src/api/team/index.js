import request from "@/api";
export function TeamQueryPage(body) {
  return request({
    url: '/team/page',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body
  })
}

export function TeamCreate(body) {
  return request({
    url: '/team/create',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body
  })
}

export function TeamUpdate(body) {
  return request({
    url: '/team/update',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body
  })
}

export function TeamDelete(id) {
  return request({
    url: `/team/delete/${id}`,
    method: 'get',
  })
}

export function TeamDetail(id) {
  return request({
    url: `/team/detail/${id}`,
    method: 'get',
  })
}