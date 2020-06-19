Component({
  options: {
    multipleSlots: true,
  },

  /**
   * 组件的属性列表
   */
  properties: {
    openType: {
      type: String,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    // 判断用户是否授权过
    getAuthSetting() {
      wx.getSetting({
        success: (res) => {
          const authSetting = res.authSetting['scope.userInfo']
          if (authSetting) this.getUserInfo()
        },
      })
    },

    // 获取用户信息
    getUserInfo() {
      wx.getUserInfo({
        success: (res) => {
          const result = JSON.parse(res.rawData)

          this.onGetUserInfo(result)
          wx.setStorageSync('userInfo', JSON.stringify(result))
        },
      })
    },

    onGetUserInfo(userInfo) {
      this.triggerEvent('getMyUserInfo', { userInfo }, {})
    },
  },
})
