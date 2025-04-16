import request from '@/api/index.js'

export function EnvironmentManageDetail(id) {
  return request({
    url: `/ams/environmentmanage/detail/${id}`,
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
