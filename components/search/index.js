import KeywordsModel from '../../models/keywords'
import { bookSearch } from '../../request/book/search'
import paginationBehavior from '../behaviors/pagination'

const keywordsModel = new KeywordsModel()

Component({
  behaviors: [paginationBehavior],
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
      observer: 'loadMore', // 值有改变，才会执行observer; 每次onReachBottom都向子组件传递一个随机数
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    searching: false, // 书籍首页，点击了搜索书籍按钮为true
    historyWords: [],
    hotWords: [],
    q: '',
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
      })
      this.initData()
    },

    // 点击取消事件
    onCancel() {
      this.triggerEvent('cancel', {}, {})
      this.initData()
    },

    // input回车刷新keywords
    onConfirm(e) {
      const val = e.detail.value

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
    onSearch(q) {
      if (!q) return

      this.showLoadingCenter()
      const { start, count } = this.data.pagination

      const params = {
        start,
        count,
        summary: 1, // 默认为0,0为完整内容,1为简介
        q,
      }

      bookSearch(params)
        .then((res) => {
          this.hideLoadingCenter()
          this.setMoreData(res.books)
          this.setTotal(res.total)
          this.setData({
            searching: true,
          })

          // 能搜索到结果的有效keywords存入storage
          if (res.total > 0) keywordsModel.addToHistory(q)
        })
        .catch(() => {
          this.hideLoadingCenter()
        })
    },

    // 检查是否还有下一页,上拉加载更多数据
    loadMore() {
      const { q } = this.data
      const { count } = this.data.pagination

      if (!this.hasMore()) return
      if (this.data.loading) return

      this.showPaginationLoading()

      const params = {
        start: this.getCurrentStart(),
        count,
        summary: 1, // 默认为0,0为完整内容,1为简介
        q,
      }
      bookSearch(params)
        .then((res) => {
          this.setMoreData(res.books)
          this.hidePaginationLoading()
        })
        .catch(() => {
          this.hidePaginationLoading()
        })
    },
  },
})
