import request from "@/api";

/**
 * 登录
 * @param body
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function login(body) {
  return request({
    url: '/auth/login',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body
  })
}

export function apiDirectoryDataList (body) {
  return request({
    url: '/directory/data/list',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body
  })
}

export function apiDetailSave (body) {
  return request({
    url: '/api/detail/save',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body
  })
}