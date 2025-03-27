import request from '@/api'

export function TrafficQueryPage(body) {
  return request({
    url: '/gs/traffic/page',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  })
}
export function TrafficDetail(id) {
  return request({
    url: `/gs/traffic/detail/${id}`,
    method: 'get',
  })
}
