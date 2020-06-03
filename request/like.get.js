import { HTTP } from '../utils/http'
const http = new HTTP()

const like = (params, callback) => {
  http.request(params, callback)
}

export { like }