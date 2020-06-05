import { HTTP } from '../utils/http-p'
const http = new HTTP()

const likeOrDislike = (params) => {
  return http.request({
    url: params.likeStatus ? '/like' : '/like/cancel',
    method: 'POST',
    data: params.data,
  })
}

export { likeOrDislike }