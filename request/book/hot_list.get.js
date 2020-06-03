import { HTTP } from '../../utils/http'
const http = new HTTP()

const hotBookList = (callback) => {
  const params = {
    url: '/book/hot_list',
  }
  http.request(params, callback)
}

export { hotBookList }