import request from '@/api/index.ts'

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
