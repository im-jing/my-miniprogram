import { HTTP } from '../../utils/http'
const http = new HTTP()

const magazineLatest = (callback) => {
  const params = {
    url: '/classic/latest',
  }
  http.request(params, callback)
}

export { magazineLatest }