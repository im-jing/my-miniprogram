import { magazineLatest } from '../../request/classic/latest.get'
import { favor } from '../../request/classic/one.favor.get'
import { likeOrDislike } from '../../request/like.post'

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
    id: 0,
    type: 100,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow() {
    this.getMagazineLatest()
  },

  // 获取最新期刊
  getMagazineLatest() {
    magazineLatest()
      .then(res => {
        this.setData({
          magazineLatestData: res,
          id: res.id,
          type: res.type,
          date: res.pubdate.split('-')[2],
          month: res.pubdate.split('-')[1],
          year: res.pubdate.split('-')[0],
        })
        // 获取like的相关信息
        // 这是一个串行请求，request return一个promise, result在下一个then中获取
        const params = {
          art_id: res.id,
          type: res.type,
        }
        return favor(params)
      })
      .then(res => {
        this.setData({
          status: res.like_status === 1,
          count: res.fav_nums,
        })
      })
  },

  // switch like/dislike
  switchLike(event) {
    const likeStatus = event.detail.status
    const { id, type, count } = this.data
    const params = {
      likeStatus,
      data: {
        art_id: id,
        type,
      },
    }

    likeOrDislike(params).then(res => {
      this.setData({
        status: !this.data.status,
        count: likeStatus ? count + 1 : count - 1,
      })
    })
  },
})