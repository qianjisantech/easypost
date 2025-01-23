import request from "@/api";
export function ProjectQueryPage(body) {
  return request({
    url: '/project/page',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body
  })
}

export function ProjectCreate(body) {
  return request({
    url: '/project/create',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body
  })
}

export function ProjectUpdate(body) {
  return request({
    url: '/project/update',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body
  })
}

export function ProjectCopy(body) {
  return request({
    url: '/project/copy',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body
  })
}
export function ProjectDelete(id) {
  return request({
    url: `/project/delete/${id}`,
    method: 'get',
  })
}