import { HTTP } from '../../utils/http'
const http = new HTTP()

const favor = (params, callback) => {
  const p = {
    url: `/classic/${params.type}/${params.art_id}/favor`,
  }
  http.request(p, callback)
}

export { favor }