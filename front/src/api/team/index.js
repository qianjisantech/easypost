import request from '@/api'

export function TeamQueryPage(body) {
  return request({
    url: '/team/page',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  })
}

export function TeamCreate(body) {
  return request({
    url: '/team/create',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  })
}

export function TeamUpdate(body) {
  return request({
    url: '/team/update',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
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
export function TeamMemberPage(body) {
  return request({
    url: '/team/member/page',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  })
}

export function TeamInviteMember(body) {
  return request({
    url: '/team/member/invite',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  })
}
export function TeamUserSearch(body) {
  return request({
    url: '/team/user/search',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  })
}

export function TeamSettingsDetail(id) {
  return request({
    url: `/team/settings/detail/${id}`,
    method: 'get',
  })
}