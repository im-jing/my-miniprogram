import { hotBookList } from '../../request/book/hot_list.get'
import { hotKeyword } from '../../request/book/hot_keyword'
import { random } from '../../utils/common'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searching: false,
    loadMore: null,
    hotBookData: [],
    hotKeyword: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getData()
  },

  // 点击页面上"搜索书籍"按钮
  onTapSearch() {
    this.setData({
      searching: true,
    })
  },

  onCancel() {
    this.setData({
      searching: false,
    })
  },

  async getData() {
    wx.showLoading()
    try {
      const res1 = await hotBookList()
      const res2 = await hotKeyword()
      this.setData({
        hotBookData: res1,
        hotKeyword: res2.hot,
      })
      wx.hideLoading()
    } catch(err) {
      console.log(err)
    }
  },
  
  linkToDetail(e) {
    const { item } = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/book-detail/index',
      success: (res)=>{
        res.eventChannel.emit('itemData', {data: item})
      },
      fail: (err)=>{
        console.log(err)
      },
      complete: ()=>{}
    })
  },

  // onReachBottom是page才有的方法，组件内没有该方法，通过properties把这个状态传给子组件
  onReachBottom() {
    this.setData({
      loadMore: random(16),
    })
  }
})