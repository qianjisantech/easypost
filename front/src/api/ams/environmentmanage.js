import request from '@/api/index.ts'

export function EnvironmentManageDetail() {
  return request({
    url: `/ams/environmentmanage/detail`,
    method: 'get',
  })
}
export function EnvironmentManageSave(body) {
  return request({
    url: '/ams/environmentmanage/save',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: body,
  })
}
export function EnvironmentManageDynamic() {
  return request({
    url: `/ams/environmentmanage/dynamic`,
    method: 'get',
  })
}