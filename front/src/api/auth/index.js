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
