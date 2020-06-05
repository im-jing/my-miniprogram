import { HTTP } from '../../utils/http'
import { magazineLatest } from '../../request/classic/latest.get'
import { favor } from '../../request/classic/one.favor.get'

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
    magazineLatest(res => {
      this.setData({
        magazineLatestData: res,
        id: res.id,
        type: res.type,
        date: res.pubdate.split('-')[2],
        month: res.pubdate.split('-')[1],
        year: res.pubdate.split('-')[0],
      })
      // TODO: 优化请求先后依赖问题
      this.getLikeStatus(res.id, res.type)
    })
  },

  // 获取like的相关信息
  getLikeStatus(id, type) {
    console.log(id, type)
    const params = {
      art_id: id,
      type,
    }
    favor(params, res => {
      this.setData({
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