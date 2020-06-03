import { HTTP } from '../../utils/http'
import { magazineLatest } from '../../request/classic/latest.get'

const http = new HTTP()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: 1,
    month: 1,
    year: '',
    status: false,
    count: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow() {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('itemData', (data) => {
      const res = data.data
      this.setData({
        magazineLatestData: res,
        id: res.id,
        status: res.like_status === 1,
        count: res.fav_nums,
        author: res.author,
        title: res.title,
        image: res.image,
      })
    })
    // this.getMagazineLatest()
  },

  getMagazineLatest() {
    magazineLatest(res => {
      this.setData({
        magazineLatestData: res,
        id: res.id,
        type: res.type,
        date: res.pubdate.split('-')[2],
        month: res.pubdate.split('-')[1],
        year: res.pubdate.split('-')[0],
        status: res.like_status === 1,
        count: res.fav_nums,
      })
    })
  },

  onLike(event) {
    const likeStatus = event.detail.status
    const params = {
      url: likeStatus ? '/like' : '/like/cancel',
      method: 'POST',
      data: {
        art_id: this.data.id,
        type: 400,
      }
    }
    http.request(params, res => {
      if (res.error_code === 0) {
        this.setData({
          count: likeStatus ? this.data.count + 1 : this.data.count - 1,
          status: likeStatus,
        })
      }
    })
  },
})