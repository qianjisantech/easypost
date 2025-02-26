import request from '@/api'

/**
 * 登录
 * @param body
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function LoginByEmail(body) {
  return request({
    url: '/auth/email/login',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  })
}

/**
 *
 * @param body
 * @returns {Promise<axios.AxiosResponse<any>>}
 * @constructor
 */
export function RegisterByEmail(body) {
  return request({
    url: '/auth/email/register',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  })
}
/**
 *
 * @param body
 * @returns {Promise<axios.AxiosResponse<any>>}
 * @constructor
 */
export function EmailSendCode(body) {
  return request({
    url: '/auth/email/sendCode',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  })
}
