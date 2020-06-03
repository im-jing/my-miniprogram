import { HTTP } from '../../utils/http'
const http = new HTTP()

const dislike = (params, callback) => {
  http.request(params, callback)
}

export { dislike }