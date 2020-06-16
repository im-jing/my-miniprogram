import { HTTP } from '../utils/http-p'

export class KeywordsModel extends HTTP {
  // 1.获取storage里的值显示关键字列表
  // 2.输入关键字
  // 3.存入storage

  historyMaxLen = 10
  key = 'history'

  getHistory() {
    // 从storage取值
    // return wx.getStorage({
    //   key: this.key,
    //   success(res) {
    //     console.log(res, '=res=')
    //     return res.data
    //   }
    // }) || []
    return wx.getStorageSync(this.key) || []
  }

  addToHistory(keyword) {
    // 添加到array第1个,最多10个,超过10个删除第1个; 重复不添加
    let history = this.getHistory()
    const existKeyword = history.includes(keyword)
    console.log(keyword, '=keyword=')
    if (existKeyword || keyword === '') return
    history.unshift(keyword)
    if (history.length > this.historyMaxLen) history.shift()
    // wx.setStorage({
    //   key: this.key,
    //   data: history,
    // })
    wx.setStorageSync(this.key, history)
  }

  getHot() {}
}