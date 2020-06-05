import { HTTP } from '../../utils/http'
const http = new HTTP()

const favor = (params, callback) => {
  const p = {
    url: `/book/${params.art_id}/favor`,
  }
  http.request(p, callback)
}

export { favor }