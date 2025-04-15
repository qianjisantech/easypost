import request from '@/api'

export function EnvironmentManageDetail(id) {
  return request({
    url: `/am/environmentmanage/detail/${id}`,
    method: 'get',
  })
}
export function EnvironmentManageSave(body) {
  return request({
    url: '/am/environmentmanage/save',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: body,
  })
}
