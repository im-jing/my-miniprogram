import { HTTP } from '../../utils/http-p'
const http = new HTTP()

const favor = (params) => {
  return http.request({
    url: `/classic/${params.type}/${params.art_id}/favor`,
  })
}

export { favor }