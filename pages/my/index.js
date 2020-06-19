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

  //  FIXME: 手动清除授权信息后，从别的页面跳转回my页面，应该不显示用户信息

  // 判断用户是否授权过,如果已授权获取用户信息
  getAuthSetting() {
    wx.getSetting({
      success: (res) => {
        const authSetting = res.authSetting['scope.userInfo']

        if (authSetting) {
          wx.getUserInfo({
            success: (data) => {
              const { userInfo } = data
              this.setData({
                authorized: true,
                userInfo,
              })
            },
          })
        }
      },
    })
  },

  onGetMyUserInfo(e) {
    this.setData({
      userInfo: e.detail,
      authorized: true,
    })
  },
})
