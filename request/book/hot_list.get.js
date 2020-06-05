import { HTTP } from '../../utils/http-p'
const http = new HTTP()

const hotBookList = () => {
  return http.request({
    url: '/book/hot_list',
  })
}

export { hotBookList }