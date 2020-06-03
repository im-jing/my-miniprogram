import config from '../config.js'

const tips = {
  1: '抱歉，出现了一个错误',
  401: 'unauthorized',
  1005: 'appkey无效',
  3000: '期刊不存在',
}

class HTTP {
  // 给HTTP类新增一个request方法
  request(params, callback) {
    wx.request({
      url: config.baseUrl + params.url,
      method: params.method || 'GET',
      data: params.data,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey,
      },
      success: (res) => {
        const errorCode =  res.statusCode.toString()
        if (errorCode.startsWith('2')) {
          params.success && params.success(res.data)
          callback(res.data)
        } else {
          this._show_error(errorCode)
        }
      },
      fail: (err) => {
        console.log(err, 'err')
        params.fail && params.fail(err)
      }
    })
  }

  // 提示_show_error是个私有方法，只是提示开发者不要在其他地方调用，不是真正意义上的私有方法
  _show_error(errorCode = 1) {
    console.log(errorCode, 'default errorCode')
    wx.showToast({
      title: tips[errorCode],
      icon: 'none',
      duration: 2000,
    })
  }
}

export { HTTP }