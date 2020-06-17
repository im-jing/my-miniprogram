import KeywordsModel from '../../models/keywords'
import { bookSearch } from '../../request/book/search'

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
    loadMore: {
      type: String,
      observer: 'loadMoreBook', // 值有改变，才会执行observer; 每次onReachBottom都向子组件传递一个随机数
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    searching: false,
    loading: false, // 接口是否请求中
    historyWords: [],
    hotWords: [],
    searchResult: [],
    q: '',
    pagination: {
      start: 0,
      count: 20,
      total: 0,
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
      },
    })

    this.getHotKeyword()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 热门搜索
    getHotKeyword() {
      this.setData({
        hotWords: this.properties.hotKeyword,
      })
    },

    // 点击X事件
    onDelete() {
      this.setData({
        q: '',
        searching: false,
        searchResult: [],
        'pagination.start': 0,
        'pagination.total': 0,
      })
    },

    // 点击取消事件
    onCancel() {
      this.triggerEvent('cancel', {}, {})
      this.setData({
        searchResult: [],
        'pagination.start': 0,
        'pagination.total': 0,
      })
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

    // 点击tag事件
    onClickTag(e) {
      const val = e.detail.text
      this.onSearch(val)
      this.setInputVal(val)
    },

    // 点击tag把tag名字显示在input输入框中
    setInputVal(val) {
      this.setData({
        q: val,
      })
    },

    // 根据keywords搜索
    onSearch(q, s) {
      if (!q) return

      wx.showLoading()
      const { count } = this.data.pagination
      const start = s || this.data.pagination.start
      const params = {
        start,
        count,
        summary: 1, // 默认为0,0为完整内容,1为简介
        q,
      }

      bookSearch(params)
        .then((res) => {
          wx.hideLoading()
          this.setData({
            searching: true,
            searchResult: res.books,
            'pagination.total': res.total,
          })
        })
        .catch(() => {
          wx.hideLoading()
        })
    },

    // 检查是否还有下一页,上拉加载更多数据
    loadMoreBook() {
      const { q, searchResult } = this.data
      const { start, count, total } = this.data.pagination
      const currentStart = start + count

      if (currentStart > total) return
      if (this.data.loading) return

      // loading赋值这里可以不用setData, 如果要把loading值赋值到wxml里,则必须用setData
      this.data.loading = true

      const params = {
        start: currentStart,
        count,
        summary: 1, // 默认为0,0为完整内容,1为简介
        q,
      }
      bookSearch(params)
        .then((res) => {
          wx.hideLoading()
          this.setData({
            'pagination.start': currentStart,
            searchResult: searchResult.concat(res.books),
          })
          this.data.loading = false
        })
        .catch(() => {
          wx.hideLoading()
        })
    },
  },
})
