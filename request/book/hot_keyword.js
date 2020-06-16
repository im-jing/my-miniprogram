import { HTTP } from '../../utils/http-p'
const http = new HTTP()

const hotKeyword = () => {
  return http.request({
    url: '/book/hot_keyword',
  })
}

export { hotKeyword }