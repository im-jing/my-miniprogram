import { KeywordsModel } from "../../models/keywords"
import { bookSearch } from "../../request/book/search"

const keywordsModel = new KeywordsModel()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hotKeyword: {
      type: Array,
      value: null,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    searching: false,
    historyWords: [],
    hotWords: [],
    searchResult: [],
    pagination: {
      start: 0,
      count: 20,
    },
  },

  attached() {
    const that = this
    
    // 从storage里获取history keyword
    wx.getStorage({
      key: 'history',
      success(res) {
        if (res.data) {
          that.setData({
            historyWords: res.data,
          })
        }
      }
    })

    this.getHotKeyword()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel() {
      this.triggerEvent('cancel', {}, {})
    },

    // input回车刷新keywords
    onConfirm(e) {
      const val = e.detail.value
      keywordsModel.addToHistory(val)

      const historyWords = keywordsModel.getHistory()
      this.setData({
        historyWords,
      })

      this.onSearch(val)
    },

    onClickTag(e) {
      const val = e.detail.text
      this.onSearch(val)
    },

    // 根据keywords搜索
    onSearch(q) {
      wx.showLoading()
      const { start, count } = this.data.pagination
      const params = {
        start,
        count,
        summary: 0,
        q,
      }
      bookSearch(params).then(res => {
        wx.hideLoading()
        this.setData({
          searching: true,
          searchResult: res.books,
        })
      })
    },

    onDelete() {
      console.log('=onDelete=')
      this.setData({
        q: '',
      })
    },

    // 热门搜索
    getHotKeyword() {
      this.setData({
        hotWords: this.properties.hotKeyword,
      })
    }
  }
})
