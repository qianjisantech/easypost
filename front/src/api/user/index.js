import request from "@/api";
export function UserQueryPage(body) {
  return request({
    url: '/user/page',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body
  })
}