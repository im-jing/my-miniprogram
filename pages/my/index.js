// pages/my/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userAvatarSrc: '/images/my/my.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {},

  getMyUserInfo(e) {
    this.setData({
      userAvatarSrc: e.detail.userInfo.avatarUrl,
    })
  },
})
