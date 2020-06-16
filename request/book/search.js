import { HTTP } from '../../utils/http-p'
const http = new HTTP()

const bookSearch = (params) => {
  return http.request({
    url: '/book/search',
    data: params,
  })
}

export { bookSearch }