import config from '../config.js'

const tips = {
  1: '抱歉，出现了一个错误',
  401: 'unauthorized',
  1005: 'appkey无效',
  3000: '期刊不存在',
}

// promise方式实现请求
class HTTP {
  // 给HTTP类新增一个request方法
  request({url, method = 'GET', data = {}}) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: config.baseUrl + url,
        method: method,
        data: data,
        header: {
          'content-type': 'application/json',
          'appkey': config.appkey,
        },
        success: (res) => {
          const errorCode =  res.statusCode.toString()
          if (errorCode.startsWith('2')) {
            console.log(res.data, 'res.data')
            resolve(res.data)
          } else {
            reject()
            this._show_error(errorCode)
          }
        },
        fail: (err) => {
          reject()
          this._show_error(errorCode)
        }
      })
    })
  }

  // 提示_show_error是个私有方法，只是提示开发者不要在其他地方调用，不是真正意义上的私有方法
  _show_error(errorCode = 1) {
    wx.showToast({
      title: tips[errorCode] ? tips[errorCode] : tips[1],
      icon: 'none',
      duration: 2000,
    })
  }
}

export { HTTP }