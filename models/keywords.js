import { HTTP } from '../utils/http-p'

class KeywordsModel extends HTTP {
  // 1.获取storage里的值显示关键字列表
  // 2.输入关键字
  // 3.存入storage

  constructor() {
    super()
    this.historyMaxLen = 10
    this.key = 'history'
  }

  getHistory() {
    return wx.getStorageSync(this.key) || []
  }

  addToHistory(keyword) {
    // 添加到array第1个,最多10个,超过10个删除第1个; 重复不添加
    const history = this.getHistory()
    const existKeyword = history.includes(keyword)

    if (existKeyword || keyword === '') return
    history.unshift(keyword)
    if (history.length > this.historyMaxLen) history.shift()

    wx.setStorageSync(this.key, history)
  }

  // getHot() {}
}

export default KeywordsModel
