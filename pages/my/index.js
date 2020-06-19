Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    authorized: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getAuthSetting()
  },

  /**
   * 未授权: 显示click me图片(button)
   * 已授权: 显示me头像
   */

  // 判断用户是否授权过
  getAuthSetting() {
    wx.getSetting({
      success: (res) => {
        const authSetting = res.authSetting['scope.userInfo']
        if (authSetting) {
          this.getStorageUserInfo()
          this.setData({
            authorized: true,
          })
        }
      },
    })
  },

  getStorageUserInfo() {
    try {
      const val = wx.getStorageSync('userInfo')
      if (val) {
        const userInfo = JSON.parse(val)
        this.setData({
          userInfo,
        })
      }
    } catch (e) {
      console.debug(e)
    }
  },

  onGetMyUserInfo(e) {
    this.setData({
      userInfo: e.detail.userInfo,
      authorized: true,
    })
  },
})
