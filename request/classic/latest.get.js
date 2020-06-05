import { HTTP } from '../../utils/http-p'
const http = new HTTP()

const magazineLatest = () => {
  return http.request({
    url: '/classic/latest',
  })
}

export { magazineLatest }