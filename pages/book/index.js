import { hotBookList } from '../../request/book/hot_list.get'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotBookListData: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.gethotBookList()
  },

  gethotBookList() {
    hotBookList().then(res => {
      this.setData({
        hotBookListData: res
      })
    })
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
})